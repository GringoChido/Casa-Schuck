'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RoomImageCarousel } from '@/components/ui/RoomImageCarousel';
import { RoomDetail } from '@/components/ui/RoomDetail';
import mockData from '@/data/mockCloudbeds.json';
import type { Locale } from '@/lib/i18n';

interface RoomShowcaseProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function RoomShowcase({ locale, dict }: RoomShowcaseProps) {
  const rooms = mockData.roomTypes;
  const amenityLabels = mockData.amenityLabels[locale] || mockData.amenityLabels.en;
  const r = dict.rooms;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRoom = rooms[activeIndex];

  return (
    <section id="rooms" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-terracotta font-medium mb-4">
            {r.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            {r.headline}
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            {r.description}
          </p>
        </motion.div>

        {/* ═══ Desktop: Vertical tabs left + detail right ═══ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Left: Room Name List */}
          <div className="col-span-3 space-y-1">
            {rooms.map((room, i) => (
              <button
                key={room.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-cream border-l-4 border-turquoise text-deep-brown font-medium'
                    : 'text-charcoal/60 hover:text-charcoal hover:bg-cream/50'
                }`}
              >
                <span className="font-serif text-lg">{room.name[locale]}</span>
                <span className="block text-xs text-charcoal/40 mt-0.5">
                  ${room.baseRate} / {locale === 'es' ? 'noche' : 'night'}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Carousel + Detail */}
          <div className="col-span-9">
            <RoomImageCarousel
              images={activeRoom.images}
              roomName={activeRoom.name[locale]}
            />
            <RoomDetail
              room={activeRoom as any}
              locale={locale}
              dict={r}
              amenityLabels={amenityLabels}
            />
          </div>
        </div>

        {/* ═══ Mobile: Horizontal scrollable pills + detail ═══ */}
        <div className="lg:hidden">
          {/* Pills — snap scroll, 44px+ tap targets */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
            {rooms.map((room, i) => (
              <button
                key={room.id}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 snap-start px-4 py-2.5 rounded-full text-sm transition-all min-h-[44px] ${
                  i === activeIndex
                    ? 'bg-turquoise text-white'
                    : 'bg-cream text-charcoal/60 hover:bg-stone-light'
                }`}
              >
                {room.name[locale]}
              </button>
            ))}
          </div>

          {/* Carousel + Detail */}
          <RoomImageCarousel
            images={activeRoom.images}
            roomName={activeRoom.name[locale]}
          />
          <RoomDetail
            room={activeRoom as any}
            locale={locale}
            dict={r}
            amenityLabels={amenityLabels}
          />
        </div>
      </div>
    </section>
  );
}
