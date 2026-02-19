import React, { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk"; 
import { Sparkles, PenTool, Code, BookOpen, Coffee, User, Trash2, AlertTriangle, ImagePlus, Download } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';

// Import our newly refactored components
// Remove the '/components' part from the paths
import MermaidDiagram from './MermaidDiagram';
import ChatInput from './ChatInput';
import SuggestionChip from './SuggestionChip';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY; 
const MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"; 

const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

const Udai = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');
  const [imageBase64, setImageBase64] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); 
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
          setError("Image is too large. Please upload an image under 4MB.");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ''; 
  };

  const removeImage = () => setImageBase64(null);

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
    setImageBase64(null);
    setError(null);
  };

  const handleSend = async (textOverride = null) => {
    const userText = textOverride || input.trim();
    if ((!userText && !imageBase64) || isLoading) return;

    const currentImage = imageBase64; 

    setInput('');
    setImageBase64(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setHasStarted(true); 
    setIsLoading(true);
    setError(null);

    // --- HUGGING FACE IMAGE GEN LOGIC ---
    if (userText.toLowerCase().startsWith('/image ')) {
      const basePrompt = userText.substring(7).trim();
      if (!basePrompt) return;

      const newMessages = [...messages, { role: 'user', content: userText }];
      setMessages(newMessages);

try {
        // 1. Let Llama 4 write a beautiful, highly detailed prompt
        const promptEnhancement = await groq.chat.completions.create({
            messages: [
              { role: "system", content: "You are an expert prompt engineer for an AI image generator. Enhance the user's idea into a highly descriptive, vivid, 50-word prompt. Output ONLY the prompt itself." }, 
              { role: "user", content: basePrompt }
            ],
            model: MODEL_NAME,
            temperature: 0.7,
            max_tokens: 100,
        });
        
        const enhancedPrompt = promptEnhancement.choices[0]?.message?.content || basePrompt;

        // 2. THE HUGGING FACE RETRY ENGINE
        let imageBlob = null;
        let attempts = 0;
        const maxAttempts = 5; // Will try for about 25 seconds while the model wakes up

        while (attempts < maxAttempts) {
            try {
                const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
                    headers: { 
                        "Authorization": `Bearer ${HF_API_KEY}`,
                        "Content-Type": "application/json" 
                    },
                    method: "POST",
                    body: JSON.stringify({ inputs: enhancedPrompt }),
                });

                if (response.ok) {
                    imageBlob = await response.blob();
                    break; // Success! Break out of the loop.
                } 
                // If we get a 503, the model is booting up.
                console.log(`Model waking up (Status: ${response.status}). Attempt ${attempts + 1}/${maxAttempts}...`);
            } catch (err) {
                // This catches the "Fake CORS" error that hides the 503 model loading
                console.log(`Network/CORS block caught (Model likely booting up). Attempt ${attempts + 1}/${maxAttempts}...`);
            }
            
            attempts++;
            if (attempts < maxAttempts) {
                // Wait 5 seconds before polling the API again
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        if (!imageBlob) {
            throw new Error("The AI artist took too long to wake up. Please click send again to finish the job!");
        }

        const imageUrl = URL.createObjectURL(imageBlob);

        // 3. Render it directly in the chat
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `Here is the illustration for: *"${basePrompt}"*`,
            generated_image: imageUrl 
        }]);

      } catch (err) {
        console.error("Image Gen Error:", err);
        setError(err.message || "Failed to generate image.");
        setMessages(prev => prev.slice(0, -1)); 
      } finally {
        setIsLoading(false);
      }
      return; 
    }

    // --- STANDARD GROQ CHAT LOGIC ---
    let contentToSend;
    if (currentImage) {
        contentToSend = [
            { type: "text", text: userText || "Please analyze this image and extract any relevant text or data." },
            { type: "image_url", image_url: { url: currentImage } }
        ];
    } else {
        contentToSend = userText;
    }

    const newMessages = [...messages, { role: 'user', content: contentToSend }];
    setMessages(newMessages);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: newMessages,
        model: MODEL_NAME,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const aiResponse = chatCompletion.choices[0]?.message?.content || "No response received.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

    } catch (err) {
      console.error(err);
      let errorMsg = "Connection interrupted.";
      if (err.message?.includes("429")) errorMsg = "Traffic is high. Please wait 10 seconds.";
      if (err.message?.includes("401")) errorMsg = "Invalid API Key.";
      if (err.message?.includes("413")) errorMsg = "Image payload is too large.";
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
                  Powered by Llama 4 & FLUX.1
                </p>
              </div>

              <div className="w-full max-w-2xl py-4">
                 <ChatInput 
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    isLoading={isLoading}
                    hasStarted={hasStarted}
                    textareaRef={textareaRef}
                    handleKeyDown={handleKeyDown}
                    imageBase64={imageBase64}
                    handleImageUpload={handleImageUpload}
                    removeImage={removeImage}
                    fileInputRef={fileInputRef}
                 />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-3xl mt-2">
                <SuggestionChip icon={<ImagePlus size={14}/>} label="Draw a logo" onClick={() => handleSend("/image A sleek tech startup logo featuring a glowing orange wireframe cube")} />
                <SuggestionChip icon={<Code size={14}/>} label="MVP Stack" onClick={() => handleSend("What tech stack should I use for an MVP?")} />
                <SuggestionChip icon={<BookOpen size={14}/>} label="Finance 101" onClick={() => handleSend("Explain Term Sheets and Equity to a beginner.")} />
                <SuggestionChip icon={<Coffee size={14}/>} label="Life Advice" onClick={() => handleSend("How do I balance college studies with running a startup?")} />
              </div>
            </div>
          )}

          {hasStarted && (
            <div className="space-y-6 pt-6 pb-28">
              {messages.map((msg, idx) => {
                const textContent = Array.isArray(msg.content) 
                    ? msg.content.find(c => c.type === 'text')?.text 
                    : msg.content;
                const imageContent = Array.isArray(msg.content) 
                    ? msg.content.find(c => c.type === 'image_url')?.image_url.url 
                    : null;

                return (
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
                        
                        {msg.role === 'user' && imageContent && (
                            <img src={imageContent} alt="User upload" className="max-w-xs w-full rounded-xl mb-3 border border-white/10 shadow-sm" />
                        )}

                        {msg.role !== 'user' ? (
                          <div className="space-y-4">
                            {textContent.split(/(```mermaid[\s\S]*?```)/g).map((part, i) => {
                              if (part.startsWith('```mermaid')) {
                                const cleanCode = part.replace(/```mermaid\n?/, '').replace(/```/, '');
                                return <MermaidDiagram key={i} chart={cleanCode} />;
                              } else if (part.trim()) {
                                return (
                                  <div key={i} className="prose prose-invert prose-p:leading-relaxed" 
                                    dangerouslySetInnerHTML={{ 
                                      __html: part
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-100 font-semibold">$1</strong>')
                                        .replace(/### (.*?)\n/g, '<h3 class="text-base md:text-lg font-bold text-white mt-4 mb-2">$1</h3>')
                                        .replace(/^- (.*)/gm, '<li class="ml-4 list-disc marker:text-gray-500">$1</li>')
                                        .replace(/\n/g, '<br />')
                                    }} 
                                  />
                                );
                              }
                              return null;
                            })}
                            
                            {msg.generated_image && (
                                <div className="mt-4 bg-[#11121a] p-3 rounded-xl border border-white/10 w-fit">
                                    <img src={msg.generated_image} alt="AI Art" className="rounded-lg w-full max-w-sm object-cover shadow-md" />
                                    <a href={msg.generated_image} download={`udai-art-${Date.now()}.png`} className="flex items-center gap-2 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors mt-3 ml-1 bg-orange-500/10 hover:bg-orange-500/20 w-fit px-3 py-1.5 rounded-md">
                                        <Download size={14} /> Download Art
                                    </a>
                                </div>
                            )}

                          </div>
                        ) : (
                          textContent
                        )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                      <User size={12} className="text-gray-300 md:w-3.5 md:h-3.5" />
                    </div>
                  )}
                </div>
              )})}

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

      {hasStarted && (
        <div className="flex-none bg-[#0a0b14]/95 backdrop-blur-xl border-t border-white/5 pt-3 pb-6 px-3 md:px-4 z-50 animate-in slide-in-from-bottom-10 duration-300">
            <div className="max-w-3xl mx-auto">
                <ChatInput 
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    isLoading={isLoading}
                    hasStarted={hasStarted}
                    textareaRef={textareaRef}
                    handleKeyDown={handleKeyDown}
                    imageBase64={imageBase64}
                    handleImageUpload={handleImageUpload}
                    removeImage={removeImage}
                    fileInputRef={fileInputRef}
                 />
            </div>
        </div>
      )}

    </div>
  );
};

export default Udai;