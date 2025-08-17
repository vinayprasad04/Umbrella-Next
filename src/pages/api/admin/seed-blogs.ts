import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Blog from '../../../models/Blog';

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

// Blog data from the products/blogs page
const blogPosts = [
  {
    title: "10 Best Blue Chip Stocks to Invest in 2024",
    excerpt: "Discover the top blue chip stocks that offer stability and consistent returns for long-term investors.",
    author: "Rajesh Kumar",
    date: "Dec 15, 2024",
    category: "Investment",
    tags: ["Stocks", "Blue Chip", "Long-term"],
    content: `
      <h2>Introduction</h2>
      <p>Blue chip stocks represent some of the most stable and reliable investment opportunities in the market. These are shares of well-established companies with a long history of reliable performance and strong market presence.</p>
      
      <h2>What Are Blue Chip Stocks?</h2>
      <p>Blue chip stocks are shares of large, well-established companies that have operated for many years and have dependable earnings, often paying dividends to investors. They are typically market leaders in their industries.</p>
      
      <h2>Top 10 Blue Chip Stocks for 2024</h2>
      <ol>
        <li><strong>Reliance Industries Ltd (RIL)</strong> - India's largest private sector company</li>
        <li><strong>Tata Consultancy Services (TCS)</strong> - Leading IT services company</li>
        <li><strong>HDFC Bank</strong> - Premier private sector bank</li>
        <li><strong>Infosys</strong> - Global leader in technology services</li>
        <li><strong>Hindustan Unilever Ltd (HUL)</strong> - FMCG giant</li>
        <li><strong>ICICI Bank</strong> - Leading private sector bank</li>
        <li><strong>Bajaj Finance</strong> - Non-banking financial company</li>
        <li><strong>Asian Paints</strong> - Leading paint manufacturer</li>
        <li><strong>Kotak Mahindra Bank</strong> - Premier private bank</li>
        <li><strong>ITC Ltd</strong> - Diversified conglomerate</li>
      </ol>
      
      <h2>Investment Strategy</h2>
      <p>When investing in blue chip stocks, consider diversification across sectors, regular SIP investments, and a long-term perspective. These stocks typically offer stable returns with lower volatility compared to mid-cap or small-cap stocks.</p>
      
      <h2>Conclusion</h2>
      <p>Blue chip stocks should form the core of any long-term investment portfolio, providing stability and steady growth potential for investors seeking consistent returns.</p>
    `
  },
  {
    title: "Understanding SIP: A Complete Guide for Beginners",
    excerpt: "Learn everything about Systematic Investment Plans and how they can help you build wealth systematically.",
    author: "Priya Sharma", 
    date: "Dec 12, 2024",
    category: "Personal Finance",
    tags: ["SIP", "Mutual Funds", "Beginner"],
    content: `
      <h2>What is SIP?</h2>
      <p>A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest a fixed amount regularly (monthly, quarterly, etc.) instead of investing a lump sum amount.</p>
      
      <h2>How SIP Works</h2>
      <p>SIP works on the principle of rupee cost averaging. When markets are high, you buy fewer units, and when markets are low, you buy more units. This averages out your purchase cost over time.</p>
      
      <h2>Benefits of SIP</h2>
      <ul>
        <li><strong>Disciplined Investing:</strong> Develops a habit of regular investing</li>
        <li><strong>Rupee Cost Averaging:</strong> Reduces the impact of market volatility</li>
        <li><strong>Power of Compounding:</strong> Your returns generate further returns</li>
        <li><strong>Flexibility:</strong> Start with as low as ₹500 per month</li>
        <li><strong>Convenience:</strong> Automated investments</li>
      </ul>
      
      <h2>Types of SIP</h2>
      <ol>
        <li><strong>Regular SIP:</strong> Fixed amount invested regularly</li>
        <li><strong>Top-up SIP:</strong> Increase SIP amount periodically</li>
        <li><strong>Flexible SIP:</strong> Vary the investment amount</li>
        <li><strong>Perpetual SIP:</strong> No end date specified</li>
      </ol>
      
      <h2>How to Start SIP</h2>
      <p>Choose a mutual fund scheme, complete KYC, set up auto-debit, and start investing. It's that simple!</p>
      
      <h2>Best SIP Strategies</h2>
      <ul>
        <li>Start early to maximize compounding</li>
        <li>Choose funds based on your risk profile</li>
        <li>Review and rebalance periodically</li>
        <li>Stay invested for long term</li>
      </ul>
    `
  },
  {
    title: "Market Volatility: How to Protect Your Portfolio",
    excerpt: "Strategies to safeguard your investments during market downturns and volatile conditions.",
    author: "Amit Singh",
    date: "Dec 10, 2024", 
    category: "Investment",
    tags: ["Risk Management", "Portfolio", "Strategy"],
    content: `
      <h2>Understanding Market Volatility</h2>
      <p>Market volatility refers to the degree of variation in trading prices over time. It's a natural part of financial markets and can present both opportunities and risks for investors.</p>
      
      <h2>Causes of Market Volatility</h2>
      <ul>
        <li>Economic indicators and data releases</li>
        <li>Political events and policy changes</li>
        <li>Corporate earnings and announcements</li>
        <li>Global events and market sentiment</li>
        <li>Interest rate changes</li>
      </ul>
      
      <h2>Portfolio Protection Strategies</h2>
      
      <h3>1. Diversification</h3>
      <p>Spread your investments across different asset classes, sectors, and geographical regions to reduce overall portfolio risk.</p>
      
      <h3>2. Asset Allocation</h3>
      <p>Maintain an appropriate mix of stocks, bonds, and other assets based on your risk tolerance and investment timeline.</p>
      
      <h3>3. Dollar-Cost Averaging</h3>
      <p>Invest a fixed amount regularly regardless of market conditions to reduce the impact of volatility.</p>
      
      <h3>4. Defensive Stocks</h3>
      <p>Include stocks from defensive sectors like utilities, healthcare, and consumer staples that tend to be less volatile.</p>
      
      <h3>5. Emergency Fund</h3>
      <p>Maintain 6-12 months of expenses in liquid investments to avoid forced selling during market downturns.</p>
      
      <h2>Risk Management Tools</h2>
      <ul>
        <li><strong>Stop-Loss Orders:</strong> Automatically sell if price falls below certain level</li>
        <li><strong>Hedging:</strong> Use derivatives to protect against downside risk</li>
        <li><strong>Rebalancing:</strong> Periodically adjust portfolio allocation</li>
      </ul>
      
      <h2>Psychology of Volatility</h2>
      <p>Stay calm and avoid emotional decisions. Volatility often creates buying opportunities for long-term investors.</p>
    `
  },
  {
    title: "RBI Policy Impact on Banking Stocks",
    excerpt: "Analysis of how recent RBI policy changes are affecting banking sector stocks and future outlook.",
    author: "Dr. Neha Gupta",
    date: "Dec 8, 2024",
    category: "Investment", 
    tags: ["Banking", "RBI", "Policy"],
    content: `
      <h2>Recent RBI Policy Changes</h2>
      <p>The Reserve Bank of India's monetary policy decisions significantly impact banking sector performance. Recent policy changes include repo rate adjustments, regulatory guidelines, and digital payment initiatives.</p>
      
      <h2>Key Policy Impacts</h2>
      
      <h3>Interest Rate Changes</h3>
      <p>Changes in repo rates directly affect banks' lending and deposit rates, impacting their net interest margins (NIM) and profitability.</p>
      
      <h3>Regulatory Guidelines</h3>
      <ul>
        <li>Basel III implementation</li>
        <li>Risk weight changes</li>
        <li>Provisioning norms</li>
        <li>Governance standards</li>
      </ul>
      
      <h3>Digital Payment Push</h3>
      <p>RBI's focus on digital payments and fintech regulation creates both opportunities and challenges for traditional banks.</p>
      
      <h2>Sector Analysis</h2>
      
      <h3>Public Sector Banks</h3>
      <p>Government-owned banks often benefit from policy support but face challenges in efficiency and profitability.</p>
      
      <h3>Private Sector Banks</h3>
      <p>Private banks typically adapt faster to regulatory changes and maintain better asset quality.</p>
      
      <h3>Regional Banks</h3>
      <p>Smaller regional banks may face compliance challenges but can benefit from focused local operations.</p>
      
      <h2>Investment Outlook</h2>
      <ul>
        <li>Focus on banks with strong digital capabilities</li>
        <li>Consider asset quality and provisioning levels</li>
        <li>Monitor regulatory compliance costs</li>
        <li>Evaluate management quality and governance</li>
      </ul>
      
      <h2>Top Banking Stocks to Watch</h2>
      <ol>
        <li>HDFC Bank - Market leader with strong digital presence</li>
        <li>ICICI Bank - Well-diversified with good growth prospects</li>
        <li>Kotak Mahindra Bank - Premium positioning and quality assets</li>
        <li>Axis Bank - Turnaround story with improving metrics</li>
      </ol>
    `
  },
  {
    title: "Tax-Saving Investments: ELSS vs ULIP vs PPF",
    excerpt: "Complete comparison of tax-saving investment options to help you make the right choice.",
    author: "Vikash Jain",
    date: "Dec 5, 2024",
    category: "Tax Planning",
    tags: ["Tax Saving", "ELSS", "ULIP", "PPF"],
    content: `
      <h2>Understanding Section 80C</h2>
      <p>Section 80C of the Income Tax Act allows deductions up to ₹1.5 lakh per year from taxable income through qualifying investments and expenditures.</p>
      
      <h2>ELSS (Equity Linked Savings Scheme)</h2>
      
      <h3>Features:</h3>
      <ul>
        <li>Mutual fund scheme investing primarily in equity</li>
        <li>3-year lock-in period (shortest among 80C options)</li>
        <li>Potential for higher returns</li>
        <li>Market-linked returns</li>
      </ul>
      
      <h3>Pros:</h3>
      <ul>
        <li>Highest return potential</li>
        <li>Shortest lock-in period</li>
        <li>Professional fund management</li>
        <li>SIP option available</li>
      </ul>
      
      <h3>Cons:</h3>
      <ul>
        <li>Market risk</li>
        <li>No guaranteed returns</li>
        <li>Exit load if redeemed before 1 year</li>
      </ul>
      
      <h2>ULIP (Unit Linked Insurance Plan)</h2>
      
      <h3>Features:</h3>
      <ul>
        <li>Combination of investment and insurance</li>
        <li>5-year lock-in period</li>
        <li>Life insurance coverage</li>
        <li>Fund switching options</li>
      </ul>
      
      <h3>Pros:</h3>
      <ul>
        <li>Dual benefit of investment and insurance</li>
        <li>Tax benefits on premiums and maturity</li>
        <li>Flexibility to switch funds</li>
      </ul>
      
      <h3>Cons:</h3>
      <ul>
        <li>Higher charges and fees</li>
        <li>Complex product structure</li>
        <li>Lower returns compared to pure equity</li>
      </ul>
      
      <h2>PPF (Public Provident Fund)</h2>
      
      <h3>Features:</h3>
      <ul>
        <li>15-year lock-in period</li>
        <li>Government-backed scheme</li>
        <li>Fixed interest rate (currently 7.1%)</li>
        <li>EEE tax benefit (Exempt-Exempt-Exempt)</li>
      </ul>
      
      <h3>Pros:</h3>
      <ul>
        <li>Guaranteed returns</li>
        <li>No risk</li>
        <li>Triple tax benefit</li>
        <li>Partial withdrawal after 7 years</li>
      </ul>
      
      <h3>Cons:</h3>
      <ul>
        <li>Long lock-in period</li>
        <li>Lower returns compared to equity</li>
        <li>Investment limit of ₹1.5 lakh per year</li>
      </ul>
      
      <h2>Comparison Table</h2>
      <table>
        <tr>
          <th>Parameter</th>
          <th>ELSS</th>
          <th>ULIP</th>
          <th>PPF</th>
        </tr>
        <tr>
          <td>Lock-in Period</td>
          <td>3 years</td>
          <td>5 years</td>
          <td>15 years</td>
        </tr>
        <tr>
          <td>Risk Level</td>
          <td>High</td>
          <td>Medium</td>
          <td>Low</td>
        </tr>
        <tr>
          <td>Return Potential</td>
          <td>12-15%</td>
          <td>8-12%</td>
          <td>7-8%</td>
        </tr>
        <tr>
          <td>Investment Limit</td>
          <td>₹1.5 lakh</td>
          <td>₹1.5 lakh</td>
          <td>₹1.5 lakh</td>
        </tr>
      </table>
      
      <h2>Which One to Choose?</h2>
      <ul>
        <li><strong>For High Returns:</strong> ELSS</li>
        <li><strong>For Insurance + Investment:</strong> ULIP</li>
        <li><strong>For Safety:</strong> PPF</li>
        <li><strong>For Flexibility:</strong> ELSS</li>
      </ul>
    `
  },
  {
    title: "Crypto Investment: Risks and Opportunities",
    excerpt: "Understanding the cryptocurrency market and how to approach crypto investments safely.",
    author: "Arjun Patel",
    date: "Dec 3, 2024",
    category: "Investment",
    tags: ["Cryptocurrency", "Bitcoin", "Alternative Investment"],
    content: `
      <h2>Introduction to Cryptocurrency</h2>
      <p>Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit. Bitcoin, launched in 2009, was the first successful cryptocurrency.</p>
      
      <h2>Popular Cryptocurrencies</h2>
      <ul>
        <li><strong>Bitcoin (BTC):</strong> The first and largest cryptocurrency</li>
        <li><strong>Ethereum (ETH):</strong> Platform for smart contracts and DApps</li>
        <li><strong>Binance Coin (BNB):</strong> Native token of Binance exchange</li>
        <li><strong>Cardano (ADA):</strong> Sustainable blockchain platform</li>
        <li><strong>Solana (SOL):</strong> High-speed blockchain for DeFi</li>
      </ul>
      
      <h2>Investment Opportunities</h2>
      
      <h3>High Return Potential</h3>
      <p>Cryptocurrencies have shown extraordinary returns over short periods, though with significant volatility.</p>
      
      <h3>Portfolio Diversification</h3>
      <p>Crypto can serve as an alternative asset class, providing diversification benefits.</p>
      
      <h3>Technological Innovation</h3>
      <p>Investing in crypto means participating in blockchain technology revolution.</p>
      
      <h3>24/7 Trading</h3>
      <p>Unlike traditional markets, crypto markets operate round the clock.</p>
      
      <h2>Investment Risks</h2>
      
      <h3>Extreme Volatility</h3>
      <p>Crypto prices can fluctuate dramatically within short periods, leading to significant gains or losses.</p>
      
      <h3>Regulatory Uncertainty</h3>
      <p>Government regulations can significantly impact crypto values and accessibility.</p>
      
      <h3>Security Risks</h3>
      <p>Exchange hacks, wallet security issues, and lost private keys pose security threats.</p>
      
      <h3>Market Manipulation</h3>
      <p>Smaller market cap makes crypto susceptible to price manipulation.</p>
      
      <h3>Technology Risks</h3>
      <p>Technical glitches, hard forks, and protocol changes can affect investments.</p>
      
      <h2>Safe Investment Strategies</h2>
      
      <h3>1. Start Small</h3>
      <p>Invest only what you can afford to lose. Limit crypto to 5-10% of your portfolio.</p>
      
      <h3>2. Dollar-Cost Averaging</h3>
      <p>Invest fixed amounts regularly to reduce impact of volatility.</p>
      
      <h3>3. Research Thoroughly</h3>
      <p>Understand the technology, use cases, and team behind each cryptocurrency.</p>
      
      <h3>4. Use Reputable Exchanges</h3>
      <p>Choose well-established exchanges with strong security measures.</p>
      
      <h3>5. Secure Storage</h3>
      <p>Use hardware wallets for long-term storage and enable two-factor authentication.</p>
      
      <h2>Regulatory Landscape in India</h2>
      <p>India has imposed 30% tax on crypto gains and 1% TDS on transactions. While not banned, the regulatory environment remains uncertain.</p>
      
      <h2>Conclusion</h2>
      <p>Cryptocurrency offers exciting opportunities but comes with significant risks. Approach with caution, thorough research, and proper risk management.</p>
    `
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
    
    // Check admin access
    const user = await checkAdminAccess(req);

    // Check if blogs already exist
    const existingBlogs = await Blog.countDocuments();
    if (existingBlogs > 0) {
      return res.status(400).json({ error: 'Blogs already exist in database' });
    }

    // Create blogs
    const createdBlogs = [];
    
    for (const post of blogPosts) {
      const slug = post.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const blog = new Blog({
        title: post.title,
        slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        status: 'live', // Make them live since they were displayed on the frontend
        commentsEnabled: true,
        metaDescription: post.excerpt,
        featuredImage: '', // No featured images in original data
        author: user._id,
        viewCount: 0
      });

      const savedBlog = await blog.save();
      createdBlogs.push(savedBlog);
    }

    return res.status(201).json({
      message: `Successfully created ${createdBlogs.length} blog posts`,
      blogs: createdBlogs.length
    });

  } catch (error: any) {
    console.error('Seed blogs error:', error);
    
    if (error.message === 'No token provided' || error.message === 'Admin access required' || error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}