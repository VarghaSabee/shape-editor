import { ThemeProvider } from 'styled-components';
import AppHeads from "@/components/app/appHeads";
import type { AppProps } from 'next/app'
import colors from '@/vars/colors';
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={colors}>
      <AppHeads />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}