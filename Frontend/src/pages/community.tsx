import  { useState } from 'react';
import Header from '../components/Header';
import { useRecoilValue } from 'recoil';
import { ThemeAtom } from '../store/themeAtom';
import { Link, useNavigate } from 'react-router-dom';

// --- TYPESCRIPT INTERFACES ---
interface Expert {
  id: number;
  name: {
    en: string;
    hi: string;
  };
  expertise: {
    en: string;
    hi: string;
  };
  experience: number;
  image: string;
}

// --- MOCK DATA ---
const expertsData: Expert[] = [
  {
    id: 1,
    name: { en: 'Dr. Ramesh Verma', hi: 'डॉ. रमेश वर्मा' },
    expertise: { en: 'Soil Health & Nutrients', hi: 'मृदा स्वास्थ्य और पोषक तत्व' },
    experience: 22,
    image: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Expert',
  },
  {
    id: 2,
    name: { en: 'Sunita Chaudhary', hi: 'सुनीता चौधरी' },
    expertise: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण' },
    experience: 18,
    image: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Expert',
  },
  {
    id: 3,
    name: { en: 'Anil Patel', hi: 'अनिल पटेल' },
    expertise: { en: 'Modern Irrigation Techniques', hi: 'आधुनिक सिंचाई तकनीकें' },
    experience: 15,
    image: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Expert',
  },
   {
    id: 4,
    name: { en: 'Dr. Priya Singh', hi: 'डॉ. प्रिया सिंह' },
    expertise: { en: 'Organic Farming & Certification', hi: 'जैविक खेती और प्रमाणन' },
    experience: 20,
    image: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Expert',
  },
];


// --- BILINGUAL CONTENT ---
const content = {
    "en": {
        title: 'Kisan Samudaya (Farmer Community)',
        communityTitle: 'Connect with Fellow Farmers',
        communityDesc: 'Join our community forum to ask questions, share your experiences, and learn from thousands of other farmers across India.',
        communityButton: 'Join Community Forum',
        expertsTitle: 'Get Advice from Experts',
        expertsDesc: 'Connect with our panel of experienced agricultural experts for professional guidance and solutions to your farming problems.',
        experienceSuffix: 'Years Experience',
        contactButton: 'Contact',
    },
    "hi": {
        title: 'किसान समुदाय',
        communityTitle: 'साथी किसानों से जुड़ें',
        communityDesc: 'प्रश्न पूछने, अपने अनुभव साझा करने और पूरे भारत के हजारों अन्य किसानों से सीखने के लिए हमारे सामुदायिक मंच से जुड़ें।',
        communityButton: 'कम्युनिटी फोरम से जुड़ें',
        expertsTitle: 'विशेषज्ञों से सलाह लें',
        expertsDesc: 'पेशेवर मार्गदर्शन और अपनी खेती की समस्याओं के समाधान के लिए हमारे अनुभवी कृषि विशेषज्ञों के पैनल से जुड़ें।',
        experienceSuffix: 'साल का अनुभव',
        contactButton: 'संपर्क करें',
    }
};

// --- SVG Icons ---
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;


// --- Main Component ---
function Community() {
    //@ts-ignore
    const val = useRecoilValue(ThemeAtom);
    console.log(val);
    const navigation=useNavigate();
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
      <>   <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header/> </div><br /><br /><br />
        <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
               

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Section 1: Connect with Farmers */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center h-full flex flex-col justify-center">
                        <div className="flex justify-center">
                            <UsersIcon />
                        </div>
                        <h2 className="font-bold text-2xl text-gray-800 mb-2">{t.communityTitle}</h2>
                        <p className="text-gray-600 mb-6">{t.communityDesc}</p>
                        <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                           {t.communityButton}
                        </button>
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

                    {/* Section 2: Connect with Experts */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                         <h2 className="font-bold text-2xl text-gray-800 mb-2">{t.expertsTitle}</h2>
                         <p className="text-gray-600 mb-6">{t.expertsDesc}</p>
                         <div className="space-y-4">
                            {expertsData.map(expert => (
                                <div key={expert.id} className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4 border border-gray-200">
                                    <img src={expert.image} alt={expert.name.en} className="w-20 h-20 rounded-full flex-shrink-0 object-cover" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-gray-900">{expert.name[val]}</h3>
                                        <p className="text-sm text-gray-600 flex items-center mt-1">
                                            <BriefcaseIcon /> <span className="ml-2">{expert.expertise[val]}</span>
                                        </p>
                                         <p className="text-sm text-gray-600 flex items-center mt-1">
                                           <ClockIcon /> <span className="ml-2">{expert.experience} {t.experienceSuffix}</span>
                                        </p>
                                    </div>
                                    <button className="bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition duration-200 text-sm">
                                        {t.contactButton}
                                    </button>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Community;
