import React from 'react';

interface TaxSlab {
    min: number;
    max: number;
    rate: number;
}

interface TaxConfig {
    standardDeduction: number;
    rebateLimit: number;
    rebateAmount: number;
    oldRegime: {
        exemptionBelow60: number;
        exemptionBelow80: number;
        exemptionAbove80: number;
        slabs: TaxSlab[];
    };
    newRegime: {
        exemption: number;
        slabs: TaxSlab[];
    };
}

interface TaxResult {
    oldRegime: {
        grossIncome: number;
        taxableIncome: number;
        totalDeductions: number;
        incomeTax: number;
        cess: number;
        capitalGainsTax: number;
        totalTax: number;
        netIncome: number;
        effectiveRate: string;
        breakdown: Array<{
            slab: string;
            rate: string;
            taxableAmount: number;
            tax: number;
        }>;
    };
    newRegime: {
        grossIncome: number;
        taxableIncome: number;
        totalDeductions: number;
        incomeTax: number;
        cess: number;
        capitalGainsTax: number;
        totalTax: number;
        netIncome: number;
        effectiveRate: string;
        breakdown: Array<{
            slab: string;
            rate: string;
            taxableAmount: number;
            tax: number;
        }>;
    };
    capitalGainsBreakdown: {
        stcgEquity: number;
        stcgEquityTax: number;
        ltcgEquity: number;
        ltcgEquityTax: number;
        stcgOther: number;
        ltcgOther: number;
        ltcgOtherTax: number;
        totalCapitalGainsTax: number;
    };
    savings: number;
    recommendedRegime: string;
}

interface ResultsProps {
    entityType: string;
    assessmentYear: string;
    result: TaxResult | null;
    setActiveTab: (tab: string) => void;
    activeTab: string;
    basicSalary: string;
    handleGetStarted: () => void;
    isLoggedIn: boolean;
    getTaxConfig: (year: string) => TaxConfig;
    age: string;
    residentialStatus: string;
    generatePDF: (type: 'old' | 'new' | 'capital') => Promise<void>;
}

