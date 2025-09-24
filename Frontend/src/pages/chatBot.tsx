import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { useRecoilValue } from 'recoil';
import { ThemeAtom } from '../store/themeAtom';

// --- TYPESCRIPT INTERFACES ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// --- BILINGUAL CONTENT ---
const content = {
  en: {
    title: 'Kisan AI Assistant',
    placeholder: 'Ask a question about crops, weather...',
    initialBotMessage: "Hello! I am your Kisan AI Assistant. How can I help you today?",
    quickReplies: ["Weather tomorrow?", "Latest soybean price?", "PM-KISAN scheme details"],
    voiceListening: "Listening... speak now.",
    voiceError: "Sorry, I couldn't understand. Please try again.",
    voiceUnsupported: "Voice input is not supported on this browser.",
  },
  hi: {
    title: 'किसान एआई सहायक',
    placeholder: 'फसलों, मौसम के बारे में एक प्रश्न पूछें...',
    initialBotMessage: "नमस्ते! मैं आपका किसान एआई सहायक हूं। आज मैं आपकी क्या मदद कर सकता हूं?",
    quickReplies: ["कल का मौसम?", "सोयाबीन का ताजा भाव?", "पीएम-किसान योजना?"],
    voiceListening: "सुन रहा हूँ... अब बोलें।",
    voiceError: "क्षमा करें, मैं समझ नहीं सका। कृपया पुनः प्रयास करें।",
    voiceUnsupported: "इस ब्राउज़र पर वॉयस इनपुट समर्थित नहीं है।",
  }
};

// --- SVG Icons ---
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const MicIcon = ({ isRecording }: { isRecording: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isRecording ? 'text-red-500 animate-pulse' : 'text-gray-500'}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
);
const BotIcon = () => (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M2 12h20" /><path d="M17.5 12a4.5 4.5 0 0 0-9 0" /></svg>
    </div>
);

// --- Helper Components ---
const TypingIndicator = () => (
    <div className="flex items-start gap-3">
        <BotIcon />
        <div className="p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
        </div>
    </div>
);

// --- Main Component ---
function Chatbot() {
 const val = useRecoilValue(ThemeAtom);
 //@ts-ignore
  const t = content[val];
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Set initial message when language changes
  useEffect(() => {
    setMessages([{ id: 1, text: t.initialBotMessage, sender: 'bot' }]);
  }, [t.initialBotMessage]);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  // Handle Speech Recognition
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = val === 'en' ? 'en-IN' : 'hi-IN';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
      };
      recognitionRef.current.onerror = () => { alert(t.voiceError); setIsRecording(false); };
      recognitionRef.current.onend = () => { setIsRecording(false); }
    }
  }, [val, t.voiceError]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) { alert(t.voiceUnsupported); return; }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const sendMessage = (text: string) => {
    if (text.trim() === '') return;
    const newUserMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `You asked about "${text}". I am still in development, but I will be able to answer this soon.`,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="bg-green-50 h-screen font-sans flex flex-col">
       {/* Header */}
        <Header/>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
                {messages.map(message => (
                    <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                        {message.sender === 'bot' && <BotIcon />}
                        <div className={`p-3 rounded-2xl max-w-sm md:max-w-md shadow-sm ${
                            message.sender === 'user'
                            ? 'bg-green-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none'
                        }`}>
                            <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                    </div>
                ))}
                {isTyping && <TypingIndicator />}
                {messages.length === 1 && !isTyping && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {
                        //@ts-ignore
                        t.quickReplies.map(reply => (
                            <button key={reply} onClick={() => sendMessage(reply)} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-green-700 hover:bg-green-100 transition-colors">
                                {reply}
                            </button>
                        ))}
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
        </div>
        
        {isRecording && <div className="text-center text-gray-600 p-2 animate-pulse">{t.voiceListening}</div>}

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm p-4 border-t flex-shrink-0">
            <div className="max-w-3xl mx-auto flex items-center gap-2 bg-white border border-gray-300 rounded-full p-2 shadow-sm">
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }}}
                    placeholder={t.placeholder}
                    rows={1}
                    className="flex-grow bg-transparent px-3 py-1 border-none focus:outline-none resize-none"
                />
                <button onClick={handleVoiceInput} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <MicIcon isRecording={isRecording} />
                </button>
                <button onClick={() => sendMessage(inputValue)} className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors disabled:bg-gray-300" disabled={!inputValue.trim()}>
                    <SendIcon />
                </button>
            </div>
        </div>
    </div>
  );
}

export default Chatbot;

