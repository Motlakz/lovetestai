import type { Metadata } from 'next'
import { Lexend_Deca, Quicksand } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const lexendDeca = Lexend_Deca({ 
  variable: "--font-lexend-deca",
  subsets: ["latin"],
})

const quicksand = Quicksand({ 
  variable: "--font-quicksand",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lovetestai.com'),
  title: 'LoveTestAI: Ultimate Love Calculator & Compatibility Test',
  description: 'Discover your true love compatibility with LoveTestAI. Our AI-powered app features compatibility tests by date of birth, zodiac signs, numerology, and a soulmate calculator. Find your perfect match today!',
  keywords: [
    'love test',
    'love tester',
    'love tester online',
    'love detector',
    'love calculator',
    'love compatibility test',
    'love language test',
    'soulmate calculator',
    'zodiac love calculator',
    'numerology love calculator',
    'love compatibility by date of birth',
    'birthday compatibility test',
    'love language quiz',
    'love language test free',
    '5 love languages quiz free',
    'compatibility test for couples',
    'couple compatibility test',
    'free couple compatibility test',
    'relationship compatibility test',
    'AI compatibility test',
    'AI love test'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: 'https://lovetestai.com/',
    title: 'LoveTestAI: AI-Powered Love Calculator & Compatibility Tests',
    description: 'Explore love compatibility with our advanced AI-driven Love Calculator. Test by name, birthdate, zodiac, and more!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LoveTestAI'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveTestAI: Find Your Soulmate with AI',
    description: 'Use our AI-powered LoveTestAI app to find your perfect match. Features include compatibility tests, soulmate finder, and more!',
    images: ['/twitter-image.jpg']
  },
  icons: {
    icon: '/heart.png'
  },
  verification: {
    other: {
      monetag: 'caa6027ef0a03195ac1d312e6070eb81'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LoveTestAI",
              "url": "https://lovetestai.com",
              "description": "An AI-powered love compatibility calculator with features including compatibility by date of birth, zodiac signs, numerology, and soulmate finder.",
              "applicationCategory": "Entertainment",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0"
              }
            })
          }}
        />
        
        {/* Reetahoo Script - moved to head to match original HTML */}
        <Script
          id="reetahoo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('reetahoo.com',8494047,document.createElement('script'))
            `
          }}
        />
      </head>
      <body className={`${lexendDeca.variable} ${quicksand.variable} antialiased`}>
        {children}
        
        {/* AdStyle Publisher Tag Manager */}
        <Script
          id="adstyle-ptm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,a){var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl='&.='+new Date().getTime()
                ,r=d.referrer;r=!!r&&r!==d.location.href?'&r='+r:'';j.async=true;
                w['.']=a;j.src= '//pubtagmanager.com/ptm.js?id='+a+dl+r;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','3680');
            `
          }}
        />
        
        {/* TinyAdz with proper attributes */}
        <Script
          src="https://app.tinyadz.com/scripts/ads.js?siteId=6808a34db299bef57971e5b6"
          type="module"
          async
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
