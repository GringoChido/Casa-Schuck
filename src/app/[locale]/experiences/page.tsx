import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { ExperiencesDetail } from '@/components/sections/ExperiencesDetail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.services.eyebrow} — Casa Schuck`,
    description: dict.services.description,
  };
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <ExperiencesDetail locale={locale as Locale} dict={dict} />
    </main>
  );
}
