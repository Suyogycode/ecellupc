import React, { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk"; 
import { Send, Sparkles, PenTool, Code, BookOpen, Coffee, User, Trash2, AlertTriangle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 
const MODEL_NAME = "llama-3.1-8b-instant"; 

const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

// ✅ FIX: Moved InputBox OUTSIDE the main component
// We pass all the necessary data as 'props' now
const InputBox = ({ input, setInput, handleSend, isLoading, hasStarted, textareaRef, handleKeyDown }) => (
  <div className={`w-full max-w-3xl relative transition-all duration-500`}>
      <div className={`bg-[#1E1F29] border border-white/10 rounded-2xl flex items-end gap-2 p-1.5 md:p-2 shadow-2xl transition-all ${input.trim() ? 'ring-1 ring-orange-500/30' : ''}`}>
      <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={hasStarted ? "Reply to UdAI..." : "Ask about startups, incubation..."}
          className="w-full bg-transparent text-gray-200 placeholder-gray-500 p-2.5 md:p-3 max-h-32 min-h-[44px] text-[15px] resize-none focus:outline-none"
          rows={1}
          autoFocus={!hasStarted}
      />
      <button 
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className={`p-2.5 rounded-xl mb-0.5 transition-all shrink-0 ${input.trim() ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
      >
          <Send size={18} />
      </button>
      </div>
      <p className="text-center text-[10px] md:text-[11px] text-gray-600 mt-2 font-medium">
          UdAI can make mistakes. Powered by Groq.
      </p>
  </div>
);

const SuggestionChip = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#1E1F29] hover:bg-[#2A2B36] border border-white/5 hover:border-orange-500/30 rounded-xl text-xs font-medium text-gray-300 transition-all cursor-pointer group w-full active:scale-95"
  >
    <span className="text-gray-500 group-hover:text-orange-400 transition-colors shrink-0">{icon}</span>
    <span className="truncate">{label}</span>
  </button>
);

const Udai = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); 
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (location.state?.startMessage && !hasStarted && messages.length === 0) {
        window.history.replaceState({}, document.title);
        setTimeout(() => {
            handleSend(location.state.startMessage);
        }, 100);
    }
  }, [location]);

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
    
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);

    try {
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
    <div className="h-[100dvh] w-full bg-[#0a0b14] text-white font-sans selection:bg-orange-500/30 overflow-hidden flex flex-col relative">
      
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main className="flex-1 overflow-y-auto w-full relative scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pt-20 md:pt-24 pb-4">
        
        {hasStarted && (
            <button 
                onClick={startNewChat}
                className="fixed top-20 right-4 md:top-24 md:right-6 z-40 p-2 bg-[#1E1F29]/80 backdrop-blur-md hover:bg-red-500/10 hover:text-red-400 border border-white/10 rounded-lg text-gray-400 transition-all shadow-lg"
                title="Start New Chat"
            >
                <Trash2 size={16} />
            </button>
        )}

        <div className="max-w-3xl mx-auto px-3 md:px-4 min-h-full flex flex-col pb-4">
          
          {!hasStarted && (
            <div className="flex-1 flex flex-col justify-center items-center gap-6 animate-in fade-in zoom-in duration-500 my-auto px-4 w-full">
              <div className="text-center space-y-2 md:space-y-3">
                <div className="flex items-center justify-center gap-3 mb-2 md:mb-4">
                  <div className="p-2 bg-orange-500/10 rounded-xl">
                    <Sparkles size={24} className="text-orange-500 md:w-8 md:h-8" />
                  </div>
                  <span className="font-bold text-2xl md:text-3xl tracking-wide text-white">
                    Ud<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">AI</span>
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-serif text-[#E4E4E6] tracking-tight text-center leading-tight">
                  Ignite your ideas.
                </h1>
                <p className="text-gray-500 text-sm md:text-lg text-center max-w-md mx-auto">
                  Powered by Llama 3 on Groq
                </p>
              </div>

              {/* CENTER SEARCH BOX */}
              <div className="w-full max-w-2xl py-4">
                 {/* ✅ Passing Props explicitly */}
                 <InputBox 
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    isLoading={isLoading}
                    hasStarted={hasStarted}
                    textareaRef={textareaRef}
                    handleKeyDown={handleKeyDown}
                 />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-3xl mt-2">
                <SuggestionChip icon={<PenTool size={14}/>} label="Pitch Draft" onClick={() => handleSend("Help me draft a 1-minute elevator pitch for a fintech startup.")} />
                <SuggestionChip icon={<Code size={14}/>} label="MVP Stack" onClick={() => handleSend("What tech stack should I use for an E-Commerce MVP?")} />
                <SuggestionChip icon={<BookOpen size={14}/>} label="Finance 101" onClick={() => handleSend("Explain Term Sheets and Equity to a beginner.")} />
                <SuggestionChip icon={<Coffee size={14}/>} label="Life Advice" onClick={() => handleSend("How do I balance college studies with running a startup?")} />
              </div>
            </div>
          )}

          {/* MESSAGES LIST */}
          {hasStarted && (
            <div className="space-y-6 pt-6 pb-28">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {msg.role !== 'user' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1c1d29] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={12} className="text-orange-500 md:w-3.5 md:h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[88%] md:max-w-[75%] space-y-1`}>
                     <div className={`px-4 py-3 md:px-5 md:py-3.5 rounded-2xl text-[14px] md:text-[15px] leading-relaxed shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-[#2A2B36] text-white rounded-tr-sm border border-white/5' 
                        : 'bg-transparent text-gray-300'
                      }`}>
                        {msg.role !== 'user' ? (
                           <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#11121a] prose-pre:border prose-pre:border-white/10" dangerouslySetInnerHTML={{ 
                             __html: msg.content
                               .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-100 font-semibold">$1</strong>')
                               .replace(/### (.*?)\n/g, '<h3 class="text-base md:text-lg font-bold text-white mt-4 mb-2">$1</h3>')
                               .replace(/^- (.*)/gm, '<li class="ml-4 list-disc marker:text-gray-500">$1</li>')
                               .replace(/\n/g, '<br />')
                           }} />
                        ) : (
                          msg.content
                        )}
                     </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                      <User size={12} className="text-gray-300 md:w-3.5 md:h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1c1d29] border border-white/10 flex items-center justify-center shrink-0">
                      <Sparkles size={12} className="text-orange-500 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1 h-8">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mx-auto w-fit flex items-center gap-2 text-red-400 bg-red-900/10 px-4 py-2 rounded-lg border border-red-500/20 mb-4 text-sm">
                  <AlertTriangle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* BOTTOM INPUT AREA */}
      {hasStarted && (
        <div className="flex-none bg-[#0a0b14]/95 backdrop-blur-xl border-t border-white/5 pt-3 pb-6 px-3 md:px-4 z-50 animate-in slide-in-from-bottom-10 duration-300">
            <div className="max-w-3xl mx-auto">
                {/* ✅ Passing Props explicitly here too */}
                <InputBox 
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    isLoading={isLoading}
                    hasStarted={hasStarted}
                    textareaRef={textareaRef}
                    handleKeyDown={handleKeyDown}
                 />
            </div>
        </div>
      )}

    </div>
  );
};

export default Udai;