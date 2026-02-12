'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { buildDeepLink, getDefaultDates } from '@/lib/cloudbeds';
import type { Locale } from '@/lib/i18n';

interface AvailabilityBarProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function AvailabilityBar({ locale, dict }: AvailabilityBarProps) {
  const a = dict.availability;
  const defaults = getDefaultDates();

  const [checkin, setCheckin] = useState(defaults.checkin);
  const [checkout, setCheckout] = useState(defaults.checkout);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSearch = () => {
    const url = buildDeepLink({
      checkin,
      checkout,
      adults,
      children,
      language: locale,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="availability" className="relative -mt-14 z-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-terracotta/90 backdrop-blur-md border border-white/12 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Check-in */}
            <div>
              <label className="block text-xs text-stone-light/60 uppercase tracking-wider mb-2">
                {a.checkIn}
              </label>
              <input
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-xs text-stone-light/60 uppercase tracking-wider mb-2">
                {a.checkOut}
              </label>
              <input
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Adults */}
            <div>
              <label className="block text-xs text-stone-light/60 uppercase tracking-wider mb-2">
                {a.adults}
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors appearance-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-charcoal">
                    {n} {n === 1 ? a.adult : a.adults}
                  </option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div>
              <label className="block text-xs text-stone-light/60 uppercase tracking-wider mb-2">
                {a.children}
              </label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors appearance-none"
              >
                {[0, 1, 2, 3].map((n) => (
                  <option key={n} value={n} className="bg-charcoal">
                    {n} {n === 1 ? a.child : a.children}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-white font-medium py-3 px-6 rounded-lg transition-colors tracking-wide text-sm min-h-[48px]"
            >
              {a.search}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
