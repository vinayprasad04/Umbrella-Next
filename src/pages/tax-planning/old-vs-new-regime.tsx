import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OldVsNewRegime() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [entityType, setEntityType] = useState('individual');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Old vs New Tax Regime Comparison FY 2025-26 - Zero Tax up to ₹12L | Umbrella Financial</title>
        <meta name="description" content="Updated old vs new tax regime comparison FY 2025-26. New regime offers zero tax up to ₹12L with ₹60,000 rebate. Compare with examples & calculator." />
        <meta name="keywords" content="old tax regime, new tax regime, tax comparison, tax calculator, Section 80C, rebate, tax planning, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://umbrella.com/tax-planning/old-vs-new-regime" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-slate-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-50 to-gray-50 rounded-full border border-slate-200 mb-6">
                <span className="text-sm font-semibold text-slate-600">⚖️ Tax Regime Comparison</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Old vs New Tax Regime
                </span>
                <br />
                <span className="text-gray-800">FY 2025-26 Revolution</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Revolutionary update for FY 2025-26! New regime now offers complete tax exemption up to ₹12 lakh with ₹60,000 rebate. Compare regimes with updated examples.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Compare Tax Regimes
                </button>
                <button
                  onClick={() => router.push('/tax-planning')}
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  View All Tax Tips
                </button>
              </div>
            </div>
          </section>

          {/* Entity Type Selection */}
          <section className="py-8 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🏢 Select Your Entity Type</h2>
                <p className="text-gray-600">Different entities have different tax rules and regime options</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { id: 'individual', label: 'Individual', icon: '👤', description: 'Personal Tax Filing' },
                  { id: 'huf', label: 'HUF', icon: '👨‍👩‍👧‍👦', description: 'Hindu Undivided Family' },
                  { id: 'firm', label: 'Firm', icon: '🤝', description: 'Partnership Firm' },
                  { id: 'company', label: 'Company', icon: '🏢', description: 'Corporate Entity' }
                ].map((entity) => (
                  <button
                    key={entity.id}
                    onClick={() => setEntityType(entity.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      entityType === entity.id
                        ? 'border-[#FF6B2C] bg-orange-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{entity.icon}</div>
                      <div className={`font-semibold text-sm ${
                        entityType === entity.id ? 'text-[#FF6B2C]' : 'text-gray-700'
                      }`}>
                        {entity.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{entity.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="space-y-8">
                {/* Tax Rates Comparison */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                    ⚖️ {entityType === 'individual' ? 'Personal Tax Rates Comparison' :
                         entityType === 'huf' ? 'HUF Tax Rates Comparison' :
                         entityType === 'firm' ? 'Partnership Firm Tax Structure' :
                         'Corporate Tax Structure'}
                  </h2>
                  <p className="text-lg text-slate-700 mb-6">
                    {entityType === 'individual' || entityType === 'huf' ? 
                      'Compare income tax slabs and rates between old and new tax regimes for FY 2025-26 with revolutionary Section 87A benefits.' :
                      entityType === 'firm' ? 
                        'Partnership firms follow a fixed tax structure with no regime choice. Partners are taxed separately on their income share.' :
                        'Corporate entities have specific tax rates based on turnover, with no old vs new regime choice.'}
                  </p>

                  {/* Warning for Firm/Company */}
                  {(entityType === 'firm' || entityType === 'company') && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-600 font-semibold">⚠️ Important:</span>
                      </div>
                      <p className="text-yellow-800">
                        {entityType === 'firm' ? 
                          'Partnership firms do not have old vs new regime choice. They follow a flat 30% tax structure.' :
                          'Companies do not have old vs new regime choice. Corporate tax rates are based on turnover and company type.'}
                      </p>
                    </div>
                  )}
                  
                  {/* Individual/HUF Tax Slabs */}
                  {(entityType === 'individual' || entityType === 'huf') && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        🏛️ {entityType === 'individual' ? 'Old Tax Regime' : 'HUF Tax Structure (Old Regime)'}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Up to ₹2.5 lakh</span>
                          <span className="font-bold text-green-600">0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-medium">₹2.5L - ₹5L</span>
                          <span className="font-bold text-yellow-600">5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">₹5L - ₹10L</span>
                          <span className="font-bold text-orange-600">20%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Above ₹10L</span>
                          <span className="font-bold text-red-600">30%</span>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Available Deductions</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <div>• Section 80C: ₹1.5 lakh</div>
                            <div>• Section 80D: ₹25,000-₹50,000</div>
                            <div>• HRA, LTA, and other allowances</div>
                            <div>• Standard deduction: ₹75,000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🆕 New Tax Regime</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Up to ₹3 lakh</span>
                          <span className="font-bold text-green-600">0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">₹3L - ₹6L</span>
                          <span className="font-bold text-blue-600">5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">₹6L - ₹9L</span>
                          <span className="font-bold text-purple-600">10%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-medium">₹9L - ₹12L</span>
                          <span className="font-bold text-yellow-600">15%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">₹12L - ₹15L</span>
                          <span className="font-bold text-orange-600">20%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Above ₹15L</span>
                          <span className="font-bold text-red-600">30%</span>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">FY 2025-26 Revolutionary Benefits</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <div>• Standard deduction: ₹75,000</div>
                            <div>• NPS employer contribution: ₹50,000</div>
                            <div>🎉 <strong>Section 87A: ₹60,000 rebate up to ₹12L income</strong></div>
                            <div>🎯 <strong>Zero tax up to ₹12 lakh income!</strong></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Partnership Firm Tax Structure */}
                  {entityType === 'firm' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🤝 Partnership Firm Tax Structure</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">Tax Rate on All Income</span>
                          <span className="font-bold text-purple-600">30%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Health & Education Cess</span>
                          <span className="font-bold text-red-600">4%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">Total Effective Rate</span>
                          <span className="font-bold text-orange-600">31.2%</span>
                        </div>
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
                          <div className="text-sm text-purple-700 space-y-1">
                            <div>• No basic exemption - tax from ₹1</div>
                            <div>• Partner remuneration allowed</div>
                            <div>• Interest on capital (max 12%)</div>
                            <div>• Business expenses deductible</div>
                            <div>• No personal deductions (80C, 80D)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gray-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Partner Taxation</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Individual Partner Tax</h4>
                          <div className="text-sm text-blue-700 space-y-1">
                            <div>• Partners taxed separately on their share</div>
                            <div>• Share of profit is taxable income</div>
                            <div>• Remuneration is also taxable</div>
                            <div>• Can choose old/new regime for personal tax</div>
                          </div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">Compliance</h4>
                          <div className="text-sm text-yellow-700 space-y-1">
                            <div>• Firm files separate return</div>
                            <div>• Partners file individual returns</div>
                            <div>• Advance tax applicable</div>
                            <div>• Audit required if turnover &gt; ₹1 Cr</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Company Tax Structure */}
                  {entityType === 'company' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🏢 Corporate Tax Structure</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Turnover ≤ ₹400 Crore</span>
                          <span className="font-bold text-green-600">25%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">Turnover &gt; ₹400 Crore</span>
                          <span className="font-bold text-orange-600">30%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Health & Education Cess</span>
                          <span className="font-bold text-red-600">4%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">MAT (if applicable)</span>
                          <span className="font-bold text-purple-600">18.5%</span>
                        </div>
                        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Available Deductions</h4>
                          <div className="text-sm text-indigo-700 space-y-1">
                            <div>• Depreciation as per IT rates</div>
                            <div>• CSR expenses (2% of profit)</div>
                            <div>• Operating expenses</div>
                            <div>• Interest on borrowings</div>
                            <div>• Bad debts and provisions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Corporate Compliance</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Tax Rates Based On:</h4>
                          <div className="text-sm text-blue-700 space-y-1">
                            <div>• Annual turnover threshold</div>
                            <div>• Domestic vs foreign company</div>
                            <div>• New company benefits available</div>
                            <div>• Section 115BAA: 25% for new cos.</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <div>• Dividend Distribution Tax abolished</div>
                            <div>• Lower rates for manufacturing</div>
                            <div>• Carry forward of losses</div>
                            <div>• Set-off against future profits</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* Detailed Comparison */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    📊 {entityType === 'individual' ? 'Side-by-Side Feature Comparison' :
                         entityType === 'huf' ? 'HUF vs Individual Tax Comparison' :
                         entityType === 'firm' ? 'Partnership Firm Tax Details' :
                         'Corporate Tax Structure Details'}
                  </h2>
                  
                  <div className="overflow-x-auto">
                    {/* Individual/HUF Comparison Table */}
                    {(entityType === 'individual' || entityType === 'huf') && (
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-4 text-left font-semibold">Feature</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-blue-700">
                            {entityType === 'individual' ? 'Old Regime' : 'HUF Tax Structure (Old)'}
                          </th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-green-700">
                            {entityType === 'individual' ? 'New Regime' : 'HUF Tax Structure (New)'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Tax-free income limit</td>
                          <td className="border border-gray-300 p-4 text-center">₹2.5 lakh</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">₹3 lakh</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Standard deduction</td>
                          <td className="border border-gray-300 p-4 text-center">₹75,000</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">₹75,000</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Section 80C deductions</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">₹1.5 lakh</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Health insurance (80D)</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">₹25K-₹50K</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">HRA exemption</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">{entityType === 'individual' ? 'Available' : 'N/A for HUF'}</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">87A rebate limit (FY 2025-26)</td>
                          <td className="border border-gray-300 p-4 text-center">₹12,500 (₹5L income)</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600"><strong>₹60,000 (₹12L income)</strong></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Education loan interest</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Unlimited (80E)</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        {entityType === 'huf' && (
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Property income exemption</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Available (24(a))</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Available (24(a))</td>
                        </tr>
                        )}
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-4 font-medium"><strong>🎉 Zero Tax Income (FY 2025-26)</strong></td>
                          <td className="border border-gray-300 p-4 text-center">Up to ₹6.5L (with deductions)</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600"><strong>Up to ₹12L (complete exemption!)</strong></td>
                        </tr>
                      </tbody>
                    </table>
                    )}

                    {/* Partnership Firm Table */}
                    {entityType === 'firm' && (
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-4 text-left font-semibold">Feature</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-purple-700">Partnership Firm Structure</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-gray-700">Partner Individual Tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Tax rate on firm income</td>
                          <td className="border border-gray-300 p-4 text-center text-purple-600"><strong>30% + 4% Cess = 31.2%</strong></td>
                          <td className="border border-gray-300 p-4 text-center">N/A (Firm level)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Basic exemption</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">None (tax from ₹1)</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Available (Partner&apos;s share)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Personal deductions (80C, 80D)</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not available</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Available for partners</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Partner remuneration</td>
                          <td className="border border-gray-300 p-4 text-center text-purple-600">Allowed (business expense)</td>
                          <td className="border border-gray-300 p-4 text-center text-orange-600">Taxable in partner&apos;s hands</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Interest on capital</td>
                          <td className="border border-gray-300 p-4 text-center text-purple-600">Max 12% allowed</td>
                          <td className="border border-gray-300 p-4 text-center text-orange-600">Taxable in partner&apos;s hands</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Double taxation</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">No (pass-through entity)</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Partners taxed on share</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-4 font-medium"><strong>⚠️ Regime Choice</strong></td>
                          <td className="border border-gray-300 p-4 text-center text-red-600"><strong>No choice - Fixed 30%</strong></td>
                          <td className="border border-gray-300 p-4 text-center text-green-600"><strong>Partners can choose regime</strong></td>
                        </tr>
                      </tbody>
                    </table>
                    )}

                    {/* Company Table */}
                    {entityType === 'company' && (
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-4 text-left font-semibold">Feature</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-indigo-700">Domestic Company</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-blue-700">Additional Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Tax rate (Turnover ≤ ₹400 Cr)</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600"><strong>25% + 4% Cess = 26%</strong></td>
                          <td className="border border-gray-300 p-4 text-center">For eligible companies</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Tax rate (Turnover &gt; ₹400 Cr)</td>
                          <td className="border border-gray-300 p-4 text-center text-orange-600"><strong>30% + 4% Cess = 31.2%</strong></td>
                          <td className="border border-gray-300 p-4 text-center">Standard rate</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">New company rate (115BAA)</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600"><strong>25% + 4% Cess = 26%</strong></td>
                          <td className="border border-gray-300 p-4 text-center">With conditions</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Manufacturing company (115BAB)</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600"><strong>15% + 4% Cess = 15.6%</strong></td>
                          <td className="border border-gray-300 p-4 text-center">New manufacturing units</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Minimum Alternate Tax (MAT)</td>
                          <td className="border border-gray-300 p-4 text-center text-purple-600">18.5% + 4% Cess = 19.25%</td>
                          <td className="border border-gray-300 p-4 text-center">On book profits</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Dividend tax</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">No DDT (shareholders taxed)</td>
                          <td className="border border-gray-300 p-4 text-center">Classic system</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-4 font-medium"><strong>⚠️ Regime Choice</strong></td>
                          <td className="border border-gray-300 p-4 text-center text-red-600"><strong>No old vs new regime</strong></td>
                          <td className="border border-gray-300 p-4 text-center">Fixed corporate rates</td>
                        </tr>
                      </tbody>
                    </table>
                    )}
                  </div>
                </div>

                {/* Calculation Examples */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                    💰 {entityType === 'individual' || entityType === 'huf' ? 'Tax Calculation Examples (Updated for FY 2025-26)' :
                         entityType === 'firm' ? 'Partnership Firm Tax Examples' :
                         'Corporate Tax Calculation Examples'}
                  </h2>
                  
                  {/* Individual/HUF Examples */}
                  {(entityType === 'individual' || entityType === 'huf') && (
                  <>
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-4 text-center">🎉 FY 2025-26 Revolutionary Example</h3>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-3">💰 {entityType === 'individual' ? 'Individual' : 'HUF'} Income: ₹12 Lakh - Complete Tax Exemption!</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">{entityType === 'individual' ? 'Old Regime' : 'HUF Tax (Old Structure)'}</h5>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹12,00,000</div>
                            <div>80C + 80D: ₹1,75,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹9,50,000</div>
                            <div className="font-bold text-blue-600">Tax: ₹1,50,000</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">{entityType === 'individual' ? 'New Regime' : 'HUF Tax (New Structure)'} (FY 2025-26)</h5>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹12,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹11,25,000</div>
                            <div>Tax Calculated: ₹60,000</div>
                            <div className="font-bold text-green-600">After 87A Rebate: ₹0</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-4 p-3 bg-green-100 rounded-lg">
                        <span className="text-lg font-bold text-green-700">💰 SAVE ₹1,50,000 with New Regime!</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example 1 - Low Income */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Income: ₹6 Lakh</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Old Structure</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹6,00,000</div>
                            <div>80C Investment: ₹1,50,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹3,75,000</div>
                            <div>Tax: ₹6,250</div>
                            <div className="font-bold text-green-600">After 87A Rebate: ₹0</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">New Structure (FY 2025-26)</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹6,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹5,25,000</div>
                            <div>Tax: ₹11,250</div>
                            <div className="font-bold text-green-600">After 87A Rebate: ₹0</div>
                          </div>
                        </div>
                        <div className="text-center font-bold text-lg text-green-600">
                          Winner: Both Equal (₹0 tax)
                        </div>
                      </div>
                    </div>

                    {/* Example 2 - Medium Income */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Income: ₹10 Lakh</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Old Structure</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹10,00,000</div>
                            <div>80C + 80D: ₹1,75,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹7,50,000</div>
                            <div className="font-bold text-blue-600">Tax: ₹1,00,000</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">New Structure (FY 2025-26)</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹10,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹9,25,000</div>
                            <div>Tax: ₹52,500</div>
                            <div className="font-bold text-green-600">After 87A Rebate: ₹0</div>
                          </div>
                        </div>
                        <div className="text-center font-bold text-lg text-green-600">
                          Winner: New Structure (₹1,00,000 saved!)
                        </div>
                      </div>
                    </div>

                    {/* Example 3 - High Income */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Income: ₹20 Lakh</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Old Structure</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹20,00,000</div>
                            <div>80C + 80D + Others: ₹3,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹16,25,000</div>
                            <div className="font-bold text-blue-600">Tax: ₹2,87,500</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">New Structure (FY 2025-26)</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹20,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹19,25,000</div>
                            <div className="font-bold text-green-600">Tax: ₹2,85,000</div>
                          </div>
                        </div>
                        <div className="text-center font-bold text-lg text-green-600">
                          Winner: New Structure (₹2,500 saved)
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                  )}

                  {/* Partnership Firm Examples */}
                  {entityType === 'firm' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">🤝 Partnership Firm - ₹10 Lakh Profit</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-purple-800 mb-3">At Firm Level</h4>
                          <div className="text-sm space-y-2">
                            <div>Business Income: ₹10,00,000</div>
                            <div>Partner A Remuneration: ₹3,00,000</div>
                            <div>Partner B Remuneration: ₹2,00,000</div>
                            <div>Interest on Capital (12%): ₹1,00,000</div>
                            <div className="border-t pt-2 mt-2">
                              <div>Net Profit: ₹4,00,000</div>
                              <div className="font-bold text-purple-600">Tax on Firm @ 31.2%: ₹1,24,800</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-blue-800 mb-3">Partner A Individual Tax</h4>
                          <div className="text-sm space-y-2">
                            <div>Share of Profit (50%): ₹2,00,000</div>
                            <div>Remuneration Received: ₹3,00,000</div>
                            <div>Interest on Capital: ₹60,000</div>
                            <div className="border-t pt-2 mt-2">
                              <div>Total Income: ₹5,60,000</div>
                              <div>Less: Standard Deduction: ₹75,000</div>
                              <div>After 80C (₹1.5L): ₹3,35,000</div>
                              <div className="font-bold text-blue-600">Personal Tax: ₹4,250</div>
                              <div className="font-bold text-green-600">After 87A Rebate: ₹0</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Total Tax Impact</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <h4 className="font-semibold text-yellow-800 mb-3">Tax Summary</h4>
                          <div className="text-sm space-y-2">
                            <div>Firm Tax Paid: ₹1,24,800</div>
                            <div>Partner A Personal Tax: ₹0</div>
                            <div>Partner B Personal Tax: ₹0</div>
                            <div className="border-t pt-2 mt-2 font-bold text-yellow-600">
                              Total Tax Burden: ₹1,24,800
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-800 mb-3">Key Benefits</h4>
                          <div className="text-sm space-y-2 text-green-700">
                            <div>• No double taxation</div>
                            <div>• Partner remuneration deductible</div>
                            <div>• Partners get personal exemptions</div>
                            <div>• Interest on capital allowed</div>
                            <div>• Partners can choose tax regime</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Company Examples */}
                  {entityType === 'company' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">🏢 Small Company (Turnover ≤ ₹400 Cr)</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-800 mb-3">Tax Calculation - ₹50 Lakh Profit</h4>
                          <div className="text-sm space-y-2">
                            <div>Net Profit: ₹50,00,000</div>
                            <div>Less: Depreciation: ₹5,00,000</div>
                            <div>Less: Other Deductions: ₹3,00,000</div>
                            <div className="border-t pt-2 mt-2">
                              <div>Taxable Income: ₹42,00,000</div>
                              <div className="font-bold text-green-600">Tax @ 26%: ₹10,92,000</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">MAT Comparison</h4>
                          <div className="text-sm space-y-2">
                            <div>Book Profit: ₹45,00,000</div>
                            <div className="font-bold text-blue-600">MAT @ 19.25%: ₹8,66,250</div>
                            <div className="text-green-600 font-medium mt-2">
                              Regular tax is higher, so pay ₹10,92,000
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">🏭 Large Company (Turnover &gt; ₹400 Cr)</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-semibold text-orange-800 mb-3">Tax Calculation - ₹100 Crore Profit</h4>
                          <div className="text-sm space-y-2">
                            <div>Net Profit: ₹100,00,00,000</div>
                            <div>Less: Depreciation: ₹20,00,00,000</div>
                            <div>Less: CSR (2%): ₹2,00,00,000</div>
                            <div>Less: Other Deductions: ₹10,00,00,000</div>
                            <div className="border-t pt-2 mt-2">
                              <div>Taxable Income: ₹68,00,00,000</div>
                              <div className="font-bold text-orange-600">Tax @ 31.2%: ₹21,21,60,000</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-indigo-50 rounded-lg">
                          <h4 className="font-semibold text-indigo-800 mb-3">Additional Benefits</h4>
                          <div className="text-sm space-y-2 text-indigo-700">
                            <div>• Carry forward losses (8 years)</div>
                            <div>• Set-off against future profits</div>
                            <div>• Accelerated depreciation</div>
                            <div>• Export incentives available</div>
                            <div>• R&amp;D weighted deductions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* Decision Guide */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    🎯 {entityType === 'individual' || entityType === 'huf' ? 'Which Regime Should You Choose?' :
                         entityType === 'firm' ? 'Partnership Firm Tax Strategy' :
                         'Corporate Tax Planning Guide'}
                  </h2>
                  
                  {/* Individual/HUF Decision Guide */}
                  {(entityType === 'individual' || entityType === 'huf') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        Choose Old {entityType === 'individual' ? 'Regime' : 'Tax Structure'} If:
                      </h3>
                      <div className="space-y-3 text-blue-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You have significant investments in 80C instruments (PPF, ELSS, etc.)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You pay substantial health insurance premiums</span>
                        </div>
                        {entityType === 'individual' && (
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You claim HRA exemption</span>
                        </div>
                        )}
                        {entityType === 'huf' && (
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>HUF has significant property income with deductions</span>
                        </div>
                        )}
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You have education loan interest payments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>Your total deductions exceed ₹3 lakh and income &gt; ₹15L</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <h3 className="text-xl font-bold text-green-800 mb-4">
                        Choose New {entityType === 'individual' ? 'Regime' : 'Tax Structure'} If:
                      </h3>
                      <div className="space-y-3 text-green-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🎉</span>
                          <span><strong>Your income is up to ₹12 lakhs (FY 2025-26): ZERO TAX!</strong></span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You don&apos;t have many tax-saving investments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You want simplicity in tax calculation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>Your income is between ₹7-20 lakhs (massive savings)</span>
                        </div>
                        {entityType === 'huf' && (
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>HUF income is primarily from business/salary sources</span>
                        </div>
                        )}
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You prefer guaranteed benefits over investment commitments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Partnership Firm Strategy */}
                  {entityType === 'firm' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                      <h3 className="text-xl font-bold text-purple-800 mb-4">🤝 Firm Level Strategies</h3>
                      <div className="space-y-3 text-purple-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💡</span>
                          <span>Optimize partner remuneration (salary vs. profit share)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💡</span>
                          <span>Structure interest on capital effectively (max 12%)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💡</span>
                          <span>Plan business expenses to reduce taxable profit</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💡</span>
                          <span>Consider timing of income and expenses</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💡</span>
                          <span>Maintain proper books and compliance</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">👥 Partner Level Planning</h3>
                      <div className="space-y-3 text-blue-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🎯</span>
                          <span>Partners can choose between old/new tax regime</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🎯</span>
                          <span>Utilize personal deductions (80C, 80D) for partners</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🎯</span>
                          <span>Plan partner&apos;s other income sources</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🎯</span>
                          <span>Consider spouse income and HUF formation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🎯</span>
                          <span>Advance tax and quarterly payments planning</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Company Strategy */}
                  {entityType === 'company' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                      <h3 className="text-xl font-bold text-indigo-800 mb-4">🏢 Corporate Tax Optimization</h3>
                      <div className="space-y-3 text-indigo-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💼</span>
                          <span>Maximize depreciation and business deductions</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💼</span>
                          <span>Plan CSR spending for 2% deduction benefit</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💼</span>
                          <span>Consider Section 115BAA/115BAB benefits for new companies</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💼</span>
                          <span>Optimize capital vs. revenue expenditure</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">💼</span>
                          <span>Plan loss carry forward and set-off strategies</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <h3 className="text-xl font-bold text-green-800 mb-4">📈 Strategic Considerations</h3>
                      <div className="space-y-3 text-green-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🚀</span>
                          <span>Monitor turnover for rate optimization (₹400 Cr threshold)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🚀</span>
                          <span>Plan dividend distribution post DDT abolition</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🚀</span>
                          <span>MAT credit utilization and planning</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🚀</span>
                          <span>International tax implications and transfer pricing</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">🚀</span>
                          <span>Regular compliance and audit requirements</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Find Your Optimal Tax Regime</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Use our advanced tax calculator to compare both regimes with your exact income and investments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Compare Tax Regimes Now
                    </button>
                    <button
                      onClick={() => router.push('/tax-planning')}
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      Explore Tax Planning
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}