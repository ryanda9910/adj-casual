import React from 'react'
import { Content, Footer, Header } from '../public/src/Components'

export default function Product() {
  return (
    <div>
    <Header/>
    <Content>
     <div className='flex h-screen bg-blue-400 w-full m-10 rounded-2xl'>
        <span className='m-auto'> Product Screen</span>
      </div>
    </Content>
    <Footer/>      
    </div>
  )
}
