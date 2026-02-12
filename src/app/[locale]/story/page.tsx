import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { StoryHero } from '@/components/sections/StoryHero';
import { OurStory } from '@/components/sections/OurStory';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.nav.story} — Casa Schuck`,
    description: dict.story.intro,
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <StoryHero dict={dict} />
      <OurStory locale={locale as Locale} dict={dict} />
    </main>
  );
}
