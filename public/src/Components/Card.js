import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({
  productImage,
  productName,
  productPrice,
  productDesc,
  productMaterial,
  cardProducts,
  cardGallery,
  cardDetailProducts,
  productQuantity,
  routesId,
  routesData,
  onDecrement,
  onIncrement,
  onClickModal,
}) {
  const router = useRouter();
  return cardProducts ? (
    <div className='px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mx-auto'>
      <button
        onClick={() => {
          router.push({
            pathname: "/Product/[id]",
            query: { id: routesId, data: JSON.stringify(routesData) },
          });
        }}
      >
        <ul className='bg-darkSilver'>
          <li className='mb-2'>
            <img
              src={productImage}
              className='px-2 py-4 object-contain md:object-scale-down'
            />
          </li>
          <li className='mb-2'>
            <p className='text-black text-center uppercase'>{productName}</p>
            <p className='text-black text-center'>{productPrice}</p>
          </li>
        </ul>
      </button>
    </div>
  ) : cardGallery ? (
    <>
      <div className='sm:flex justify-center sm:flex-wrap sm:-mx-4 md:py-4'>
        <div className='relative'>
          <Link href='/'>
            <a
              className='absolute uppercase sm:text-xl md:text-2xl lg:text-3xl text-white'
              style={{ top: "50%", left: "35%" }}
            >
              our story
            </a>
          </Link>
          <img
            width='600'
            src='../src/assets/gallerysampleone.png'
            className='py-2 px-2'
          />
        </div>
        <div className='relative'>
          <Link href='/'>
            <a
              className='absolute uppercase sm:text-xl md:text-2xl lg:text-3xl text-white'
              style={{ top: "50%", left: "38%" }}
            >
              our blog
            </a>
          </Link>
          <img
            width='600'
            src='../src/assets/gallerysampletwo.png'
            className='py-2 px-2'
          />
        </div>
      </div>
      <div className='sm:flex justify-center sm:flex-wrap sm:-mx-4 md:py-4'>
        <div className='relative'>
          <Link href='/'>
            <a
              className='absolute uppercase sm:text-xl md:text-2xl lg:text-2xl text-white'
              style={{ top: "45%", left: "40%", right: "40%" }}
            >
              shoes
            </a>
          </Link>
          <img
            width='400'
            src='../src/assets/minigallerysampleone.png'
            className='py-2 px-2'
          />
        </div>
        <div className='relative'>
          <Link href='/'>
            <a
              className='absolute top-2/5 uppercase sm:text-xl md:text-2xl lg:text-2xl text-white'
              style={{ top: "45%", left: "30%", right: "30%" }}
            >
              accesories
            </a>
          </Link>
          <img
            width='395'
            src='../src/assets/minigallerysampletwo.png'
            className='py-2 px-2'
          />
        </div>
        <div className='relative'>
          <Link href='/'>
            <a
              className='absolute uppercase sm:text-xl md:text-2xl lg:text-2xl text-white'
              style={{ top: "45%", left: "40%", right: "40%" }}
            >
              bag
            </a>
          </Link>
          <img
            width='400'
            src='../src/assets/minigallerysamplethree.png'
            className='py-2 px-2'
          />
        </div>
      </div>
    </>
  ) : cardDetailProducts ? (
    <div className='container flex flex-row justify-center mx-auto'>
      <div className='sm:flex justify-center sm:flex-wrap sm:-mx-4 md:py-4'>
        <div className='flex flex-row justify-center'>
          <img
            src={productImage}
            alt='product-image'
            className='object-center md:object-top w-10/12 h-10/12'
          />
        </div>
        <div className='my-auto relative justify-center'>
          <h1 className='text-4xl py-8 uppercase'>{productName}</h1>
          <h1 className='text-2xl font-bold'>{productPrice}</h1>
          <button className='bg-silver w-8 h-8 mx-2 mt-8' onClick={onDecrement}>
            <a className='text-xl'>-</a>
          </button>
          <a className='text-xl px-auto'>{productQuantity}</a>
          <button
            className='bg-primaryBlue w-8 h-8 mx-2 mt-8'
            onClick={onIncrement}
          >
            <a className='text-white'>+</a>
          </button>
          <div className='inline-flex'>
            <button
              className='bg-primaryBlue py-2 px-10 mx-2 mt-8'
              onClick={onClickModal}
            >
              <a className='text-white'>Add To Chart</a>
            </button>
          </div>
        </div>
        <div className='container mx-auto'>
          <p className='text-justify'>{productDesc}</p>
        </div>
        <div className='container mx-auto'>
          <h1 className='py-10 uppercase font-bold'>Material Products</h1>
          <p className='text-justify'>{productMaterial}</p>
        </div>
      </div>
    </div>
  ) : null;
}
