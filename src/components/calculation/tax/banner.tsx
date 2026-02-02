import React from 'react';


const Banner = ()=>{
    return(
        <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-700 mb-8 transition-colors duration-300">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">Comprehensive Tax Calculator</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Indian Income Tax
                </span>
                    <br />
                    <span className="text-gray-800 dark:text-gray-100">Calculator</span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                    Complete tax calculation with Old vs New regime comparison, HRA exemption,
                    all deductions under Chapter VI-A, and personalized tax planning advice.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Old vs New</div>
                        <div className="text-gray-600 dark:text-gray-300">Regime Compare</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">HRA</div>
                        <div className="text-gray-600 dark:text-gray-300">Calculation</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">All</div>
                        <div className="text-gray-600 dark:text-gray-300">Deductions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Smart</div>
                        <div className="text-gray-600 dark:text-gray-300">Planning</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;