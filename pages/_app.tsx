import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  colors: {
    primary: "#70008F",
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box m={16} mt={4}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
