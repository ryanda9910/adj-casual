import React from "react";
import { Content, Footer, Header } from "../public/src/Components";

export default function About() {
  return (
    <>
      <Header />
      <Content>
       <div className='flex h-screen bg-blue-400 w-full m-10 rounded-2xl'>
        <span className='m-auto'>About Screen</span>
      </div>
      </Content>
      <Footer />
    </>
  );
}
