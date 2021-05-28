import React,{useState} from "react";
import Link from "next/link";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  const [navbarOpen,setNavbarOpen]=useState(false);
  return (
    <div className='header-2'>
      <nav className='bg-white py-2 md:py-4'>
        <div className='container px-4 mx-auto md:flex md:items-center'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <a className='font-semibold text-xl text-black'>ADJ CASUAL</a>
            </Link>
            <button
              onClick={()=>setNavbarOpen(!navbarOpen)}
              className='border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden'>
             <FontAwesomeIcon icon={faBars} color="#000"/>
            </button>
          </div>
          <div
            className={`${navbarOpen?'hidden':'flex'} md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0`}>
            <Link href='/'>
              <a className='p-2 lg:px-4 md:mx-2 text-black font-serif hover:text-primaryBlue'>Home</a>
            </Link>
            <Link href='/'>
              <a className='p-2 lg:px-4 md:mx-2 text-black font-serif hover:text-primaryBlue'>Store</a>
            </Link>
            <Link href='/'>
              <a className='p-2 lg:px-4 md:mx-2 text-black font-serif hover:text-primaryBlue'>About</a>
            </Link>
            <Link href='/'>
              <a className='p-2 lg:px-4 md:mx-2 text-black font-serif hover:text-primaryBlue'>
                Contact
              </a>
            </Link>
            <Link href='/'>
              <a className='p-2 lg:px-4 md:mx-2 text-black font-serif'>
                <img
                  src='../src/assets/search.png'
                  alt='cart'
                  width='20'
                  height='20'
                />
              </a>
            </Link>
            <Link href='/'>
              <a className='p-2 lg:px-4 md:mx-2 text-black font-serif'>
                <img
                  src='../src/assets/cart.png'
                  alt='search'
                  width='20'
                  height='20'
                />
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