const Results: React.FC<ResultsProps> = ({entityType, assessmentYear, result, setActiveTab, activeTab, basicSalary,
                     handleGetStarted, isLoggedIn, getTaxConfig, age, residentialStatus, generatePDF }) => {
    return(
        <div className="lg:col-span-2 bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 dark:from-[#FF6B2C]/5 dark:to-[#FF8A50]/5 rounded-3xl p-8 border border-[#FF6B2C]/20 dark:border-[#FF6B2C]/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                {entityType === 'individual' ? 'Personal Tax Calculation Results' :
                    entityType === 'huf' ? 'HUF Tax Calculation Results' :
                        entityType === 'firm' ? 'Partnership Firm Tax Results' :
                            'Corporate Tax Calculation Results'}
            </h3>
            <div className="text-center mb-6">
                      <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
                        {assessmentYear === '2025-26' ? 'AY 2025-26 (FY 2024-25) - Current' :
                            assessmentYear === '2024-25' ? 'AY 2024-25 (FY 2023-24)' :
                                assessmentYear === '2023-24' ? 'AY 2023-24 (FY 2022-23)' :
                                    'AY 2022-23 (FY 2021-22)'}
                      </span>
            </div>

            {result ? (
                <div className="space-y-6">
                    {/* Tabs */}
                    <div className={`flex rounded-xl bg-white dark:bg-gray-700 p-1 ${entityType === 'firm' || entityType === 'company' ? 'justify-center' : ''} transition-colors duration-300`}>
                        {(entityType === 'individual' || entityType === 'huf') && (
                            <>
                                <button
                                    onClick={() => setActiveTab('comparison')}
                                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                        activeTab === 'comparison'
                                            ? 'bg-[#FF6B2C] text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                    }`}
                                >
                                    Comparison
                                </button>
                                <button
                                    onClick={() => setActiveTab('old')}
                                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                        activeTab === 'old'
                                            ? 'bg-[#FF6B2C] text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                    }`}
                                >
                                    {entityType === 'huf' ? 'HUF Tax' : 'Old Regime'}
                                </button>
                                <button
                                    onClick={() => setActiveTab('new')}
                                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                        activeTab === 'new'
                                            ? 'bg-[#FF6B2C] text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                    }`}
                                >
                                    New Regime
                                </button>
                            </>
                        )}
                        {(entityType === 'firm' || entityType === 'company') && (
                            <>
                                <button
                                    onClick={() => setActiveTab('comparison')}
                                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                        activeTab === 'comparison'
                                            ? 'bg-[#FF6B2C] text-white'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    Tax Summary
                                </button>
                                <button
                                    onClick={() => setActiveTab('old')}
                                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                        activeTab === 'old'
                                            ? 'bg-[#FF6B2C] text-white'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    {entityType === 'firm' ? 'Business Tax' : 'Corporate Tax'}
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => setActiveTab('capital')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                activeTab === 'capital'
                                    ? 'bg-[#FF6B2C] text-white'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Capital Gains
                        </button>
                    </div>

                    {activeTab === 'comparison' && (
                        <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                                <div className="text-sm text-gray-600 mb-2">
                                    {entityType === 'firm' || entityType === 'company' ? 'Tax Summary' : 'Recommended'}
                                </div>
                                <div className="text-2xl font-bold text-[#FF6B2C] mb-2">
                                    {result.recommendedRegime}
                                </div>
                                <div className="text-lg font-semibold text-green-600">
                                    {(entityType === 'individual' || entityType === 'huf') && result.savings > 0
                                        ? `Save ₹${result.savings.toLocaleString()}`
                                        : entityType === 'firm'
                                            ? 'Partnership Firm Tax Rate: 30%'
                                            : entityType === 'company'
                                                ? 'Corporate Tax Rate: 25%/30%'
                                                : `Save ₹${result.savings.toLocaleString()}`}
                                </div>
                            </div>

                            <div className={`grid gap-4 text-sm ${entityType === 'firm' || entityType === 'company' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                <div className="bg-white/60 rounded-xl p-4">
                                    <div className="font-semibold text-gray-700 mb-2">
                                        {entityType === 'individual' ? 'Old Regime' :
                                            entityType === 'huf' ? 'HUF Tax Calculation' :
                                                entityType === 'firm' ? 'Partnership Tax Details' :
                                                    'Corporate Tax Details'}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span>Total Tax:</span>
                                            <span className="font-bold">₹{result.oldRegime.totalTax.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Net Income:</span>
                                            <span className="font-bold text-green-600">₹{result.oldRegime.netIncome.toLocaleString()}</span>
                                        </div>
                                        {entityType === 'firm' && (
                                            <div className="flex justify-between">
                                                <span>Tax Rate:</span>
                                                <span className="font-bold text-blue-600">30% + 4% Cess</span>
                                            </div>
                                        )}
                                        {entityType === 'company' && (
                                            <div className="flex justify-between">
                                                <span>Tax Rate:</span>
                                                <span className="font-bold text-blue-600">
                                        {(parseFloat(basicSalary) || 0) <= 40000000000 ? '25% + 4% Cess' : '30% + 4% Cess'}
                                      </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {(entityType === 'individual' || entityType === 'huf') && (
                                    <div className="bg-white/60 rounded-xl p-4">
                                        <div className="font-semibold text-gray-700 mb-2">New Regime</div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span>Total Tax:</span>
                                                <span className="font-bold">₹{result.newRegime.totalTax.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Net Income:</span>
                                                <span className="font-bold text-green-600">₹{result.newRegime.netIncome.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'old' && (
                        <div className="space-y-4">
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg text-center transition-colors duration-300">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    {entityType === 'individual' ? 'Total Tax (Old Regime)' :
                                        entityType === 'huf' ? 'Total HUF Tax' :
                                            entityType === 'firm' ? 'Total Partnership Tax' :
                                                'Total Corporate Tax'}
                                </div>
                                <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                    ₹{result.oldRegime.totalTax.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Effective Rate: {result.oldRegime.effectiveRate}%
                                    {entityType === 'firm' && ' (30% + 4% Cess)'}
                                    {entityType === 'company' && ` (${(parseFloat(basicSalary) || 0) <= 40000000000 ? '25%' : '30%'} + 4% Cess)`}
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                    <div className="flex justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {entityType === 'firm' ? 'Business Income:' :
                                        entityType === 'company' ? 'Corporate Revenue:' :
                                            'Gross Income:'}
                                  </span>
                                        <span className="font-bold text-gray-800 dark:text-gray-100">₹{result.oldRegime.grossIncome.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                    <div className="flex justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {entityType === 'firm' ? 'Business Expenses & Remuneration:' :
                                        entityType === 'company' ? 'Operating Expenses & Depreciation:' :
                                            'Total Deductions:'}
                                  </span>
                                        <span className="font-bold text-blue-600 dark:text-blue-400">₹{result.oldRegime.totalDeductions.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                    <div className="flex justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {entityType === 'firm' ? 'Taxable Business Income:' :
                                        entityType === 'company' ? 'Taxable Corporate Income:' :
                                            'Taxable Income:'}
                                  </span>
                                        <span className="font-bold text-gray-800 dark:text-gray-100">₹{result.oldRegime.taxableIncome.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                    <div className="flex justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {entityType === 'firm' ? 'Partnership Tax:' :
                                        entityType === 'company' ? 'Corporate Tax:' :
                                            'Income Tax:'}
                                  </span>
                                        <span className="font-bold text-gray-800 dark:text-gray-100">₹{result.oldRegime.incomeTax.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700 dark:text-gray-300">Cess (4%):</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-100">₹{result.oldRegime.cess.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'new' && (
                        <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                                <div className="text-sm text-gray-600 mb-2">Total Tax (New Regime)</div>
                                <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                    ₹{result.newRegime.totalTax.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Effective Rate: {result.newRegime.effectiveRate}%
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-white/60 rounded-xl p-4">
                                    <div className="flex justify-between">
                                        <span>Gross Income:</span>
                                        <span className="font-bold">₹{result.newRegime.grossIncome.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-4">
                                    <div className="flex justify-between">
                                        <span>Standard Deduction:</span>
                                        <span className="font-bold text-blue-600">₹{result.newRegime.totalDeductions.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-4">
                                    <div className="flex justify-between">
                                        <span>Taxable Income:</span>
                                        <span className="font-bold">₹{result.newRegime.taxableIncome.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-4">
                                    <div className="flex justify-between">
                                        <span>Income Tax:</span>
                                        <span className="font-bold">₹{result.newRegime.incomeTax.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-4">
                                    <div className="flex justify-between">
                                        <span>Cess (4%):</span>
                                        <span className="font-bold">₹{result.newRegime.cess.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'capital' && (
                        <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                                <div className="text-sm text-gray-600 mb-2">Total Capital Gains Tax</div>
                                <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                    ₹{result.capitalGainsBreakdown.totalCapitalGainsTax.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Same for both Old & New regime
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                {result.capitalGainsBreakdown.stcgEquity > 0 && (
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-red-800">STCG - Equity (≤12 months)</span>
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">15.6% tax</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span>Capital Gains:</span>
                                                <span className="font-bold">₹{result.capitalGainsBreakdown.stcgEquity.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax:</span>
                                                <span className="font-bold text-red-600">₹{result.capitalGainsBreakdown.stcgEquityTax.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {result.capitalGainsBreakdown.ltcgEquity > 0 && (
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-green-800">LTCG - Equity (&gt;12 months)</span>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">₹1L exempt, then 10.4%</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span>Capital Gains:</span>
                                                <span className="font-bold">₹{result.capitalGainsBreakdown.ltcgEquity.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Exemption:</span>
                                                <span className="text-green-600">₹{Math.min(result.capitalGainsBreakdown.ltcgEquity, 100000).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Taxable Amount:</span>
                                                <span className="font-medium">₹{Math.max(0, result.capitalGainsBreakdown.ltcgEquity - 100000).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax:</span>
                                                <span className="font-bold text-green-600">₹{result.capitalGainsBreakdown.ltcgEquityTax.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {result.capitalGainsBreakdown.stcgOther > 0 && (
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-purple-800">STCG - Other Investments</span>
                                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Added to income</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span>Capital Gains:</span>
                                                <span className="font-bold">₹{result.capitalGainsBreakdown.stcgOther.toLocaleString()}</span>
                                            </div>
                                            <div className="text-xs text-purple-600 mt-1">
                                                💡 Added to regular income and taxed at your income slab rate
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {result.capitalGainsBreakdown.ltcgOther > 0 && (
                                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-indigo-800">LTCG - Other Investments</span>
                                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">20.8% with indexation</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span>Capital Gains:</span>
                                                <span className="font-bold">₹{result.capitalGainsBreakdown.ltcgOther.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax:</span>
                                                <span className="font-bold text-indigo-600">₹{result.capitalGainsBreakdown.ltcgOtherTax.toLocaleString()}</span>
                                            </div>
                                            <div className="text-xs text-indigo-600 mt-1">
                                                💡 Includes indexation benefit for inflation adjustment
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {result.capitalGainsBreakdown.totalCapitalGainsTax === 0 && (
                                    <div className="text-center py-8">
                                        <div className="text-gray-500 text-lg">No capital gains declared</div>
                                        <div className="text-sm text-gray-400 mt-2">Enter your stock market gains in the form to see tax breakdown</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="text-center pt-4">
                        <button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            {isLoggedIn ? 'Get Tax Planning Advice' : 'Create Account'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                        Fill in your details to calculate and compare tax regimes
                    </p>
                </div>
            )}

            {/* Tax Slabs Display */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center dark:text-gray-100">
                    Tax Slabs for {assessmentYear}
                </h4>

                {(() => {
                    const config = getTaxConfig(assessmentYear);
                    const userAge = parseInt(age) || 0;

                    return (
                        <div className="space-y-4">
                            {/* Tax Information based on entity type */}
                            {(entityType === 'individual' || entityType === 'huf') && (
                                <>
                                    {/* Old Regime Slabs */}
                                    <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                        <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full"></span>
                                            Old Regime
                                        </h5>
                                        <div className="space-y-2 text-sm">
                                            {/* Basic Exemption */}
                                            <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                <span className="text-gray-600 dark:text-gray-300">Basic Exemption:</span>
                                                <span className="font-medium text-red-600">
                                    ₹{(
                                                    residentialStatus === 'nri' ? 0 :
                                                        userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                                            userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                                                config.oldRegime.exemptionBelow60
                                                ).toLocaleString()}
                                  </span>
                                            </div>
                                            {/* Tax Slabs */}
                                            {config.oldRegime.slabs.map((slab: TaxSlab, index: number) => {
                                                let basicExemption = config.oldRegime.exemptionBelow60;
                                                if (residentialStatus === 'nri') {
                                                    basicExemption = 0;
                                                } else {
                                                    basicExemption = userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                                        userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                                            config.oldRegime.exemptionBelow60;
                                                }
                                                const adjustedMin = Math.max(slab.min, basicExemption);

                                                return (
                                                    <div key={index} className="flex justify-between items-center py-1">
                                      <span className="text-gray-600 dark:text-gray-300">
                                        {slab.max === Infinity
                                            ? `Above ₹${(adjustedMin/100000).toFixed(0)}L`
                                            : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                      </span>
                                                        <span className="font-medium text-red-600">{(slab.rate * 100).toFixed(0)}%</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* New Regime Slabs */}
                                    <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                        <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></span>
                                            New Regime
                                        </h5>
                                        <div className="space-y-2 text-sm">
                                            {/* Basic Exemption */}
                                            <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                <span className="text-gray-600 dark:text-gray-300">Basic Exemption:</span>
                                                <span className="font-medium text-green-600">
                                    ₹{(residentialStatus === 'nri' ? 0 : config.newRegime.exemption).toLocaleString()}
                                  </span>
                                            </div>
                                            {/* Tax Slabs */}
                                            {config.newRegime.slabs.map((slab: TaxSlab, index: number) => {
                                                const basicExemption = residentialStatus === 'nri' ? 0 : config.newRegime.exemption;
                                                const adjustedMin = Math.max(slab.min, basicExemption);

                                                return (
                                                    <div key={index} className="flex justify-between items-center py-1">
                                      <span className="text-gray-600 dark:text-gray-300">
                                        {slab.max === Infinity
                                            ? `Above ₹${(adjustedMin/100000).toFixed(0)}L`
                                            : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                      </span>
                                                        <span className="font-medium text-green-600">{(slab.rate * 100).toFixed(0)}%</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300">
                                        <div className="text-sm space-y-2">
                                            <div className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 text-center">Rebates & Additional Info:</div>

                                            {/* Rebate Information */}
                                            <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-2 border border-green-300 dark:border-green-700 transition-colors duration-300">
                                                <div className="font-semibold text-green-800 dark:text-green-300 mb-1 text-center">Section 87A Rebates:</div>
                                                <div className="space-y-1">
                                                    <div className="text-green-700 dark:text-green-400 text-center">
                                                        <span className="font-medium">Old Regime:</span> ₹12,500 rebate if taxable income ≤ ₹5L
                                                    </div>
                                                    <div className="text-green-700 dark:text-green-400 text-center">
                                                        <span className="font-medium">New Regime:</span> ₹{config.rebateAmount.toLocaleString()} rebate if taxable income ≤ ₹{(config.rebateLimit/100000).toFixed(0)}L
                                                    </div>
                                                    <div className="text-green-600 dark:text-green-400 text-xs italic text-center mt-1">
                                                        Result: Zero tax if rebate covers full tax liability
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Other Info */}
                                            <div className="grid grid-cols-1 gap-1 text-center">
                                                <div className="text-yellow-700 dark:text-yellow-400">• Health & Education Cess: 4% on income tax</div>
                                                <div className="text-yellow-700 dark:text-yellow-400">• Standard Deduction: ₹{config.standardDeduction.toLocaleString()} (New Regime)</div>
                                                <div className="text-yellow-700 dark:text-yellow-400">• Surcharge: Applicable on income above ₹50L/₹1Cr</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Business Tax Information for Firm/Company */}
                            {(entityType === 'firm' || entityType === 'company') && (
                                <>
                                    {/* Business Tax Structure */}
                                    <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                        <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></span>
                                            {entityType === 'firm' ? 'Partnership Tax Structure' : 'Corporate Tax Structure'}
                                        </h5>
                                        <div className="space-y-2 text-sm">
                                            {entityType === 'firm' ? (
                                                <>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Tax Rate:</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">30% Flat Rate</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Health & Education Cess:</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">4% on Tax</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Total Effective Rate:</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">31.2% (30% + 4% Cess)</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1">
                                                        <span className="text-gray-600 dark:text-gray-300">No Basic Exemption:</span>
                                                        <span className="font-medium text-red-600 dark:text-red-400">Tax from ₹1</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Tax Rate (Turnover ≤₹400 Cr):</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">25%</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Tax Rate (Turnover &gt;₹400 Cr):</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">30%</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Health & Education Cess:</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">4% on Tax</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1">
                                                        <span className="text-gray-600 dark:text-gray-300">Your Current Rate:</span>
                                                        <span className="font-medium text-purple-600 dark:text-purple-400">
                                        {(parseFloat(basicSalary) || 0) <= 40000000000 ? '26% (25% + 4% Cess)' : '31.2% (30% + 4% Cess)'}
                                      </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Business Deductions */}
                                    <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                        <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                                            {entityType === 'firm' ? 'Partnership Deductions' : 'Corporate Deductions'}
                                        </h5>
                                        <div className="space-y-2 text-sm">
                                            {entityType === 'firm' ? (
                                                <>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Partner Remuneration:</span>
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">As per Income Tax provisions</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Interest on Capital:</span>
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">Max 12% per annum</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Business Expenses:</span>
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">Fully Deductible</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1">
                                                        <span className="text-gray-600 dark:text-gray-300">No Personal Deductions:</span>
                                                        <span className="font-medium text-red-600 dark:text-red-400">80C, 80D, etc. not applicable</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Depreciation:</span>
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">As per IT rates</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">CSR Expenses:</span>
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">2% of avg. profit (if applicable)</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-600">
                                                        <span className="text-gray-600 dark:text-gray-300">Operating Expenses:</span>
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">Fully Deductible</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1">
                                                        <span className="text-gray-600 dark:text-gray-300">Minimum Alternate Tax (MAT):</span>
                                                        <span className="font-medium text-orange-600 dark:text-orange-400">18.5% if applicable</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Additional Business Tax Info */}
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-700">
                                        <div className="text-sm space-y-2">
                                            <div className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 text-center">
                                                {entityType === 'firm' ? 'Partnership Tax Compliance:' : 'Corporate Tax Compliance:'}
                                            </div>

                                            <div className="grid grid-cols-1 gap-1 text-center">
                                                {entityType === 'firm' ? (
                                                    <>
                                                        <div className="text-yellow-700 dark:text-yellow-300">• No regime choice - flat 30% rate applies</div>
                                                        <div className="text-yellow-700 dark:text-yellow-300">• Partners taxed separately on their share</div>
                                                        <div className="text-yellow-700 dark:text-yellow-300">• Advance tax payments required</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="text-yellow-700 dark:text-yellow-300">• Rate based on turnover threshold (₹400 Cr)</div>
                                                        <div className="text-yellow-700 dark:text-yellow-300">• MAT provisions may apply</div>
                                                        <div className="text-yellow-700 dark:text-yellow-300">• Dividend Distribution Tax abolished</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* PDF Generation Section */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Download Detailed Tax Reports (Form 16 Style)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
                    Get comprehensive tax calculation reports with complete breakdowns, deductions, and tax slabs - Similar to Form 16 format
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Old Regime PDF */}
                    {(entityType === 'individual' || entityType === 'huf') && (
                        <button
                            onClick={() => generatePDF('old')}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {entityType === 'huf' ? 'HUF Tax (Old)' : 'Old Regime'} PDF
                        </button>
                    )}

                    {/* New Regime PDF */}
                    <button
                        onClick={() => generatePDF('new')}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {entityType === 'individual' || entityType === 'huf' ? 'New Regime' :
                            entityType === 'firm' ? 'Partnership Tax' : 'Corporate Tax'} PDF
                    </button>

                    {/* Capital Gains PDF */}
                    <button
                        onClick={() => generatePDF('capital')}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Capital Gains PDF
                    </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                    PDFs include: Income breakdown, deduction details, tax slabs, effective rates, and professional tax computation format
                </div>
            </div>
        </div>
    )

}

export default Results;