import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Mail, MessageCircle, Send } from 'lucide-react';
import React, { useState } from 'react';
import AnimatedButton from '../ui/animated-button';

interface ContactOption {
  name: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

interface CTAButtonProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

function CTAButton({ text, icon, className = "" }: CTAButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contactOptions: ContactOption[] = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-4 w-4" />,
      action: () => window.open('https://wa.me/573205711428', '_blank'),
      color: "bg-indigo-500"
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      action: () => window.open('mailto:artagdev@gmail.com', '_blank'),
      color: "bg-red-500"
    },
    {
      name: "Telegram",
      icon: <Send className="h-4 w-4" />,
      action: () => window.open('https://t.me/artagdev', '_blank'),
      color: "bg-blue-500"
    }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-2"
      >
        <div className="relative">
          <AnimatedButton
            variant="glow"
            icon={
              <div className="flex items-center">
                {icon || <Sparkles className="h-5 w-5" />}
                <ChevronDown 
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            }
            className={`font-medium text-base ${className}`}
            onClick={toggleMenu}
          >
            {text}
          </AnimatedButton>

          {/* Floating particles - Indigo/Violet theme */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-400"
            animate={{
              y: [0, -15, -5],
              x: [0, 5, 10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-violet-400"
            animate={{
              y: [0, -10, -20],
              x: [0, -5, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              delay: 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>

      {/* Contact Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute z-10 mt-3 w-56 origin-top-right rounded-2xl bg-gradient-to-br from-indigo-950/95 via-slate-950/95 to-violet-950/95 backdrop-blur-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 focus:outline-none overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
            
            <div className="relative py-2">
              <div className="px-4 py-3 text-xs font-semibold text-indigo-300 border-b border-indigo-500/20 uppercase tracking-wider">
                Get in Touch
              </div>
              
              {contactOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  className={`flex w-full items-center px-4 py-3 text-sm text-left text-slate-300 hover:text-white transition-all duration-200 group ${
                    index < contactOptions.length - 1 ? 'border-b border-indigo-500/10' : ''
                  } hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-violet-500/10`}
                  onClick={() => {
                    option.action();
                    setIsMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className={`w-2.5 h-2.5 rounded-full mr-3 ${option.color} group-hover:scale-125 transition-transform duration-200`}></span>
                  <span className="mr-2 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CTAButton;