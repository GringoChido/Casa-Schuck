'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface StoryBlock {
  title: string;
  description: string;
  linkText: string;
  href: string;
  image: string;
}

interface StoryBlocksProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function StoryBlocks({ locale, dict }: StoryBlocksProps) {
  const sb = dict.storyBlocks;

  return (
    <section className="py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-gold font-medium mb-3">
            {sb.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold mb-4">
            {sb.headline}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sb.blocks?.map((block: StoryBlock, i: number) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <Link href={`/${locale}${block.href}`} className="block">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl mb-5">
                  <Image
                    src={block.image}
                    alt={block.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Text */}
                <h3 className="font-serif text-xl text-gold mb-2 group-hover:text-gold-light transition-colors">
                  {block.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-3">
                  {block.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-turquoise hover:text-turquoise-dark font-medium transition-colors">
                  {block.linkText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
