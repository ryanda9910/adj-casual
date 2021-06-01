import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { faClock, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Content, Footer, Header } from "../../public/src/Components";
import { convertToRupiah } from "../../public/src/utils/function";
const fetcher = (url) => fetch(url).then((result) => result.json());
export default function ConfirmationId() {
  const router = useRouter();
  const backHome = () => {
    router.push({
      pathname: "/",
    });
  };
  const { data, error } = useSWR(
    `/api/confirmation/${router.query.id}`,
    fetcher
  );
  return (
    <>
      <Header />
      <Content>
        <div className='sm:flex sm:justify-center lg:justify-evenly sm:-mx-4 sm:flex-wrap md:py-4'>
          <div className='m-10 bg-white border-2 lg:w-1/3'>
            <div className='grid grid-cols-1 gap-2 place-items-center my-24'>
              <img
                src='../src/assets/confirmorder.png'
                className='w-10/12'
                alt='order-confirm'
              />
              <h1 className='lg:text-2xl text-center'>Order Confirmed</h1>
              <p className='text-sm text-center'>
                Your order have been confirmed, please wait and track your order
              </p>
              <button
                onClick={backHome}
                className='bg-primaryBlue border border-primaryBlue text-white py-2 px-4 ml-5'
              >
                Go To HomePage
              </button>
            </div>
          </div>
          <div className='m-10 bg-white border-2 lg:w-1/3'>
            <div className='flex flex-row m-10'>
              <div className='flex flex-row mr-10'>
                <FontAwesomeIcon icon={faClock} color='silver' />
                <h1 className='mx-4'>{data?.data?.days}</h1>
              </div>
              <div className='flex flex-row mr-10'>
                <FontAwesomeIcon icon={faTruck} color='silver' />
                <h1 className='mx-4 uppercase'>{data?.data?.courier}</h1>
              </div>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>OrderID</h2>
              <h2 className='text-lg mr-10'>{data?.data?.orderId}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Items</h2>
              <div className='relative'>
                <h2 className='text-lg mr-10'>{data?.data?.items}</h2>
              </div>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Name</h2>
              <h2 className='text-lg mr-10'>{data?.data?.name}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Phone</h2>
              <h2 className='text-lg mr-10'>{data?.data?.phonenumber}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Email</h2>
              <h2 className='text-lg mr-10'>{data?.data?.email}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Shippig Address</h2>
              <h2 className='text-lg mr-10'>{data?.data?.address}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Shipping Cost</h2>
              <h2 className='text-lg mr-10'>
                {convertToRupiah(
                  data?.data?.shippingcost === null || data?.data?.shippingcost === undefined
                    ? 0
                    : data?.data?.shippingcost
                )}
              </h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Payment</h2>
              <h2 className='text-lg mr-10'>
                {data?.data?.payment === "GPY"
                  ? "Gopay"
                  : data?.data?.payment === "CRD"
                  ? "Credit Card"
                  : data?.data?.payment === "TRF"
                  ? "Bank Transfer"
                  : null}
              </h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>total</h2>
              <h2 className='text-lg mr-10'>
                {convertToRupiah(
                  data?.data?.total === null || data?.data?.total === undefined
                    ? 0
                    : data?.data?.total
                )}
              </h2>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </>
  );
}
