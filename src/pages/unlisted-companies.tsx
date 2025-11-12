import Head from 'next/head';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface UnlistedCompany {
  Company: string;
  Industry: string;
  'Approx Valuation (in crore)': number;
  'Major Investors': string;
  'Expected IPO Timeline': string;
}

const unlistedCompaniesData: UnlistedCompany[] = [
  {"Company":"National Stock Exchange of India (NSE)","Industry":"Financial Markets / Stock Exchange","Approx Valuation (in crore)":470250,"Major Investors":"Promoter/Member shareholders; not a typical private-equity ownership structure","Expected IPO Timeline":"No public timeline"},
  {"Company":"Serum Institute of India","Industry":"Pharmaceuticals / Biotech","Approx Valuation (in crore)":211610,"Major Investors":"Poonawalla family (promoters); private family ownership","Expected IPO Timeline":"No public timeline"},
  {"Company":"Zoho Corporation","Industry":"Software / SaaS","Approx Valuation (in crore)":103760,"Major Investors":"Founders / private ownership; limited external PE exposure","Expected IPO Timeline":"No public timeline"},
  {"Company":"Zerodha","Industry":"Fintech / Stock Brokerage","Approx Valuation (in crore)":87750,"Major Investors":"Founders (bootstrapped); Rainmatter (internal) — no major external PE disclosed","Expected IPO Timeline":"No public timeline"},
  {"Company":"Megha Engineering & Infrastructures Ltd (MEIL)","Industry":"Infrastructure / EPC","Approx Valuation (in crore)":77860,"Major Investors":"Promoter group; limited public investor disclosures","Expected IPO Timeline":"No public timeline"},
  {"Company":"Parle Products","Industry":"FMCG / Food & Beverages","Approx Valuation (in crore)":68640,"Major Investors":"Promoter family ownership; not publicly listed","Expected IPO Timeline":"No public timeline"},
  {"Company":"Intas Pharmaceuticals","Industry":"Pharma / Generics","Approx Valuation (in crore)":68150,"Major Investors":"Promoter/management ownership; may have minority institutional stakes","Expected IPO Timeline":"No public timeline"},
  {"Company":"Dream11 (Dream Sports)","Industry":"Fantasy Sports / Gaming","Approx Valuation (in crore)":60000,"Major Investors":"Private equity and VC investors (varied across rounds) — no confirmed single largest public investor","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Razorpay","Industry":"Fintech / Payments","Approx Valuation (in crore)":56000,"Major Investors":"VC/PE investors across rounds; specific names vary by round (not uniformly public)","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"OYO Rooms","Industry":"Hospitality / Tech","Approx Valuation (in crore)":48000,"Major Investors":"VC and strategic investors across rounds; no confirmed IPO timeline","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"BYJU'S","Industry":"EdTech / Online Learning","Approx Valuation (in crore)":45000,"Major Investors":"Multiple PE/VC investors historically (varied by round)","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"HDB Financial Services","Industry":"NBFC / Lending","Approx Valuation (in crore)":40000,"Major Investors":"Parent group and institutional investors; ownership details vary","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Reliance Retail Ltd","Industry":"Retail / E-commerce","Approx Valuation (in crore)":38000,"Major Investors":"Reliance Industries Ltd (parent) and selected strategic investors in specific transactions","Expected IPO Timeline":"Speculated but no confirmed timeline"},
  {"Company":"Hero FinCorp","Industry":"Financial Services / Lending","Approx Valuation (in crore)":34000,"Major Investors":"Promoter / group ownership; institutional stakes in some rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Tata Capital Ltd","Industry":"Financial Services / Lending","Approx Valuation (in crore)":32000,"Major Investors":"Tata Group (promoter) and institutional investors","Expected IPO Timeline":"No public timeline"},
  {"Company":"NCDEX (National Commodity & Derivatives Exchange)","Industry":"Commodities / Derivatives Exchange","Approx Valuation (in crore)":28000,"Major Investors":"Promoter/member shareholders; no typical PE cap table","Expected IPO Timeline":"No public timeline"},
  {"Company":"Swiggy","Industry":"Food Delivery / Logistics","Approx Valuation (in crore)":27000,"Major Investors":"VC/PE investors across rounds; ownership details around private rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Ola Cabs (ANI Technologies)","Industry":"Mobility / Tech","Approx Valuation (in crore)":26000,"Major Investors":"VC/strategic investors across rounds; no public single-investor disclosure","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"PhonePe","Industry":"Fintech / UPI Payments","Approx Valuation (in crore)":25500,"Major Investors":"Parent / strategic investors; some rounds included external investors historically","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"FirstCry (BrainBees Solutions)","Industry":"E-commerce / Baby Products","Approx Valuation (in crore)":24000,"Major Investors":"VC/PE investors across rounds; ownership details vary","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Lenskart","Industry":"Retail / Eyewear","Approx Valuation (in crore)":22000,"Major Investors":"PE/VC investors across rounds; strategic investors in some rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"InMobi","Industry":"AdTech / Mobile Advertising","Approx Valuation (in crore)":20000,"Major Investors":"VC/PE investors; ownership changed across rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Delhivery","Industry":"Logistics / E-commerce","Approx Valuation (in crore)":19000,"Major Investors":"VC/PE investors across rounds; (note: Delhivery has had public/secondary events but treat as private here)","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Ixigo","Industry":"Travel / Technology","Approx Valuation (in crore)":18000,"Major Investors":"VC/PE investors; ownership disclosed in funding rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Policybazaar (PB Fintech)","Industry":"Fintech / Insurance Aggregator","Approx Valuation (in crore)":17500,"Major Investors":"VC/PE investors historically (varied)","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Urban Company (UrbanClap)","Industry":"Consumer Services / Marketplace","Approx Valuation (in crore)":16500,"Major Investors":"VC/PE investors across funding rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Paytm Money","Industry":"Fintech / Investments","Approx Valuation (in crore)":16000,"Major Investors":"Parent groups and VC/PE investors; ownership mixed","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Reliance Jio Platforms","Industry":"Telecom / Digital","Approx Valuation (in crore)":15000,"Major Investors":"Reliance Industries Ltd (parent); selective strategic investors historically","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"CRED","Industry":"Fintech / Credit","Approx Valuation (in crore)":14000,"Major Investors":"VC/PE investors across rounds; ownership details public per funding rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"boAt (Boat Lifestyle)","Industry":"Consumer Electronics / Audio","Approx Valuation (in crore)":13000,"Major Investors":"Founders / PE investors in certain rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"MobiKwik","Industry":"Fintech / Digital Payments","Approx Valuation (in crore)":12000,"Major Investors":"VC/PE investors across rounds; ownership data available in funding disclosures","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"CarDekho","Industry":"AutoTech / E-commerce","Approx Valuation (in crore)":11500,"Major Investors":"VC/PE investors across rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Hinduja Leyland Finance","Industry":"NBFC / Vehicle Finance","Approx Valuation (in crore)":11000,"Major Investors":"Promoter group; institutional stakes possible","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Tata Play (formerly Tata Sky)","Industry":"Media / DTH","Approx Valuation (in crore)":10500,"Major Investors":"Tata Group (promoter); strategic investors historically","Expected IPO Timeline":"No public timeline"},
  {"Company":"National Insurance Company","Industry":"Insurance / PSU","Approx Valuation (in crore)":10000,"Major Investors":"Government ownership (public sector)","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Go Digit Insurance","Industry":"InsurTech / General Insurance","Approx Valuation (in crore)":9500,"Major Investors":"PE/VC investors in growth rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"API Holdings (PharmEasy)","Industry":"HealthTech / E-commerce","Approx Valuation (in crore)":9000,"Major Investors":"VC/PE investors across rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"National Seeds Corporation","Industry":"Agriculture / PSU","Approx Valuation (in crore)":8500,"Major Investors":"Government ownership (public sector)","Expected IPO Timeline":"No public timeline"},
  {"Company":"ReNew Power","Industry":"Renewable Energy","Approx Valuation (in crore)":8200,"Major Investors":"PE/strategic investors across rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Ather Energy","Industry":"EV / Automotive","Approx Valuation (in crore)":8000,"Major Investors":"PE/strategic investors across rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Tata Advanced Systems","Industry":"Aerospace / Defense","Approx Valuation (in crore)":7700,"Major Investors":"Tata Group (promoter); strategic/defense partners","Expected IPO Timeline":"No public timeline"},
  {"Company":"ArcelorMittal Nippon Steel India","Industry":"Steel / Manufacturing","Approx Valuation (in crore)":7500,"Major Investors":"Parent JV shareholders (ArcelorMittal, Nippon Steel)","Expected IPO Timeline":"No public timeline"},
  {"Company":"Akasa Air","Industry":"Aviation / Transportation","Approx Valuation (in crore)":7000,"Major Investors":"Promoters and aviation investors; funding rounds reported","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Tata Sons Pvt Ltd","Industry":"Holding Company / Conglomerate","Approx Valuation (in crore)":6900,"Major Investors":"Promoter/holding company structure; not a typical external investor cap table","Expected IPO Timeline":"No public timeline"},
  {"Company":"Hinduja Global Solutions","Industry":"BPO / IT Services","Approx Valuation (in crore)":6500,"Major Investors":"Promoter group; private investors in certain deals","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Ola Electric Mobility","Industry":"EV / Tech","Approx Valuation (in crore)":6400,"Major Investors":"VC/PE and strategic investors across rounds","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Flipkart Pvt Ltd","Industry":"E-commerce / Retail","Approx Valuation (in crore)":6200,"Major Investors":"Walmart (majority owner) and other private investors","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Haldiram's","Industry":"FMCG / Food","Approx Valuation (in crore)":6000,"Major Investors":"Promoter family ownership; private structure","Expected IPO Timeline":"No public timeline"},
  {"Company":"Hike Messenger","Industry":"Social Media / Tech","Approx Valuation (in crore)":5500,"Major Investors":"VC/PE in historical rounds; company pivoted business models","Expected IPO Timeline":"No confirmed timeline"},
  {"Company":"Dunzo","Industry":"Quick Commerce / Logistics","Approx Valuation (in crore)":5000,"Major Investors":"Reliance Retail (investor) and other VC/PE investors","Expected IPO Timeline":"No confirmed timeline"}
];

export default function UnlistedCompanies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'valuation' | 'name'>('valuation');

  // Get unique industries
  const industries = useMemo(() => {
    const unique = Array.from(new Set(unlistedCompaniesData.map(c => c.Industry)));
    return ['all', ...unique.sort()];
  }, []);

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = unlistedCompaniesData.filter(company => {
      const matchesSearch = company.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.Industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === 'all' || company.Industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'valuation') {
        return b['Approx Valuation (in crore)'] - a['Approx Valuation (in crore)'];
      }
      return a.Company.localeCompare(b.Company);
    });
  }, [searchTerm, selectedIndustry, sortBy]);

  const formatValuation = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh Cr`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(2)}K Cr`;
    return `₹${val} Cr`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Famous Unlisted Indian Companies - Pre-IPO Investment Opportunities 2025",
    "description": "Comprehensive list of India's most valuable unlisted companies with pre-IPO investment potential",
    "numberOfItems": unlistedCompaniesData.length,
    "itemListElement": unlistedCompaniesData.map((company, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": company.Company,
        "description": `${company.Industry} company valued at ₹${company['Approx Valuation (in crore)']} crore`,
        "industry": company.Industry
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Top 50 Unlisted Indian Companies 2025 | Pre-IPO Investment Opportunities</title>
        <meta name="description" content="Discover India's most valuable unlisted companies. NSE, Serum Institute, Zoho, Zerodha & 46 more companies with pre-IPO investment potential. Updated valuations & investor info." />
        <meta name="keywords" content="unlisted companies India, pre-IPO investment, NSE unlisted shares, Serum Institute shares, Zerodha unlisted, unlisted shares India, Indian unicorns, pre-IPO companies 2025, unlisted equity India" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Top 50 Unlisted Indian Companies 2025 | Pre-IPO Investment Opportunities" />
        <meta property="og:description" content="Complete guide to India's most valuable unlisted companies. Explore pre-IPO investment opportunities in NSE, Serum Institute, Zoho, Zerodha & more before they go public." />
        <meta property="og:image" content="/og-unlisted-companies.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top 50 Unlisted Indian Companies 2025 | Pre-IPO Opportunities" />
        <meta name="twitter:description" content="Discover India's most valuable unlisted companies with pre-IPO investment potential." />
        <meta name="twitter:image" content="/og-unlisted-companies.jpg" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Umbrella Financial Services" />
        <link rel="canonical" href="https://yoursite.com/unlisted-companies" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <Header />

      {/* Hero Section - Full Width */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 px-4 py-2 rounded-full mb-6 border border-[#FF6B2C]/20">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[#FF6B2C] text-sm font-semibold">Live Market Data • Updated Daily</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
              Famous Unlisted
            </span>
            <br />
            <span className="text-gray-800">Indian Companies</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto font-semibold">
            Pre-IPO Investment Opportunities
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore India's most valuable unlisted companies with pre-IPO investment potential. These companies may list on stock exchanges in the future at premium valuations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-[#FF6B2C] mb-1">{unlistedCompaniesData.length}</div>
              <div className="text-sm text-gray-600 font-medium">Companies Listed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-1">₹{(unlistedCompaniesData.reduce((sum, c) => sum + c['Approx Valuation (in crore)'], 0) / 100000).toFixed(2)}L Cr</div>
              <div className="text-sm text-gray-600 font-medium">Total Valuation</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
              <div className="text-sm text-gray-600 font-medium">Industries</div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-12">

          {/* Info Banner */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 mb-10 rounded-lg shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-900 mb-1">Investment Disclaimer</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Investing in unlisted securities carries high risk. This information is for educational purposes only. Please conduct thorough research and consult certified financial advisors before investing in unlisted companies.
                </p>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-10 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-900">Search & Filter Companies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Search */}
              <div className="relative">
                <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Companies
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name or industry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Industry
                </label>
                <select
                  id="industry"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'valuation' | 'name')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="valuation">Valuation (High to Low)</option>
                  <option value="name">Company Name (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-3 text-sm">
                <span className="text-gray-600">
                  Showing <span className="font-bold text-blue-600 text-lg">{filteredCompanies.length}</span> of <span className="font-semibold">{unlistedCompaniesData.length}</span> companies
                </span>
                {(searchTerm || selectedIndustry !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedIndustry('all');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Companies Table List */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-16">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 overflow-x-auto">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-12 gap-4 text-white font-semibold text-sm">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-3">Company Name</div>
                  <div className="col-span-2">Industry</div>
                  <div className="col-span-2">Valuation</div>
                  <div className="col-span-3">Major Investors</div>
                  <div className="col-span-1 text-center">IPO Timeline</div>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200 overflow-x-auto">
              {filteredCompanies.map((company, index) => (
                <div
                  key={index}
                  className="group hover:bg-blue-50 transition-all duration-200 px-6 py-4"
                >
                  <div className="min-w-[1000px]">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Rank */}
                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-700 font-bold text-sm rounded-full">
                          {index + 1}
                        </span>
                      </div>

                      {/* Company Name */}
                      <div className="col-span-3">
                        <h3 className="text-base font-bold text-gray-900 mb-1">
                          {company.Company}
                        </h3>
                        {company['Approx Valuation (in crore)'] >= 50000 && (
                          <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full border border-yellow-200">
                            ⭐ Top Valued
                          </span>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="col-span-2">
                        <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100">
                          {company.Industry}
                        </span>
                      </div>

                      {/* Valuation */}
                      <div className="col-span-2">
                        <div className="text-xl font-bold text-emerald-600">
                          {formatValuation(company['Approx Valuation (in crore)'])}
                        </div>
                        <div className="text-xs text-gray-500">Approx Valuation</div>
                      </div>

                      {/* Major Investors */}
                      <div className="col-span-3">
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {company['Major Investors']}
                        </p>
                      </div>

                      {/* IPO Timeline */}
                      <div className="col-span-1 text-center">
                        <span className="inline-block text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {company['Expected IPO Timeline'] === 'No public timeline' || company['Expected IPO Timeline'] === 'No confirmed timeline' ? '—' : company['Expected IPO Timeline']}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-600">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pre-IPO unlisted companies • Data updated regularly
              </div>
            </div>
          </div>

          {/* No Results */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
              <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('all');
                }}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Educational Content Section */}
          <div className="mt-16 bg-white rounded-xl shadow-md p-8 sm:p-10 border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">About Unlisted Companies</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold text-sm">1</span>
                  <h3 className="text-lg font-bold text-gray-900">What are Unlisted Companies?</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Unlisted companies are those whose shares are not traded on official stock exchanges like NSE or BSE. Many of India's most valuable companies, including NSE itself, Serum Institute, and Zoho, remain unlisted. These companies may eventually go public through an Initial Public Offering (IPO).
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm">2</span>
                  <h3 className="text-lg font-bold text-gray-900">How to Invest in Unlisted Shares</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Unlisted shares can be purchased through authorized intermediaries, wealth management firms, or specialized platforms. Investors can buy shares of promising companies before they go public, potentially benefiting from their growth trajectory and future IPO listing.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold text-sm">3</span>
                  <h3 className="text-lg font-bold text-gray-900">Investment Opportunities</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Investing in unlisted companies can offer substantial returns if the company successfully lists and performs well post-IPO. Companies like Zerodha (₹87,750 Cr), Dream11 (₹60,000 Cr), and Razorpay (₹56,000 Cr) represent high-growth sectors with strong fundamentals.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-700 font-bold text-sm">!</span>
                  <h3 className="text-lg font-bold text-gray-900">Key Risk Factors</h3>
                </div>
                <ul className="space-y-1.5 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 text-xs">•</span>
                    <span>Lack of regulatory oversight and investor protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 text-xs">•</span>
                    <span>Limited liquidity - difficult to sell shares quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 text-xs">•</span>
                    <span>No guarantee of IPO listing or timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 text-xs">•</span>
                    <span>Valuation uncertainties and market volatility</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong className="font-bold">Important:</strong> This information is provided for educational purposes only and should not be considered as investment advice. Grey market investments are highly speculative and suitable only for investors with high risk tolerance. Always consult certified financial advisors and conduct thorough due diligence before making investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-8 sm:p-10 border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0">Q:</span>
                  <span>How can I buy unlisted shares?</span>
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6 text-sm">
                  Unlisted shares can be purchased through intermediaries, wealth management firms, or platforms specializing in unlisted securities. Always verify the authenticity of the platform and understand the associated risks.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0">Q:</span>
                  <span>Which unlisted company has the highest valuation?</span>
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6 text-sm">
                  National Stock Exchange of India (NSE) leads with an approximate valuation of ₹4,70,250 crore, followed by Serum Institute of India at ₹2,11,610 crore.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0">Q:</span>
                  <span>What are the tax implications?</span>
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6 text-sm">
                  Gains from unlisted shares are typically taxed as long-term or short-term capital gains depending on the holding period. Consult a tax professional for specific guidance.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0">Q:</span>
                  <span>Are unlisted shares safe investments?</span>
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6 text-sm">
                  Unlisted shares carry higher risk than listed securities due to lack of regulation, limited liquidity, and information asymmetry. They are suitable only for informed investors with high risk appetite.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">Last Updated:</span> November 2025 | Data sourced from public financial reports and market estimates
            </p>
            <p className="text-xs text-gray-500">
              Valuations are approximate and subject to change based on market conditions and company performance
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
