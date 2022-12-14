import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'reflect-metadata';
import { FC } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider
} from '@mui/material/styles';
import theme from '../src/utils/theme';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}


export default App;