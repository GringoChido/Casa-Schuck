import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { GroupsDetail } from '@/components/sections/GroupsDetail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.groupsPage.headline} — Casa Schuck`,
    description: dict.groupsPage.subHeadline,
  };
}

export default async function GroupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <GroupsDetail locale={locale as Locale} dict={dict} />
    </main>
  );
}
