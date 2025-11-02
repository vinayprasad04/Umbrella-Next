import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import EmailTemplate from '../../../models/EmailTemplate';

const defaultTemplates = [
  {
    name: 'Welcome Email',
    subject: 'Welcome to IncomeGrow Financial!',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF6B2C; margin-bottom: 10px;">Welcome to IncomeGrow Financial!</h1>
          <p style="color: #666; font-size: 16px;">Your journey to financial freedom starts here</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Hello {{userName}}!</h2>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            Thank you for joining IncomeGrow Financial. We're excited to help you achieve your financial goals with our comprehensive suite of investment tools and resources.
          </p>
          <p style="color: #555; line-height: 1.6;">
            Get started by exploring our dashboard where you'll find calculators, investment insights, and personalized recommendations.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{dashboardUrl}}" style="background: #FF6B2C; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
          <p style="color: #999; font-size: 12px;">
            © 2024 IncomeGrow Financial. All rights reserved.
          </p>
        </div>
      </div>
    `,
    textContent: 'Welcome to IncomeGrow Financial! Hello {{userName}}, thank you for joining us. Visit {{dashboardUrl}} to get started.',
    variables: ['userName', 'dashboardUrl'],
    category: 'welcome',
  },
  {
    name: 'Investment Newsletter',
    subject: 'Weekly Investment Insights - {{weekOf}}',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF6B2C; margin-bottom: 10px;">Weekly Investment Insights</h1>
          <p style="color: #666; font-size: 14px;">Week of {{weekOf}}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Market Update</h2>
          <p style="color: #555; line-height: 1.6;">
            {{marketUpdate}}
          </p>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6B2C; margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 10px;">Investment Tip of the Week</h3>
          <p style="color: #555; line-height: 1.6; margin: 0;">
            {{investmentTip}}
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{readMoreUrl}}" style="background: #FF6B2C; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Read Full Analysis
          </a>
        </div>
      </div>
    `,
    textContent: 'Weekly Investment Insights for {{weekOf}}. Market Update: {{marketUpdate}}. Tip: {{investmentTip}}. Read more: {{readMoreUrl}}',
    variables: ['weekOf', 'marketUpdate', 'investmentTip', 'readMoreUrl'],
    category: 'marketing',
  },
  {
    name: 'Password Reset',
    subject: 'Reset Your IncomeGrow Financial Password',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF6B2C; margin-bottom: 10px;">Password Reset Request</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Hello {{userName}},</h2>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            We received a request to reset your password for your IncomeGrow Financial account.
          </p>
          <p style="color: #555; line-height: 1.6;">
            Click the button below to reset your password. This link will expire in 1 hour.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{resetUrl}}" style="background: #FF6B2C; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #856404; font-size: 14px; margin: 0;">
            <strong>Security Note:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
      </div>
    `,
    textContent: 'Password Reset Request for {{userName}}. Reset your password: {{resetUrl}}. Link expires in 1 hour.',
    variables: ['userName', 'resetUrl'],
    category: 'notification',
  },
  {
    name: 'New Feature Announcement',
    subject: 'Exciting New Features Now Available!',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF6B2C; margin-bottom: 10px;">🚀 New Features Available!</h1>
          <p style="color: #666; font-size: 16px;">Enhance your investment experience</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Hello {{userName}},</h2>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            We're excited to announce new features that will make your investment journey even better:
          </p>
          <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
            <li style="margin-bottom: 8px;">{{feature1}}</li>
            <li style="margin-bottom: 8px;">{{feature2}}</li>
            <li style="margin-bottom: 8px;">{{feature3}}</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{exploreUrl}}" style="background: #FF6B2C; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Explore New Features
          </a>
        </div>
      </div>
    `,
    textContent: 'New Features Available! Hello {{userName}}, check out: {{feature1}}, {{feature2}}, {{feature3}}. Explore: {{exploreUrl}}',
    variables: ['userName', 'feature1', 'feature2', 'feature3', 'exploreUrl'],
    category: 'announcement',
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Find an admin user to assign as creator
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      return res.status(400).json({ error: 'No admin user found' });
    }

    const createdTemplates = [];

    for (const templateData of defaultTemplates) {
      // Check if template already exists
      const existingTemplate = await EmailTemplate.findOne({ 
        name: templateData.name 
      });

      if (!existingTemplate) {
        const template = new EmailTemplate({
          ...templateData,
          createdBy: adminUser._id,
        });

        await template.save();
        createdTemplates.push(template.name);
      }
    }

    res.status(200).json({
      message: `Seeded ${createdTemplates.length} email templates`,
      createdTemplates,
    });
  } catch (error: any) {
    console.error('Seed templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}