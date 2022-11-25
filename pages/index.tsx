import React from 'react'
import Head from 'next/head'
import MainLayout from '../components/layout/MainLayout'
import type { NextPageLayout } from './_app'
import { setName } from '../redux/slices/userSlice'

import { useAppDispatch, useAppSelector } from '../hooks/reduxTool'

const Home: NextPageLayout = () => {

  const count = useAppSelector(state => state.counterReducer.value)
  const name = useAppSelector(state => state.userReducer.name)
  const dispatch = useAppDispatch()


  console.log('count :', count);
  console.log('name :', name);

  const handleClick = () => {
    dispatch(setName("folani"))
  }

  return (
    <div>
      <span className=' text-primary'>
        nextjs typescript tailwind
      </span>
      <button className='btn-primary'>btn</button>

      <button onClick={handleClick}>set name</button>

    </div>
  )
}

Home.getLayout = (page) => <MainLayout title="index page">{page}</MainLayout>
export default Home