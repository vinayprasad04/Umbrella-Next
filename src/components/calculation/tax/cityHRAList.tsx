import React from 'react';

interface CityWiseHRAListProps {
    setShowCityListModal: (value: boolean) => void;
}

const CityWiseHRAList: React.FC<CityWiseHRAListProps> = ({setShowCityListModal}) => {
    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            🏙️ Metro vs Non-Metro Cities for HRA Exemption
                        </h2>
                        <button
                            onClick={() => setShowCityListModal(false)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="space-y-6">
                        {/* Overview */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                            <h3 className="font-bold text-blue-800 mb-2">📋 HRA Exemption Rules:</h3>
                            <div className="text-sm text-blue-700 space-y-1">
                                <div>• <strong>Metro Cities:</strong> 50% of Basic Salary exemption limit</div>
                                <div>• <strong>Non-Metro Cities:</strong> 40% of Basic Salary exemption limit</div>
                                <div>• HRA exemption = Minimum of (HRA received, 50%/40% of Basic, Rent - 10% of Basic)</div>
                            </div>
                        </div>

                        {/* City Lists */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Metro Cities */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    🏙️ Metro Cities (50% HRA exemption)
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-white/80 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-700 mb-2">Tier 1 Metro Cities:</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                <span>Mumbai</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                <span>Delhi</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                <span>Kolkata</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                <span>Chennai</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/80 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-700 mb-2">Other Major Metro Cities:</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                <span>Bangalore</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                <span>Hyderabad</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                <span>Ahmedabad</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                <span>Pune</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Non-Metro Cities */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                                    🏘️ Non-Metro Cities (40% HRA exemption)
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-white/80 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-700 mb-2">Definition:</h4>
                                        <p className="text-sm text-green-600 mb-3">All cities in India except the 8 metro cities listed on the left</p>

                                        <h4 className="font-semibold text-green-700 mb-2">Popular Non-Metro Cities:</h4>
                                        <div className="grid grid-cols-1 gap-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Jaipur, Lucknow, Kanpur, Agra</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Indore, Bhopal, Nagpur, Surat</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Coimbatore, Kochi, Mysore, Trichy</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Chandigarh, Vadodara, Rajkot</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Visakhapatnam, Nashik, Guwahati</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Bhubaneswar, Dehradun, Shimla</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
                            <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                💡 Important Notes
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                                <div>
                                    <div className="font-semibold mb-1">📍 How to Choose:</div>
                                    <div>If your city is NOT in the metro list (left column), select &quot;Non-Metro City&quot; for accurate HRA calculation.</div>
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">🏢 Employer Policy:</div>
                                    <div>Some employers may have different classifications. Check your HR policy for company-specific rules.</div>
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">📅 Updates:</div>
                                    <div>This list is based on current income tax rules and may be updated by the government periodically.</div>
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">🧮 Calculation:</div>
                                    <div>The HRA exemption is calculated as the minimum of the three values mentioned above.</div>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="text-center pt-4">
                            <button
                                onClick={() => setShowCityListModal(false)}
                                className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Got it, Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CityWiseHRAList;