import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { content } from '../Essentials/content';

import { useRecoilState } from 'recoil';
import { ThemeAtom } from '../store/themeAtom';

// --- Language Content ---
// Storing all text in a single object makes it easy to manage and switch languages.


// --- SVG Icons ---
// Using inline SVGs is a great way to keep everything in one file without external dependencies.
const SunCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M12 16.5V22" /><path d="M16 14.5l3.5 3.5" /><path d="M8 14.5l-3.5 3.5" /><path d="M12 4.5V2" /><path d="M18.5 7.5L21 5" /><path d="M5.5 7.5L3 5" /><path d="M12 11.5a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z" /><path d="M22 17.5a4.5 4.5 0 0 0-8.2-2.5" />
    </svg>
);
const LineChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
);
const SproutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M7 20h10" /><path d="M10 20c0-3.3 1-6.5 3-8.5" /><path d="M14.5 20c0-5 2-9.5-1.5-12.5" /><path d="M4 12c-1.5 2.5-2 5-2 7h2" /><path d="M22 12c-1.5 2.5-2 5-2 7h2" />
    </svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const QuoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
);


// --- Main App Component ---
function App() {
   const navigation =useNavigate();
    const [val]=useRecoilState(ThemeAtom)
    console.log(val);
    


    //@ts-ignore
    const t = content[val];
    
    const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

function handlerClick(){
    
        navigation("/chat-bot")
}
    

    return (
        <div className="bg-gray-50 text-gray-800 font-sans flex flex-col min-h-screen">
            {/* Header */}
            
       <Header/>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section */}
                <section
                    className="relative bg-cover bg-center text-white py-24 md:py-40"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-7cb3b7874b71?q=80&w=2070&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                            {t.heroTitle}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto drop-shadow-md">
                            {t.heroSubtitle}
                        </p>
                       
                        <Link
                            to={"/chat-bot"}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                        >
                            Kisan AI ( किसान ए.आई )
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t.featuresTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         <Link to={"/weather"}> <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"><div className="flex justify-center mb-4"><SunCloudIcon /></div><h3 className="text-xl font-semibold mb-2">{t.feature1Title}</h3><p className="text-gray-600">{t.feature1Desc}</p></div></Link>  

                         <Link to={"/market-price"}>  <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"><div className="flex justify-center mb-4"><LineChartIcon /></div><h3 className="text-xl font-semibold mb-2">{t.feature2Title}</h3><p className="text-gray-600">{t.feature2Desc}</p></div></Link> 

                        <Link to={"/crop-suggestion"}>      <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"><div className="flex justify-center mb-4"><SproutIcon /></div><h3 className="text-xl font-semibold mb-2">{t.feature3Title}</h3><p className="text-gray-600">{t.feature3Desc}</p></div></Link>

                        <Link to={"/community-page"}> <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"><div className="flex justify-center mb-4"><UsersIcon /></div><h3 className="text-xl font-semibold mb-2">{t.feature4Title}</h3><p className="text-gray-600">{t.feature4Desc}</p></div>
                        </Link>   
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t.testimonialsTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <QuoteIcon />
                                <p className="text-gray-600 italic mt-4 mb-4">{t.testimonial1Text}</p>
                                <p className="font-semibold text-green-600">{t.testimonial1Name}</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <QuoteIcon />
                                <p className="text-gray-600 italic mt-4 mb-4">{t.testimonial2Text}</p>
                                <p className="font-semibold text-green-600">{t.testimonial2Name}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <button
       onClick={handlerClick}
      role="button"
      tabIndex={0}

      className="fixed bottom-8 right-8 bg-green-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-110 cursor-pointer"
      aria-label="Open Chatbot"
    >
      <ChatIcon />
    </button>
               

                {/* Call to Action Section */}
                <section className="bg-green-600 text-white">
                    <div className="container mx-auto px-6 py-16 text-center">
                        <h2 className="text-3xl font-bold mb-2">{t.ctaTitle}</h2>
                        <p className="mb-8">{t.ctaSubtitle}</p>
                        <a href="#" className="bg-white text-green-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300">
                            {t.ctaButton}
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>{t.footerText}</p>
                </div>
            </footer>
        </div>
    );
}

export default App;

