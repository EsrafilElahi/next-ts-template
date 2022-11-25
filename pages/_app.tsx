import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';

import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache();


export type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type NextPropsLayout = AppProps & {
  Component: NextPageLayout,
  emotionCache?: EmotionCache;
}


function MyApp(props: NextPropsLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page)


  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  )

}

export default MyApp