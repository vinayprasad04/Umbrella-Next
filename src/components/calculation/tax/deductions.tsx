import React from 'react';

interface DeductionsProps {
    entityType: string;
    section80C: string;
    setSection80C: (value: string) => void;
    age: string;
    section80DSelf: string;
    setSection80DSelf: (value: string) => void;
    section80DParents: string;
    setSection80DParents: (value: string) => void;
    section80CCD1B: string;
    setSection80CCD1B: (value: string) => void;
    section80G50: string;
    setSection80G50: (value: string) => void;
    section80G100: string;
    setSection80G100: (value: string) => void;
    section24B: string;
    setSection24B: (value: string) => void;
    professionalTax: string;
    setProfessionalTax: (value: string) => void;
    otherDeductions: string;
    setOtherDeductions: (value: string) => void;
    section80E: string;
    setSection80E: (value: string) => void;
}

const Deductions: React.FC<DeductionsProps> = ({entityType, section80C, setSection80C, age, section80DSelf, setSection80DSelf, section80DParents,
                        setSection80DParents, section80CCD1B, setSection80CCD1B, section80G50, setSection80G50, section80G100, setSection80G100,
                        section24B, setSection24B, professionalTax, setProfessionalTax, otherDeductions, setOtherDeductions, section80E, setSection80E}) => {
    return(
        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 mb-6">
            <h3 className="text-lg font-bold text-orange-800 mb-4">
                {entityType === 'individual' ? 'Deductions (Old Regime Only)' : 'HUF Deductions (Old Regime Only)'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80C (PF, ELSS, PPF etc.) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Section 80C Tax Saving Investments:</div>
                                <div className="space-y-2">
                                    <div><strong>Popular Options:</strong></div>
                                    <div>• <strong>PPF:</strong> 15-year lock-in, tax-free returns (~7-8%)</div>
                                    <div>• <strong>ELSS:</strong> 3-year lock-in, market-linked returns</div>
                                    <div>• <strong>PF/EPF:</strong> Employee provident fund contributions</div>
                                    <div>• <strong>NSC:</strong> 5-year term, ~6.8% interest</div>
                                    <div>• <strong>Tax-saving FD:</strong> 5-year lock-in, ~5-7% returns</div>
                                    <div>• <strong>Life Insurance:</strong> Premium paid (not maturity amount)</div>
                                    <div>• <strong>ULIP:</strong> Market-linked insurance plans</div>
                                    <div>• <strong>Home Loan Principal:</strong> Repayment amount</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Maximum Limit:</strong> ₹1.5 lakh per year<br/>
                                        <strong>Tax Benefit:</strong> Saves ₹31,200-₹46,800 based on tax slab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="Max: 150000"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80C}
                        onChange={(e) => setSection80C(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80D Self/Family (Health Insurance) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Section 80D Health Insurance Deduction:</div>
                                <div className="space-y-2">
                                    <div><strong>Eligible Premiums:</strong></div>
                                    <div>• Health insurance for self and family</div>
                                    <div>• Preventive health check-up expenses</div>
                                    <div>• Medical insurance premiums paid</div>
                                    <div className="mt-2"><strong>Age-based Limits:</strong></div>
                                    <div>• <strong>Below 60 years:</strong> ₹25,000 maximum</div>
                                    <div>• <strong>60+ years:</strong> ₹50,000 maximum</div>
                                    <div className="mt-2"><strong>Preventive Health Check-up:</strong></div>
                                    <div>• ₹5,000 within the above limits</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Tax Benefit:</strong> Direct deduction from taxable income<br/>
                                        <strong>Savings:</strong> ₹5,200-₹15,000 based on tax slab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder={`Max: ${parseInt(age) >= 60 ? '50000' : '25000'}`}
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80DSelf}
                        onChange={(e) => setSection80DSelf(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        💡 {parseInt(age) >= 60 ? 'Senior citizens: ₹50,000' : 'Below 60: ₹25,000'}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80D Parents (Health Insurance) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Section 80D Parents Health Insurance:</div>
                                <div className="space-y-2">
                                    <div><strong>Eligible Expenses:</strong></div>
                                    <div>• Health insurance premiums for parents</div>
                                    <div>• Medical expenses for parents (if no insurance)</div>
                                    <div>• Preventive health check-up for parents</div>
                                    <div className="mt-2"><strong>Maximum Limit:</strong></div>
                                    <div>• <strong>₹50,000</strong> regardless of parents&apos; age</div>
                                    <div>• Separate from self/family limit</div>
                                    <div className="mt-2"><strong>Key Benefits:</strong></div>
                                    <div>• Additional to self/family deduction</div>
                                    <div>• Total 80D can be up to ₹1 lakh (₹50k + ₹50k)</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Combined Benefit:</strong> Up to ₹1 lakh total 80D deduction<br/>
                                        <strong>Tax Savings:</strong> ₹10,400-₹30,000 based on tax slab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="Max: 50000"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80DParents}
                        onChange={(e) => setSection80DParents(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        💡 Additional ₹50,000 for parents regardless of age
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80CCD(1B) (NPS) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Section 80CCD(1B) - NPS Additional Deduction:</div>
                                <div className="space-y-2">
                                    <div><strong>What is NPS:</strong></div>
                                    <div>• National Pension System - Government retirement scheme</div>
                                    <div>• Market-linked pension and retirement planning</div>
                                    <div>• Long-term wealth creation with tax benefits</div>
                                    <div className="mt-2"><strong>Key Benefits:</strong></div>
                                    <div>• <strong>Additional ₹50,000</strong> deduction over 80C limit</div>
                                    <div>• Separate from ₹1.5 lakh 80C investments</div>
                                    <div>• Total possible: ₹2 lakh (₹1.5L + ₹50K)</div>
                                    <div className="mt-2"><strong>Investment Options:</strong></div>
                                    <div>• Equity, corporate bonds, government securities</div>
                                    <div>• Choice of fund managers and asset allocation</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Maximum Limit:</strong> ₹50,000 per year<br/>
                                        <strong>Tax Savings:</strong> ₹10,400-₹15,000 based on tax slab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="Max: 50000"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80CCD1B}
                        onChange={(e) => setSection80CCD1B(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80E (Education Loan) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Section 80E Education Loan Interest:</div>
                                <div className="space-y-2">
                                    <div><strong>Eligible Loans:</strong></div>
                                    <div>• Education loan for self, spouse, or children</div>
                                    <div>• Higher education (graduation & above)</div>
                                    <div>• From approved financial institutions only</div>
                                    <div className="mt-2"><strong>Deductible Amount:</strong></div>
                                    <div>• <strong>Only interest portion</strong> of EMI</div>
                                    <div>• <strong>No upper limit</strong> on deduction</div>
                                    <div>• Not principal repayment amount</div>
                                    <div className="mt-2"><strong>Time Limit:</strong></div>
                                    <div>• Maximum 8 years from start of repayment</div>
                                    <div>• Or until loan is fully repaid (whichever is earlier)</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Special Feature:</strong> No maximum limit unlike other sections<br/>
                                        <strong>Tax Savings:</strong> 20-30% of interest amount paid
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="No limit"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80E}
                        onChange={(e) => setSection80E(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80G Donations (50% deduction) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">50% Deduction Category:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-orange-300">• Government Funds:</span>
                                        <div className="ml-2">- PM National Relief Fund</div>
                                        <div className="ml-2">- National Defence Fund</div>
                                        <div className="ml-2">- State Government Relief Funds</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-yellow-300">• Educational Institutions:</span>
                                        <div className="ml-2">- Government schools/colleges</div>
                                        <div className="ml-2">- Some approved private institutions</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-blue-300">• Other Organizations:</span>
                                        <div className="ml-2">- Some NGOs without 100% exemption</div>
                                        <div className="ml-2">- Certain charitable trusts</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="Donation amount (50% deductible)"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80G50}
                        onChange={(e) => setSection80G50(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        80G Donations (100% deduction) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">100% Deduction Category:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-green-300">• Prime Minister&apos;s Funds:</span>
                                        <div className="ml-2">- PM CARES Fund</div>
                                        <div className="ml-2">- PM National Relief Fund</div>
                                        <div className="ml-2">- Clean Ganga Fund</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-blue-300">• Government Schemes:</span>
                                        <div className="ml-2">- Swachh Bharat Kosh</div>
                                        <div className="ml-2">- National Heritage Fund</div>
                                        <div className="ml-2">- Pradhan Mantri Kaushal Vikas Yojana</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-purple-300">• Special Categories:</span>
                                        <div className="ml-2">- Government libraries</div>
                                        <div className="ml-2">- Government museums</div>
                                        <div className="ml-2">- Government zoos</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="Donation amount (100% deductible)"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80G100}
                        onChange={(e) => setSection80G100(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        24(b) (Home Loan Interest) (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Section 24(b) Home Loan Interest Deduction:</div>
                                <div className="space-y-2">
                                    <div><strong>Eligible Properties:</strong></div>
                                    <div>• Self-occupied residential property</div>
                                    <div>• Under-construction property (pre-completion)</div>
                                    <div>• Home loan from banks/financial institutions</div>
                                    <div className="mt-2"><strong>Deduction Limits:</strong></div>
                                    <div>• <strong>₹2 lakh maximum</strong> per year for self-occupied</div>
                                    <div>• Only interest portion of EMI (not principal)</div>
                                    <div>• Available in both old and new tax regime</div>
                                    <div className="mt-2"><strong>Key Points:</strong></div>
                                    <div>• Principal repayment goes under Section 80C</div>
                                    <div>• Interest can be claimed even during construction</div>
                                    <div>• No time limit like education loan</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Combined Benefit:</strong> Up to ₹3.5L (₹2L interest + ₹1.5L principal)<br/>
                                        <strong>Tax Savings:</strong> ₹41,600-₹60,000 annually
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="Max: 200000"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section24B}
                        onChange={(e) => setSection24B(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Professional Tax (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Professional Tax Deduction:</div>
                                <div className="space-y-2">
                                    <div><strong>What is Professional Tax:</strong></div>
                                    <div>• State-imposed tax on professions and employment</div>
                                    <div>• Deducted by employer from salary (TDS)</div>
                                    <div>• Varies by state - not applicable in all states</div>
                                    <div className="mt-2"><strong>State-wise Rates:</strong></div>
                                    <div>• <strong>Karnataka, West Bengal:</strong> ₹200-₹300 per month</div>
                                    <div>• <strong>Maharashtra:</strong> ₹175-₹200 per month</div>
                                    <div>• <strong>Andhra Pradesh, Telangana:</strong> ₹150-₹200</div>
                                    <div>• <strong>Not applicable:</strong> Delhi, Punjab, UP, etc.</div>
                                    <div className="mt-2"><strong>Tax Benefit:</strong></div>
                                    <div>• Fully deductible from income tax</div>
                                    <div>• Usually shows in Form 16 automatically</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Maximum Annual:</strong> Usually ₹2,400-₹3,600<br/>
                                        <strong>Tax Savings:</strong> ₹500-₹1,080 based on tax slab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={professionalTax}
                        onChange={(e) => setProfessionalTax(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Other Deductions (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Other Deductions Explained:</div>
                                <div className="space-y-2">
                                    <div><strong>80TTA:</strong> ₹10,000 savings account interest deduction</div>
                                    <div><strong>80TTB:</strong> ₹50,000 interest deduction for senior citizens</div>
                                    <div><strong>80EE:</strong> Additional ₹50,000 home loan interest deduction</div>
                                    <div><strong>80EEB:</strong> ₹1.5 lakh electric vehicle loan interest deduction</div>
                                    <div><strong>80DD:</strong> ₹75,000-₹1.25 lakh for disabled dependent care</div>
                                    <div><strong>80DDB:</strong> Medical treatment of specified diseases deduction</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Tax Benefit:</strong> Direct reduction from taxable income, saving 20-30% tax based on your tax slab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="80TTA, 80TTB etc."
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Deductions;