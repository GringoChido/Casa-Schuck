'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
  dict: Record<string, any>;
}

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  const nav = dict.nav;
  const pathname = usePathname();
  const isWeddingsPage = pathname.includes('/weddings');
  const isRetreatsPage = pathname.includes('/retreats');
  const isGroupsPage = pathname.includes('/groups');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setExperienceOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setExperienceOpen(false);
    }, 200);
  }, []);

  const navLinks: NavItem[] = [
    { href: `/${locale}#rooms`, label: nav.rooms },
    { href: `/${locale}/weddings`, label: nav.weddings },
    { href: `/${locale}/retreats`, label: nav.retreats },
    {
      href: '#',
      label: nav.experience,
      children: [
        { href: `/${locale}/experiences#breakfast`, label: nav.dining },
        { href: `/${locale}/experiences`, label: nav.spaConcierge },
        { href: `/${locale}/groups`, label: nav.corporateGroups },
      ],
    },
  ];

  // Page-aware CTA
  let ctaHref = `/${locale}#availability`;
  let ctaLabel = nav.bookNow;
  let ctaStyled = false; // false = filled turquoise, true = outlined brutalist

  if (isWeddingsPage) {
    ctaHref = '#specialist';
    ctaLabel = dict.weddings?.specialistCta || nav.bookNow;
    ctaStyled = true;
  } else if (isRetreatsPage) {
    ctaHref = '#specialist';
    ctaLabel = dict.retreatsPage?.specialistCta || nav.bookNow;
    ctaStyled = true;
  } else if (isGroupsPage) {
    ctaHref = '#specialist';
    ctaLabel = dict.groupsPage?.specialistCta || nav.bookNow;
    ctaStyled = true;
  }

  const ctaClass = ctaStyled
    ? 'border-2 border-white text-white bg-transparent hover:bg-white/10 text-sm font-medium px-5 py-2.5 transition-colors tracking-wide'
    : 'bg-turquoise hover:bg-turquoise-dark text-white text-sm font-medium px-5 py-2.5 rounded transition-colors tracking-wide';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sunset/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-serif text-2xl text-white tracking-wide"
          >
            Casa Schuck
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="text-sm text-stone-light/90 hover:text-gold transition-colors tracking-wide uppercase flex items-center gap-1"
                    aria-expanded={experienceOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${experienceOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {experienceOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 min-w-[200px] bg-sunset/95 backdrop-blur-md
                                   rounded-lg shadow-xl border border-white/10 py-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-stone-light/90 hover:text-gold
                                       hover:bg-white/5 transition-colors tracking-wide"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-stone-light/90 hover:text-gold transition-colors tracking-wide uppercase"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher locale={locale} label={dict.common.language} />
            <Link href={ctaHref} className={ctaClass}>
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-3 -mr-3"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-sunset/95 backdrop-blur-md border-t border-white/10"
          >
            <nav className="px-4 py-4 space-y-0">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpOpen(!mobileExpOpen)}
                      className="w-full flex items-center justify-between text-stone-light/90 hover:text-gold
                                 transition-colors tracking-wide uppercase text-sm py-3"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${mobileExpOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileExpOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block pl-6 text-stone-light/70 hover:text-gold transition-colors
                                         tracking-wide text-sm py-2.5"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-stone-light/90 hover:text-gold transition-colors tracking-wide uppercase text-sm py-3"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <LanguageSwitcher locale={locale} label={dict.common.language} />
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className={ctaClass}
                >
                  {ctaLabel}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
