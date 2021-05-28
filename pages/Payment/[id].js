import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Content, Footer, Header } from "../../public/src/Components";
import paymentMethod from "../../public/src/mockdata/paymentMethod.mocking.json";
import { convertToRupiah } from "../../public/src/utils/function";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../public/firebase";

export default function Payment() {
  const [payment, setPayment] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const router = useRouter();
  const PaymentData =  JSON.parse(localStorage.getItem('paymentData'))
  const [paramData] = useState(PaymentData);
  const onPaymentMethod = (event) => {
    setPayment(event.target.value);
  };
  const submitPayment = () => {
    let orderID = uuidv4();

    let getDoc = db.collection("order").doc();
    getDoc
      .set(
        {
          orderId: orderID,
          name: paramData.name,
          email: paramData.email,
          phonenumber: paramData.phonenumber,
          items: paramData.productName,
          address: paramData.address,
          days: paramData.shippingData.dataCost.rajaongkir.results[0].costs[0]
            .cost[0].etd,
          courier: paramData.shippingData.dataCost.rajaongkir.results[0].code,
          payment,
          total:grandTotal,
          shippingcost:paramData.shippingData.dataCost.rajaongkir.results[0].costs[0]
          .cost[0].value,
          productprice:paramData.productSubTotal,
        },
        { merge: true }
      )
      .then(() => {
        router.push({
          pathname: "/Confirmation/[id]",
          query: { id: getDoc.id },
        });
      })
      .catch((error) => {
        alert("Gagal Submit Pembayaran");
      });
  };

  const grandTotalPrice = () => {
    setGrandTotal(
      paramData.shippingData.dataCost.rajaongkir.results[0].costs[0].cost[0]
        .value + paramData.productSubTotal
    );
  };

  console.log(
    "PARAM SHIPING",
    paramData.shippingData.dataCost.rajaongkir.results[0]
  );
  useEffect(() => {
    grandTotalPrice();
  }, [paramData.productSubTotal]);
  return (
    <div>
      <Header />
      <Content props='bg-silverWhite'>
        <div className='sm:flex sm:justify-center lg:justify-evenly sm:-mx-4 sm:flex-wrap md:py-4'>
          <div className='m-10 bg-white border-2 lg:w-1/3'>
            <h1 className='text-3xl m-5'>Detail Order</h1>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Subtotal</h2>
              <h2 className='text-lg mr-10'>
                {convertToRupiah(paramData.productSubTotal)}
              </h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Shipping cost</h2>
              <h2 className='text-lg mr-10'>{convertToRupiah(paramData.shippingData.dataCost.rajaongkir.results[0].costs[0]
          .cost[0].value)}</h2>
            </div>
            <hr className='mx-8 border-borderColor' />
            <div className='flex flex-row my-2 justify-between mb-10'>
              <h2 className='text-lg ml-10'>Grand Total</h2>
              <h2 className='text-2xl mr-10'>{convertToRupiah(grandTotal)}</h2>
            </div>
          </div>
          <div className='m-10 bg-white border-2 lg:w-1/3'>
            <h1 className='text-3xl m-5'>Order Detail</h1>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Items</h2>
              <div className='relative'>
                <h2 className='text-lg mr-10'>{paramData.productName}</h2>
              </div>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Name</h2>
              <h2 className='text-lg mr-10'>{paramData.name}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Phone</h2>
              <h2 className='text-lg mr-10'>{paramData.phonenumber}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Email</h2>
              <h2 className='text-lg mr-10'>{paramData.email}</h2>
            </div>
            <div className='flex flex-row my-2 justify-between'>
              <h2 className='text-lg ml-10'>Shipping Address</h2>
              <h2 className='text-lg mr-10'>{paramData.address}</h2>
            </div>
          </div>
          <div className='m-10 bg-white border-2 lg:w-full'>
            <h1 className='text-3xl m-5'>Payment Method</h1>
            <div className='grid gap-x-8 gap-y-4 grid-cols-3'>
              {paymentMethod.map((item, index) => (
                <div className='mx-auto' key={index}>
                  <label className='inline-flex items-center'>
                    <input
                      onChange={onPaymentMethod}
                      type='radio'
                      className='form-radio lg:h-6 w-6'
                      name='paymentType'
                      value={item.id}
                    />
                    <span className='ml-2 lg:text-2xl'>{item.name}</span>
                  </label>
                  <div className='mr-4'>
                    <img src={item.image} className='w-24 m-2' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-center lg:justify-end md:justify-center xl:mr-40 lg:mr-32'>
          <button
            onClick={submitPayment}
            className='bg-primaryBlue border border-primaryBlue text-white py-2 px-4 ml-5'
          >
            Proceed Payment
          </button>
        </div>
      </Content>
      <Footer />
    </div>
  );
}
