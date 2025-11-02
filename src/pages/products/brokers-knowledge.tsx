import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/router";

interface Broker {
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  deliveryBrokerage: string;
  intradayBrokerage: string;
  accountOpening: string;
  equityDelivery: string;
  equityIntraday: string;
  equityFutures: string;
  equityOptions: string;
  currencyFutures: string;
  currencyOptions: string;
  commodityFutures: string;
  commodityOptions: string;
  mutualFunds: string;
  ipo: string;
  bond: string;
  website: string;
  featured?: boolean;
}

const brokers: Broker[] = [
  {
    name: "Shoonya by Finvasia",
    logo: "🟠",
    rating: 4.2,
    reviews: 14063,
    deliveryBrokerage: "Zero",
    intradayBrokerage: "Zero", 
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅", 
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "❌",
    ipo: "✅",
    bond: "❌",
    website: "https://shoonya.com/",
    featured: true
  },
  {
    name: "Groww",
    logo: "🟢",
    rating: 4.3,
    reviews: 11854,
    deliveryBrokerage: "₹0",
    intradayBrokerage: "₹20",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅", 
    currencyFutures: "❌",
    currencyOptions: "❌",
    commodityFutures: "❌",
    commodityOptions: "❌",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://groww.in/",
    featured: true
  },
  {
    name: "Zerodha",
    logo: "🔵",
    rating: 4.1,
    reviews: 235779,
    deliveryBrokerage: "₹0",
    intradayBrokerage: "₹20",
    accountOpening: "₹200",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://zerodha.com/",
    featured: true
  },
  {
    name: "Angel One",
    logo: "🔺",
    rating: 3.8,
    reviews: 4561,
    deliveryBrokerage: "₹0",
    intradayBrokerage: "₹20",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://angelone.in/"
  },
  {
    name: "Upstox",
    logo: "⬆️",
    rating: 3.6,
    reviews: 4452,
    deliveryBrokerage: "₹0",
    intradayBrokerage: "₹20",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://upstox.com/"
  },
  {
    name: "ICICI Direct",
    logo: "🏛️",
    rating: 3.8,
    reviews: 2456,
    deliveryBrokerage: "0.55%",
    intradayBrokerage: "0.05%",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://www.icicidirect.com/"
  },
  {
    name: "HDFC Securities",
    logo: "🏦",
    rating: 3.6,
    reviews: 1890,
    deliveryBrokerage: "0.50%",
    intradayBrokerage: "0.05%",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://www.hdfcsec.com/"
  },
  {
    name: "Axis Securities",
    logo: "🅰️",
    rating: 3.7,
    reviews: 3245,
    deliveryBrokerage: "0.50%",
    intradayBrokerage: "0.05%",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://www.axissecurities.in/"
  },
  {
    name: "Motilal Oswal",
    logo: "📊",
    rating: 3.5,
    reviews: 2134,
    deliveryBrokerage: "0.50%",
    intradayBrokerage: "0.05%",
    accountOpening: "₹500",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "✅",
    equityOptions: "✅",
    currencyFutures: "✅",
    currencyOptions: "✅",
    commodityFutures: "✅",
    commodityOptions: "✅",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://www.motilaloswal.com/"
  },
  {
    name: "Paytm Money",
    logo: "💳",
    rating: 3.4,
    reviews: 5647,
    deliveryBrokerage: "₹0",
    intradayBrokerage: "₹10",
    accountOpening: "₹0",
    equityDelivery: "✅",
    equityIntraday: "✅",
    equityFutures: "❌",
    equityOptions: "❌",
    currencyFutures: "❌",
    currencyOptions: "❌",
    commodityFutures: "❌",
    commodityOptions: "❌",
    mutualFunds: "✅",
    ipo: "✅",
    bond: "✅",
    website: "https://www.paytmmoney.com/"
  }
];

