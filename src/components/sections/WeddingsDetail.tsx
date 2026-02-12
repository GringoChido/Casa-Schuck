'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PillarBlock, type Pillar } from '@/components/ui/PillarBlock';

/* ═══════════════════════════════════════════
   Minimalist SVG Icons — Logistics Dashboard
   ═══════════════════════════════════════════ */

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function ShuttleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h2m10 0h2M3 9h18M5 13h14" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <circle cx="7.5" cy="19" r="1.5" />
      <circle cx="16.5" cy="19" r="1.5" />
    </svg>
  );
}

function ParadeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function ForkKnifeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function FlowerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M5.45 5.11L2 12h4l-1.45 6.89" />
      <path d="M18.55 5.11L22 12h-4l1.45 6.89" />
      <circle cx="12" cy="8" r="4" />
      <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4z" />
      <path d="M8.21 5.21a4 4 0 015.58 0M8.21 10.79a4 4 0 010-5.58" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

interface LogisticsItem {
  title: string;
  description: string;
}

/* ═══════════════════════════════════════
   WeddingsDetail — Main Component
   ═══════════════════════════════════════ */

interface WeddingsDetailProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function WeddingsDetail({ locale, dict }: WeddingsDetailProps) {
  const w = dict.weddings;
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5214151806060'}`;

  const logisticsIcons = [CameraIcon, ShuttleIcon, ParadeIcon, ForkKnifeIcon, FlowerIcon, MapPinIcon];

  return (
    <section className="bg-warm-white">

      {/* ═══ Section 1: Hero Banner ═══ */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/wedding/callejoneada-hero.webp"
          alt="Wedding callejoneada with mojigangas and mariachi in San Miguel de Allende"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <p className="text-sm tracking-[0.3em] uppercase text-white/80 font-medium mb-3">
            {w.eyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white text-shadow-editorial mb-3">
            {w.headline}
          </h1>
          <p className="text-lg md:text-xl text-stone-light/80 mb-6 max-w-xl">
            {w.subHeadline}
          </p>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#specialist"
            className="inline-block border-2 border-white/80 text-white font-medium
                       px-8 py-3 text-sm tracking-wider uppercase transition-colors
                       hover:bg-white/10 min-h-[44px]"
          >
            {w.specialistCta}
          </motion.a>
        </div>
      </div>

      {/* ═══ Section 2: The Strategy — Three Pillars ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-20">
          {w.pillars?.map((pillar: Pillar, i: number) => {
            const isEven = i % 2 === 0;
            return (
              <PillarBlock
                key={pillar.title}
                pillar={pillar}
                isEven={isEven}
                isMobile={isMobile}
                prefersReduced={prefersReduced}
              />
            );
          })}
        </div>
      </div>

      {/* ═══ Section 3: Logistics Dashboard ═══ */}
      <div className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold">
              {w.logisticsHeadline}
            </h2>
          </motion.div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {w.logistics?.map((item: LogisticsItem, i: number) => {
              const Icon = logisticsIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l-2 border-gold/30 pl-6 py-2"
                >
                  {Icon && <Icon className="w-8 h-8 text-gold mb-4" />}
                  <h3 className="font-serif text-lg text-gold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Section 4: The Closer — Specialist Block ═══ */}
      <div id="specialist" className="bg-sunset text-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.35em] uppercase text-stone-light/60 font-medium mb-4"
          >
            {w.specialistEyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6"
          >
            {w.specialistHeadline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-light/70 leading-relaxed text-lg mb-10 max-w-2xl mx-auto"
          >
            {w.specialistBody}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white font-medium
                       px-10 py-4 text-lg tracking-wide transition-colors
                       hover:bg-white hover:text-sunset min-h-[48px]"
          >
            {w.specialistCta}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
