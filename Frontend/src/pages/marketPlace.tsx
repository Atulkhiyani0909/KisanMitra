import { useState, useMemo } from 'react';
import { ThemeAtom } from '../store/themeAtom';
import { useRecoilValue } from 'recoil';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

// --- TYPESCRIPT INTERFACES ---
interface Product {
  id: number;
  name: { en: string; hi: string };
  category: 'Crops' | 'Livestock' | 'Equipment' | 'Seeds';
  price: number;
  unit: { en: string; hi: string };
  seller: { en: string; hi: string };
  location: { en: string; hi: string };
  image: string;
}


const productsData: Product[] = [
  {
    id: 1,
    name: { en: 'Organic Wheat', hi: 'जैविक गेहूँ' },
    category: 'Crops',
    price: 2500,
    unit: { en: 'per Quintal', hi: 'प्रति क्विंटल' },
    seller: { en: 'Ramkumar Farms', hi: 'रामकुमार फार्म्स' },
    location: { en: 'Sanwer, Indore', hi: 'सांवेर, इंदौर' },
    image: 'https://placehold.co/400x300/FBBF24/4A5568?text=Wheat',
  },
  {
    id: 2,
    name: { en: 'Gir Cow', hi: 'गिर गाय' },
    category: 'Livestock',
    price: 55000,
    unit: { en: 'per Animal', hi: 'प्रति पशु' },
    seller: { en: 'Patel Dairy', hi: 'पटेल डेयरी' },
    location: { en: 'Mhow, Indore', hi: 'महू, इंदौर' },
    image: 'https://placehold.co/400x300/F9A8D4/4A5568?text=Cow',
  },
  {
    id: 3,
    name: { en: 'Used Tractor', hi: 'पुराना ट्रैक्टर' },
    category: 'Equipment',
    price: 325000,
    unit: { en: 'per Unit', hi: 'प्रति यूनिट' },
    seller: { en: 'Sharma Machinery', hi: 'शर्मा मशीनरी' },
    location: { en: 'Dewas Naka, Indore', hi: 'देवास नाका, इंदौर' },
    image: 'https://placehold.co/400x300/93C5FD/4A5568?text=Tractor',
  },
  {
    id: 4,
    name: { en: 'High-Yield Soybean Seeds', hi: 'उच्च उपज सोयाबीन बीज' },
    category: 'Seeds',
    price: 1200,
    unit: { en: 'per 20kg Bag', hi: 'प्रति 20 किलो बैग' },
    seller: { en: 'Agro Seeds Pvt. Ltd.', hi: 'एग्रो सीड्स प्रा. लिमिटेड' },
    location: { en: 'Pithampur', hi: 'पीथमपुर' },
    image: 'https://placehold.co/400x300/A7F3D0/4A5568?text=Seeds',
  },
  {
    id: 5,
    name: { en: 'Fresh Potatoes', hi: 'ताजा आलू' },
    category: 'Crops',
    price: 1800,
    unit: { en: 'per Quintal', hi: 'प्रति क्विंटल' },
    seller: { en: 'Verma Agriculture', hi: 'वर्मा एग्रीकल्चर' },
    location: { en: 'Rau, Indore', hi: 'राऊ, इंदौर' },
    image: 'https://placehold.co/400x300/FBBF24/4A5568?text=Potatoes',
  },
  {
    id: 6,
    name: { en: 'Murrah Buffalo', hi: 'मुर्रा भैंस' },
    category: 'Livestock',
    price: 80000,
    unit: { en: 'per Animal', hi: 'प्रति पशु' },
    seller: { en: 'Singh Livestock', hi: 'सिंह पशुधन' },
    location: { en: 'Ujjain Road', hi: 'उज्जैन रोड' },
    image: 'https://placehold.co/400x300/F9A8D4/4A5568?text=Buffalo',
  },
];

type Category = 'All' | 'Crops' | 'Livestock' | 'Equipment' | 'Seeds';
const categories: Category[] = ['All', 'Crops', 'Livestock', 'Equipment', 'Seeds'];


const content = {
  en: {
    title: "Farmer's Marketplace",
    categories: {
      All: 'All',
      Crops: 'Crops',
      Livestock: 'Livestock',
      Equipment: 'Equipment',
      Seeds: 'Seeds',
    },
    contactButton: 'Contact Seller',
  },
  hi: {
    title: 'किसान बाज़ार',
    categories: {
      All: 'सभी',
      Crops: 'फसलें',
      Livestock: 'पशुधन',
      Equipment: 'उपकरण',
      Seeds: 'बीज',
    },
    contactButton: 'विक्रेता से संपर्क करें',
  },
};


const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;


function Marketplace() {

  const navigation=useNavigate();
  const val = useRecoilValue(ThemeAtom);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  //@ts-ignore
  const t = content[val];


  function confirmationRequest() {
    alert("आपका अनुरोध विक्रेता को भेज दिया गया है, वह आपसे शीघ्र संपर्क करेगा")
  }

  const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  function handlerClick(){
    
        navigation("/chat-bot")
}

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return productsData;
    }
    return productsData.filter(product => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <>   <div className='bg-white shadow-md fixed top-0 w-full z-50'> <Header /> </div><br /><br /><br />
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">


          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 whitespace-nowrap ${activeCategory === category
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {t.categories[category]}
                </button>
              ))}
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group">
                <img src={product.image} alt={product.name.en} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800">{product.name[val]}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.seller[val]}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <LocationIcon />
                    <span className="ml-1">{product.location[val]}</span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-green-700">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-500">{product.unit[val]}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <button onClick={confirmationRequest} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                    {t.contactButton}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Marketplace;
