
import React from 'react';

interface IncomeDetailsProps {
    entityType: string;
    basicSalary: string;
    setBasicSalary: (value: string) => void;
    hra: string;
    setHra: (value: string) => void;
    specialAllowance: string;
    setSpecialAllowance: (value: string) => void;
    otherAllowances: string;
    setOtherAllowances: (value: string) => void;
    bonus: string;
    setBonus: (value: string) => void;
    otherIncome: string;
    setOtherIncome: (value: string) => void;
    housePropertyIncome: string;
    setHousePropertyIncome: (value: string) => void;
}

const IncomeDetails: React.FC<IncomeDetailsProps> = ({entityType, basicSalary, setBasicSalary, hra, setHra,
                           specialAllowance, setSpecialAllowance, otherAllowances, setOtherAllowances,
                           bonus, setBonus,otherIncome, setOtherIncome, housePropertyIncome, setHousePropertyIncome }) => {
    return(
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 mb-4">
                {entityType === 'individual' || entityType === 'huf' ? 'Income Details (Annual)' :
                    entityType === 'firm' ? 'Business Income (Annual)' :
                        'Corporate Income (Annual)'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(entityType === 'individual' || entityType === 'huf') && (
                    <>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Basic Salary (Rs.)
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">Basic Salary Component:</div>
                                        <div className="space-y-2">
                                            <div><strong>What is Basic Salary:</strong></div>
                                            <div>• Fixed component of your salary package</div>
                                            <div>• Typically 40-50% of total CTC</div>
                                            <div>• Base for calculating other benefits (PF, gratuity, etc.)</div>
                                            <div className="mt-2"><strong>Includes:</strong></div>
                                            <div>• Monthly basic pay × 12 months</div>
                                            <div>• Fixed allowances integrated into basic pay</div>
                                            <div className="mt-2"><strong>Excludes:</strong></div>
                                            <div>• HRA, special allowances, bonuses</div>
                                            <div>• Variable pay or performance incentives</div>
                                            <div>• Reimbursements and perquisites</div>
                                            <div className="mt-2"><strong>Tax Impact:</strong></div>
                                            <div>• Fully taxable income</div>
                                            <div>• Used for HRA exemption calculation (50%/40% of basic)</div>
                                            <div className="mt-2 pt-2 border-t border-gray-600">
                                                <strong>Important:</strong> Higher basic = Higher HRA exemption potential<br/>
                                                <strong>PF Contribution:</strong> 12% of basic salary (up to Rs.1.8L basic)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                HRA (Rs.)
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">House Rent Allowance (HRA):</div>
                                        <div className="space-y-2">
                                            <div><strong>What is HRA:</strong></div>
                                            <div>• Allowance paid by employer for rental accommodation</div>
                                            <div>• Usually 40-50% of basic salary</div>
                                            <div>• Partially exempt from income tax</div>
                                            <div className="mt-2"><strong>HRA Exemption (minimum of):</strong></div>
                                            <div>• Actual HRA received</div>
                                            <div>• 50% of basic (metro) or 40% of basic (non-metro)</div>
                                            <div>• Rent paid minus 10% of basic salary</div>
                                            <div className="mt-2"><strong>Required Documents:</strong></div>
                                            <div>• Rent receipts from landlord</div>
                                            <div>• Rental agreement copy</div>
                                            <div>• Landlord&apos;s PAN (if rent &gt;Rs.1L annually)</div>
                                            <div className="mt-2"><strong>Key Points:</strong></div>
                                            <div>• Even if living in own house, HRA is still taxable</div>
                                            <div>• Can claim HRA + home loan deduction together</div>
                                            <div className="mt-2 pt-2 border-t border-gray-600">
                                                <strong>Tax Benefit:</strong> Significant exemption for rent payers<br/>
                                                <strong>Tip:</strong> Higher rent = Higher exemption (up to limits)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={hra}
                                onChange={(e) => setHra(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Special Allowance (Rs.)
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">Special Allowance Component:</div>
                                        <div className="space-y-2">
                                            <div><strong>What is Special Allowance:</strong></div>
                                            <div>• Flexible component of salary package</div>
                                            <div>• Often called &quot;flexi pay&quot; or &quot;other allowances&quot;</div>
                                            <div>• Used to balance total CTC after basic + HRA</div>
                                            <div className="mt-2"><strong>Common Types:</strong></div>
                                            <div>• Performance allowance</div>
                                            <div>• City compensatory allowance</div>
                                            <div>• Special skill allowance</div>
                                            <div>• Retention allowance</div>
                                            <div className="mt-2"><strong>Tax Treatment:</strong></div>
                                            <div>• <strong>Fully taxable</strong> as salary income</div>
                                            <div>• No specific exemptions available</div>
                                            <div>• Subject to TDS as per applicable rates</div>
                                            <div className="mt-2"><strong>Salary Planning:</strong></div>
                                            <div>• Can be restructured for tax optimization</div>
                                            <div>• Often converted to benefits like meal vouchers</div>
                                            <div className="mt-2 pt-2 border-t border-gray-600">
                                                <strong>Note:</strong> Different from reimbursements or perquisites<br/>
                                                <strong>Planning:</strong> Consider salary restructuring to reduce tax
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={specialAllowance}
                                onChange={(e) => setSpecialAllowance(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Other Allowances (Rs.)
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">Other Allowances & Benefits:</div>
                                        <div className="space-y-2">
                                            <div><strong>Common Allowances:</strong></div>
                                            <div>• Transport/Conveyance allowance</div>
                                            <div>• Medical allowance</div>
                                            <div>• Communication/Phone allowance</div>
                                            <div>• Dearness allowance (DA)</div>
                                            <div>• Travel allowance</div>
                                            <div>• Overtime allowance</div>
                                            <div className="mt-2"><strong>Partially Exempt Allowances:</strong></div>
                                            <div>• <strong>Transport:</strong> Rs.1,600/month (Rs.19,200 annual)</div>
                                            <div>• <strong>Medical:</strong> Rs.15,000/year</div>
                                            <div>• <strong>LTA:</strong> For actual travel expenses</div>
                                            <div className="mt-2"><strong>Fully Taxable:</strong></div>
                                            <div>• Dearness allowance</div>
                                            <div>• Overtime payments</div>
                                            <div>• Performance incentives</div>
                                            <div className="mt-2"><strong>Documentation:</strong></div>
                                            <div>• Keep receipts for reimbursement claims</div>
                                            <div>• Check salary slip for exact breakup</div>
                                            <div className="mt-2 pt-2 border-t border-gray-600">
                                                <strong>Tax Planning:</strong> Structure allowances for optimal exemptions<br/>
                                                <strong>Tip:</strong> Utilize transport & medical allowance limits fully
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={otherAllowances}
                                onChange={(e) => setOtherAllowances(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Bonus (Rs.)
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">Bonus & Variable Pay:</div>
                                        <div className="space-y-2">
                                            <div><strong>Types of Bonus:</strong></div>
                                            <div>• Annual performance bonus</div>
                                            <div>• Statutory bonus (under Payment of Bonus Act)</div>
                                            <div>• Festival/Diwali bonus</div>
                                            <div>• Retention bonus</div>
                                            <div>• Variable pay/incentives</div>
                                            <div>• Commission on sales</div>
                                            <div className="mt-2"><strong>Statutory Bonus Rules:</strong></div>
                                            <div>• Minimum 8.33% of salary (up to Rs.21,000 salary limit)</div>
                                            <div>• Maximum Rs.7,000 per year</div>
                                            <div>• Only for employees earning ≤Rs.21,000/month</div>
                                            <div className="mt-2"><strong>Tax Treatment:</strong></div>
                                            <div>• <strong>Fully taxable</strong> as salary income</div>
                                            <div>• Subject to TDS if applicable</div>
                                            <div>• Added to total income for tax slab calculation</div>
                                            <div className="mt-2"><strong>Payment Timing:</strong></div>
                                            <div>• Taxable in the year of receipt</div>
                                            <div>• May push you to higher tax bracket</div>
                                            <div className="mt-2 pt-2 border-t border-gray-600">
                                                <strong>Planning:</strong> Plan investments if bonus increases tax liability<br/>
                                                <strong>TDS:</strong> Employer may deduct TDS on bonus payments
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={bonus}
                                onChange={(e) => setBonus(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {/* Business Income Fields for Firm/Company */}
                {(entityType === 'firm' || entityType === 'company') && (
                    <>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {entityType === 'firm' ? 'Partnership Income (Rs.)' : 'Corporate Turnover (Rs.)'}
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">{entityType === 'firm' ? 'Partnership Firm Income:' : 'Corporate Income:'}</div>
                                        <div className="space-y-2">
                                            {entityType === 'firm' ? (
                                                <>
                                                    <div><strong>Partnership Income:</strong></div>
                                                    <div>• Total profit/income of the firm</div>
                                                    <div>• After all business expenses</div>
                                                    <div>• Before partner remuneration</div>
                                                    <div className="mt-2"><strong>Tax Treatment:</strong></div>
                                                    <div>• Flat 30% tax rate</div>
                                                    <div>• No personal exemptions</div>
                                                    <div>• Partners taxed separately on their share</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div><strong>Corporate Turnover:</strong></div>
                                                    <div>• Total business revenue/turnover</div>
                                                    <div>• Before deducting expenses</div>
                                                    <div className="mt-2"><strong>Tax Rates:</strong></div>
                                                    <div>• Turnover ≤Rs.400 crore: 25% + cess</div>
                                                    <div>• Turnover &gt;₹400 crore: 30% + cess</div>
                                                    <div>• Different rates for new companies</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                placeholder={entityType === 'firm' ? 'e.g., 2500000' : 'e.g., 50000000'}
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {entityType === 'firm' ? 'Business Expenses (₹)' : 'Operating Expenses (₹)'}
                                <div className="group relative inline-block ml-1">
                                    <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                        <div className="font-semibold mb-2">Business Expenses:</div>
                                        <div className="space-y-2">
                                            <div><strong>Deductible Expenses:</strong></div>
                                            <div>• Office rent, utilities, staff salaries</div>
                                            <div>• Raw materials, manufacturing costs</div>
                                            <div>• Professional fees, audit costs</div>
                                            <div>• Depreciation on assets</div>
                                            <div>• Interest on business loans</div>
                                            <div className="mt-2"><strong>Tax Benefit:</strong></div>
                                            <div>• Reduces taxable business income</div>
                                            <div>• Must be business-related expenses</div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="number"
                                placeholder={entityType === 'firm' ? 'e.g., 800000' : 'e.g., 15000000'}
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                                value={hra}
                                onChange={(e) => setHra(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Other Income (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Income from Other Sources:</div>
                                <div className="space-y-2">
                                    <div><strong>Interest Income:</strong></div>
                                    <div>• Savings account interest (&gt;₹10,000 - claim 80TTA)</div>
                                    <div>• Fixed deposits, recurring deposits</div>
                                    <div>• Bonds, debentures, and securities</div>
                                    <div>• Company deposits and loan interest</div>
                                    <div className="mt-2"><strong>Dividend Income:</strong></div>
                                    <div>• Dividend from shares (fully taxable)</div>
                                    <div>• Mutual fund dividend distributions</div>
                                    <div>• Cooperative society dividends</div>
                                    <div className="mt-2"><strong>Agriculture Income:</strong></div>
                                    <div>• <strong>Exempt from tax</strong> if below ₹5,000</div>
                                    <div>• Above ₹5,000: Used for rate calculation only</div>
                                    <div>• Income from land cultivation, dairy, etc.</div>
                                    <div className="mt-2"><strong>Lottery/Gambling Winnings:</strong></div>
                                    <div>• <strong>TDS: 30%</strong> deducted at source</div>
                                    <div>• <strong>Tax Rate: 30%</strong> (flat rate, no exemption)</div>
                                    <div>• Includes lottery, crossword, card games, races</div>
                                    <div>• Prize money from TV shows, competitions</div>
                                    <div className="mt-2"><strong>Other Income:</strong></div>
                                    <div>• Freelancing and consultation fees</div>
                                    <div>• Rental income from property</div>
                                    <div>• Commission and brokerage income</div>
                                    <div>• Royalty and intellectual property income</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Key Point:</strong> Agriculture income exempt but affects tax rates<br/>
                                        <strong>Lottery TDS:</strong> 30% TDS + 30% final tax (no relief)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Income from House Property (₹)
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Income from House Property (Section 24a):</div>
                                <div className="space-y-2">
                                    <div><strong>What to Enter:</strong></div>
                                    <div>• <strong>Net rental income</strong> after 30% standard deduction</div>
                                    <div>• This field is for income AFTER standard deduction</div>
                                    <div>• Do NOT enter gross rental income here</div>
                                    <div className="mt-2"><strong>Standard Deduction (Section 24a):</strong></div>
                                    <div>• <strong>30% deduction</strong> automatically allowed by law</div>
                                    <div>• Covers property repairs, collection charges, etc.</div>
                                    <div>• You don&apos;t need to provide receipts for this</div>
                                    <div className="mt-2"><strong>Calculation Example:</strong></div>
                                    <div>• Gross rental income: ₹1,00,000</div>
                                    <div>• Less: 30% standard deduction: ₹30,000</div>
                                    <div>• <strong>Enter here: ₹70,000</strong></div>
                                    <div className="mt-2"><strong>Additional Deductions:</strong></div>
                                    <div>• Home loan interest can be claimed separately</div>
                                    <div>• Municipal taxes paid can be deducted</div>
                                    <div>• For let-out property only</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                        <strong>Important:</strong> Enter net income after 30% deduction<br/>
                                        <strong>Tax Treatment:</strong> Added to total income for slab calculation
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="number"
                        placeholder="After 30% deduction, e.g., 70000"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={housePropertyIncome}
                        onChange={(e) => setHousePropertyIncome(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Enter income AFTER 30% standard deduction as per Section 24(a)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default IncomeDetails;