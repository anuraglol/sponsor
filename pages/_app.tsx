import { AppProps } from "next/app";
import { NextSeo } from "next-seo";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import "@fontsource/poppins"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Sponsor Anurag"
        titleTemplate="Sponsor Anurag"
        defaultTitle="Sponsor Anurag"
        description="A website for sponsoring Anurag"
        canonical="https://www.anurag.tech/"
        openGraph={{
          url: "https://www.anurag.tech/",
          title: "Sponsor Anurag",
          description: "A website for sponsoring Anurag",
          images: [
            {
              url: "https://res.cloudinary.com/ddum5vpp3/image/upload/v1643532760/og-image_dwcwhp.png",
              width: 800,
              height: 420,
              alt: `Sponsor Anurag`,
            },
          ],
        }}
        twitter={{
          handle: "@kr_anurag_",
          site: "@kr_anurag_",
          cardType: "summary_large_image",
        }}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
