import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className=' py-5 flex flex-col min-h-screen'>
      <div className='border-b-[1px]'>
      <Header/>
      </div>
      <div className='px-20'>
      <Outlet/>
      </div>
        
        
    </div>
  )
}

export default Layout