import React from 'react';
import { Send, ImagePlus, X } from 'lucide-react';

const ChatInput = ({ input, setInput, handleSend, isLoading, hasStarted, textareaRef, handleKeyDown, imageBase64, handleImageUpload, removeImage, fileInputRef }) => {
  return (
    <div className={`w-full max-w-3xl relative transition-all duration-500`}>
        {imageBase64 && (
            <div className="absolute -top-16 left-2 bg-[#1E1F29] border border-white/10 rounded-xl p-1.5 shadow-xl z-10 flex items-start gap-2 animate-in fade-in zoom-in duration-200">
               <img src={imageBase64} alt="Upload preview" className="h-14 w-14 object-cover rounded-lg border border-white/5" />
               <button onClick={removeImage} className="p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-colors absolute -top-2 -right-2 shadow-sm">
                   <X size={12} strokeWidth={3} />
               </button>
            </div>
        )}

        <div className={`bg-[#1E1F29] border border-white/10 rounded-2xl flex items-end gap-2 p-1.5 md:p-2 shadow-2xl transition-all ${input.trim() || imageBase64 ? 'ring-1 ring-orange-500/30' : ''}`}>
        
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/webp" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-xl mb-0.5 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all shrink-0"
          title="Upload Image"
        >
            <ImagePlus size={20} />
        </button>

        <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={hasStarted ? "Reply to UdAI or type '/image [idea]' to draw..." : "Ask a question, upload notes, or type '/image [idea]'..."}
            className="w-full bg-transparent text-gray-200 placeholder-gray-500 p-2.5 md:p-3 max-h-32 min-h-[44px] text-[15px] resize-none focus:outline-none"
            rows={1}
            autoFocus={!hasStarted}
        />
        <button 
            onClick={() => handleSend()}
            disabled={(!input.trim() && !imageBase64) || isLoading}
            className={`p-2.5 rounded-xl mb-0.5 transition-all shrink-0 ${input.trim() || imageBase64 ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
        >
            <Send size={18} />
        </button>
        </div>
        <p className="text-center text-[10px] md:text-[11px] text-gray-600 mt-2 font-medium">
            UdAI can make mistakes. Please double check responses. Use /image to generate art.
        </p>
    </div>
  );
};

export default ChatInput;