import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import User from '@/models/User';

interface ContactQuery {
  page?: string;
  limit?: string;
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
  assignedTo?: string;
  isRead?: string;
  isStarred?: string;
  sortBy?: string;
  sortOrder?: string;
  contactId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    // Verify admin authentication
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] }) as any;
    const adminUser = await User.findById(decoded.userId);

    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    switch (req.method) {
      case 'GET':
        return handleGetContacts(req, res);
      case 'PUT':
        return handleUpdateContact(req, res, adminUser);
      case 'DELETE':
        return handleDeleteContact(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Admin contacts API error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
}

async function handleGetContacts(req: NextApiRequest, res: NextApiResponse) {
  const {
    page = '1',
    limit = '10',
    status,
    priority,
    category,
    search,
    assignedTo,
    isRead,
    isStarred,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    contactId
  }: ContactQuery = req.query;

  try {
    // If requesting specific contact
    if (contactId) {
      const contact = await Contact.findById(contactId)
        .populate('assignedTo', 'name email')
        .lean();

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      return res.status(200).json({
        success: true,
        contact
      });
    }

    // Build filter query
    const filter: any = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (isRead !== undefined) filter.isRead = isRead === 'true';
    if (isStarred !== undefined) filter.isStarred = isStarred === 'true';

    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Get contacts with pagination
    const [contacts, totalItems] = await Promise.all([
      Contact.find(filter)
        .populate('assignedTo', 'name email')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Contact.countDocuments(filter)
    ]);

    // Get statistics
    const [stats, categoryBreakdown] = await Promise.all([
      Contact.getStatistics(),
      Contact.getCategoryBreakdown()
    ]);

    const totalPages = Math.ceil(totalItems / limitNum);

    return res.status(200).json({
      success: true,
      contacts: contacts.map(contact => ({
        _id: (contact._id as any).toString(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        priority: contact.priority,
        category: contact.category,
        assignedTo: contact.assignedTo ? (contact.assignedTo as any)._id.toString() : null,
        assignedToName: contact.assignedToName,
        response: contact.response,
        responseDate: contact.responseDate?.toISOString(),
        tags: contact.tags,
        ipAddress: contact.ipAddress,
        userAgent: contact.userAgent,
        source: contact.source,
        isRead: contact.isRead,
        isStarred: contact.isStarred,
        createdAt: contact.createdAt.toISOString(),
        updatedAt: contact.updatedAt.toISOString()
      })),
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      },
      statistics: stats[0] || {
        total: 0,
        new: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
        unread: 0,
        starred: 0,
        urgent: 0,
        high: 0
      },
      categoryBreakdown: categoryBreakdown || []
    });

  } catch (error: any) {
    console.error('Get contacts error:', error);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}

async function handleUpdateContact(req: NextApiRequest, res: NextApiResponse, adminUser: any) {
  const {
    contactId,
    status,
    priority,
    category,
    assignedTo,
    assignedToName,
    response,
    tags,
    isRead,
    isStarred,
    action
  } = req.body;

  if (!contactId) {
    return res.status(400).json({ error: 'Contact ID is required' });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Handle specific actions
    switch (action) {
      case 'mark_read':
        await contact.markAsRead();
        break;
      case 'assign':
        if (assignedTo && assignedToName) {
          await contact.assignTo(assignedTo, assignedToName);
        }
        break;
      case 'respond':
        if (response) {
          await contact.addResponse(response);
        }
        break;
      default:
        // General update
        if (status !== undefined) contact.status = status;
        if (priority !== undefined) contact.priority = priority;
        if (category !== undefined) contact.category = category;
        if (assignedTo !== undefined) {
          contact.assignedTo = assignedTo || undefined;
          contact.assignedToName = assignedToName || undefined;
        }
        if (response !== undefined) {
          contact.response = response;
          if (response) {
            contact.responseDate = new Date();
          }
        }
        if (tags !== undefined) contact.tags = tags;
        if (isRead !== undefined) contact.isRead = isRead;
        if (isStarred !== undefined) contact.isStarred = isStarred;

        await contact.save();
    }

    // Log the action
    console.log(`Contact ${contactId} updated by admin ${adminUser.email}: ${action || 'general_update'}`);

    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      contact: {
        _id: contact._id.toString(),
        status: contact.status,
        priority: contact.priority,
        category: contact.category,
        assignedTo: contact.assignedTo?.toString(),
        assignedToName: contact.assignedToName,
        response: contact.response,
        responseDate: contact.responseDate?.toISOString(),
        tags: contact.tags,
        isRead: contact.isRead,
        isStarred: contact.isStarred,
        updatedAt: contact.updatedAt.toISOString()
      }
    });

  } catch (error: any) {
    console.error('Update contact error:', error);
    return res.status(500).json({ error: 'Failed to update contact' });
  }
}

async function handleDeleteContact(req: NextApiRequest, res: NextApiResponse) {
  const { contactId } = req.body;

  if (!contactId) {
    return res.status(400).json({ error: 'Contact ID is required' });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete contact error:', error);
    return res.status(500).json({ error: 'Failed to delete contact' });
  }
}