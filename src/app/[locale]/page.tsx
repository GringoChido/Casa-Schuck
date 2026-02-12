import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { Hero } from '@/components/sections/Hero';
import { AvailabilityBar } from '@/components/sections/AvailabilityBar';
import { RoomShowcase } from '@/components/sections/RoomShowcase';
import { SeasonalPackages } from '@/components/sections/SeasonalPackages';
import { StoryBlocks } from '@/components/sections/StoryBlocks';
import { Reviews } from '@/components/sections/Reviews';
import { BookDirectCallout } from '@/components/sections/BookDirectCallout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero locale={locale as Locale} dict={dict} />
      <AvailabilityBar locale={locale as Locale} dict={dict} />
      <RoomShowcase locale={locale as Locale} dict={dict} />
      <SeasonalPackages locale={locale as Locale} dict={dict} />
      <BookDirectCallout locale={locale as Locale} dict={dict} />
      <StoryBlocks locale={locale as Locale} dict={dict} />
      <Reviews locale={locale as Locale} dict={dict} />
    </>
  );
}
