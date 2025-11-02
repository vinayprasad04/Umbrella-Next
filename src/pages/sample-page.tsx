import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SamplePage() {
  return (
    <>
      <Head>
        <title>Sample Page - IncomeGrow</title>
        <meta name="description" content="Sample page showing reusable Header and Footer components" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: 'white' }}>
        <Header />
        
        <main style={{ minHeight: '60vh', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', color: '#FF6B2C', marginBottom: '20px' }}>
              Sample Page
            </h1>
            <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              This is an example page showing how the Header and Footer components 
              can be reused across multiple pages in your application.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}