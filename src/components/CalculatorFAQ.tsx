import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorFAQProps {
  faqs: FAQ[];
  title?: string;
}

export default function CalculatorFAQ({ faqs, title = "Frequently Asked Questions" }: CalculatorFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200 dark:border-blue-700 mb-4">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">❓ FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-800 dark:text-gray-100">{title}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about this calculator
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-100 pr-4 text-base md:text-lg">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[#FF6B2C] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Box */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 dark:from-[#FF6B2C]/20 dark:to-[#FF8A50]/20 rounded-2xl p-6 md:p-8 border border-[#FF6B2C]/20 dark:border-[#FF6B2C]/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Still have questions?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our support team is here to help you with any queries about our calculators and financial planning tools.
              </p>
              <a
                href="/support/contact-us"
                className="inline-flex items-center gap-2 text-[#FF6B2C] font-semibold hover:gap-3 transition-all duration-200"
              >
                Contact Support
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default SSY FAQs
export const ssyFAQs: FAQ[] = [
  {
    question: "What is Sukanya Samriddhi Yojana (SSY)?",
    answer: "Sukanya Samriddhi Yojana is a government-backed savings scheme for girl children. It offers tax-free returns and helps parents save for their daughter's education and marriage expenses. The account can be opened for a girl child below 10 years of age."
  },
  {
    question: "What is the current SSY interest rate?",
    answer: "The current SSY interest rate is 8.2% per annum (as of 2024). The interest rate is reviewed and announced by the government quarterly. Interest is compounded annually and credited to the account."
  },
  {
    question: "What is the minimum and maximum deposit amount?",
    answer: "The minimum deposit is ₹250 per year and the maximum is ₹1.5 lakh per year. You can make deposits in multiples of ₹50. There is no limit on the number of deposits in a financial year."
  },
  {
    question: "When does the SSY account mature?",
    answer: "The SSY account matures when the girl child turns 21 years old. However, deposits are required only for the first 15 years or until the girl turns 18, whichever is earlier. Interest continues to accrue until maturity."
  },
  {
    question: "Can I withdraw money from SSY before maturity?",
    answer: "Partial withdrawal of up to 50% of the balance is allowed after the girl turns 18 years for higher education or marriage expenses. Premature closure is allowed after the girl attains 18 years of age for marriage purposes."
  },
  {
    question: "What are the tax benefits of SSY?",
    answer: "SSY enjoys EEE (Exempt-Exempt-Exempt) status. Deposits qualify for tax deduction under Section 80C up to ₹1.5 lakh. Interest earned and maturity amount are completely tax-free."
  },
  {
    question: "How accurate is this SSY calculator?",
    answer: "This calculator uses official government interest rates and standard compounding formulas to provide accurate projections. It includes year-wise breakdown and considers the deposit period and maturity rules accurately."
  },
  {
    question: "Can I open SSY account in any bank?",
    answer: "Yes, SSY accounts can be opened in authorized post offices and branches of public sector banks, private sector banks, and select RRBs. Only one account can be opened per girl child."
  }
];

// Default FD FAQs
export const fdFAQs: FAQ[] = [
  {
    question: "What is a Fixed Deposit (FD)?",
    answer: "A Fixed Deposit is a financial instrument provided by banks where you deposit a lump sum amount for a fixed tenure at a predetermined interest rate. The interest rate remains constant throughout the tenure."
  },
  {
    question: "What is the current FD interest rate?",
    answer: "FD interest rates vary across banks and tenure. Generally, rates range from 3% to 7.5% per annum. Senior citizens typically get an additional 0.25% to 0.50% interest. Check with your specific bank for current rates."
  },
  {
    question: "Is FD interest taxable?",
    answer: "Yes, interest earned on FD is taxable as per your income tax slab. Banks deduct TDS if interest exceeds ₹40,000 per year (₹50,000 for senior citizens). You can submit Form 15G/15H if your total income is below taxable limit."
  },
  {
    question: "Can I withdraw FD before maturity?",
    answer: "Yes, premature withdrawal is allowed but usually attracts a penalty of 0.5% to 1% on the interest rate. Some banks may not pay any interest if withdrawn very early. Tax-saver FDs have a lock-in period of 5 years."
  },
  {
    question: "What is the minimum and maximum tenure for FD?",
    answer: "FD tenure typically ranges from 7 days to 10 years. Some banks offer flexible FD with tenure ranging from 1 day to 10 years. Longer tenure usually offers higher interest rates."
  },
  {
    question: "Is my FD deposit safe?",
    answer: "Yes, FDs in scheduled banks are insured by DICGC (Deposit Insurance and Credit Guarantee Corporation) up to ₹5 lakhs per depositor per bank. This includes both principal and interest."
  }
];

// Default RD FAQs
export const rdFAQs: FAQ[] = [
  {
    question: "What is a Recurring Deposit (RD)?",
    answer: "Recurring Deposit is a savings scheme where you deposit a fixed amount every month for a predetermined period. At maturity, you receive the principal plus accumulated interest. It's ideal for building savings discipline."
  },
  {
    question: "What is the current RD interest rate?",
    answer: "RD interest rates are similar to FD rates and vary by bank and tenure. Generally, rates range from 3% to 7% per annum. Senior citizens get additional 0.25% to 0.50% interest."
  },
  {
    question: "What happens if I miss an RD installment?",
    answer: "If you miss an installment, banks usually charge a penalty. However, you can make up missed payments later. Consistent defaults may lead to account closure. Some banks offer grace periods."
  },
  {
    question: "Can I increase or decrease my monthly RD amount?",
    answer: "No, the monthly deposit amount is fixed at the time of account opening and cannot be changed. If you want to save more, you need to open a new RD account."
  },
  {
    question: "What is the minimum and maximum tenure for RD?",
    answer: "RD tenure typically ranges from 6 months to 10 years. The minimum monthly deposit varies by bank, usually starting from ₹100. There's usually no maximum limit on monthly deposit."
  },
  {
    question: "Is RD interest taxable?",
    answer: "Yes, interest earned on RD is taxable as per your income tax slab. TDS is deducted if annual interest exceeds ₹40,000 (₹50,000 for senior citizens)."
  }
];

// Default PF FAQs
export const pfFAQs: FAQ[] = [
  {
    question: "What is Employee Provident Fund (EPF)?",
    answer: "EPF is a retirement savings scheme managed by EPFO for salaried employees. Both employer and employee contribute 12% of basic salary + DA monthly. It provides financial security post-retirement."
  },
  {
    question: "What is the current EPF interest rate?",
    answer: "The current EPF interest rate is 8.1% per annum (FY 2024-25). The rate is declared annually by the government and is usually higher than bank FD rates."
  },
  {
    question: "Is EPF mandatory?",
    answer: "EPF is mandatory for all establishments with 20 or more employees. For smaller establishments, it's voluntary. Once enrolled, contribution is compulsory until employment ends or retirement."
  },
  {
    question: "When can I withdraw my EPF?",
    answer: "Full EPF withdrawal is allowed upon retirement (58 years), resignation after 2 months of unemployment, or permanent migration. Partial withdrawals are allowed for housing, marriage, education, and medical emergencies after 5 years of service."
  },
  {
    question: "Is EPF tax-free?",
    answer: "Yes, EPF enjoys EEE status. Contributions qualify for 80C deduction, interest is tax-free, and maturity amount is tax-free if withdrawn after 5 years of continuous service."
  },
  {
    question: "What is the difference between EPF and VPF?",
    answer: "EPF is the mandatory 12% contribution by employer and employee. VPF (Voluntary Provident Fund) allows employees to contribute additional amount beyond 12%, up to 100% of basic salary."
  }
];

// Default NPS FAQs
export const npsFAQs: FAQ[] = [
  {
    question: "What is National Pension Scheme (NPS)?",
    answer: "NPS is a government-sponsored pension scheme for retirement. It offers market-linked returns through equity, corporate bonds, and government securities. At retirement, you get lump sum (60%) and monthly pension (40%)."
  },
  {
    question: "What are NPS tax benefits?",
    answer: "NPS offers triple tax benefits: 1) Section 80CCD(1): Up to ₹1.5 lakh, 2) Section 80CCD(1B): Additional ₹50,000, 3) Section 80CCD(2): Employer contribution up to 10% of salary. Total tax benefit up to ₹2 lakh per year."
  },
  {
    question: "What returns can I expect from NPS?",
    answer: "NPS returns are market-linked and vary by asset allocation. Historically, equity-oriented schemes have given 9-12% returns, while conservative schemes give 8-10%. Returns are not guaranteed."
  },
  {
    question: "Can I withdraw NPS before retirement?",
    answer: "Premature withdrawal is allowed only in specific cases: 1) After 10 years for specific needs (max 25%), 2) At age 60 - 60% lump sum + 40% annuity mandatory. Full withdrawal allowed for corpus less than ₹5 lakh."
  },
  {
    question: "What is the minimum contribution for NPS?",
    answer: "Minimum contribution is ₹500 per month or ₹6,000 per year. You can contribute any amount above this. There's no maximum limit on contributions."
  },
  {
    question: "How do I choose NPS fund manager?",
    answer: "PFRDA has authorized 10 pension fund managers. You can choose based on their performance, AUM, and investment strategy. You can also choose auto or active choice for asset allocation."
  }
];
