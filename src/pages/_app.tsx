import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import AuthManager from "@/components/AuthManager";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ThemeProvider } from 'next-themes';
import clarity from '@microsoft/clarity';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // Initialize Microsoft Clarity
    if (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
        }}
      >
        <AuthManager />
        {getLayout(<Component {...pageProps} />)}
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  );
}

export default MyApp;
