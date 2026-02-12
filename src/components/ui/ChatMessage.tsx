'use client';

import { motion } from 'framer-motion';

interface ChatMessageProps {
  role: 'user' | 'bot';
  text: string;
}

export function ChatMessage({ role, text }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-turquoise text-white rounded-br-sm'
            : 'bg-cream text-charcoal border border-stone/20 rounded-bl-sm'
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
