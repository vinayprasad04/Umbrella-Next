import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SharesResearch() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStockTab, setActiveStockTab] = useState('gainers');
  const [activeFundTab, setActiveFundTab] = useState('largeCap');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof indianStocks>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Comprehensive Indian Stock Database (NSE & BSE)
  const indianStocks = [
    // NIFTY 50 Stocks
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE', sector: 'Oil & Gas', price: '₹2,456', logo: '🏭' },
    { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', exchange: 'NSE', sector: 'IT Services', price: '₹3,789', logo: '💻' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹1,645', logo: '🏦' },
    { symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE', sector: 'IT Services', price: '₹1,523', logo: '💻' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹1,234', logo: '🏛️' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', exchange: 'NSE', sector: 'FMCG', price: '₹2,678', logo: '🧴' },
    { symbol: 'ITC', name: 'ITC Ltd', exchange: 'NSE', sector: 'FMCG', price: '₹418', logo: '🚬' },
    { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', sector: 'Banking', price: '₹823', logo: '🏦' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', exchange: 'NSE', sector: 'Telecom', price: '₹1,850', logo: '📱' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹1,789', logo: '🏦' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', exchange: 'NSE', sector: 'NBFC', price: '₹6,853', logo: '💰' },
    { symbol: 'LT', name: 'Larsen & Toubro Ltd', exchange: 'NSE', sector: 'Construction', price: '₹3,456', logo: '🏗️' },
    { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', exchange: 'NSE', sector: 'IT Services', price: '₹1,678', logo: '💻' },
    { symbol: 'AXISBANK', name: 'Axis Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹1,234', logo: '🏦' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', exchange: 'NSE', sector: 'Paints', price: '₹3,234', logo: '🎨' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', exchange: 'NSE', sector: 'Auto', price: '₹12,840', logo: '🚗' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', exchange: 'NSE', sector: 'Pharma', price: '₹1,456', logo: '💊' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', exchange: 'NSE', sector: 'IT Services', price: '₹567', logo: '💻' },
    { symbol: 'NTPC', name: 'NTPC Ltd', exchange: 'NSE', sector: 'Power', price: '₹345', logo: '⚡' },
    { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', exchange: 'NSE', sector: 'Cement', price: '₹10,234', logo: '🏗️' },
    { symbol: 'TITAN', name: 'Titan Company Ltd', exchange: 'NSE', sector: 'Jewellery', price: '₹3,456', logo: '💍' },
    { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd', exchange: 'NSE', sector: 'Oil & Gas', price: '₹234', logo: '🛢️' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', exchange: 'NSE', sector: 'Auto', price: '₹789', logo: '🚗' },
    { symbol: 'NESTLEIND', name: 'Nestle India Ltd', exchange: 'NSE', sector: 'FMCG', price: '₹24,567', logo: '🍫' },
    { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', exchange: 'NSE', sector: 'Power', price: '₹289', logo: '⚡' },

    // Mid & Small Cap Stocks
    { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ Ltd', exchange: 'NSE', sector: 'Infrastructure', price: '₹1,456', logo: '🚢' },
    { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', exchange: 'NSE', sector: 'Trading', price: '₹2,789', logo: '🏢' },
    { symbol: 'ZOMATO', name: 'Zomato Ltd', exchange: 'NSE', sector: 'Food Delivery', price: '₹215', logo: '🍔' },
    { symbol: 'PAYTM', name: 'One 97 Communications Ltd', exchange: 'NSE', sector: 'Fintech', price: '₹825', logo: '💳' },
    { symbol: 'NYKAA', name: 'FSN E-Commerce Ventures Ltd', exchange: 'NSE', sector: 'E-commerce', price: '₹789', logo: '💄' },
    { symbol: 'POLICYBZR', name: 'PB Fintech Ltd', exchange: 'NSE', sector: 'Fintech', price: '₹1,234', logo: '🛡️' },
    { symbol: 'DMART', name: 'Avenue Supermarts Ltd', exchange: 'NSE', sector: 'Retail', price: '₹4,252', logo: '🛒' },
    { symbol: 'TECHM', name: 'Tech Mahindra Ltd', exchange: 'NSE', sector: 'IT Services', price: '₹1,509', logo: '💻' },
    { symbol: 'DRREDDY', name: 'Dr Reddy\'s Laboratories Ltd', exchange: 'NSE', sector: 'Pharma', price: '₹5,234', logo: '💊' },
    { symbol: 'CIPLA', name: 'Cipla Ltd', exchange: 'NSE', sector: 'Pharma', price: '₹1,456', logo: '💊' },
    { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', exchange: 'NSE', sector: 'Pharma', price: '₹4,567', logo: '💊' },
    { symbol: 'BIOCON', name: 'Biocon Ltd', exchange: 'NSE', sector: 'Pharma', price: '₹345', logo: '💊' },
    { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd', exchange: 'NSE', sector: 'Financial Services', price: '₹1,678', logo: '💰' },
    { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd', exchange: 'NSE', sector: 'Auto', price: '₹3,236', logo: '🚜' },
    { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', exchange: 'NSE', sector: 'Auto', price: '₹4,567', logo: '🏍️' },
    { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', exchange: 'NSE', sector: 'Auto', price: '₹3,456', logo: '🏍️' },
    { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', exchange: 'NSE', sector: 'Auto', price: '₹8,901', logo: '🏍️' },
    { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹1,456', logo: '🏦' },
    { symbol: 'BANDHANBNK', name: 'Bandhan Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹234', logo: '🏦' },
    { symbol: 'IDFCFIRSTB', name: 'IDFC First Bank Ltd', exchange: 'NSE', sector: 'Banking', price: '₹89', logo: '🏦' },

    // Steel & Mining
    { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', exchange: 'NSE', sector: 'Steel', price: '₹145', logo: '🏗️' },
    { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', exchange: 'NSE', sector: 'Steel', price: '₹789', logo: '🔧' },
    { symbol: 'SAIL', name: 'Steel Authority of India Ltd', exchange: 'NSE', sector: 'Steel', price: '₹123', logo: '🏭' },
    { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', exchange: 'NSE', sector: 'Aluminium', price: '₹567', logo: '🔩' },
    { symbol: 'VEDL', name: 'Vedanta Ltd', exchange: 'NSE', sector: 'Mining', price: '₹234', logo: '⛏️' },
    { symbol: 'COALINDIA', name: 'Coal India Ltd', exchange: 'NSE', sector: 'Mining', price: '₹456', logo: '⛏️' },

    // Telecom
    { symbol: 'IDEA', name: 'Vodafone Idea Ltd', exchange: 'NSE', sector: 'Telecom', price: '₹12', logo: '📱' },
    { symbol: 'INDIGO', name: 'InterGlobe Aviation Ltd', exchange: 'NSE', sector: 'Aviation', price: '₹5,027', logo: '✈️' },

    // Popular BSE Stocks
    { symbol: 'SENSEX', name: 'BSE Sensex Index', exchange: 'BSE', sector: 'Index', price: '₹72,410', logo: '📊' },
    { symbol: 'BSE500', name: 'BSE 500 Index', exchange: 'BSE', sector: 'Index', price: '₹28,456', logo: '📈' },

    // ETFs and Mutual Funds
    { symbol: 'NIFTYBEES', name: 'Nippon India ETF Nifty BeES', exchange: 'NSE', sector: 'ETF', price: '₹245', logo: '🔗' },
    { symbol: 'GOLDBEES', name: 'Goldman Sachs Gold BeeS', exchange: 'NSE', sector: 'ETF', price: '₹56', logo: '🥇' },
    { symbol: 'LIQUIDBEES', name: 'Nippon India ETF Liquid BeES', exchange: 'NSE', sector: 'ETF', price: '₹1,000', logo: '💧' },
  ];

  // Search functionality
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 1) {
      const filtered = indianStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.sector.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10); // Limit to 10 results for performance
      
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleStockSelect = (stock: { symbol: string; name: string; exchange: string; sector: string; price: string; logo: string }) => {
    setSearchQuery(stock.symbol);
    setIsSearchFocused(false);
    setSearchResults([]);
    // Here you can add navigation to stock details page
    console.log('Selected stock:', stock);
  };

  // Market ticker data
  const tickerData = [
    { symbol: "NIFTY BANK", price: "50,043.70", change: "+0.04%", isPositive: true },
    { symbol: "BAJFINANCE", price: "6853.00", change: "+1.34%", isPositive: true },
    { symbol: "BHARTIARTL", price: "1,850.30", change: "-0.58%", isPositive: false },
    { symbol: "HDFCBANK", price: "1,969.80", change: "+1.50%", isPositive: true },
    { symbol: "HINDALCO", price: "2,453.80", change: "-1.37%", isPositive: false },
    { symbol: "INDIGO", price: "5,027.50", change: "+0.15%", isPositive: true },
    { symbol: "ITC", price: "418.35", change: "+0.12%", isPositive: true },
    { symbol: "MARUTI", price: "12,840.00", change: "+1.50%", isPositive: true },
    { symbol: "RELIANCE", price: "1,292.95", change: "+1.48%", isPositive: true }
  ];

  // Market indices data
  const marketIndices = [
    { name: "NIFTY 50", value: "24,487.40", change: "+0.40%", isPositive: true },
    { name: "NIFTY 100 Largecap", value: "25,065.40", change: "+0.34%", isPositive: true },
    { name: "USD/INR", value: "87.76", change: "+0.02%", isPositive: true },
    { name: "NIFTY 100 Midcap", value: "58,324.85", change: "+0.27%", isPositive: true },
    { name: "NIFTY Bank", value: "50,043.70", change: "+0.04%", isPositive: true },
    { name: "NIFTY IT", value: "34,674.30", change: "+0.38%", isPositive: true },
    { name: "Gold", value: "10,253.37", change: "+0.21%", isPositive: true },
    { name: "NIFTY 100 Smallcap", value: "17,488.10", change: "+0.84%", isPositive: true },
    { name: "NIFTY Pharma", value: "21,753.50", change: "+0.89%", isPositive: true }
  ];

  // Stock data for different tabs
  const stockData = {
    gainers: [
      { symbol: "HYUNDAI", name: "Hyundai Motor India Ltd", price: "₹2,205.10", change: "+2.48%", logo: "🚗" },
      { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", price: "₹12,840.00", change: "+1.93%", logo: "🚗" },
      { symbol: "TECHM", name: "Tech Mahindra Ltd", price: "₹1,509.30", change: "+1.90%", logo: "💻" },
      { symbol: "DMART", name: "Avenue Supermarts Ltd", price: "₹4,252.50", change: "+1.63%", logo: "🛒" },
      { symbol: "M&M", name: "Mahindra and Mahindra Ltd", price: "₹3,236.50", change: "+1.58%", logo: "🚜" }
    ],
    losers: [
      { symbol: "ZOMATO", name: "Zomato Limited", price: "₹215.50", change: "-2.10%", logo: "🍔" },
      { symbol: "PAYTM", name: "One97 Communications Ltd", price: "₹825.30", change: "-1.85%", logo: "💳" },
      { symbol: "BYJUS", name: "Think & Learn Pvt Ltd", price: "₹156.80", change: "-1.42%", logo: "📚" },
      { symbol: "NYKAA", name: "FSN E-Commerce Ventures", price: "₹789.45", change: "-1.28%", logo: "💄" },
      { symbol: "POLICYBZR", name: "PB Fintech Limited", price: "₹1,234.75", change: "-0.95%", logo: "🛡️" }
    ],
    mostActive: [
      { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: "₹2,856.75", change: "+0.45%", logo: "🏭" },
      { symbol: "TCS", name: "Tata Consultancy Services", price: "₹4,123.80", change: "+0.78%", logo: "💻" },
      { symbol: "INFY", name: "Infosys Limited", price: "₹1,789.25", change: "+0.32%", logo: "🔧" },
      { symbol: "HDFCBANK", name: "HDFC Bank Limited", price: "₹1,645.90", change: "+0.15%", logo: "🏦" },
      { symbol: "ICICIBANK", name: "ICICI Bank Limited", price: "₹1,234.55", change: "+0.67%", logo: "🏛️" }
    ],
    weekHigh52: [
      { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd", price: "₹1,456.30", change: "+3.25%", logo: "🚢" },
      { symbol: "BAJFINANCE", name: "Bajaj Finance Limited", price: "₹6,789.50", change: "+2.85%", logo: "💰" },
      { symbol: "COALINDIA", name: "Coal India Limited", price: "₹456.75", change: "+2.15%", logo: "⛏️" },
      { symbol: "DRREDDY", name: "Dr Reddy's Laboratories", price: "₹5,234.80", change: "+1.95%", logo: "💊" },
      { symbol: "EICHERMOT", name: "Eicher Motors Limited", price: "₹4,567.25", change: "+1.75%", logo: "🏍️" }
    ],
    weekLow52: [
      { symbol: "VEDL", name: "Vedanta Limited", price: "₹234.50", change: "-4.25%", logo: "⛏️" },
      { symbol: "TATASTEEL", name: "Tata Steel Limited", price: "₹145.75", change: "-3.85%", logo: "🏗️" },
      { symbol: "HINDALCO", name: "Hindalco Industries Ltd", price: "₹567.30", change: "-3.15%", logo: "🔩" },
      { symbol: "JSWSTEEL", name: "JSW Steel Limited", price: "₹789.45", change: "-2.95%", logo: "🔧" },
      { symbol: "SAIL", name: "Steel Authority of India", price: "₹123.60", change: "-2.75%", logo: "🏭" }
    ]
  };

  // Mutual funds data for different categories
  const mutualFundsData = {
    largeCap: [
      { name: "Motilal Oswal Large Cap Fund", category: "Equity • Growth", return: "15.03%", logo: "💙" },
      { name: "WOC Large Cap Fund", category: "Equity • Growth", return: "5.54%", logo: "💚" },
      { name: "Canara Rob Large Cap Fund", category: "Equity • Growth", return: "4.29%", logo: "💛" },
      { name: "Mirae Asset Large Cap Fund", category: "Equity • Growth", return: "3.58%", logo: "🧡" },
      { name: "Nippon India Large Cap Fund", category: "Equity • Growth", return: "3.33%", logo: "❤️" }
    ],
    midCap: [
      { name: "Kotak Emerging Equity Fund", category: "Equity • Growth", return: "18.45%", logo: "🟡" },
      { name: "DSP Mid Cap Fund", category: "Equity • Growth", return: "16.78%", logo: "🟠" },
      { name: "Invesco India Mid Cap Fund", category: "Equity • Growth", return: "14.92%", logo: "🔵" },
      { name: "SBI Magnum Mid Cap Fund", category: "Equity • Growth", return: "13.67%", logo: "🟢" },
      { name: "HDFC Mid Cap Opportunities Fund", category: "Equity • Growth", return: "12.34%", logo: "🟣" }
    ],
    smallCap: [
      { name: "SBI Small Cap Fund", category: "Equity • Growth", return: "22.15%", logo: "🔶" },
      { name: "DSP Small Cap Fund", category: "Equity • Growth", return: "19.87%", logo: "🔸" },
      { name: "Nippon India Small Cap Fund", category: "Equity • Growth", return: "18.23%", logo: "🔹" },
      { name: "HDFC Small Cap Fund", category: "Equity • Growth", return: "17.45%", logo: "🔷" },
      { name: "Franklin India Smaller Cos Fund", category: "Equity • Growth", return: "16.78%", logo: "💎" }
    ],
    taxSaving: [
      { name: "Axis Long Term Equity Fund", category: "ELSS • Tax Saver", return: "14.56%", logo: "📊" },
      { name: "Mirae Asset Tax Saver Fund", category: "ELSS • Tax Saver", return: "13.89%", logo: "📈" },
      { name: "DSP Tax Saver Fund", category: "ELSS • Tax Saver", return: "12.67%", logo: "💰" },
      { name: "ICICI Pru Long Term Equity Fund", category: "ELSS • Tax Saver", return: "11.98%", logo: "💼" },
      { name: "SBI Long Term Equity Fund", category: "ELSS • Tax Saver", return: "11.23%", logo: "🏛️" }
    ],
    indexFunds: [
      { name: "UTI Nifty Index Fund", category: "Index • Passive", return: "12.45%", logo: "📋" },
      { name: "ICICI Pru Nifty Index Fund", category: "Index • Passive", return: "12.34%", logo: "📝" },
      { name: "HDFC Index Fund Nifty Plan", category: "Index • Passive", return: "12.29%", logo: "📊" },
      { name: "SBI Nifty Index Fund", category: "Index • Passive", return: "12.18%", logo: "📈" },
      { name: "Nippon India Index Fund Nifty Plan", category: "Index • Passive", return: "12.07%", logo: "📉" }
    ],
    etfs: [
      { name: "Nippon India ETF Nifty BeES", category: "ETF • Equity", return: "12.56%", logo: "🔗" },
      { name: "ICICI Pru Nifty ETF", category: "ETF • Equity", return: "12.45%", logo: "⚡" },
      { name: "SBI ETF Nifty 50", category: "ETF • Equity", return: "12.34%", logo: "🎯" },
      { name: "HDFC Nifty 50 ETF", category: "ETF • Equity", return: "12.23%", logo: "🔥" },
      { name: "Kotak Nifty ETF", category: "ETF • Equity", return: "12.12%", logo: "⭐" }
    ]
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
    <>
      <Head>
        <title>Market Research Hub - Live Data & Investment Insights | Umbrella</title>
        <meta name="description" content="Advanced stock market research platform with real-time data, professional charts, and expert analysis. Your gateway to smarter investing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <Header />

        <main>
          {/* Hero Section with Live Ticker */}
          <section className={`relative overflow-visible transition-all duration-500 ${isSearchFocused ? 'pb-80' : 'pb-16'}`}>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B2C] via-blue-500 to-purple-500"></div>
            
            {/* Live Market Ticker */}
            <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-4 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              <div className="animate-marquee whitespace-nowrap flex items-center">
                {/* First set of ticker data */}
                {tickerData.map((item, index) => (
                  <div key={`first-${index}`} className="mx-4 flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <span className="font-bold text-white">{item.symbol}</span>
                    <span className="text-gray-100 font-medium">{item.price}</span>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-md ${
                      item.isPositive 
                        ? 'text-green-300 bg-green-900/50' 
                        : 'text-red-300 bg-red-900/50'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {tickerData.map((item, index) => (
                  <div key={`second-${index}`} className="mx-4 flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <span className="font-bold text-white">{item.symbol}</span>
                    <span className="text-gray-100 font-medium">{item.price}</span>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-md ${
                      item.isPositive 
                        ? 'text-green-300 bg-green-900/50' 
                        : 'text-red-300 bg-red-900/50'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Content */}
            <div className="relative w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF6B2C]/10 to-blue-600/10 rounded-full border border-[#FF6B2C]/20 mb-6 backdrop-blur-sm">
                  <span className="text-sm font-semibold bg-gradient-to-r from-[#FF6B2C] to-blue-600 bg-clip-text text-transparent">
                    📊 Professional Market Research Platform
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-[#FF6B2C] via-pink-500 to-blue-600 bg-clip-text text-transparent"> Market </span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Intelligence</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                  Advanced analytics, real-time insights, and professional-grade tools for serious investors
                </p>

                {/* Search Section */}
                <div className={`relative mx-auto mb-8 transition-all duration-500 ease-out ${
                  isSearchFocused ? 'max-w-4xl' : 'max-w-2xl'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#FF6B2C] to-blue-600 rounded-2xl blur transition-all duration-500 ${
                    isSearchFocused ? 'opacity-40 scale-105' : 'opacity-20'
                  }`}></div>
                  <div className={`relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl transition-all duration-500 ${
                    isSearchFocused ? 'shadow-3xl border-[#FF6B2C]/30 bg-white/90' : ''
                  }`}>
                    <div className={`absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-all duration-300 ${
                      isSearchFocused ? 'text-[#FF6B2C]' : 'text-gray-400'
                    }`}>
                      <svg className={`h-6 w-6 transition-all duration-300 ${
                        isSearchFocused ? 'scale-110' : ''
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search stocks, mutual funds, ETFs..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => {
                        // Delay blur to allow clicking on suggestions
                        setTimeout(() => setIsSearchFocused(false), 150);
                      }}
                      className={`w-full pl-14 pr-16 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg font-medium transition-all duration-500 ${
                        isSearchFocused ? 'py-8 text-xl' : 'py-6'
                      }`}
                    />
                    <div className={`absolute inset-y-0 right-0 pr-6 flex items-center transition-all duration-300 ${
                      isSearchFocused ? 'text-[#FF6B2C] scale-110' : 'text-gray-400'
                    }`}>
                      <span className="text-2xl">⌘</span>
                      <span className="text-lg ml-1">K</span>
                    </div>
                  </div>
                  
                  {/* Search Dropdown (appears when focused) */}
                  {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden animate-in slide-in-from-top-2 duration-300 z-[100]">
                      <div className="p-6">
                        {searchQuery && searchResults.length > 0 ? (
                          <>
                            <div className="text-sm text-gray-500 mb-4 font-semibold">
                              Search Results ({searchResults.length})
                            </div>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                              {searchResults.map((stock, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                                  onMouseDown={() => handleStockSelect(stock)}
                                >
                                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-white text-lg">
                                      {stock.logo}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-gray-800 text-base">{stock.symbol}</span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                        {stock.exchange}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">{stock.name}</div>
                                    <div className="text-xs text-gray-500 mt-1">{stock.sector}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-gray-800">{stock.price}</div>
                                    <div className="text-xs text-gray-500">Current Price</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : searchQuery && searchResults.length === 0 ? (
                          <>
                            <div className="text-sm text-gray-500 mb-4 font-semibold">No Results Found</div>
                            <div className="text-center py-8">
                              <div className="text-4xl mb-3">🔍</div>
                              <div className="text-gray-600">No stocks found matching &quot;{searchQuery}&quot;</div>
                              <div className="text-sm text-gray-500 mt-2">Try searching for a stock symbol, company name, or sector</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-gray-500 mb-4 font-semibold">Popular Searches</div>
                            <div className="space-y-2">
                              {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN'].map((symbol) => {
                                const stock = indianStocks.find(s => s.symbol === symbol);
                                return stock ? (
                                  <div 
                                    key={symbol} 
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                                    onMouseDown={() => handleStockSelect(stock)}
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                      <span className="text-white text-sm">
                                        {stock.logo}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-800 text-base">{stock.symbol}</span>
                                      <div className="text-xs text-gray-500 mt-1">{stock.name}</div>
                                    </div>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Market Dashboard */}
          <section className="py-8">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                
                {/* Market Indices Sidebar */}
                <div className="xl:col-span-1 space-y-6">
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                      Market Pulse
                    </h3>
                    <div className="space-y-6">
                      {marketIndices.slice(0, 6).map((index, i) => (
                        <div key={i} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative p-4 rounded-2xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-bold text-gray-800 text-sm">{index.name}</div>
                              <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                                index.isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                              }`}>
                                {index.change}
                              </div>
                            </div>
                            <div className="text-lg font-bold text-gray-700">{index.value}</div>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                              <div 
                                className={`h-1 rounded-full ${index.isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: '65%' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="xl:col-span-4 space-y-8">
                  
                  {/* Stock Performance Dashboard */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Market Movers
                      </h3>
                      
                      {/* Enhanced Tab Navigation */}
                      <div className="flex items-center gap-1 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2">
                        {[
                          { id: 'gainers', label: 'Gainers', color: 'green', icon: '📈' },
                          { id: 'losers', label: 'Losers', color: 'red', icon: '📉' },
                          { id: 'mostActive', label: 'Active', color: 'blue', icon: '🔥' },
                          { id: 'weekHigh52', label: '52W High', color: 'purple', icon: '🚀' },
                          { id: 'weekLow52', label: '52W Low', color: 'orange', icon: '⬇️' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveStockTab(tab.id)}
                            className={`text-xs px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                              activeStockTab === tab.id
                                ? `bg-gradient-to-r ${
                                    tab.color === 'green' ? 'from-green-500 to-emerald-500' :
                                    tab.color === 'red' ? 'from-red-500 to-pink-500' :
                                    tab.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                                    tab.color === 'purple' ? 'from-purple-500 to-violet-500' :
                                    'from-orange-500 to-amber-500'
                                  } text-white shadow-lg transform scale-105`
                                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                            }`}
                          >
                            <span className="text-sm">{tab.icon}</span>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Stock Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {stockData[activeStockTab as keyof typeof stockData].map((stock, index) => (
                        <div key={index} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                                  {stock.logo}
                                </div>
                                <div>
                                  <div className="font-bold text-gray-800">{stock.symbol}</div>
                                  <div className="text-xs text-gray-500 leading-tight">{stock.name}</div>
                                </div>
                              </div>
                              <button className="text-gray-400 hover:text-[#FF6B2C] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="text-center mb-4">
                              <div className="text-2xl font-bold text-gray-800 mb-1">{stock.price}</div>
                              <div className={`text-lg font-bold px-3 py-1 rounded-full ${
                                stock.change.startsWith('+') 
                                  ? 'text-green-700 bg-green-100' 
                                  : 'text-red-700 bg-red-100'
                              }`}>
                                {stock.change}
                              </div>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  stock.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.abs(parseFloat(stock.change)) * 20}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mutual Funds Premium Section */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                          Investment Funds
                        </h3>
                        <p className="text-gray-600 mt-1">Curated mutual funds and ETFs</p>
                      </div>
                      
                      {/* Enhanced Fund Category Tabs */}
                      <div className="flex flex-wrap items-center gap-2">
                        {[
                          { id: 'largeCap', label: 'Large Cap', color: 'blue', icon: '🏢' },
                          { id: 'midCap', label: 'Mid Cap', color: 'green', icon: '🏭' },
                          { id: 'smallCap', label: 'Small Cap', color: 'yellow', icon: '🚀' },
                          { id: 'taxSaving', label: 'Tax Saver', color: 'purple', icon: '💰' },
                          { id: 'indexFunds', label: 'Index', color: 'gray', icon: '📊' },
                          { id: 'etfs', label: 'ETFs', color: 'indigo', icon: '⚡' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveFundTab(tab.id)}
                            className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                              activeFundTab === tab.id
                                ? `bg-gradient-to-r ${
                                    tab.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                                    tab.color === 'green' ? 'from-green-500 to-emerald-500' :
                                    tab.color === 'yellow' ? 'from-yellow-500 to-amber-500' :
                                    tab.color === 'purple' ? 'from-purple-500 to-violet-500' :
                                    tab.color === 'gray' ? 'from-gray-500 to-slate-500' :
                                    'from-indigo-500 to-purple-500'
                                  } text-white shadow-lg`
                                : 'bg-white/50 text-gray-600 hover:bg-white/80'
                            }`}
                          >
                            <span>{tab.icon}</span>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Fund Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {mutualFundsData[activeFundTab as keyof typeof mutualFundsData].map((fund, index) => (
                        <div key={index} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                                  {fund.logo}
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold text-gray-800 leading-tight">{fund.name}</div>
                                  <div className="text-xs text-gray-500 mt-1">{fund.category}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">{fund.return}</div>
                                <div className="text-xs text-gray-500">1Y Return</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Recommended</span>
                              </div>
                              <button className="text-[#FF6B2C] hover:text-orange-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Premium CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C] via-pink-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            
            <div className="relative w-full max-w-[1400px] mx-auto px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                  Elevate Your
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Investment Game
                  </span>
                </h2>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Join thousands of smart investors using our advanced analytics platform. 
                  Get real-time insights, professional research, and AI-powered recommendations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={handleGetStarted}
                    className="group bg-white text-gray-800 px-10 py-5 border-none rounded-2xl text-lg font-bold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">🚀</span>
                    {isLoggedIn ? 'Launch Platform' : 'Start Free Trial'}
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  <button className="group bg-white/20 backdrop-blur-sm text-white px-10 py-5 border-2 border-white/30 rounded-2xl text-lg font-bold cursor-pointer hover:bg-white/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                    <span className="text-2xl">🎬</span>
                    Watch Demo
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 6h6a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10,000+</div>
                    <div className="text-white/80">Active Traders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">₹500Cr+</div>
                    <div className="text-white/80">Assets Tracked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-white/80">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translate3d(0%, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee {
            animation: marquee 10s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
}