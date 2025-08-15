import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import EmailTemplate from '../../../models/EmailTemplate';

type TemplateData = {
  _id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: string[];
  category: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type Data = {
  templates?: TemplateData[];
  template?: TemplateData;
  message?: string;
  totalTemplates?: number;
} | {
  error: string;
};

// Middleware to check admin access
const checkAdminAccess = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  
  const user = await User.findById(decoded.userId);
  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  
  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await dbConnect();
    
    // Check admin access for all operations
    const adminUser = await checkAdminAccess(req);

    switch (req.method) {
      case 'GET':
        // Get all templates
        const templates = await EmailTemplate.find({})
          .sort({ createdAt: -1 })
          .populate('createdBy', 'name email');
        
        const totalTemplates = await EmailTemplate.countDocuments();
        
        res.status(200).json({
          templates: templates.map(template => ({
            _id: template._id.toString(),
            name: template.name,
            subject: template.subject,
            htmlContent: template.htmlContent,
            textContent: template.textContent,
            variables: template.variables,
            category: template.category,
            isActive: template.isActive,
            createdBy: template.createdBy.toString(),
            createdAt: template.createdAt.toISOString(),
            updatedAt: template.updatedAt.toISOString(),
          })),
          totalTemplates
        });
        break;

      case 'POST':
        // Create new template
        const { name, subject, htmlContent, textContent, variables, category } = req.body;
        
        if (!name || !subject || !htmlContent) {
          return res.status(400).json({ error: 'Name, subject and content are required' });
        }

        const newTemplate = new EmailTemplate({
          name,
          subject,
          htmlContent,
          textContent,
          variables: variables || [],
          category: category || 'other',
          createdBy: adminUser._id,
        });

        await newTemplate.save();

        res.status(201).json({
          message: 'Email template created successfully',
          template: {
            _id: newTemplate._id.toString(),
            name: newTemplate.name,
            subject: newTemplate.subject,
            htmlContent: newTemplate.htmlContent,
            textContent: newTemplate.textContent,
            variables: newTemplate.variables,
            category: newTemplate.category,
            isActive: newTemplate.isActive,
            createdBy: newTemplate.createdBy.toString(),
            createdAt: newTemplate.createdAt.toISOString(),
            updatedAt: newTemplate.updatedAt.toISOString(),
          }
        });
        break;

      case 'PUT':
        // Update template
        const { templateId, ...updateData } = req.body;
        
        if (!templateId) {
          return res.status(400).json({ error: 'Template ID is required' });
        }

        const updatedTemplate = await EmailTemplate.findByIdAndUpdate(
          templateId,
          updateData,
          { new: true }
        );

        if (!updatedTemplate) {
          return res.status(404).json({ error: 'Template not found' });
        }

        res.status(200).json({
          message: 'Template updated successfully',
          template: {
            _id: updatedTemplate._id.toString(),
            name: updatedTemplate.name,
            subject: updatedTemplate.subject,
            htmlContent: updatedTemplate.htmlContent,
            textContent: updatedTemplate.textContent,
            variables: updatedTemplate.variables,
            category: updatedTemplate.category,
            isActive: updatedTemplate.isActive,
            createdBy: updatedTemplate.createdBy.toString(),
            createdAt: updatedTemplate.createdAt.toISOString(),
            updatedAt: updatedTemplate.updatedAt.toISOString(),
          }
        });
        break;

      case 'DELETE':
        // Delete template
        const templateIdToDelete = req.body.templateId || req.query.templateId;
        
        if (!templateIdToDelete) {
          return res.status(400).json({ error: 'Template ID is required' });
        }

        const deletedTemplate = await EmailTemplate.findByIdAndDelete(templateIdToDelete);
        
        if (!deletedTemplate) {
          return res.status(404).json({ error: 'Template not found' });
        }

        res.status(200).json({ message: 'Template deleted successfully' });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error: any) {
    console.error('Email templates API error:', error);
    if (error.message === 'No token provided' || error.message === 'Admin access required') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}