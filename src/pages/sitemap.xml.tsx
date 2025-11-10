import { GetServerSideProps } from 'next';

// List of all static pages with their priorities and change frequencies
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/dashboard', priority: '0.9', changefreq: 'weekly' },

  // My Goal
  { url: '/dashboard/my-goal', priority: '0.9', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/wealth-creation', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/retirement', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/house', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/car', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/self-education', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/child-education', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/child-wedding', priority: '0.8', changefreq: 'weekly' },
  { url: '/dashboard/my-goal/vacation', priority: '0.8', changefreq: 'weekly' },

  // Calculators
  { url: '/calculation/sip', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculation/lumpsum', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculation/goal-planner', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculation/tax', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculation/eim', priority: '0.8', changefreq: 'monthly' },
  { url: '/calculation/fd-rd-pf-nps-ssy', priority: '0.8', changefreq: 'monthly' },
  { url: '/calculation/gratuity', priority: '0.8', changefreq: 'monthly' },

  // Tax Planning
  { url: '/tax-planning', priority: '0.9', changefreq: 'monthly' },
  { url: '/tax-planning/section-80c', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/health-insurance-80d', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/nps-additional-80ccd1b', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/home-loan-benefits', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/education-loan-80e', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/donations-80g', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/section-87a-rebates', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/old-vs-new-regime', priority: '0.9', changefreq: 'monthly' },
  { url: '/tax-planning/capital-gains-planning', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/salary-restructuring', priority: '0.8', changefreq: 'monthly' },
  { url: '/tax-planning/itr-filing-guide', priority: '0.9', changefreq: 'monthly' },

  // Products
  { url: '/products', priority: '0.8', changefreq: 'weekly' },
  { url: '/products/goal', priority: '0.8', changefreq: 'weekly' },
  { url: '/products/shares-research', priority: '0.8', changefreq: 'weekly' },
  { url: '/products/blogs', priority: '0.8', changefreq: 'daily' },
  { url: '/products/course', priority: '0.8', changefreq: 'weekly' },
  { url: '/products/brokers-knowledge', priority: '0.7', changefreq: 'monthly' },

  // Support
  { url: '/support/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/support/contact-us', priority: '0.6', changefreq: 'monthly' },

  // Legal
  { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
  { url: '/cookie-policy', priority: '0.5', changefreq: 'yearly' },

  // Other
  { url: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  { url: '/become-partner', priority: '0.7', changefreq: 'monthly' },
];

function generateSiteMap() {
  const baseUrl = 'https://www.incomegrow.in';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages
  .map(({ url, priority, changefreq }) => {
    return `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;
}

export default function SiteMap() {
  // This component doesn't render anything
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
