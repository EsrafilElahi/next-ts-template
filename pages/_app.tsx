import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";
import '../styles/globals.css'


// loading progress
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type NextPropsLayout = AppProps & {
  Component: NextPageLayout
}


function MyApp({ Component, pageProps }: NextPropsLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )

}

export default MyApp