import React from 'react';

interface BusinessDeductionsProps {
    entityType: string;
    section80C: string;
    setSection80C: (value: string) => void;
    section80DSelf: string;
    setSection80DSelf: (value: string) => void;
}

const BusinessDeductions: React.FC<BusinessDeductionsProps> = ({entityType, section80C, setSection80C, section80DSelf, setSection80DSelf}) => {
    return(
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4">
                {entityType === 'firm' ? 'Partnership Firm Deductions' : 'Corporate Deductions'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {entityType === 'firm' ? 'Partner Remuneration (₹)' : 'Depreciation (₹)'}
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">{entityType === 'firm' ? 'Partner Remuneration:' : 'Depreciation:'}</div>
                                <div className="space-y-2">
                                    {entityType === 'firm' ? (
                                        <>
                                            <div><strong>Allowable Remuneration:</strong></div>
                                            <div>• Working partners can get remuneration</div>
                                            <div>• Limited by Income Tax Act provisions</div>
                                            <div>• Deductible from firm&apos;s income</div>
                                            <div>• Partners taxed on their share + remuneration</div>
                                        </>
                                    ) : (
                                        <>
                                            <div><strong>Depreciation on Assets:</strong></div>
                                            <div>• Plant & machinery, buildings, furniture</div>
                                            <div>• As per Income Tax depreciation rates</div>
                                            <div>• Written down value method</div>
                                            <div>• Reduces taxable income</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder={entityType === 'firm' ? 'e.g., 500000' : 'e.g., 200000'}
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80C}
                        onChange={(e) => setSection80C(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {entityType === 'firm' ? 'Interest on Capital (₹)' : 'CSR Expenses (₹)'}
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">{entityType === 'firm' ? 'Interest on Partners Capital:' : 'CSR Expenses:'}</div>
                                <div className="space-y-2">
                                    {entityType === 'firm' ? (
                                        <>
                                            <div><strong>Interest on Capital:</strong></div>
                                            <div>• Interest paid to partners on their capital</div>
                                            <div>• Maximum 12% per annum allowed</div>
                                            <div>• Deductible from firm&apos;s income</div>
                                            <div>• Must be authorized by partnership deed</div>
                                        </>
                                    ) : (
                                        <>
                                            <div><strong>CSR Expenditure:</strong></div>
                                            <div>• Corporate Social Responsibility</div>
                                            <div>• Mandatory for companies with high turnover/profit</div>
                                            <div>• 2% of average net profits (last 3 years)</div>
                                            <div>• Deductible business expense</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder={entityType === 'firm' ? 'e.g., 100000' : 'e.g., 300000'}
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={section80DSelf}
                        onChange={(e) => setSection80DSelf(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default BusinessDeductions;