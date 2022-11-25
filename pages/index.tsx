import React from 'react'
import Head from 'next/head'
import MainLayout from '../components/layout/MainLayout'
import type { NextPageLayout } from './_app'


const Home: NextPageLayout = () => {
  return (
    <div>
      <span className=' text-primary'>
        nextjs typescript tailwind
      </span>
      <button className='btn-primary'>btn</button>

    </div>
  )
}

Home.getLayout = (page) => <MainLayout title="index page">{page}</MainLayout>
export default Home