import  { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';



const mandiData  = {
    'Indore': [
        { name: 'Soybean (सोयाबीन)', min: 4550, max: 4800, modal: 4680, trend: 'up' },
        { name: 'Wheat (गेहूँ)', min: 2100, max: 2280, modal: 2250, trend: 'down' },
        { name: 'Gram (चना)', min: 5250, max: 5500, modal: 5380, trend: 'up' },
        { name: 'Garlic (लहसुन)', min: 8500, max: 12200, modal: 10500, trend: 'up' },
        { name: 'Onion (प्याज)', min: 1800, max: 2400, modal: 2150, trend: 'stable' },
        { name: 'Potato (आलू)', min: 1500, max: 1900, modal: 1700, trend: 'down' },
    ],
    'Ujjain': [
        { name: 'Soybean (सोयाबीन)', min: 4450, max: 4750, modal: 4600, trend: 'up' },
        { name: 'Wheat (गेहूँ)', min: 2150, max: 2250, modal: 2200, trend: 'stable' },
        { name: 'Gram (चना)', min: 5100, max: 5400, modal: 5250, trend: 'up' },
        { name: 'Lentil (मसूर)', min: 5800, max: 6100, modal: 5950, trend: 'up' },
    ],
    'Dewas': [
        { name: 'Soybean (सोयाबीन)', min: 4520, max: 4780, modal: 4680, trend: 'down' },
        { name: 'Wheat (गेहूँ)', min: 2080, max: 2280, modal: 2210, trend: 'down' },
        { name: 'Garlic (लहसुन)', min: 8200, max: 11800, modal: 10100, trend: 'up' },
        { name: 'Corn (मक्का)', min: 1900, max: 2100, modal: 2050, trend: 'stable' },
    ]
};

// --- SVG Icons ---
const ArrowUpIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 5v14"/><path d="m18 11-6-6-6-6"/></svg>);
const ArrowDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 19V5"/><path d="m6 13 6 6 6-6"/></svg>);
const MinusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M5 12h14"/></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);

const TrendIndicator = ({ trend }:any) => {
    if (trend === 'up') return <ArrowUpIcon />;
    if (trend === 'down') return <ArrowDownIcon />;
    return <MinusIcon />;
};

// --- Main Market Price Component ---
function MarketPrice() {
    const [activeMandi, setActiveMandi] = useState('Indore');
    const [searchTerm, setSearchTerm] = useState('');
const navigation=useNavigate();
    const mandis = Object.keys(mandiData);
    
    const filteredData = useMemo(() => {
        //@ts-ignore
        return mandiData[activeMandi].filter(crop  => 
            crop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [activeMandi, searchTerm]);

function handlerClick(){
    
        navigation("/chat-bot")
}
    
  const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );

    return (
        <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
             <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header/> </div>
            <div className="max-w-7xl mx-auto">
                <br /><br /><br />
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Market Prices (मंडी भाव)</h1>
                    <p className="text-md text-gray-600">Last updated: Today, 1:45 AM IST</p>
                </header>

                {/* Mandi Selection Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-300">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {mandis.map(mandi => (
                                <button
                                    key={mandi}
                                    onClick={() => setActiveMandi(mandi)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 ${
                                        activeMandi === mandi
                                            ? 'border-green-600 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
                                    }`}
                                >
                                    {mandi}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            placeholder="Search for a crop..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

 <div
       onClick={handlerClick}
      role="button"
      tabIndex={0}

      className="fixed bottom-8 right-8 bg-green-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-110 cursor-pointer"
      aria-label="Open Chatbot"
    >
      <ChatIcon />
    </div>

                {/* Price List Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr className="border-b-2 border-gray-200">
                                    <th className="p-4 font-semibold text-gray-600">CROP (फसल)</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">MIN PRICE (₹/Quintal)</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">MAX PRICE (₹/Quintal)</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">MODAL PRICE (₹/Quintal)</th>
                                    <th className="p-4 font-semibold text-gray-600 text-center">TREND</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //@ts-ignore
                                filteredData.length > 0 ? filteredData.map((crop, index) => (
                                    <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                                        <td className="p-4 font-medium text-gray-800">{crop.name}</td>
                                        <td className="p-4 text-gray-700 text-right">₹{crop.min.toLocaleString('en-IN')}</td>
                                        <td className="p-4 text-gray-700 text-right">₹{crop.max.toLocaleString('en-IN')}</td>
                                        <td className="p-4 font-bold text-lg text-gray-900 text-right">₹{crop.modal.toLocaleString('en-IN')}</td>
                                        <td className="p-4 flex justify-center items-center">
                                            <TrendIndicator trend={crop.trend} />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        
                                        <td colSpan="5" className="text-center p-8 text-gray-500">
                                            No crops found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketPrice;
