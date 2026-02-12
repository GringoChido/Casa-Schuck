import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { WeddingsDetail } from '@/components/sections/WeddingsDetail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.weddings.headline} — Casa Schuck`,
    description: dict.weddings.description,
  };
}

export default async function WeddingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="pt-20">
      <WeddingsDetail locale={locale as Locale} dict={dict} />
    </main>
  );
}