export default function BrokersKnowledge() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const categories = [
    { id: 'all', name: 'All Brokers', icon: '📊' },
    { id: 'zero-brokerage', name: 'Zero Brokerage', icon: '💰' },
    { id: 'full-service', name: 'Full Service', icon: '🏛️' },
    { id: 'discount', name: 'Discount Brokers', icon: '🔥' }
  ];

  const getFilteredBrokers = () => {
    let filtered = [...brokers];
    
    if (selectedCategory === 'zero-brokerage') {
      filtered = filtered.filter(broker => broker.deliveryBrokerage === '₹0' || broker.deliveryBrokerage === 'Zero');
    } else if (selectedCategory === 'full-service') {
      filtered = filtered.filter(broker => broker.deliveryBrokerage.includes('%'));
    } else if (selectedCategory === 'discount') {
      filtered = filtered.filter(broker => 
        broker.deliveryBrokerage === '₹0' || 
        broker.deliveryBrokerage === 'Zero' || 
        broker.intradayBrokerage === '₹20'
      );
    }

    // Sort brokers
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  };

  return (
    <>
      <Head>
        <title>Best Stock Brokers in India 2025 - Compare Brokerage, Features & Reviews | IncomeGrow Financial</title>
        <meta name="description" content="Compare top stock brokers in India 2025. Find best brokerage rates, features, and reviews for Zerodha, Groww, Angel One, Upstox and more. Start trading today!" />
        <meta name="keywords" content="stock brokers India, best stock broker, zerodha, groww, angel one, upstox, brokerage comparison, stock trading, demat account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="http://incomegrow.in//products/brokers-knowledge" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-6">
                <span className="text-sm font-semibold text-blue-600">📈 Stock Broker Comparison</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Best Stock Brokers in India
                </span>
                <br />
                <span className="text-gray-800">Compare & Choose 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Compare top stock brokers in India based on brokerage rates, features, reviews and trading platforms. Find the perfect broker for your investment needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => router.push('/signup')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Start Your Investment Journey
                </button>
                <button
                  onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Compare Brokers
                </button>
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section className="py-8 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                  <span className="text-gray-700 font-medium">Filter by:</span>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="rating">Rating</option>
                    <option value="reviews">Reviews</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table" className="py-16 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Stock Broker Comparison Table
              </h2>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Broker</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Rating</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Delivery</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Intraday</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Account Opening</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Mutual Funds</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">IPO</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {getFilteredBrokers().map((broker) => (
                        <tr key={broker.name} className={`hover:bg-gray-50 ${broker.featured ? 'bg-orange-50' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{broker.logo}</div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-semibold text-gray-900">{broker.name}</h3>
                                  {broker.featured && (
                                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-semibold">
                                      FEATURED
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  ⭐ {broker.rating} ({broker.reviews.toLocaleString()} reviews)
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                              <div className="text-lg font-bold text-gray-900">{broker.rating}</div>
                              <div className="text-xs text-gray-500">{broker.reviews.toLocaleString()}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`font-semibold ${
                              broker.deliveryBrokerage === '₹0' || broker.deliveryBrokerage === 'Zero' 
                                ? 'text-green-600' 
                                : 'text-orange-600'
                            }`}>
                              {broker.deliveryBrokerage}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`font-semibold ${
                              broker.intradayBrokerage === 'Zero' 
                                ? 'text-green-600' 
                                : 'text-orange-600'
                            }`}>
                              {broker.intradayBrokerage}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`font-semibold ${
                              broker.accountOpening === '₹0' 
                                ? 'text-green-600' 
                                : 'text-orange-600'
                            }`}>
                              {broker.accountOpening}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg">{broker.mutualFunds}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg">{broker.ipo}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <a
                              href={broker.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                              Open Account
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Brokers Section */}
          <section className="py-16 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Top Recommended Stock Brokers
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {brokers.filter(broker => broker.featured).map((broker) => (
                  <div key={broker.name} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{broker.logo}</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{broker.name}</h3>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <span className="text-lg font-semibold">{broker.rating}</span>
                        <span className="text-gray-500">({broker.reviews.toLocaleString()})</span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Delivery Brokerage:</span>
                          <span className="font-semibold text-green-600">{broker.deliveryBrokerage}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Intraday Brokerage:</span>
                          <span className="font-semibold text-green-600">{broker.intradayBrokerage}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Account Opening:</span>
                          <span className="font-semibold text-green-600">{broker.accountOpening}</span>
                        </div>
                      </div>
                      
                      <a
                        href={broker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block"
                      >
                        Open Account →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Comparison */}
          <section className="py-16 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Detailed Features Comparison
              </h2>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50">Broker</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Equity Delivery</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Equity Intraday</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Equity Futures</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Equity Options</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Currency F&O</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Commodity F&O</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Mutual Funds</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">IPO</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Bonds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {brokers.map((broker) => (
                        <tr key={broker.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 sticky left-0 bg-white">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{broker.logo}</span>
                              <span className="font-medium text-gray-900">{broker.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-lg">{broker.equityDelivery}</td>
                          <td className="px-4 py-3 text-center text-lg">{broker.equityIntraday}</td>
                          <td className="px-4 py-3 text-center text-lg">{broker.equityFutures}</td>
                          <td className="px-4 py-3 text-center text-lg">{broker.equityOptions}</td>
                          <td className="px-4 py-3 text-center text-lg">
                            {broker.currencyFutures === '✅' && broker.currencyOptions === '✅' ? '✅' : '❌'}
                          </td>
                          <td className="px-4 py-3 text-center text-lg">
                            {broker.commodityFutures === '✅' && broker.commodityOptions === '✅' ? '✅' : '❌'}
                          </td>
                          <td className="px-4 py-3 text-center text-lg">{broker.mutualFunds}</td>
                          <td className="px-4 py-3 text-center text-lg">{broker.ipo}</td>
                          <td className="px-4 py-3 text-center text-lg">{broker.bond}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* How to Choose Section */}
          <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                How to Choose the Right Stock Broker
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-4xl mb-4 text-center">💰</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Brokerage Charges</h3>
                  <p className="text-gray-600 text-center">
                    Compare delivery and intraday brokerage rates. Zero brokerage brokers can save significant costs for frequent traders.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-4xl mb-4 text-center">📱</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Trading Platform</h3>
                  <p className="text-gray-600 text-center">
                    Look for user-friendly mobile apps and web platforms with advanced charting tools and real-time data.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-4xl mb-4 text-center">🛡️</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Regulatory Compliance</h3>
                  <p className="text-gray-600 text-center">
                    Ensure the broker is registered with SEBI and offers investor protection through depositories.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-4xl mb-4 text-center">📞</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Customer Support</h3>
                  <p className="text-gray-600 text-center">
                    24/7 customer support through multiple channels including phone, email, and live chat is essential.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-4xl mb-4 text-center">📊</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Research & Analysis</h3>
                  <p className="text-gray-600 text-center">
                    Access to research reports, market analysis, and educational content can help make informed decisions.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-4xl mb-4 text-center">🚀</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Additional Services</h3>
                  <p className="text-gray-600 text-center">
                    Mutual funds, IPO applications, insurance, and other financial services under one roof.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50]">
            <div className="w-full max-w-[1600px] mx-auto px-6 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
              <p className="text-xl mb-8 opacity-90">
                Choose from the best stock brokers in India and start building your wealth today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/signup')}
                  className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Start Free Account
                </button>
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                >
                  Calculate Tax Savings
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}