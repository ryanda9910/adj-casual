import React from 'react'
import { Header,Footer,Content } from '../public/src/Components'

export default function Contact() {
  return (
    <>
      <Header />
      <Content>
      <div className='flex h-screen bg-blue-400 w-full m-10 rounded-2xl'>
        <span className='m-auto'>Contact Screen</span>
      </div>
      </Content>
      <Footer />
    </>
  )
}
