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
import { AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBar>
        <Toolbar>
          <Link href="/">
            CLEAN NEXT.JS - RICK & MORTY
          </Link>
        </Toolbar>
      </AppBar>

      <Component {...pageProps} />
    </ThemeProvider >
  );
}


export default App;