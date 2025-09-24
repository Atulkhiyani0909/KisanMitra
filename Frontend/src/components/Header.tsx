import { useState } from "react";
import { content } from "../Essentials/content";
import { useRecoilState } from "recoil";
import { ThemeAtom } from "../store/themeAtom";
import { Link } from "react-router-dom";


function Header() {
    const [language, setLanguage] = useState('en');
    const [val,setVal]=useRecoilState(ThemeAtom)

    const toggleLanguage = () => {
        setLanguage(prevLang => (prevLang === 'en' ? 'hi' : 'en'));
        setVal(language);
    };
      //@ts-ignore
    const t = content[val];

    return (
        <>
        <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-600">
                   <Link to={"/"}>    Kisan<span className="text-yellow-500">Mitra</span></Link> 
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">{t.navHome}</a>
                        <a href="#features" className="text-gray-600 hover:text-green-600 transition duration-300">{t.navFeatures}</a>
                        <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">{t.navContact}</a>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="border-2 border-green-600 text-green-600 font-semibold py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition duration-300"
                    >
                        {t.langButton}
                    </button>
                </nav>
            </header>
        </>
    )
}

export default Header
