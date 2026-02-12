'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

export interface CrossLink {
  href: string;
  image: string;
  title: string;
  description: string;
}

interface CrossLinksProps {
  locale: Locale;
  heading: string;
  links: CrossLink[];
}

export function CrossLinks({ locale, heading, links }: CrossLinksProps) {
  if (!links.length) return null;

  return (
    <section className="bg-cream border-t border-stone/20 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl text-gold mb-10 text-center"
        >
          {heading}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/${locale}${link.href}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm
                           border border-stone/10 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-gold mb-1 group-hover:text-gold-light transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
