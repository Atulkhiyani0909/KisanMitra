import  { useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';


const weatherData = [
  {
    day: 'Today',
    date: 'Sep 25',
    maxTemp: 31,
    minTemp: 22,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    hourly: [
      { time: '6 AM', temp: 23, condition: 'Haze', humidity: 88, wind: 5 },
      { time: '9 AM', temp: 26, condition: 'Sunny', humidity: 75, wind: 7 },
      { time: '12 PM', temp: 30, condition: 'Partly Cloudy', humidity: 60, wind: 12 },
      { time: '3 PM', temp: 31, condition: 'Partly Cloudy', humidity: 58, wind: 15 },
      { time: '6 PM', temp: 28, condition: 'Cloudy', humidity: 70, wind: 10 },
      { time: '9 PM', temp: 25, condition: 'Clear', humidity: 85, wind: 6 },
    ],
  },
  {
    day: 'Friday',
    date: 'Sep 26',
    maxTemp: 32,
    minTemp: 23,
    condition: 'Sunny',
    icon: 'sunny',
    hourly: [
      { time: '6 AM', temp: 23, condition: 'Clear', humidity: 85, wind: 4 },
      { time: '9 AM', temp: 27, condition: 'Sunny', humidity: 70, wind: 8 },
      { time: '12 PM', temp: 31, condition: 'Sunny', humidity: 55, wind: 14 },
      { time: '3 PM', temp: 32, condition: 'Sunny', humidity: 52, wind: 16 },
      { time: '6 PM', temp: 29, condition: 'Clear', humidity: 65, wind: 11 },
      { time: '9 PM', temp: 26, condition: 'Clear', humidity: 80, wind: 7 },
    ],
  },
  {
    day: 'Saturday',
    date: 'Sep 27',
    maxTemp: 30,
    minTemp: 24,
    condition: 'Light Rain',
    icon: 'rain',
    hourly: [
        { time: '6 AM', temp: 24, condition: 'Overcast', humidity: 92, wind: 8 },
        { time: '9 AM', temp: 26, condition: 'Cloudy', humidity: 88, wind: 12 },
        { time: '12 PM', temp: 29, condition: 'Light Rain', humidity: 80, wind: 15 },
        { time: '3 PM', temp: 30, condition: 'Light Rain', humidity: 78, wind: 18 },
        { time: '6 PM', temp: 27, condition: 'Showers', humidity: 85, wind: 14 },
        { time: '9 PM', temp: 25, condition: 'Cloudy', humidity: 90, wind: 9 },
    ],
  },
  {
    day: 'Sunday',
    date: 'Sep 28',
    maxTemp: 29,
    minTemp: 23,
    condition: 'Thunderstorm',
    icon: 'thunderstorm',
    hourly: [
        { time: '6 AM', temp: 24, condition: 'Cloudy', humidity: 95, wind: 10 },
        { time: '9 AM', temp: 26, condition: 'Rain', humidity: 90, wind: 15 },
        { time: '12 PM', temp: 28, condition: 'Thunderstorm', humidity: 85, wind: 20 },
        { time: '3 PM', temp: 29, condition: 'Thunderstorm', humidity: 82, wind: 22 },
        { time: '6 PM', temp: 26, condition: 'Rain', humidity: 88, wind: 18 },
        { time: '9 PM', temp: 24, condition: 'Overcast', humidity: 94, wind: 12 },
    ],
  },
  {
    day: 'Monday',
    date: 'Sep 29',
    maxTemp: 31,
    minTemp: 22,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    hourly: [
        { time: '6 AM', temp: 22, condition: 'Clear', humidity: 88, wind: 6 },
        { time: '9 AM', temp: 26, condition: 'Sunny', humidity: 75, wind: 9 },
        { time: '12 PM', temp: 30, condition: 'Partly Cloudy', humidity: 60, wind: 14 },
        { time: '3 PM', temp: 31, condition: 'Partly Cloudy', humidity: 58, wind: 16 },
        { time: '6 PM', temp: 28, condition: 'Clear', humidity: 70, wind: 11 },
        { time: '9 PM', temp: 25, condition: 'Clear', humidity: 85, wind: 8 },
    ],
  },
  {
    day: 'Tuesday',
    date: 'Sep 30',
    maxTemp: 33,
    minTemp: 23,
    condition: 'Sunny',
    icon: 'sunny',
     hourly: [
      { time: '6 AM', temp: 23, condition: 'Clear', humidity: 85, wind: 4 },
      { time: '9 AM', temp: 28, condition: 'Sunny', humidity: 70, wind: 8 },
      { time: '12 PM', temp: 32, condition: 'Sunny', humidity: 55, wind: 14 },
      { time: '3 PM', temp: 33, condition: 'Sunny', humidity: 52, wind: 16 },
      { time: '6 PM', temp: 29, condition: 'Clear', humidity: 65, wind: 11 },
      { time: '9 PM', temp: 26, condition: 'Clear', humidity: 80, wind: 7 },
    ],
  },
  {
    day: 'Wednesday',
    date: 'Oct 1',
    maxTemp: 34,
    minTemp: 24,
    condition: 'Sunny',
    icon: 'sunny',
     hourly: [
      { time: '6 AM', temp: 24, condition: 'Clear', humidity: 85, wind: 4 },
      { time: '9 AM', temp: 29, condition: 'Sunny', humidity: 70, wind: 8 },
      { time: '12 PM', temp: 33, condition: 'Sunny', humidity: 55, wind: 14 },
      { time: '3 PM', temp: 34, condition: 'Sunny', humidity: 52, wind: 16 },
      { time: '6 PM', temp: 30, condition: 'Clear', humidity: 65, wind: 11 },
      { time: '9 PM', temp: 27, condition: 'Clear', humidity: 80, wind: 7 },
    ],
  },
];

// --- SVG Icons Component ---
// A single component to render the correct weather icon based on a string name.
const WeatherIcon = ({ iconName , className } : any) => {
  const icons = {
    'sunny': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
    'partly-cloudy': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 16.5V22" /><path d="M16 14.5l3.5 3.5" /><path d="M8 14.5l-3.5 3.5" /><path d="M12 4.5V2" /><path d="M18.5 7.5L21 5" /><path d="M5.5 7.5L3 5" /><path d="M12 11.5a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z" /><path d="M22 17.5a4.5 4.5 0 0 0-8.2-2.5" /></svg>,
    'rain': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 13.36V12a4 4 0 0 0-4-4H8.5A4.5 4.5 0 0 0 4 12.5V13"/><path d="M16 9h.01"/><path d="M8 17.62V18a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-.5"/><path d="M12 12v1.88"/><path d="M12 18.88V20"/></svg>,
    'thunderstorm': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.74 18.46a4.5 4.5 0 0 0-6.1-6.1 4.5 4.5 0 0 0-6.26 6.26" /><path d="M16 14.5l-3.5 3.5" /><path d="M13 17.5l-3.5 3.5" /><path d="M8 14.5l3.5-3.5" /></svg>,
  };
  //@ts-ignore
  return icons[iconName] || icons['partly-cloudy'];
};


// --- Main Weather Page Component ---
function Weather() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDayData = weatherData[selectedDayIndex];
const navigation=useNavigate();

      const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

function handlerClick(){
    
        navigation("/chat-bot")
}

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
       <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header/> </div>
      <div className="max-w-7xl mx-auto">
        <br /><br /><br />
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Weather Forecast</h1>
          <p className="text-md text-gray-600">Indore, Madhya Pradesh</p>
        </header>

        {/* Main Current Weather Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
                <WeatherIcon iconName={weatherData[0].icon} className="w-20 h-20 text-yellow-500" />
                <div className="ml-4">
                    <p className="text-5xl font-bold text-gray-800">{weatherData[0].maxTemp}°C</p>
                    <p className="text-gray-600 text-lg">{weatherData[0].condition}</p>
                </div>
            </div>
            <div className="text-center md:text-right">
                <p className="text-lg font-semibold">{weatherData[0].day}, {weatherData[0].date}</p>
                <p className="text-gray-500">Min: {weatherData[0].minTemp}°C</p>
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

        {/* 7-Day Forecast Selection */}
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4">
                {weatherData.map((day, index) => (
                    <button 
                        key={index}
                        onClick={() => setSelectedDayIndex(index)}
                        className={`p-3 rounded-xl text-center transition-all duration-300 ${
                            selectedDayIndex === index 
                            ? 'bg-green-600 text-white shadow-lg scale-105' 
                            : 'bg-white hover:bg-gray-200'
                        }`}
                    >
                        <p className="font-bold text-lg">{day.day.substring(0,3)}</p>
                        <p className="text-sm opacity-80 mb-2">{day.date}</p>
                        <WeatherIcon iconName={day.icon} className={`w-10 h-10 mx-auto mb-2 ${selectedDayIndex === index ? 'text-white' : 'text-yellow-500'}`} />
                        <p className="font-semibold text-md">{day.maxTemp}° <span className="opacity-70">{day.minTemp}°</span></p>
                    </button>
                ))}
            </div>
        </div>


        {/* Detailed Hourly Forecast for Selected Day */}
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hourly Details for {selectedDayData.day}</h2>
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="p-3 font-semibold text-gray-600">Time</th>
                                <th className="p-3 font-semibold text-gray-600">Forecast</th>
                                <th className="p-3 font-semibold text-gray-600 text-center">Temp (°C)</th>
                                <th className="p-3 font-semibold text-gray-600 text-center">Humidity (%)</th>
                                <th className="p-3 font-semibold text-gray-600 text-center">Wind (km/h)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedDayData.hourly.map((hour, index) => (
                                <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                    <td className="p-3 font-medium text-gray-800">{hour.time}</td>
                                    <td className="p-3 text-gray-600">{hour.condition}</td>
                                    <td className="p-3 font-bold text-lg text-gray-800 text-center">{hour.temp}°</td>
                                    <td className="p-3 text-gray-600 text-center">{hour.humidity}</td>
                                    <td className="p-3 text-gray-600 text-center">{hour.wind}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
