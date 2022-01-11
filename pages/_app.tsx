import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/auth.context";
import { useAnalyticsInstance } from "../hooks/useAnalytics";

const theme = extendTheme({
  colors: {
    primary: {
      500: "#70008F",
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  useAnalyticsInstance();
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
