import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://www.incomegrow.in";

const staticPages = [
  "/",
  "/about",
  "/products",
  "/testimonials",
  "/become-partner",

  "/products/goal",
  "/products/course",
  "/products/blogs",
  "/products/brokers-knowledge",

  "/calculation/lumpsum",
  "/calculation/sip",
  "/calculation/goal-planner",
  "/calculation/eim",
  "/calculation/fd",
  "/calculation/rd",
  "/calculation/pf",
  "/calculation/nps",
  "/calculation/ssy",
  "/calculation/tax",
  "/calculation/gratuity",
  "/calculation/other",
  "/tax-planning",
  "/terms-of-service",
  "/tax-knowledge/tax-haven",
  "/sitemap",
  "/support/contact-us",
  "/support/faq",

  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",

  // Important: your newly published article
  "/products/blogs/brokerage-charges-india-stt-gst-stamp-duty-sebi-fees",
  "/products/blogs/sip-investment-calculator-long-term-goal-planning",
  "/products/blogs/fd-rd-investment-planning-calculator",
  "/products/blogs/equity-investment-management-retirement-planning",
  "/products/blogs/sukanya-samriddhi-yojana-calculator-guide",
  "/products/blogs/crypto-investment-risks-and-opportunities",
  "/products/blogs/tax-saving-investments-elss-vs-ulip-vs-ppf",
  "/products/blogs/rbi-policy-impact-on-banking-stocks",
  "/products/blogs/market-volatility-how-to-protect-your-portfolio",
  "/products/blogs/understanding-sip-a-complete-guide-for-beginners",
  "/products/blogs/10-best-blue-chip-stocks-to-invest-in-2024"
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const urls = staticPages
    .map(
      (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.7"}</priority>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  // Explicit XML response
  res.setHeader("Content-Type", "application/xml; charset=utf-8");

  // Prevent cached 304 responses
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.status(200).send(sitemap);
}