'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Navbar Root ─────────────────────────────────────────────────────────────
export function Navbar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - lastScrollY.current;
    // Show on scroll up or near top, hide on scroll down
    if (current < 80) {
      setAtTop(true);
      setVisible(true);
    } else {
      setAtTop(false);
      setVisible(diff < 0); // visible when scrolling UP
    }
    lastScrollY.current = current;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 w-full transition-all duration-300',
          className
        )}
      >
        {/* Floating pill container when NOT at top */}
        <div
          className={cn(
            'transition-all duration-500 ease-in-out',
            atTop
              ? 'mx-0 mt-0 rounded-none bg-[#000000]/85 backdrop-blur-lg border-b border-[#5C4E4E]/30 shadow-none'
              : 'mx-4 mt-4 rounded-full bg-[#000000]/90 backdrop-blur-xl border border-[#5C4E4E]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          )}
        >
          <div className={cn('max-w-7xl mx-auto px-6 md:px-10', atTop ? '' : 'px-4 md:px-6')}>
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── NavBody (Desktop) ────────────────────────────────────────────────────────
export function NavBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:flex items-center justify-between h-16">
      {children}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
export function NavbarLogo() {
  return (
    <a href="/" className="font-playfair font-bold text-xl tracking-wide text-[#D1D0D0] hover:text-[#988686] transition-colors whitespace-nowrap">
      Budaya Nusantara
    </a>
  );
}

// ─── Nav Items with animated hover underline ──────────────────────────────────
export function NavItems({ items }: { items: { name: string; link: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1">
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className="relative px-4 py-2 font-sans text-sm font-medium tracking-wide text-[#D1D0D0] hover:text-white transition-colors"
        >
          {/* Animated pill background on hover */}
          {hovered === idx && (
            <motion.div
              layoutId="navbar-hover-pill"
              className="absolute inset-0 rounded-full bg-[#5C4E4E]/40"
              transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function NavbarButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}) {
  const variants = {
    primary: 'bg-[#D1D0D0] text-[#000000] hover:bg-[#988686] hover:text-[#000000] shadow-sm',
    secondary: 'bg-transparent text-[#D1D0D0] border border-[#5C4E4E] hover:bg-[#5C4E4E]/30 hover:border-[#D1D0D0]',
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-5 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────
export function MobileNav({ children }: { children: React.ReactNode }) {
  return <div className="md:hidden">{children}</div>;
}

export function MobileNavHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between h-16">{children}</div>;
}

export function MobileNavToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.2 }}
      className="text-[#D1D0D0] p-2 rounded-full hover:bg-[#5C4E4E]/30 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.path
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <motion.path
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </AnimatePresence>
      </svg>
    </motion.button>
  );
}

export function MobileNavMenu({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl bg-[#000000]/95 backdrop-blur-xl border border-[#5C4E4E]/40 shadow-2xl px-6 py-6 flex flex-col gap-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
