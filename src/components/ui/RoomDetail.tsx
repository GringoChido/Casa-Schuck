'use client';

import { motion } from 'framer-motion';
import { buildDeepLink } from '@/lib/cloudbeds';
import type { Locale } from '@/lib/i18n';

interface RoomType {
  id: string;
  name: { en: string; es: string };
  tagline: { en: string; es: string };
  description: { en: string; es: string };
  maxGuests: number;
  bedType: { en: string; es: string };
  floor: number;
  baseRate: number;
  accessible: boolean;
  hasAC: boolean;
  specialNote: { en: string; es: string } | null;
  amenities: string[];
}

interface RoomDetailProps {
  room: RoomType;
  locale: Locale;
  dict: Record<string, string>;
  amenityLabels: Record<string, string>;
}

export function RoomDetail({ room, locale, dict, amenityLabels }: RoomDetailProps) {
  const name = room.name[locale];
  const tagline = room.tagline[locale];
  const description = room.description[locale];
  const bedType = room.bedType[locale];
  const specialNote = room.specialNote?.[locale];

  const floorLabel = room.floor === 0 ? 'Ground' : `${room.floor}`;

  return (
    <motion.div
      key={room.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-6"
    >
      {/* Name + Tagline */}
      <h3 className="font-serif text-3xl lg:text-4xl text-gold mb-2">{name}</h3>
      <p className="text-terracotta italic text-lg mb-4">{tagline}</p>

      {/* Description */}
      <p className="text-charcoal/75 leading-relaxed mb-6 max-w-2xl">{description}</p>

      {/* Meta Row */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-charcoal/60">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {dict.maxGuests}: {room.maxGuests}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {dict.floor}: {floorLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          {dict.bedType}: {bedType}
        </span>
      </div>

      {/* Accessible Badge */}
      {room.accessible && (
        <div className="mb-4 inline-flex items-center gap-2 bg-turquoise/10 text-turquoise-dark text-sm font-medium px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {dict.accessible}
        </div>
      )}

      {/* Special Note */}
      {specialNote && (
        <p className="text-sm text-turquoise italic mb-4">{specialNote}</p>
      )}

      {/* Amenities Grid */}
      <div className="mb-6">
        <p className="text-sm font-medium text-charcoal/50 uppercase tracking-wider mb-3">{dict.amenities}</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {room.amenities.slice(0, 8).map((amenity) => (
            <span key={amenity} className="text-sm text-charcoal/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-terracotta rounded-full flex-shrink-0" />
              {amenityLabels[amenity] || amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
        <div>
          <span className="text-sm text-charcoal/50">{dict.fromLabel}</span>
          <span className="text-3xl font-serif text-gold ml-2">${room.baseRate}</span>
          <span className="text-sm text-charcoal/50 ml-1">{dict.perNight}</span>
        </div>
        <a
          href={buildDeepLink({ roomTypeId: room.id })}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-turquoise hover:bg-turquoise-dark text-white font-medium px-8 py-3 rounded
                     transition-colors tracking-wide text-sm text-center min-h-[44px]"
        >
          {dict.bookRoom}
        </a>
      </div>
    </motion.div>
  );
}
