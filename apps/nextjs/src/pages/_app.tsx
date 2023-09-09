// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { PwaMeta } from "components";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
});

const MyApp: AppType<{
  dehydratedState: unknown;
}> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <PwaMeta />
        </Head>
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
          enableSystem={false}
        >
          <main className={`${poppins.variable} font-primary`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
