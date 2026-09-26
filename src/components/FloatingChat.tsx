"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send } from "lucide-react";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<{ role: string; parts: { text: string }[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMsg = message;
    setMessage("");
    setHistory(prev => [...prev, { role: "user", parts: [{ text: userMsg }] }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history })
      });
      
      const data = await res.json();
      if (data.reply) {
        setHistory(prev => [...prev, { role: "model", parts: [{ text: data.reply }] }]);
      }
    } catch (error) {
      console.error(error);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-umber text-linen rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform border border-hemp/20"
          >
            <MessageSquare size={22} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for click outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[95] bg-umber/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-8 right-8 z-[100] w-[360px] h-[520px] bg-linen border border-hemp shadow-2xl rounded-3xl flex flex-col overflow-hidden"
            >
              <div className="bg-umber text-linen p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg tracking-tight">Atelier Concierge</h3>
                  <p className="font-mono text-[10px] text-linen/60 uppercase tracking-widest">Powered by Gemini AI</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:text-loam transition-colors p-1">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-limestone/40">
                <div className="flex justify-start">
                  <div className="bg-limestone border border-hemp text-umber px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                    Welcome to Fabriclicious. How may I assist you with your textile sourcing today?
                  </div>
                </div>
                
                {history.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] ${
                      msg.role === "user" 
                        ? "bg-umber text-linen rounded-tr-sm" 
                        : "bg-limestone border border-hemp text-umber rounded-tl-sm"
                    }`}>
                      {msg.parts[0].text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-limestone border border-hemp text-umber px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex gap-1 font-mono">
                      <span className="animate-pulse">●</span><span className="animate-pulse delay-100">●</span><span className="animate-pulse delay-200">●</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className="p-4 bg-linen border-t border-hemp flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Message concierge..."
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-umber/40"
                />
                <button type="submit" disabled={!message.trim() || isLoading} className="text-umber hover:text-loam disabled:opacity-30 transition-colors p-1">
                  <Send size={18} strokeWidth={1.5} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
