import React from  'react';



interface PersonalDetailsProps {
    assessmentYear: string;
    setAssessmentYear: (value: string) => void;
    entityType: string;
    age: string;
    setAge: (value: string) => void;
    gender: string;
    setGender: (value: string) => void;
    residentialStatus: string;
    setResidentialStatus: (value: string) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({assessmentYear, setAssessmentYear, entityType, age, setAge, gender, setGender, residentialStatus, setResidentialStatus}) => {
    return(
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Assessment Year
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Assessment Year vs Financial Year:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-green-300">• Financial Year (FY):</span>
                                        <div className="ml-2">- Period when income is earned (April 1 to March 31)</div>
                                        <div className="ml-2">- Example: FY 2024-25 = April 1, 2024 to March 31, 2025</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-yellow-300">• Assessment Year (AY):</span>
                                        <div className="ml-2">- Period when you file tax return for previous FY</div>
                                        <div className="ml-2">- Always next year after FY</div>
                                        <div className="ml-2">- Example: AY 2025-26 for income earned in FY 2024-25</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-blue-300">• Key Point:</span>
                                        <div className="ml-2">- Tax rules and slabs are based on the Assessment Year</div>
                                        <div className="ml-2">- Select the AY for which you want to calculate tax</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <select
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm font-medium transition-colors duration-300"
                        value={assessmentYear}
                        onChange={(e) => setAssessmentYear(e.target.value)}
                    >
                        <option value="2025-26">AY 2025-26 (FY 2024-25) - Current</option>
                        <option value="2024-25">AY 2024-25 (FY 2023-24)</option>
                        <option value="2023-24">AY 2023-24 (FY 2022-23)</option>
                        <option value="2022-23">AY 2022-23 (FY 2021-22)</option>
                    </select>
                    <p className="text-xs text-blue-600 mt-1">
                        💡 Different years have different tax slabs and rates
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(entityType === 'individual' || entityType === 'huf') && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Age
                            <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                    <div className="font-semibold mb-2">Age-Based Tax Benefits:</div>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-medium text-green-300">• Below 60 years:</span>
                                            <div className="ml-2">- Basic exemption: Rs.2.5L (Old Regime)</div>
                                            <div className="ml-2">- Health insurance: Rs.25,000 limit</div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-yellow-300">• 60-80 years (Senior Citizen):</span>
                                            <div className="ml-2">- Basic exemption: Rs.3L (Old Regime)</div>
                                            <div className="ml-2">- Health insurance: Rs.50,000 limit</div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-orange-300">• Above 80 years (Super Senior):</span>
                                            <div className="ml-2">- Basic exemption: Rs.5L (Old Regime)</div>
                                            <div className="ml-2">- Health insurance: Rs.50,000 limit</div>
                                            <div className="ml-2">- Additional medical benefits</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {parseInt(age) >= 80 ? 'Super Senior: Rs.5L exemption, Rs.50K health insurance' :
                                parseInt(age) >= 60 ? 'Senior Citizen: Rs.3L exemption, Rs.50K health insurance' :
                                    'Below 60: Rs.2.5L exemption, Rs.25K health insurance'}
                        </p>
                    </div>
                )}
                {(entityType === 'individual' || entityType === 'huf') && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Gender
                            <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                    <div className="font-semibold mb-2">Gender & Tax Implications:</div>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-medium text-green-300">• Tax Slabs:</span>
                                            <div className="ml-2">- Same tax rates for all genders</div>
                                            <div className="ml-2">- No gender-based exemptions</div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-300">• Equal Treatment:</span>
                                            <div className="ml-2">- Indian tax law is gender-neutral</div>
                                            <div className="ml-2">- Age is the only demographic factor</div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-yellow-300">• Collection Purpose:</span>
                                            <div className="ml-2">- Required for tax filing compliance</div>
                                            <div className="ml-2">- Used for statistical analysis only</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </label>
                        <select
                            className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            💡 Gender does not affect tax rates - all citizens have equal tax treatment
                        </p>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Residential Status
                        <div className="group relative inline-block ml-1">
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                <div className="font-semibold mb-2">Tax Implications:</div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-green-300">• Resident:</span>
                                        <div className="ml-2">- Taxed on worldwide income</div>
                                        <div className="ml-2">- All deductions available</div>
                                        <div className="ml-2">- Standard exemption limits</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-orange-300">• Non-Resident:</span>
                                        <div className="ml-2">- Taxed only on Indian income</div>
                                        <div className="ml-2">- Limited deductions</div>
                                        <div className="ml-2">- No basic exemption</div>
                                        <div className="ml-2">- Tax from Rs.1 (no Rs.2.5L exemption)</div>
                                    </div>
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </label>
                    <select
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={residentialStatus}
                        onChange={(e) => setResidentialStatus(e.target.value)}
                    >
                        <option value="resident">Resident Indian</option>
                        <option value="nri">Non-Resident Indian (NRI)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        {residentialStatus === 'nri' ? 'NRIs: Taxed on Indian income only, no basic exemption' : 'Residents: Taxed on global income with full exemptions'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails;