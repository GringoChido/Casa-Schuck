'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import type { Locale } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/useIsMobile';

interface HeroProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function Hero({ locale, dict }: HeroProps) {
  const h = dict.hero;
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Disable parallax on mobile + reduced motion
  const disableParallax = isMobile || prefersReduced;
  const imageY = useTransform(scrollYProgress, [0, 1], disableParallax ? ['0%', '0%'] : ['0%', '20%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.45]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* ═══ Background Image with Parallax ═══ */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/hero/courtyard-main.jpg"
          alt="Casa Schuck courtyard in San Miguel de Allende"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* ═══ Vignette + Gradient Overlay ═══ */}
      <div className="absolute inset-0 vignette" />
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      {/* Radial gradient for mobile headline readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)]" />

      {/* ═══ Content — Centered ═══ */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase text-stone-light/90 font-medium mb-6"
        >
          {h.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 text-shadow-editorial max-w-4xl"
        >
          {h.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-stone-light/80 max-w-2xl leading-relaxed mb-10"
        >
          {h.subheadline}
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          href="#availability"
          className="inline-block bg-turquoise hover:bg-turquoise-dark text-white font-medium
                     px-10 py-4 rounded text-lg transition-colors tracking-wide min-h-[48px]"
        >
          {h.cta}
        </motion.a>
      </div>

      {/* ═══ Scroll Indicator — 44px+ tap target ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-3"
          aria-label="Scroll to availability"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-9 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2.5 bg-white/50 rounded-full" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
