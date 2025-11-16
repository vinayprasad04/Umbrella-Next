interface FAQ {
  question: string;
  answer: string;
}

// SIP Calculator FAQs
export const sipFAQs: FAQ[] = [
  {
    question: "What is SIP (Systematic Investment Plan)?",
    answer: "SIP is a method of investing a fixed amount regularly in mutual funds. It allows you to invest small amounts monthly instead of a lump sum, helping build wealth systematically through rupee cost averaging and power of compounding."
  },
  {
    question: "What returns can I expect from SIP?",
    answer: "SIP returns are market-linked and vary based on the mutual fund scheme. Historically, equity mutual funds have given 12-15% returns, while debt funds give 7-9%. Past performance doesn't guarantee future returns."
  },
  {
    question: "What is the minimum amount for SIP?",
    answer: "Most mutual funds allow SIP starting from ₹500 per month. Some funds even allow SIPs as low as ₹100. There's no maximum limit - you can invest any amount based on your financial goals."
  },
  {
    question: "Can I stop or pause my SIP?",
    answer: "Yes, you can stop, pause, or modify your SIP anytime without penalty. However, staying invested for the long term (5+ years) helps maximize returns through market cycles."
  },
  {
    question: "How is SIP different from lump sum investment?",
    answer: "SIP involves regular monthly investments, while lump sum is a one-time investment. SIP reduces market timing risk through rupee cost averaging and is better for salaried individuals."
  },
  {
    question: "Are SIP returns taxable?",
    answer: "Yes, SIP returns are taxable. Equity funds: Less than 1 year = 15% STCG, More than 1 year = 10% LTCG above ₹1 lakh. Debt funds: taxed as per income slab."
  }
];

// Lumpsum Calculator FAQs
export const lumpsumFAQs: FAQ[] = [
  {
    question: "What is lumpsum investment?",
    answer: "Lumpsum investment is a one-time investment of a large amount in mutual funds or other instruments. Unlike SIP, you invest the entire amount at once rather than spreading it over months."
  },
  {
    question: "When should I invest lump sum?",
    answer: "Lumpsum investment works best when: 1) You have a large amount available (bonus, inheritance), 2) Markets are at low levels, 3) You have long investment horizon (5+ years), 4) You're comfortable with market volatility."
  },
  {
    question: "What returns can I expect from lumpsum?",
    answer: "Lumpsum returns depend on market performance and fund selection. Equity funds historically give 12-15%, while debt funds give 7-9%. Returns can be higher than SIP if you time the market well."
  },
  {
    question: "Is lumpsum better than SIP?",
    answer: "Neither is universally better. Lumpsum can give higher returns if market timing is right, but carries higher risk. SIP is safer with rupee cost averaging. Ideally, use lumpsum for large amounts and SIP for regular savings."
  },
  {
    question: "Can I withdraw my lumpsum investment anytime?",
    answer: "Yes, most mutual funds allow withdrawal anytime except ELSS (3-year lock-in). However, staying invested longer helps maximize returns and reduces exit load charges."
  },
  {
    question: "How is lumpsum taxed?",
    answer: "Same as SIP - Equity funds: Less than 1 year = 15% STCG, More than 1 year = 10% LTCG above ₹1 lakh exemption. Debt funds: taxed as per income tax slab."
  }
];

// Retirement Calculator FAQs
export const retirementFAQs: FAQ[] = [
  {
    question: "When should I start retirement planning?",
    answer: "The earlier, the better! Ideally start in your 20s or 30s. Starting early gives you the power of compounding and reduces monthly savings burden. Even if you're in your 40s or 50s, it's never too late to start."
  },
  {
    question: "How much money do I need for retirement?",
    answer: "A general rule is 25-30 times your annual expenses. For example, if you spend ₹50,000/month (₹6 lakh/year), you need ₹1.5-1.8 crore. Consider inflation, healthcare costs, and lifestyle needs."
  },
  {
    question: "What are the best retirement investment options?",
    answer: "1) EPF/PPF for guaranteed returns, 2) NPS for tax benefits, 3) Equity mutual funds for growth, 4) Pension plans for regular income, 5) Real estate for rental income. Diversify based on age and risk appetite."
  },
  {
    question: "How do I calculate my retirement corpus?",
    answer: "Formula: Current monthly expenses × 12 × 30 × Inflation factor. Then calculate how much to save monthly using expected return rate and years to retirement. Our calculator does this automatically."
  },
  {
    question: "What is the 4% withdrawal rule?",
    answer: "This rule suggests withdrawing 4% of your retirement corpus annually to ensure funds last 30 years. For example, ₹1 crore corpus allows ₹4 lakh withdrawal per year."
  },
  {
    question: "Should I invest in NPS for retirement?",
    answer: "Yes, NPS is excellent for retirement with: 1) Additional ₹50,000 tax benefit, 2) Market-linked returns (8-12%), 3) Low cost, 4) Guaranteed monthly pension. Ideal for salaried employees."
  }
];

