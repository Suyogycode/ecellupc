import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import { Sparkles, ArrowRight } from 'lucide-react';

const HomeChatWidget = () => {
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Initialize the hook

  const handleSubmit = (e) => {
    e.preventDefault(); // 🛑 CRITICAL: This stops the page from refreshing
    
    if (!input.trim()) return;

    // Navigate to /udai and pass the message in the "state" packet
    navigate('/udai', { state: { startMessage: input } });
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <form 
        onSubmit={handleSubmit}
        className={`
          flex items-center gap-2 p-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-[#1c1d29]/80 transition-all duration-500 ease-out
          ${isHovered || input ? 'w-[320px] opacity-100 translate-y-0' : 'w-[50px] opacity-90 translate-y-2'}
        `}
      >
        <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Sparkles size={20} className="text-white" />
        </div>

        <div className={`flex-1 overflow-hidden transition-all duration-500 ${isHovered || input ? 'opacity-100 max-w-full ml-1' : 'opacity-0 max-w-0'}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask UdAI..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {input && (
          <button 
            type="submit"
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        )}
      </form>
    </div>
  );
};

export default HomeChatWidget;