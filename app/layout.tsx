import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GATracker from "@/components/ga-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export const metadata: Metadata = {
  title: {
    default: 'Deal Option - Best Deals and Offers',
    template: '%s | Deal Option'
  },
  description: " no touch code , its help for those website wants to easy and less cost optimize their product pricing for global market ",
 
  keywords: ['deals', 'offers', 'discounts', 'savings', 'deal option','shopify automation', 'no code', 'free tier', 'paritydeals', 
    'alternative parity deals'
  ],
  authors: [{ name: 'Deal Option' }],
  creator: 'Deal Option',
  publisher: 'Dorny Group',
  metadataBase: new URL('https://deal-option.app.dorny.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deal-option.app.dorny.site',
    siteName: 'Deal Option',
    title: 'Deal Option - Best Deals and Offers',
    description: 'Find the best deals and offers on Deal Option. Save money on your favorite products and services.',
    images: [
      {
        url: '/favicon.ico', // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: 'Deal Option',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deal Option - Best Deals and Offers',
    description: 'Find the best deals and offers on Deal Option. Save money on your favorite products and services.',
    images: ['/favicon.ico'],
    creator: '@dealoption', // Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}














export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
           
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-GBVC7Y6J4Z"></Script>
<Script id="google-tag-manager" strategy="beforeInteractive">
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', 'G-GBVC7Y6J4Z');
  `
  }
</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GATracker />
        {children}
      </body>


    </html>
  );
}




