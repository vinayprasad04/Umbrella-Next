import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthManager from "@/components/AuthManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthManager />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
