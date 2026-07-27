import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Mail, MessageCircle, Send } from 'lucide-react';
import React, { useState } from 'react';
import AnimatedButton from '../ui/animated-button';

interface ContactOption {
  name: string;
  icon: React.ReactNode;
  action: () => void;
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
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      action: () => window.open('mailto:info@artagdev.com.co', '_blank'),
    },
    {
      name: "Telegram",
      icon: <Send className="h-4 w-4" />,
      action: () => window.open('https://t.me/artagdev', '_blank'),
    }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
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
        </div>
      </motion.div>

      {/* Contact Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute z-10 mt-3 w-52 origin-top-right rounded-xl bg-[#111111] border border-white/10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="relative py-1">
              {contactOptions.map((option, index) => (
                <button
                  key={option.name}
                  className={`flex w-full items-center px-4 py-3 text-sm text-left text-zinc-400 hover:text-white transition-colors duration-150 hover:bg-white/5 ${
                    index < contactOptions.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                  onClick={() => {
                    option.action();
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="text-zinc-500 mr-3">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CTAButton;
