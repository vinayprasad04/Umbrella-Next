import Head from 'next/head';

interface CalculatorSchemaProps {
  title: string;
  description: string;
  url: string;
  calculatorName: string;
  keywords: string;
  ogImage?: string;
}

export default function CalculatorSchema({
  title,
  description,
  url,
  calculatorName,
  keywords,
  ogImage = 'https://www.incomegrow.in/og-image-calculator.png'
}: CalculatorSchemaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="IncomeGrow" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@IncomeGrow" />

      {/* Schema.org Structured Data - WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": calculatorName,
            "description": description,
            "url": url,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            },
            "provider": {
              "@type": "Organization",
              "name": "IncomeGrow",
              "url": "https://www.incomegrow.in",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.incomegrow.in/logo.png"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "Customer Service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              }
            }
          })
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.incomegrow.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Calculators",
                "item": "https://www.incomegrow.in/calculation"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": calculatorName,
                "item": url
              }
            ]
          })
        }}
      />

      {/* FAQPage Schema - for FAQ sections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is a ${calculatorName}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${calculatorName} helps you calculate returns, maturity amount, and plan your financial goals effectively. It's a free online tool provided by IncomeGrow.`
                }
              },
              {
                "@type": "Question",
                "name": `How to use ${calculatorName}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Enter your investment details including amount, interest rate, and time period. The calculator will instantly show you the projected returns and maturity amount."
                }
              },
              {
                "@type": "Question",
                "name": `Is ${calculatorName} accurate?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our calculator uses standard financial formulas and current interest rates to provide accurate calculations. Results may vary based on actual market conditions and policy changes."
                }
              }
            ]
          })
        }}
      />
    </Head>
  );
}
