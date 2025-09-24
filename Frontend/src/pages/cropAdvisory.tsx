import  { useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';



const cropRecommendationData = {
    'Soybean': {
        name: 'Soybean (सोयाबीन)',
        icon: '🌱',
        reason: 'Excellent match for black soil and upcoming weather patterns.',
        market_price: '₹4,500 - ₹4,800',
        estimated_profit: '+25%',
        profit_color: 'text-green-600',
        demand: 'High',
        weather_suitability: 'Excellent'
    },
    'Cotton': {
        name: 'Cotton (कपास)',
        icon: '⚪',
        reason: 'Highly suitable for your soil type with strong market demand.',
        market_price: '₹6,000 - ₹7,500',
        estimated_profit: '+35%',
        profit_color: 'text-green-600',
        demand: 'High',
        weather_suitability: 'Good'
    },
    'Wheat': {
        name: 'Wheat (गेहूँ)',
        icon: '🍞',
        reason: 'A stable choice, but profit margins are currently lower due to high supply.',
        market_price: '₹2,100 - ₹2,300',
        estimated_profit: '+15%',
        profit_color: 'text-yellow-600',
        demand: 'Medium',
        weather_suitability: 'Excellent'
    },
};

const cropGuidance = {
    'Soybean': {
        current_stage: 'Vegetative Growth',
        todays_focus: 'Weed control is critical today. Check for signs of yellowing leaves and consider a foliar spray if needed.',
        stages: [
            { stage: 'Sowing (बुवाई)', tasks: ['Maintain row-to-row spacing of 45cm.', 'Treat seeds with Rhizobium culture.', 'Ensure proper soil moisture.'] },
            { stage: 'Vegetative Growth (वनस्पति विकास)', tasks: ['First irrigation at 20-25 days.', 'Weed control is critical at 30-45 days.', 'Apply a foliar spray of Urea if leaves turn yellow.'] },
            { stage: 'Flowering & Pod Filling (फूल और फली भरना)', tasks: ['Ensure consistent moisture; avoid water stress.', 'Monitor for girdle beetle and green semilooper pests.', 'Apply Sulphur for better oil content.'] },
            { stage: 'Harvesting (कटाई)', tasks: ['Harvest when 95% of pods have turned brown.', 'Dry the harvested crop in the sun for 2-3 days.', 'Use a thresher for separating grains.'] }
        ]
    },
    'Wheat': {
        current_stage: 'Crown Root Initiation (21 days)',
        todays_focus: 'Apply the first dose of Nitrogen and ensure proper irrigation. This is a critical stage for root development.',
        stages: [
            { stage: 'Sowing (बुवाई)', tasks: ['Sow between November 1st and 25th for best results.', 'Use a seed drill for uniform depth.', 'Complete the first light irrigation immediately after sowing.'] },
            { stage: 'Crown Root Initiation (ताज जड़ दीक्षा)', tasks: ['This is a critical stage at 20-25 days.', 'Apply the first dose of Nitrogen and ensure proper irrigation.', 'Weed management is essential now.'] },
            { stage: 'Tillering & Flowering (टिलरिंग और फूल)', tasks: ['Monitor for yellow rust disease.', 'Maintain adequate soil moisture.', 'Apply the second dose of Nitrogen before flowering.'] },
            { stage: 'Grain Filling & Harvesting (अनाज भरना और कटाई)', tasks: ['Stop irrigation 15 days before harvesting.', 'Harvest when grains are hard and contain less than 12% moisture.', 'Protect the harvested crop from rain.'] }
        ]
    }
};
const availableCrops = Object.keys(cropGuidance);

// --- SVG Icons ---
const SproutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><path d="M7 20h10" /><path d="M10 20c0-3.3 1-6.5 3-8.5" /><path d="M14.5 20c0-5 2-9.5-1.5-12.5" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-3 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;


// --- Main Crop Advisory Component ---

function CropAdvisory() {
    const [view, setView] = useState('select'); // 'select', 'recommendation', 'guidance'
    
    // State for recommendation flow
    const [recommendations, setRecommendations] = useState<any>([]);
    const [uploadedFile, setUploadedFile] = useState<any>(null);

    // State for guidance flow
    const [selectedCrop, setSelectedCrop] = useState(availableCrops[0]);
    const [logEntry, setLogEntry] = useState('');
const navigation=useNavigate();
    const getRecommendations = () => {
        if (!uploadedFile) {
            alert("Please upload a soil report first.");
            return;
        }
        // Mock analysis: In a real app, the PDF would be processed on the backend.
        // Here, we just return all mock recommendations.
        //@ts-ignore
        setRecommendations(Object.values(cropRecommendationData));
    };
    function handlerClick(){
        navigation("/chat-bot")
    }
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

    const BackButton = ({ targetView }:any) => (
         <button onClick={() => setView(targetView)} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-semibold">
            <BackIcon />
            <span className="ml-2">Back</span>
        </button>
    );

    // --- Render Logic ---

    if (view === 'recommendation') {
        return (
            <> <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header/> </div><br /><br /><br /><br />
            <div className="max-w-7xl mx-auto">
              
                 <BackButton targetView="select" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">New Crop Recommendation</h2>
                <p className="text-gray-600 mb-6">Upload your soil report to get personalized crop suggestions based on soil health, market prices, and weather.</p>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="font-bold text-lg mb-4">1. Upload Soil Report</h3>
                    <div className="flex items-center space-x-4">
                        <label className="w-full flex items-center justify-center px-4 py-3 bg-gray-50 text-green-700 rounded-lg shadow-sm tracking-wide uppercase border border-gray-300 cursor-pointer hover:bg-green-100 hover:text-green-800">
                            <UploadIcon/>
                            
                            <span className="text-base leading-normal">{uploadedFile ? uploadedFile.name : "Select a PDF file"}</span>
                            <input type='file' className="hidden" accept=".pdf" onChange={
                                //@ts-ignore
                                (e) => setUploadedFile(e.target.files[0])} />
                        </label>
                         <button onClick={getRecommendations} className="flex-shrink-0 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                            Analyze
                        </button>
                    </div>
                </div>

                {recommendations.length > 0 && (
                    <div>
                        <h3 className="font-bold text-lg mb-4">2. Top Recommendations</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            { 
                            //@ts-ignore
                            recommendations.map(rec => (
                                <div key={rec.name} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col">
                                    <p className="font-bold text-2xl mb-2">{rec.icon} {rec.name}</p>
                                    <p className="text-sm text-gray-600 mb-4 flex-grow">{rec.reason}</p>
                                    <div className="space-y-2 text-sm border-t pt-3">
                                        <div className="flex justify-between"><span>Market Price:</span> <span className="font-semibold">{rec.market_price}</span></div>
                                        <div className="flex justify-between"><span>Market Demand:</span> <span className="font-semibold">{rec.demand}</span></div>
                                        <div className="flex justify-between"><span>Weather Suitability:</span> <span className="font-semibold">{rec.weather_suitability}</span></div>
                                        <div className="flex justify-between items-center"><span>Est. Profit/Loss:</span> <span className={`font-bold text-lg ${rec.profit_color}`}>{rec.estimated_profit}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div> </>
        );
    }
    
    if (view === 'guidance') {
        //@ts-ignore
        const guidance = cropGuidance[selectedCrop];
        return (
            <>
            <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header/></div><br /><br /><br /><br />
            
            <div className="max-w-7xl mx-auto">
                
                <BackButton targetView="select" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Crop Management & Daily Log</h2>
                <p className="text-gray-600 mb-6">Track your crop's progress and get timely advice.</p>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Sown Crop:</label>
                     <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="mt-1 block w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3">
                        {availableCrops.map(crop => <option key={crop}>{crop}</option>)}
                    </select>
                </div>

                {/* Today's Focus and Daily Log */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                     <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-6">
                        <h3 className="font-bold text-lg text-yellow-800">Today's Focus: <span className="font-normal">{guidance.current_stage}</span></h3>
                        <p className="text-yellow-700 mt-2">{guidance.todays_focus}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Log Daily Activity</h3>
                        <textarea value={logEntry} onChange={(e) => setLogEntry(e.target.value)} rows="2" placeholder="e.g., Completed weeding in the north field. Observed minor pest activity..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
                        <button onClick={() => {alert('Activity Logged!'); setLogEntry('');}} className="mt-2 w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                            Save Log
                        </button>
                    </div>
                </div>


                <h3 className="text-xl font-bold text-gray-800 mb-4">Complete Stage-by-Stage Guide</h3>
                <div className="space-y-6">
                    {
                        //@ts-ignore
                    guidance.stages.map(stageData => (
                        <div key={stageData.stage} className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="font-bold text-xl text-green-700 border-b pb-2 mb-4">{stageData.stage}</h3>
                            <ul className="space-y-3">
                                {
                                //@ts-ignore
                                stageData.tasks.map(task => (
                                    <li key={task} className="flex items-start">
                                        <CheckIcon />
                                        <span className="text-gray-700">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            </>
        );
    }

    // Default view: Selection
    return (
        <>
        <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header/></div><br /><br /><br /><br />
        <div className="max-w-7xl mx-auto text-center">
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Crop Advisory</h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">Choose an option below to get personalized farming guidance based on your needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 1: Get Guidance */}
                <button onClick={() => setView('guidance')} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <ClipboardIcon />
                    <h2 className="font-bold text-2xl text-gray-800 mb-2">Guidance & Daily Tracking</h2>
                    <p className="text-gray-600">Get a step-by-step plan and log daily activities for your sown crop.</p>
                </button>
<div
      onClick={handlerClick}
      role="button"
      tabIndex={0}
      className="fixed bottom-8 right-8 bg-green-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-110 cursor-pointer"
      aria-label="Open Chatbot"
    >
      <ChatIcon />
    </div>
                {/* Card 2: Get Recommendation */}
                <button onClick={() => setView('recommendation')} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <SproutIcon />
                    <h2 className="font-bold text-2xl text-gray-800 mb-2">New Crop Recommendation</h2>
                    <p className="text-gray-600">Upload a soil report to get suggestions based on soil, weather, and market data.</p>
                </button>
            </div>
        </div>
        </>
    );
}





export default CropAdvisory;

