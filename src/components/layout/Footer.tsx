import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { SocialLinks } from '@/components/ui/SocialLinks';

interface FooterProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function Footer({ locale, dict }: FooterProps) {
  const f = dict.footer;
  const nav = dict.nav;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-sunset text-stone-light/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-3">Casa Schuck</h3>
            <p className="text-sm leading-relaxed mb-4 text-stone/70">
              {f.tagline}
            </p>
            <p className="text-xs leading-relaxed text-stone/50 mb-3">{f.address}</p>
            <a
              href="https://maps.google.com/?q=Casa+Schuck,+Garita+3,+Centro,+37700+San+Miguel+de+Allende,+Gto.,+Mexico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-white
                         bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors min-h-[44px]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {f.openMaps}
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">
              {nav.contact}
            </h4>
            <div className="space-y-1 text-sm">
              <a href={`tel:${f.phone}`} className="flex items-center gap-2 text-stone/60 hover:text-white transition-colors min-h-[44px]">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {f.phone}
              </a>
              <a href={`tel:${f.phone2}`} className="flex items-center gap-2 text-stone/60 hover:text-white transition-colors min-h-[44px]">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {f.phone2}
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5214151806060'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone/60 hover:text-white transition-colors min-h-[44px]"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {f.whatsapp}
              </a>
              <a href={`mailto:${f.email}`} className="flex items-center gap-2 text-stone/60 hover:text-white transition-colors min-h-[44px]">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {f.email}
              </a>
            </div>
            <div className="mt-4 space-y-1 text-xs text-stone/40">
              <p>{f.checkIn}</p>
              <p>{f.checkOut}</p>
              <p>{f.breakfast}</p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">
              {f.exploreHeading}
            </h4>
            <nav className="space-y-2">
              {[
                { href: '#rooms', label: nav.rooms },
                { href: '/story', label: nav.story },
                { href: '/experiences#breakfast', label: nav.dining },
                { href: '/experiences', label: nav.services },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="block text-sm text-stone/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Plan Your Stay */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">
              {f.planHeading}
            </h4>
            <nav className="space-y-2">
              {[
                { href: '/weddings', label: nav.weddings },
                { href: '/retreats', label: nav.retreats },
                { href: '/groups', label: nav.corporateGroups },
                { href: '#availability', label: nav.bookNow },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="block text-sm text-stone/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">{f.followUs}</h4>
            <SocialLinks />
            <div className="mt-6 space-y-1 text-xs text-stone/50">
              <Link href="#" className="hover:text-white transition-colors block">
                {f.privacy}
              </Link>
              <Link href="#" className="hover:text-white transition-colors block">
                {f.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone/40">
        &copy; {year} Casa Schuck. {f.rightsReserved}.
      </div>
    </footer>
  );
}
