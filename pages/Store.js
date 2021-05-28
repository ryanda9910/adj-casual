import React from "react";
import { Header, Content, Footer } from "../public/src/Components";

export default function Store() {
  return (
    <>
      <Header />
      <Content>
        <div className='flex h-screen bg-blue-400 w-full m-10 rounded-2xl'>
          <span className='m-auto'>Store Screen</span>
        </div>
      </Content>
      <Footer />
    </>
  );
}
