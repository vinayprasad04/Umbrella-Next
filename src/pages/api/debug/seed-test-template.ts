import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import EmailTemplate from '../../../models/EmailTemplate';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    console.log('Database connected for seeding');

    // Find an admin user to use as creator
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      return res.status(400).json({ error: 'No admin user found. Please create an admin user first.' });
    }

    // Check if we already have templates
    const existingTemplates = await EmailTemplate.countDocuments();
    console.log(`Existing templates: ${existingTemplates}`);

    if (existingTemplates === 0) {
      // Create a test template
      const testTemplate = new EmailTemplate({
        name: 'Welcome Email',
        subject: 'Welcome to our platform, {{firstName}}!',
        htmlContent: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="color: #333;">Welcome {{firstName}}!</h1>
            <p>Thank you for joining {{companyName}}. We're excited to have you on board.</p>
            <p>Your email: {{email}}</p>
            <p>Best regards,<br>The Team</p>
          </div>
        `,
        textContent: 'Welcome {{firstName}}! Thank you for joining {{companyName}}. We\'re excited to have you on board. Your email: {{email}}. Best regards, The Team',
        variables: ['firstName', 'companyName', 'email'],
        category: 'welcome',
        createdBy: adminUser._id,
      });

      await testTemplate.save();
      console.log('Test template created');
    }

    // Fetch all templates to verify
    const allTemplates = await EmailTemplate.find({});
    
    res.status(200).json({
      message: 'Seed completed',
      templatesCount: allTemplates.length,
      templates: allTemplates.map(t => ({
        id: t._id,
        name: t.name,
        subject: t.subject,
        category: t.category
      }))
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({ 
      error: 'Seed failed',
      details: error.message
    });
  }
}