'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Swap locale in the current path
  const targetLocale = locale === 'en' ? 'es' : 'en';
  const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <Link
      href={newPath}
      className="text-sm text-stone-light/70 hover:text-white transition-colors border border-white/20 px-3 py-1.5 rounded"
    >
      {label}
    </Link>
  );
}
