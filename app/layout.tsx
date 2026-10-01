import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const barlow = Barlow({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

const siteUrl = 'https://usykmexico.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'USYK México — Herramientas de Corte de Precisión | Automotriz y Aeroespacial',
    template: '%s | USYK México'
  },
  description: 'Distribuidor líder de herramientas de corte de precisión en México. Brocas, insertos PCD/PCBN y soluciones a medida para industria automotriz y aeroespacial. Chihuahua, México.',
  keywords: [
    'herramientas de corte México',
    'insertos PCD México',
    'insertos PCBN',
    'brocas de precisión',
    'maquinado automotriz México',
    'herramientas aeroespacial México',
    'herramientas de alta precisión México',
    'herramientas corte Chihuahua',
    'USYK México',
    'distribuidor herramientas corte',
    'maquinado de precisión',
    'insertos de carburo',
  ],
  authors: [{ name: 'USYK México', url: siteUrl }],
  creator: 'USYK México',
  publisher: 'USYK México',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'USYK México',
    title: 'USYK México — Herramientas de Corte de Precisión',
    description: 'Distribuidor líder de herramientas de corte de precisión para industria automotriz y aeroespacial en México. Chihuahua, México.',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'USYK México - Herramientas de Corte de Precisión',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USYK México — Herramientas de Corte de Precisión',
    description: 'Distribuidor líder de herramientas de corte de precisión para industria automotriz y aeroespacial en México.',
    images: [`${siteUrl}/opengraph-image`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-MX': siteUrl,
    },
  },
  verification: {
    google: '',   // agregar Google Search Console verification token aquí
  },
  category: 'manufacturing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${barlow.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
