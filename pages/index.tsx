import React from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import MainLayout from '../components/layout/MainLayout'
import type { NextPageLayout } from './_app'


const Home: NextPageLayout = () => {
  return (
    <div>
      <span>
        nextjs typescript material
      </span>

      <Button variant='contained'>Btn</Button>

    </div>
  )
}

Home.getLayout = (page) => <MainLayout title="index page">{page}</MainLayout>
export default Home