import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] bg-[#0a1f14] flex flex-col items-center justify-center px-4 select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

          {/* Branded Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center text-center relative z-10"
          >
            <div className="relative mb-4">
              <img
                src="/images/logo.png"
                alt="Wild Dooars Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full shadow-2xl border-2 border-emerald-500/20"
              />
            </div>

            <span className="font-black text-xl sm:text-2xl text-white tracking-wider uppercase leading-tight">
              WILD DOOARS
            </span>
            <span className="text-[11px] sm:text-xs font-black text-emerald-400 tracking-widest uppercase mt-1">
              TOURS & TRAVELS
            </span>
          </motion.div>

          {/* Minimalist Animated Loading Line (No Numbers) */}
          <div className="w-48 sm:w-56 h-1 bg-emerald-950/90 rounded-full overflow-hidden mt-6 relative border border-emerald-800/30 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#22c55e] to-emerald-300 rounded-full"
              style={{ width: '45%' }}
              animate={{
                x: ['-100%', '240%']
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'easeInOut'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
