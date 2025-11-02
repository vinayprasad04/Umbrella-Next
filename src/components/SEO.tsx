import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSEOConfig, SEOConfig } from '@/config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogTitle,
  ogDescription,
  canonical,
  noindex = false,
  nofollow = false,
}) => {
  const router = useRouter();
  const pageSEO = getSEOConfig(router.pathname);

  // Use provided props or fall back to page config
  const finalTitle = title || pageSEO.title;
  const finalDescription = description || pageSEO.description;
  const finalKeywords = keywords || pageSEO.keywords;
  const finalOgTitle = ogTitle || pageSEO.ogTitle || finalTitle;
  const finalOgDescription = ogDescription || pageSEO.ogDescription || finalDescription;
  const finalOgImage = ogImage || pageSEO.ogImage || '/og-image.png';
  const finalCanonical = canonical || pageSEO.canonical || `https://incomegrow.in${router.pathname}`;

  // Robots meta tag
  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="IncomeGrow" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonical} />
      <meta property="twitter:title" content={finalOgTitle} />
      <meta property="twitter:description" content={finalOgDescription} />
      <meta property="twitter:image" content={finalOgImage} />

      {/* Additional Meta Tags */}
      <meta name="author" content="IncomeGrow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Theme Color */}
      <meta name="theme-color" content="#FF6B2C" />
      <meta name="msapplication-TileColor" content="#FF6B2C" />

      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'IncomeGrow',
            url: 'https://incomegrow.in',
            logo: 'https://incomegrow.in/logo.png',
            description: 'Smart Investment & Financial Planning Platform',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              email: 'vinay.qss@gmail.com',
            },
            sameAs: [
              // Add your social media URLs here
            ],
          }),
        }}
      />

      {/* Structured Data - WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'IncomeGrow',
            url: 'https://incomegrow.in',
            description: finalDescription,
            publisher: {
              '@type': 'Organization',
              name: 'IncomeGrow',
            },
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
