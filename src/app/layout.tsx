import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Casa Schuck | Boutique Hotel in San Miguel de Allende',
  description:
    'A colonial sanctuary reimagined. Boutique luxury in the heart of San Miguel de Allende. Book direct for the best rate — breakfast included.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
