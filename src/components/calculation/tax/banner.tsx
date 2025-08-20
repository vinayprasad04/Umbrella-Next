import React from 'react';


const Banner = ()=>{
    return(
        <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 mb-8">
                    <span className="text-sm font-semibold text-green-600">Comprehensive Tax Calculator</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Indian Income Tax
                </span>
                    <br />
                    <span className="text-gray-800">Calculator</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                    Complete tax calculation with Old vs New regime comparison, HRA exemption,
                    all deductions under Chapter VI-A, and personalized tax planning advice.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">Old vs New</div>
                        <div className="text-gray-600">Regime Compare</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">HRA</div>
                        <div className="text-gray-600">Calculation</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">All</div>
                        <div className="text-gray-600">Deductions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">Smart</div>
                        <div className="text-gray-600">Planning</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;