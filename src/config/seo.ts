// SEO Configuration for IncomeGrow
// Website: https://incomegrow.in

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'IncomeGrow - Smart Investment & Financial Planning Platform',
  description: 'IncomeGrow offers comprehensive financial planning tools, investment calculators, tax planning guides, and wealth creation strategies. Make informed investment decisions with expert insights.',
  keywords: 'investment planning, financial planning, SIP calculator, tax planning, wealth creation, mutual funds, stock market, retirement planning, goal planning, income tax calculator',
  ogImage: '/og-image.png',
};

export const seoConfig: Record<string, SEOConfig> = {
  // Home Page
  '/': {
    title: 'IncomeGrow - Smart Investment & Financial Planning Platform',
    description: 'IncomeGrow helps you achieve your financial goals with investment calculators, tax planning tools, wealth creation strategies, and expert financial insights. Start your investment journey today!',
    keywords: 'IncomeGrow, investment platform, financial planning, SIP calculator, mutual funds, stocks, retirement planning, wealth creation, tax planning, goal based investing',
    canonical: 'https://incomegrow.in/',
  },

  // Dashboard
  '/dashboard': {
    title: 'Dashboard - IncomeGrow',
    description: 'Access your IncomeGrow dashboard to manage investments, track financial goals, use calculators, and get personalized financial insights.',
    keywords: 'investment dashboard, portfolio tracking, financial tools, goal tracking, investment management',
    canonical: 'https://incomegrow.in/dashboard',
  },

  // About Page
  '/about': {
    title: 'About Us - IncomeGrow | Your Financial Planning Partner',
    description: 'Learn about IncomeGrow, India\'s trusted financial planning and investment platform. Discover our mission to empower investors with smart tools and expert guidance.',
    keywords: 'about IncomeGrow, financial planning company, investment platform India, financial advisors, wealth management',
    canonical: 'https://incomegrow.in/about',
  },

  // Recipe (Financial Health)
  '/recipe': {
    title: 'Recipe - Financial Health Analysis | IncomeGrow',
    description: 'Check your financial health score and get personalized recommendations for stocks and mutual funds. Analyze your spending, loans, and investments for better wealth management.',
    keywords: 'financial health score, investment recommendations, stock picking, mutual fund selection, wealth analysis, financial planning',
    canonical: 'https://incomegrow.in/recipe',
  },

  '/recipe/wealth-creation': {
    title: 'Wealth Creation Strategies | IncomeGrow Recipe',
    description: 'Discover proven wealth creation strategies and investment opportunities. Learn how to build long-term wealth through smart investing and financial planning.',
    keywords: 'wealth creation, investment strategies, long term investing, wealth building, financial growth, passive income',
    canonical: 'https://incomegrow.in/recipe/wealth-creation',
  },

  // Calculators
  '/calculation/sip': {
    title: 'SIP Calculator - Calculate SIP Returns | IncomeGrow',
    description: 'Free SIP calculator to estimate returns on your Systematic Investment Plan. Calculate monthly SIP amount, expected returns, and plan your mutual fund investments effectively.',
    keywords: 'SIP calculator, systematic investment plan, SIP returns calculator, mutual fund SIP, monthly investment calculator, SIP planning',
    canonical: 'https://incomegrow.in/calculation/sip',
  },

  '/calculation/lumpsum': {
    title: 'Lumpsum Calculator - Calculate Lumpsum Investment Returns | IncomeGrow',
    description: 'Calculate returns on lumpsum investments with our free lumpsum calculator. Plan your one-time mutual fund investments and estimate future value.',
    keywords: 'lumpsum calculator, one time investment, lumpsum returns, mutual fund lumpsum, investment calculator, lumpsum planning',
    canonical: 'https://incomegrow.in/calculation/lumpsum',
  },

  '/calculation/goal-planner': {
    title: 'Goal Planner Calculator - Plan Your Financial Goals | IncomeGrow',
    description: 'Plan and achieve your financial goals with our goal planner calculator. Calculate monthly investments needed for education, retirement, home buying, and more.',
    keywords: 'goal planning, financial goal calculator, retirement planning, education planning, goal based investing, financial objectives',
    canonical: 'https://incomegrow.in/calculation/goal-planner',
  },

  '/calculation/tax/index': {
    title: 'Income Tax Calculator 2024-25 - Calculate Tax Online | IncomeGrow',
    description: 'Free income tax calculator for FY 2024-25. Compare old vs new tax regime, calculate tax liability, deductions under 80C, 80D, and get tax-saving tips.',
    keywords: 'income tax calculator, tax calculator 2024-25, old vs new tax regime, tax planning, 80C deductions, tax saving, India tax calculator',
    canonical: 'https://incomegrow.in/calculation/tax',
  },

  '/calculation/eim': {
    title: 'Emergency Fund Calculator - Calculate Emergency Savings | IncomeGrow',
    description: 'Calculate your ideal emergency fund amount based on monthly expenses and financial obligations. Secure your financial future with adequate emergency savings.',
    keywords: 'emergency fund calculator, emergency savings, financial security, contingency fund, emergency money, financial planning',
    canonical: 'https://incomegrow.in/calculation/eim',
  },

  '/calculation/fd-rd-pf-nps-ssy': {
    title: 'FD, RD, PPF, NPS, SSY Calculator - Fixed Income Calculators | IncomeGrow',
    description: 'Calculate returns on Fixed Deposit, Recurring Deposit, PPF, NPS, and Sukanya Samriddhi Yojana. Compare fixed income investments and plan your savings.',
    keywords: 'FD calculator, RD calculator, PPF calculator, NPS calculator, SSY calculator, fixed deposit, recurring deposit, public provident fund',
    canonical: 'https://incomegrow.in/calculation/fd-rd-pf-nps-ssy',
  },

  '/calculation/gratuity': {
    title: 'Gratuity Calculator - Calculate Gratuity Amount | IncomeGrow',
    description: 'Calculate your gratuity amount based on salary and years of service. Understand gratuity rules and estimate retirement benefits.',
    keywords: 'gratuity calculator, gratuity calculation, retirement benefits, employee gratuity, gratuity rules, service benefits',
    canonical: 'https://incomegrow.in/calculation/gratuity',
  },

  // Tax Planning
  '/tax-planning': {
    title: 'Tax Planning Guide - Save Income Tax | IncomeGrow',
    description: 'Comprehensive tax planning guide for India. Learn about Section 80C, 80D, NPS benefits, deductions, and strategies to minimize tax liability legally.',
    keywords: 'tax planning, income tax saving, 80C deductions, 80D benefits, tax saving investments, tax optimization, India tax guide',
    canonical: 'https://incomegrow.in/tax-planning',
  },

  '/tax-planning/section-80c': {
    title: 'Section 80C - Tax Deductions up to ₹1.5 Lakh | IncomeGrow',
    description: 'Complete guide to Section 80C tax deductions. Learn about eligible investments like PPF, ELSS, NSC, life insurance, and save up to ₹46,800 in taxes.',
    keywords: 'section 80C, tax deduction, PPF, ELSS, NSC, life insurance premium, tax saving, income tax deduction',
    canonical: 'https://incomegrow.in/tax-planning/section-80c',
  },

  '/tax-planning/health-insurance-80d': {
    title: 'Section 80D - Health Insurance Tax Benefits | IncomeGrow',
    description: 'Maximize tax savings with Section 80D. Learn about health insurance premium deductions, preventive health checkup benefits, and save up to ₹75,000.',
    keywords: 'section 80D, health insurance tax benefit, medical insurance deduction, preventive health checkup, tax saving health insurance',
    canonical: 'https://incomegrow.in/tax-planning/health-insurance-80d',
  },

  '/tax-planning/nps-additional-80ccd1b': {
    title: 'Section 80CCD(1B) - Additional ₹50,000 NPS Tax Deduction | IncomeGrow',
    description: 'Get additional ₹50,000 tax deduction under Section 80CCD(1B) by investing in NPS. Learn about National Pension System benefits and tax savings.',
    keywords: 'section 80CCD1B, NPS tax benefit, national pension system, additional deduction, retirement planning, NPS investment',
    canonical: 'https://incomegrow.in/tax-planning/nps-additional-80ccd1b',
  },

  '/tax-planning/home-loan-benefits': {
    title: 'Home Loan Tax Benefits - Section 80C & 24(b) | IncomeGrow',
    description: 'Complete guide to home loan tax benefits. Learn about principal repayment (80C), interest deduction (24b), and save maximum tax on your home loan.',
    keywords: 'home loan tax benefit, section 80C home loan, section 24 interest deduction, housing loan tax saving, home loan benefits',
    canonical: 'https://incomegrow.in/tax-planning/home-loan-benefits',
  },

  '/tax-planning/education-loan-80e': {
    title: 'Section 80E - Education Loan Interest Deduction | IncomeGrow',
    description: 'Get unlimited tax deduction on education loan interest under Section 80E. Learn about eligibility, benefits, and how to claim this deduction.',
    keywords: 'section 80E, education loan tax benefit, student loan deduction, higher education loan, tax saving education',
    canonical: 'https://incomegrow.in/tax-planning/education-loan-80e',
  },

  '/tax-planning/donations-80g': {
    title: 'Section 80G - Tax Deduction on Donations & Charity | IncomeGrow',
    description: 'Save tax through donations under Section 80G. Learn about eligible institutions, 50% and 100% deduction rules, and charitable giving benefits.',
    keywords: 'section 80G, donation tax benefit, charity tax deduction, NGO donation, tax saving donation, charitable giving',
    canonical: 'https://incomegrow.in/tax-planning/donations-80g',
  },

  '/tax-planning/section-87a-rebates': {
    title: 'Section 87A - Tax Rebate up to ₹12,500 | IncomeGrow',
    description: 'Understand Section 87A tax rebate for individuals with income up to ₹5 lakh. Learn eligibility criteria and how to claim this rebate.',
    keywords: 'section 87A, tax rebate, income tax rebate, tax exemption, middle class tax relief, tax benefit',
    canonical: 'https://incomegrow.in/tax-planning/section-87a-rebates',
  },

  '/tax-planning/old-vs-new-regime': {
    title: 'Old vs New Tax Regime Comparison 2024-25 | IncomeGrow',
    description: 'Compare old and new income tax regime for FY 2024-25. Calculate which regime is better for you based on deductions, exemptions, and tax slabs.',
    keywords: 'old vs new tax regime, tax regime comparison, income tax 2024-25, tax calculation, which regime is better, tax planning',
    canonical: 'https://incomegrow.in/tax-planning/old-vs-new-regime',
  },

  '/tax-planning/capital-gains-planning': {
    title: 'Capital Gains Tax Planning - LTCG & STCG Guide | IncomeGrow',
    description: 'Complete guide to capital gains tax planning. Learn about LTCG, STCG, exemptions under 54, 54F, and strategies to minimize tax on investments.',
    keywords: 'capital gains tax, LTCG, STCG, section 54, section 54F, capital gains exemption, investment tax planning',
    canonical: 'https://incomegrow.in/tax-planning/capital-gains-planning',
  },

  '/tax-planning/salary-restructuring': {
    title: 'Salary Restructuring for Tax Saving | IncomeGrow',
    description: 'Optimize your salary structure to save tax legally. Learn about HRA, LTA, meal allowance, and other components for maximum tax efficiency.',
    keywords: 'salary restructuring, tax optimization, HRA benefit, LTA exemption, salary components, tax efficient salary',
    canonical: 'https://incomegrow.in/tax-planning/salary-restructuring',
  },

  '/tax-planning/itr-filing-guide': {
    title: 'ITR Filing Guide - How to File Income Tax Return | IncomeGrow',
    description: 'Step-by-step guide to file Income Tax Return online. Learn about ITR forms, due dates, documents required, and e-filing process.',
    keywords: 'ITR filing, income tax return, how to file ITR, ITR forms, e-filing, tax return filing, ITR guide',
    canonical: 'https://incomegrow.in/tax-planning/itr-filing-guide',
  },

  // Products
  '/products': {
    title: 'Products - Investment Tools & Resources | IncomeGrow',
    description: 'Explore IncomeGrow products including Quest (investment courses), Ticker (stock screener), Select (financial tools comparison), and Insider (business articles).',
    keywords: 'investment products, stock screener, investment courses, financial tools, business insights, market research',
    canonical: 'https://incomegrow.in/products',
  },

  '/products/goal': {
    title: 'Goal Based Investing - Achieve Financial Goals | IncomeGrow',
    description: 'Plan and achieve your financial goals with goal-based investing strategies. Set targets for education, retirement, home, and track your progress.',
    keywords: 'goal based investing, financial goals, retirement planning, education fund, goal setting, investment planning',
    canonical: 'https://incomegrow.in/products/goal',
  },

  '/products/shares-research': {
    title: 'Shares Research - Stock Market Analysis & Insights | IncomeGrow',
    description: 'Access comprehensive stock market research, analysis, and insights. Make informed investment decisions with expert stock recommendations.',
    keywords: 'stock research, share market analysis, stock recommendations, equity research, investment insights, market analysis',
    canonical: 'https://incomegrow.in/products/shares-research',
  },

  '/products/blogs': {
    title: 'Investment Blogs - Financial Insights & Tips | IncomeGrow',
    description: 'Read expert blogs on investing, personal finance, stock market, mutual funds, tax planning, and wealth creation. Stay updated with latest financial trends.',
    keywords: 'investment blogs, finance articles, stock market insights, mutual fund tips, personal finance, financial education',
    canonical: 'https://incomegrow.in/products/blogs',
  },

  '/products/course': {
    title: 'Investment Courses - Learn Smart Investing | IncomeGrow Quest',
    description: 'Enroll in investment courses to master stock market, mutual funds, financial planning, and wealth creation. Learn from experts with practical insights.',
    keywords: 'investment courses, stock market course, mutual fund learning, financial education, investment training, online finance courses',
    canonical: 'https://incomegrow.in/products/course',
  },

  '/products/brokers-knowledge': {
    title: 'Broker Knowledge - Compare Stockbrokers | IncomeGrow',
    description: 'Compare stockbrokers, trading platforms, brokerage charges, and features. Choose the best broker for your investment needs.',
    keywords: 'stockbroker comparison, broker review, trading platforms, brokerage charges, discount brokers, best stockbroker India',
    canonical: 'https://incomegrow.in/products/brokers-knowledge',
  },

  // Support
  '/support/faq': {
    title: 'FAQ - Frequently Asked Questions | IncomeGrow',
    description: 'Find answers to frequently asked questions about IncomeGrow, investments, calculators, tax planning, and our services.',
    keywords: 'FAQ, frequently asked questions, help center, support, investment queries, financial help',
    canonical: 'https://incomegrow.in/support/faq',
  },

  '/support/contact-us': {
    title: 'Contact Us - Get in Touch | IncomeGrow',
    description: 'Contact IncomeGrow for investment guidance, platform support, partnership opportunities, or any queries. We\'re here to help you grow your wealth.',
    keywords: 'contact IncomeGrow, customer support, get in touch, investment help, contact us, support email',
    canonical: 'https://incomegrow.in/support/contact-us',
  },

  // Auth Pages
  '/login': {
    title: 'Login - Access Your Account | IncomeGrow',
    description: 'Login to your IncomeGrow account to access investment tools, track goals, manage portfolio, and get personalized financial insights.',
    keywords: 'login, sign in, user account, member login, IncomeGrow login',
    canonical: 'https://incomegrow.in/login',
  },

  '/signup': {
    title: 'Sign Up - Create Free Account | IncomeGrow',
    description: 'Create your free IncomeGrow account and start your investment journey. Access calculators, goal planning, tax tools, and expert insights.',
    keywords: 'sign up, create account, register, new user, join IncomeGrow, free account',
    canonical: 'https://incomegrow.in/signup',
  },

  '/forgot-password': {
    title: 'Forgot Password - Reset Your Password | IncomeGrow',
    description: 'Reset your IncomeGrow account password. Enter your email to receive password reset instructions.',
    keywords: 'forgot password, reset password, account recovery, password help',
    canonical: 'https://incomegrow.in/forgot-password',
  },

  '/profile': {
    title: 'My Profile - Manage Your Account | IncomeGrow',
    description: 'Manage your IncomeGrow profile, update personal information, view account activity, and customize your preferences.',
    keywords: 'user profile, account settings, personal information, profile management',
    canonical: 'https://incomegrow.in/profile',
  },

  // Legal Pages
  '/privacy-policy': {
    title: 'Privacy Policy - IncomeGrow',
    description: 'Read IncomeGrow\'s privacy policy to understand how we collect, use, and protect your personal information and data.',
    keywords: 'privacy policy, data protection, user privacy, data security, personal information',
    canonical: 'https://incomegrow.in/privacy-policy',
  },

  '/terms-of-service': {
    title: 'Terms of Service - IncomeGrow',
    description: 'Read IncomeGrow\'s terms of service to understand the rules and regulations governing the use of our platform and services.',
    keywords: 'terms of service, user agreement, terms and conditions, service terms, legal terms',
    canonical: 'https://incomegrow.in/terms-of-service',
  },

  '/cookie-policy': {
    title: 'Cookie Policy - IncomeGrow',
    description: 'Learn about IncomeGrow\'s cookie policy and how we use cookies to improve your experience on our platform.',
    keywords: 'cookie policy, cookies, website cookies, user tracking, cookie consent',
    canonical: 'https://incomegrow.in/cookie-policy',
  },

  // Other Pages
  '/testimonials': {
    title: 'Testimonials - What Our Users Say | IncomeGrow',
    description: 'Read testimonials and success stories from IncomeGrow users. Learn how our platform has helped investors achieve their financial goals.',
    keywords: 'testimonials, user reviews, success stories, customer feedback, user experience',
    canonical: 'https://incomegrow.in/testimonials',
  },

  '/become-partner': {
    title: 'Become a Partner - Partnership Opportunities | IncomeGrow',
    description: 'Explore partnership opportunities with IncomeGrow. Join us as a financial advisor, distributor, or business partner and grow together.',
    keywords: 'partnership, become partner, business opportunity, collaboration, financial advisor partnership',
    canonical: 'https://incomegrow.in/become-partner',
  },
};

// Helper function to get SEO config for a page
export function getSEOConfig(path: string): SEOConfig {
  return seoConfig[path] || defaultSEO;
}

// Helper function to generate full title
export function getFullTitle(title: string): string {
  return title;
}

// Helper function to generate meta tags
export function generateMetaTags(config: SEOConfig) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      image: config.ogImage || defaultSEO.ogImage,
      url: config.canonical,
    },
    canonical: config.canonical,
  };
}
