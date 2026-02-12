import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { RetreatsDetail } from '@/components/sections/RetreatsDetail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.retreatsPage.headline} — Casa Schuck`,
    description: dict.retreatsPage.introBody,
  };
}

export default async function RetreatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <RetreatsDetail locale={locale as Locale} dict={dict} />
    </main>
  );
}
