import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'IP-SAKTI Sahayak | Ayurveda IPR & Regulatory Assistant',
  description: 'Multilingual, source-cited AI assistant for Ayurveda Intellectual Property Rights (IPR) and regulatory guidance for Smart India Hackathon 2026 Presentation Prototype.',
  openGraph: {
    title: 'IP-SAKTI Sahayak | Ayurveda IPR & Regulatory Assistant',
    description: 'Multilingual, source-cited AI assistant for Ayurveda Intellectual Property Rights (IPR) and regulatory guidance for Smart India Hackathon 2026 Presentation Prototype.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IP-SAKTI Sahayak | Ayurveda IPR & Regulatory Assistant',
    description: 'Multilingual, source-cited AI assistant for Ayurveda Intellectual Property Rights (IPR) and regulatory guidance for Smart India Hackathon 2026 Presentation Prototype.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
