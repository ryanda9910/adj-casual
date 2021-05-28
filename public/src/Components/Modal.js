import React from "react";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Modals({
  closeModal,
  directCheckout,
  productName,
  productsinglePrice,
  productquantityPrice,
  productTotal,
  productQuantity,
  productImage,
  onDecrement,
  onIncrement,
  disabled,
}) {
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-overlay'>
        <div className='w-3/4'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>Order Detail</h3>
              <button onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} color='#000' />
              </button>
            </div>
            {/*body*/}
            <div className='flex flex-row justify-between border-b border-solid border-blueGray-200 r'>
              <div className='flex'>
                <img
                  src={productImage}
                  className='w-50 h-40 mx-4'
                />
                <div className='my-4'>
                  <h1 className='my-4 text-blueGray-500leading-relaxed text-xl'>
                    {productName}
                  </h1>
                  <h1 className='my-4 text-blueGray-500 leading-relaxed text-xl'>
                    {productsinglePrice}
                  </h1>
                </div>
              </div>
              <div className='my-4 mx-4'>
                <div className='flex flex-row'>
                  <div className='relative'>
                    <button onClick={onDecrement}  className='bg-primaryBlue w-8 h-8 mx-2 mt-8'>
                      <h1 className='text-xl text-white'>-</h1>
                    </button>
                    <a className='text-xl px-auto'>{productQuantity}</a>
                    <button onClick={onIncrement} className='bg-primaryBlue w-8 h-8 mx-2 mt-8'>
                      <h1 className='text-white'>+</h1>
                    </button>
                  </div>
                  <div className='mt-9 mx-10'>
                    <h1 className='text-lg'>{productquantityPrice}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex flex-row justify-between'>
              <div className='flex flex-row'>
                <h1 className='mx-4'>Subtotal</h1>
                <h1 className='mx-4'>{productTotal}</h1>
              </div>
            </div>
            {/*footer*/}
            <div className='m-5'>
              <button
                disabled={disabled}
                className='bg-primaryBlue text-white w-full h-12 px-6 ra'
                type='button'
                onClick={directCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
}
