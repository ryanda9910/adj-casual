import Link from "next/link";
import React from "react";
export default function Footer() {
  return (
    <footer className='footer-1 py-8 sm:py-12'>
      <div className='sm:flex sm:flex-wrap sm:-mx-4 md:py-4 bg-primaryBlue'>
        <div className='px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mx-auto'>
          <ul className='list-none footer-links'>
            <li className='mb-2'>
              <img
                src='../src/assets/Truck.png'
                width='100'
                height='180'
                className='mx-auto my-10 py-4 object-contain md:object-scale-down'
              />
            </li>
            <li className='mb-2'>
              <h5 className='text-white text-center my-10'>
                Free Shipping and Returns
              </h5>
            </li>
          </ul>
        </div>
        <div className='px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mx-auto'>
          <ul className='list-none footer-links'>
            <li className='mb-2'>
              <img
                src='../src/assets/Shield.png'
                width='80'
                height='180'
                className='mx-auto my-10 py-4 object-contain md:object-scale-down'
              />
            </li>
            <li className='mb-2'>
              <h5 className='text-white text-center my-10'>
                Secure Payment
              </h5>
            </li>
          </ul>
        </div>
        <div className='px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mx-auto'>
          <ul className='list-none footer-links'>
            <li className='mb-2'>
              <img
                src='../src/assets/Service.png'
                width='80'
                height='180'
                className='mx-auto my-10 py-4 object-contain md:object-scale-down'
              />
            </li>
            <li className='mb-2'>
              <h5 className='text-white text-center my-10'>Customer Service</h5>
            </li>
          </ul>
        </div>
      </div>
      <div className='sm:flex sm:flex-wrap sm:mx-2 mt-6 pt-6 sm:mt-12 sm:pt-12 xl:flex flex-row justify-around'>
        <ul>
          <li>
            <Link href='/'>
              <a className='hover:text-primaryBlue'>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <a className='hover:text-primaryBlue'>Store</a>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <a className='hover:text-primaryBlue'>About</a>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <a className='hover:text-primaryBlue'>Contact</a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>Jl.Adj No 123 Bintaro. indonesia</li>
          <li>Email: adj.shop@email.co.id</li>
          <li>Call : 0812345678910</li>
        </ul>
        <ul>
          <li>Shipping & Returns FAQ</li>
          <li>@Adj.Casual</li>
        </ul>
      </div>
    </footer>
  );
}
