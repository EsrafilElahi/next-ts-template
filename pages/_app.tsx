import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
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


export type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type NextPropsLayout = AppProps & {
  Component: NextPageLayout
}


function MyApp({ Component, pageProps }: NextPropsLayout) {
  const store = useStore()
  console.log('store :', store)
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  )

}

export default wrapper.withRedux(MyApp)