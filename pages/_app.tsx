import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../redux/store';
// import { persistor, store } from '../redux/store'
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";
import '../styles/globals.css'


// loading progress
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const clientSideEmotionCache = createEmotionCache();


export type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type NextPropsLayout = AppProps & {
  Component: NextPageLayout,
  emotionCache?: EmotionCache;
}


function MyApp(props: NextPropsLayout) {
  const store = useStore()
  console.log('store :', store);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page)


  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  )

}

export default wrapper.withRedux(MyApp)