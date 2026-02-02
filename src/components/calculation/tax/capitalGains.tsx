import React from 'react';

interface CapitalGainsProps {
    stcgEquity: string;
    setStcgEquity: (value: string) => void;
    ltcgEquity: string;
    setLtcgEquity: (value: string) => void;
    stcgOther: string;
    setStcgOther: (value: string) => void;
    ltcgOther: string;
    setLtcgOther: (value: string) => void;
}

const CapitalGains: React.FC<CapitalGainsProps> = ({stcgEquity, setStcgEquity, ltcgEquity, setLtcgEquity, stcgOther, setStcgOther, ltcgOther, setLtcgOther}) => {
    return(
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200">
            <h3 className="text-lg font-bold text-red-800 mb-4">Capital Gains from Stock Market (Annual)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        STCG - Equity Shares (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Short Term Capital Gains - Equity:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-red-300">• Definition:</span>
                                        <div className="ml-2">- Gains from equity shares held ≤ 12 months</div>
                                        <div className="ml-2">- Gains from equity mutual funds held ≤ 12 months</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-yellow-300">• Tax Rate:</span>
                                        <div className="ml-2">- 15% + 4% cess = 15.6% total</div>
                                        <div className="ml-2">- Taxed separately from other income</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-green-300">• Example:</span>
                                        <div className="ml-2">- Buy: ₹1L, Sell: ₹1.2L in 6 months</div>
                                        <div className="ml-2">- STCG: ₹20,000, Tax: ₹3,120</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={stcgEquity}
                        onChange={(e) => setStcgEquity(e.target.value)}
                    />
                    <p className="text-xs text-red-600 mt-1">
                        Equity/MF held ≤12 months - 15.6% tax rate
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        LTCG - Equity Shares (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Long Term Capital Gains - Equity:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-green-300">• Definition:</span>
                                        <div className="ml-2">- Gains from equity shares held &gt; 12 months</div>
                                        <div className="ml-2">- Gains from equity mutual funds held &gt; 12 months</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-blue-300">• Tax Structure:</span>
                                        <div className="ml-2">- First ₹1L per year: Tax-free</div>
                                        <div className="ml-2">- Above ₹1L: 10% + 4% cess = 10.4%</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-yellow-300">• Example:</span>
                                        <div className="ml-2">- LTCG: ₹1.5L, Tax: (₹1.5L-₹1L) × 10.4%</div>
                                        <div className="ml-2">- Tax: ₹50,000 × 10.4% = ₹5,200</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={ltcgEquity}
                        onChange={(e) => setLtcgEquity(e.target.value)}
                    />
                    <p className="text-xs text-green-600 mt-1">
                        Equity/MF held &gt;12 months - Rs.1L exempt, then 10.4%
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        STCG - Other Investments (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">STCG - Other Investments:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-purple-300">• Includes:</span>
                                        <div className="ml-2">- Debt mutual funds held ≤ 36 months</div>
                                        <div className="ml-2">- Gold, property, bonds held ≤ threshold</div>
                                        <div className="ml-2">- Cryptocurrency gains</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-orange-300">• Tax Rate:</span>
                                        <div className="ml-2">- Added to total income</div>
                                        <div className="ml-2">- Taxed at your regular income tax slab</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-blue-300">• Important:</span>
                                        <div className="ml-2">- No separate tax rate</div>
                                        <div className="ml-2">- Increases your total taxable income</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={stcgOther}
                        onChange={(e) => setStcgOther(e.target.value)}
                    />
                    <p className="text-xs text-purple-600 mt-1">
                        Debt MF, gold, crypto - taxed at your income slab
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        LTCG - Other Investments (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">LTCG - Other Investments:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-indigo-300">• Includes:</span>
                                        <div className="ml-2">- Debt mutual funds held &gt; 36 months</div>
                                        <div className="ml-2">- Gold held &gt; 36 months</div>
                                        <div className="ml-2">- Property held &gt; 24 months</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-green-300">• Tax Rate:</span>
                                        <div className="ml-2">- 20% + 4% cess = 20.8% total</div>
                                        <div className="ml-2">- With indexation benefit (inflation adjustment)</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-yellow-300">• Benefit:</span>
                                        <div className="ml-2">- Cost price adjusted for inflation</div>
                                        <div className="ml-2">- Reduces taxable gains significantly</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={ltcgOther}
                        onChange={(e) => setLtcgOther(e.target.value)}
                    />
                    <p className="text-xs text-indigo-600 mt-1">
                        Debt MF, gold, property &gt;threshold - 20.8% with indexation
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CapitalGains;