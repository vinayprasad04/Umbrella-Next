import React from 'react';
import { useRouter } from "next/router";

const TaxPlanningTips: React.FC = () => {
    const router = useRouter();
    return(
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gray-800">Tax Planning </span>
                        <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Tips & Strategies
                  </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Smart strategies to optimize your tax liability and maximize savings
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => router.push('/tax-planning')}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            View Complete Tax Planning Guide
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '',
                            title: 'Section 80C Investments',
                            description: 'Invest up to ₹1.5L in PPF, ELSS, NSC, tax-saving FDs, and life insurance to save up to ₹46,800 in taxes.',
                            color: 'from-blue-400 to-blue-600'
                        },
                        {
                            icon: '',
                            title: 'Health Insurance (80D)',
                            description: 'Self/Family: ₹25K (₹50K if 60+), Parents: ₹50K additional. Total max ₹1L with proper planning.',
                            color: 'from-green-400 to-green-600'
                        },
                        {
                            icon: '',
                            title: 'Home Loan Benefits',
                            description: 'Claim up to ₹2L interest deduction under Section 24(b) and ₹1.5L principal repayment under 80C.',
                            color: 'from-purple-400 to-purple-600'
                        },
                        {
                            icon: '',
                            title: 'Education Loan (80E)',
                            description: 'Full interest deduction on education loans with no upper limit for self, spouse, or children.',
                            color: 'from-orange-400 to-orange-600'
                        },
                        {
                            icon: '',
                            title: 'NPS Additional (80CCD1B)',
                            description: 'Extra ₹50K deduction over and above 80C limit by investing in National Pension System.',
                            color: 'from-red-400 to-red-600'
                        },
                        {
                            icon: '',
                            title: 'Donations (80G)',
                            description: '50% deduction: PM Relief Fund, educational institutions. 100% deduction: PM CARES, Swachh Bharat Kosh, Clean Ganga Fund.',
                            color: 'from-teal-400 to-teal-600'
                        },
                        {
                            icon: '',
                            title: 'Section 87A Rebates',
                            description: 'New Regime: Rs.25K rebate for income ≤Rs.7L (effectively no tax up to Rs.12L). Old Regime: Rs.12.5K rebate for income ≤Rs.5L.',
                            color: 'from-pink-400 to-pink-600'
                        }
                    ].map((item, index) => {
                        // Map each tip to its corresponding section ID in the tax planning page
                        const sectionMap: {[key: string]: string} = {
                            'Section 80C Investments': 'section-80c',
                            'Health Insurance (80D)': 'health-insurance',
                            'Home Loan Benefits': 'home-loan',
                            'Education Loan (80E)': 'education-loan',
                            'NPS Additional (80CCD1B)': 'nps-additional',
                            'Donations (80G)': 'donations',
                            'Section 87A Rebates': 'rebates'
                        };

                        const sectionId = sectionMap[item.title];

                        return (
                            <div
                                key={index}
                                onClick={() => sectionId && router.push(`/tax-planning?section=${sectionId}`)}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="drop-shadow-sm">{item.icon}</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-center text-sm mb-4">
                                    {item.description}
                                </p>

                                {sectionId && (
                                    <div className="text-center">
                          <span className="inline-flex items-center gap-1 text-[#FF6B2C] text-xs font-medium group-hover:gap-2 transition-all duration-300">
                            Learn More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default TaxPlanningTips;