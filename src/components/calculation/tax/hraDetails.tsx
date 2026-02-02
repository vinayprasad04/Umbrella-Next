
import React from 'react';

interface HRADetailsProps {
    cityType: string;
    setCityType: (value: string) => void;
    setShowCityListModal: (value: boolean) => void;
    rentPaid: string;
    setRentPaid: (value: string) => void;
}

const HRADetails: React.FC<HRADetailsProps> = ({cityType, setCityType, setShowCityListModal, rentPaid, setRentPaid}) => {
    return(
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4">HRA Exemption Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City Type</label>
                    <select
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={cityType}
                        onChange={(e) => setCityType(e.target.value)}
                    >
                        <option value="metro">Metro City (50% of Basic)</option>
                        <option value="non-metro">Non-Metro City (40% of Basic)</option>
                    </select>
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() => setShowCityListModal(true)}
                            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none flex items-center gap-1"
                        >
                            View Metro vs Non-Metro City List
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Annual Rent Paid (₹)</label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] dark:focus:border-[#FF6B2C] text-sm transition-colors duration-300"
                        value={rentPaid}
                        onChange={(e) => setRentPaid(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default HRADetails;

