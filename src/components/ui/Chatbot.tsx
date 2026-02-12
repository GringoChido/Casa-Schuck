'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import type { Locale } from '@/lib/i18n';

interface ChatbotProps {
  locale: Locale;
  dict: Record<string, any>;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const botResponses: Record<string, string[]> = {
  en: [
    "Thank you for your interest! Our team would be happy to help. For the fastest response, reach us on WhatsApp at +52 415 180 6060.",
    "Great question! Each of our 9 rooms has its own unique character. El Royal Suite is our most luxurious, while La Biblioteca Suite is perfect for book lovers. Would you like to know more about a specific room?",
    "Breakfast is included with every stay! We serve from 8:30-10:00 AM daily in the courtyard, with early coffee available from 7:00 AM.",
    "I'd love to help with that! For detailed availability and booking, I recommend reaching out via WhatsApp (+52 415 180 6060) or email (CasaSchuck@gmail.com) for the most personalized service.",
  ],
  es: [
    "Gracias por su interes! Nuestro equipo estara encantado de ayudarle. Para la respuesta mas rapida, contactenos por WhatsApp al +52 415 180 6060.",
    "Excelente pregunta! Cada una de nuestras 9 habitaciones tiene su propio caracter unico. El Royal Suite es la mas lujosa, mientras que La Biblioteca Suite es perfecta para amantes de los libros. Le gustaria saber mas sobre alguna habitacion especifica?",
    "El desayuno esta incluido con cada estancia! Servimos de 8:30-10:00 AM diariamente en el patio, con cafe temprano disponible desde las 7:00 AM.",
    "Me encantaria ayudarle con eso! Para disponibilidad y reservaciones detalladas, le recomiendo contactarnos por WhatsApp (+52 415 180 6060) o correo (CasaSchuck@gmail.com) para un servicio mas personalizado.",
  ],
};

export function Chatbot({ locale, dict }: ChatbotProps) {
  const c = dict.chatbot;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: c.greeting },
  ]);
  const [input, setInput] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const responses = botResponses[locale] || botResponses.en;
      const botMessage: Message = {
        role: 'bot',
        text: responses[responseIndex % responses.length],
      };
      setMessages((prev) => [...prev, botMessage]);
      setResponseIndex((prev) => prev + 1);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5214151806060'}`;

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 lg:bottom-6 right-6 z-50 w-14 h-14 bg-turquoise hover:bg-turquoise-dark
                       text-white rounded-full shadow-lg flex items-center justify-center
                       transition-colors"
            aria-label="Open chat"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 lg:bottom-6 right-6 z-[10000] w-[380px] max-w-[calc(100vw-2rem)]
                       h-[500px] max-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-3rem)] bg-white rounded-2xl
                       chatbot-panel flex flex-col overflow-hidden border border-stone/20"
          >
            {/* Header */}
            <div className="bg-sunset px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-white font-serif text-lg">{c.title}</h3>
                <p className="text-white/50 text-xs">{c.poweredBy}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-warm-white">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} text={msg.text} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Fallback */}
            <div className="px-4 py-2 bg-cream border-t border-stone/15 flex-shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sage hover:text-sage-dark transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.whatsappFallback}
              </a>
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-stone/15 flex gap-2 flex-shrink-0 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={c.placeholder}
                className="flex-1 bg-cream border border-stone/20 rounded-full px-4 py-2.5 text-sm
                           text-charcoal placeholder:text-charcoal/40 focus:outline-none
                           focus:border-terracotta/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 bg-turquoise hover:bg-turquoise-dark disabled:bg-stone
                           text-white rounded-full flex items-center justify-center
                           transition-colors flex-shrink-0"
                aria-label={c.send}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
