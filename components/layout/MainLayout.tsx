import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children: ReactNode,
  title?: string
}

function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  )
}

export default Layout