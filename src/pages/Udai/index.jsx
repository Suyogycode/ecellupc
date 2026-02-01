import React, { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk"; // 👈 New Import
import { Send, Sparkles, PenTool, Code, BookOpen, Coffee, User, Trash2, AlertTriangle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GROQ_API_KEY; // 👈 Paste your 'gsk_...' key here
const MODEL_NAME = "llama-3.1-8b-instant"; // Very fast, free model

// Initialize Groq
// dangerouslyAllowBrowser: true is needed because we are running on frontend (Vite)
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

const Udai = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); 
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // --- AUTO-START LOGIC ---
  useEffect(() => {
    if (location.state?.startMessage && !hasStarted && messages.length === 0) {
        // Clear history immediately to prevent loops
        window.history.replaceState({}, document.title);
        setTimeout(() => {
            handleSend(location.state.startMessage);
        }, 100);
    }
  }, [location]);

  // --- SCROLL & RESIZE ---
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  useEffect(() => {
    if (hasStarted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading, hasStarted]);

  const startNewChat = () => {
    setMessages([]);
    setHasStarted(false);
    setInput('');
    setError(null);
  };

  const handleSend = async (textOverride = null) => {
    const userText = textOverride || input.trim();
    if (!userText || isLoading) return;

    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setHasStarted(true); 
    setIsLoading(true);
    setError(null);
    
    // Add User Message
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);

    try {
      // --- GROQ API CALL ---
      const chatCompletion = await groq.chat.completions.create({
        messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
        })),
        model: MODEL_NAME,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const aiResponse = chatCompletion.choices[0]?.message?.content || "No response received.";

      // Add AI Message
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

    } catch (err) {
      console.error(err);
      let errorMsg = "Connection interrupted.";
      if (err.message.includes("429")) errorMsg = "Traffic is high. Please wait 10 seconds.";
      if (err.message.includes("401")) errorMsg = "Invalid Groq API Key.";
      setError(errorMsg);
      
      if (messages.length === 0) setHasStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen w-full bg-[#0a0b14] text-white font-sans selection:bg-orange-500/30 overflow-hidden flex flex-col">
      
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main className="flex-1 overflow-y-auto w-full relative scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pt-24">
        
        {hasStarted && (
            <button 
                onClick={startNewChat}
                className="fixed top-24 right-6 z-40 p-2 bg-[#1E1F29] hover:bg-red-500/10 hover:text-red-400 border border-white/10 rounded-lg text-gray-400 transition-all shadow-lg"
                title="Start New Chat"
            >
                <Trash2 size={18} />
            </button>
        )}

        <div className="max-w-3xl mx-auto px-4 min-h-full flex flex-col pb-32">
          
          {!hasStarted && (
            <div className="flex-1 flex flex-col justify-center items-center gap-8 animate-in fade-in zoom-in duration-500 my-auto">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/10 rounded-xl">
                    <Sparkles size={32} className="text-orange-500" />
                  </div>
                  <span className="font-bold text-3xl tracking-wide text-white">
                    Ud<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">AI</span>
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-[#E4E4E6] tracking-tight">
                  Ignite your ideas.
                </h1>
                <p className="text-gray-500 text-lg">
                  Powered by Llama 3 on Groq
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
                <SuggestionChip icon={<PenTool size={14}/>} label="Draft a pitch" onClick={() => handleSend("Help me draft a 1-minute elevator pitch for a fintech startup.")} />
                <SuggestionChip icon={<Code size={14}/>} label="Build a prototype" onClick={() => handleSend("What tech stack should I use for an E-Commerce MVP?")} />
                <SuggestionChip icon={<BookOpen size={14}/>} label="Learn Finance" onClick={() => handleSend("Explain Term Sheets and Equity to a beginner.")} />
                <SuggestionChip icon={<Coffee size={14}/>} label="Life Advice" onClick={() => handleSend("How do I balance college studies with running a startup?")} />
              </div>
            </div>
          )}

          {hasStarted && (
            <div className="space-y-6 pt-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#1c1d29] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={14} className="text-orange-500" />
                    </div>
                  )}

                  <div className={`max-w-[85%] md:max-w-[75%] space-y-1`}>
                     <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-[#2A2B36] text-white rounded-tr-sm border border-white/5' 
                        : 'bg-transparent text-gray-300'
                      }`}>
                        {/* We use 'content' for Groq/OpenAI format instead of 'text' */}
                        {msg.role !== 'user' ? (
                           <div dangerouslySetInnerHTML={{ 
                             __html: msg.content
                               .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-100 font-semibold">$1</strong>')
                               .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
                               .replace(/^- (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
                               .replace(/\n/g, '<br />')
                           }} />
                        ) : (
                          msg.content
                        )}
                     </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                      <User size={14} className="text-gray-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1c1d29] border border-white/10 flex items-center justify-center shrink-0">
                      <Sparkles size={14} className="text-orange-500 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1 h-8">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mx-auto w-fit flex items-center gap-2 text-red-400 bg-red-900/10 px-4 py-2 rounded-lg border border-red-500/20 mb-4">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* INPUT AREA */}
      <div className="flex-none bg-[#0a0b14]/80 backdrop-blur-md border-t border-white/5 pt-4 pb-6 px-4 z-40">
        <div className="max-w-3xl mx-auto relative">
           <div className={`bg-[#1E1F29] border border-white/10 rounded-2xl flex items-end gap-2 p-2 shadow-2xl transition-all ${input.trim() ? 'ring-1 ring-orange-500/30' : ''}`}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={hasStarted ? "Reply to UdAI..." : "Ask about startups, incubation, or funding..."}
                className="w-full bg-transparent text-gray-200 placeholder-gray-500 p-3 max-h-32 min-h-[44px] resize-none focus:outline-none"
                rows={1}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-xl mb-0.5 transition-all ${input.trim() ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
              >
                <Send size={18} />
              </button>
           </div>
           <p className="text-center text-[11px] text-gray-600 mt-3 font-medium">
             UdAI can make mistakes. Powered by Groq.
           </p>
        </div>
      </div>

    </div>
  );
};

const SuggestionChip = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2.5 bg-[#1E1F29] hover:bg-[#2A2B36] border border-white/5 hover:border-orange-500/30 rounded-xl text-sm text-gray-300 transition-all cursor-pointer group"
  >
    <span className="text-gray-500 group-hover:text-orange-400 transition-colors">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Udai;