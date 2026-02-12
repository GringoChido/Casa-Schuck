'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export interface Pillar {
  title: string;
  subHeadline?: string;
  body: string;
  image: string;
  alt: string;
}

export function PillarBlock({
  pillar,
  isEven,
  isMobile,
  prefersReduced,
}: {
  pillar: Pillar;
  isEven: boolean;
  isMobile: boolean;
  prefersReduced: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const disableParallax = isMobile || prefersReduced;
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ['0%', '0%'] : ['-5%', '5%']
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={isEven ? 'editorial-grid' : 'editorial-grid-reverse'}
    >
      {/* Image with parallax */}
      <div className={`relative aspect-[4/3] overflow-hidden ${isEven ? '' : 'md:order-2'}`}>
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: imageY, top: '-10%', bottom: '-10%' }}
        >
          <Image
            src={pillar.image}
            alt={pillar.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* Text */}
      <div className={`flex flex-col justify-center ${isEven ? '' : 'md:order-1'}`}>
        <div className="w-12 h-px bg-terracotta mb-6" />
        <h3 className="font-serif text-2xl lg:text-3xl text-gold mb-2">
          {pillar.title}
        </h3>
        {pillar.subHeadline && (
          <p className="text-charcoal/50 italic text-base mb-3">
            {pillar.subHeadline}
          </p>
        )}
        <p className="text-charcoal/70 leading-relaxed text-lg">
          {pillar.body}
        </p>
      </div>
    </motion.div>
  );
}