// Tax Calculator FAQs
export const taxFAQs: FAQ[] = [
  {
    question: "What is the difference between Old and New tax regime?",
    answer: "Old regime has more deductions (80C, 80D, HRA, etc.) but higher tax rates. New regime has lower rates but limited deductions. New regime suits those with fewer investments/deductions."
  },
  {
    question: "Which tax regime should I choose?",
    answer: "Choose Old regime if: You invest in 80C (₹1.5L), have home loan, claim HRA. Choose New regime if: You don't invest much, want simplicity, lower tax rates. Use our calculator to compare both."
  },
  {
    question: "What deductions are available under Section 80C?",
    answer: "EPF, PPF, ELSS, Life Insurance Premium, Home Loan Principal, Tuition Fees, NSC, SSY, Tax Saver FD. Maximum deduction: ₹1.5 lakh per year. Available only in old tax regime."
  },
  {
    question: "How to save maximum tax legally?",
    answer: "1) Max out 80C (₹1.5L), 2) NPS additional 80CCD(1B) (₹50K), 3) Health insurance 80D (₹25K-₹100K), 4) HRA exemption, 5) Home loan interest (₹2L), 6) Donations 80G."
  },
  {
    question: "What is Standard Deduction?",
    answer: "Standard deduction of ₹50,000 is available to salaried employees in both old and new tax regimes. It's automatically deducted from gross salary before tax calculation. No proof needed."
  },
  {
    question: "When should I file ITR?",
    answer: "ITR filing deadline is July 31st for most individuals. Late filing attracts penalty up to ₹5,000. File ITR even if no tax liability to: claim refunds, carry forward losses, get visa, loan approvals."
  }
];

// Gratuity Calculator FAQs
export const gratuityFAQs: FAQ[] = [
  {
    question: "What is gratuity?",
    answer: "Gratuity is a lump sum amount paid by employer to employee as appreciation for services rendered. It becomes payable upon retirement, resignation (after 5 years), death, or disability."
  },
  {
    question: "Who is eligible for gratuity?",
    answer: "You're eligible if: 1) Completed 5 years of continuous service, 2) Company has 10+ employees, 3) Retiring, resigning, or incapacitated. Death or disability makes gratuity payable immediately without 5-year condition."
  },
  {
    question: "How is gratuity calculated?",
    answer: "Formula: (Last drawn salary × 15 × Years of service) / 26. Last drawn salary = Basic + DA. Maximum gratuity is ₹20 lakh. For example: ₹50,000 salary × 15 × 10 years / 26 = ₹2.88 lakh."
  },
  {
    question: "Is gratuity taxable?",
    answer: "For government employees: Fully tax-exempt. For private sector (covered under Act): Exempt up to ₹20 lakh. For others: Minimum of (₹20L, actual gratuity, calculated amount) is exempt."
  },
  {
    question: "When is gratuity paid?",
    answer: "Gratuity must be paid within 30 days of becoming eligible (retirement, resignation, death). If delayed, employer must pay it with interest. Unclaimed gratuity attracts compound interest."
  },
  {
    question: "Can gratuity be denied?",
    answer: "Gratuity can be forfeited if: 1) Employee terminated for misconduct causing financial loss, 2) Moral turpitude offense. Partial forfeiture for damage/loss caused. Cannot be denied for ordinary resignation."
  }
];

// Goal Planner FAQs
export const goalPlannerFAQs: FAQ[] = [
  {
    question: "Why is financial goal planning important?",
    answer: "Goal planning helps you: 1) Define clear financial targets, 2) Calculate exact amount needed, 3) Determine monthly savings required, 4) Choose right investment products, 5) Track progress, 6) Stay motivated and disciplined."
  },
  {
    question: "What are common financial goals?",
    answer: "Short-term (1-3 years): Emergency fund, vacation, car. Medium-term (3-7 years): Down payment, child education, wedding. Long-term (7+ years): Retirement, child's higher education, wealth creation."
  },
  {
    question: "How much should I save for each goal?",
    answer: "Use our calculator to determine exact amount. General guidelines: Emergency fund = 6-12 months expenses, Retirement = 25-30× annual expenses, Child education = ₹25-50 lakh (inflation-adjusted), House = 20-30% down payment."
  },
  {
    question: "Can I plan multiple goals together?",
    answer: "Yes! Prioritize goals: 1) Emergency fund (highest priority), 2) Insurance, 3) Retirement, 4) Children's education, 5) Other goals. Allocate savings percentage to each. Avoid compromising retirement for other goals."
  },
  {
    question: "What if I can't save enough for my goals?",
    answer: "Options: 1) Increase income (side hustle, job change), 2) Reduce expenses, 3) Extend goal timeline, 4) Adjust goal amount, 5) Take calculated loans (education, home). Review and adjust goals annually."
  },
  {
    question: "How often should I review my financial goals?",
    answer: "Review annually or when: 1) Income changes significantly, 2) Major life events (marriage, child birth), 3) Market crashes/booms, 4) Goal timelines approach. Rebalance investments based on changing risk profile."
  }
];
