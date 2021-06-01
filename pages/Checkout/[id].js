import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Content, Footer, Header } from "../../public/src/Components";
import useSWR from "swr";
import { convertToRupiah } from "../../public/src/utils/function";
const fetcher = (url) => fetch(url).then((result) => result.json());
export default function Checkout() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    phonenumber: "",
  });
  const [dataCity, setDataCity] = useState([]);
  const [city, setCity] = useState("");
  const [weight] = useState(1);
  const [dataDetailOrder, setDataDetailOrder] = useState("");
  const [courier, setCourier] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [dummyCourrier] = useState([
    {
      id_courirer: "jne",
      name_courirer: "JNE",
    },
    {
      id_courirer: "tiki",
      name_courirer: "TIKI",
    },
    {
      id_courirer: "pos",
      name_courirer: "POS",
    },
  ]);

  const router = useRouter();
  const { data, error } = useSWR("/api/province", fetcher);

  const onChangeName = () => {
    setForm({ ...form, name: event.target.value });
  };
  const onChangeEmail = () => {
    setForm({ ...form, email: event.target.value });
  };
  const onChangeAddress = () => {
    setForm({ ...form, address: event.target.value });
  };
  const onChangePhoneNumber = () => {
    setForm({ ...form, phonenumber: event.target.value });
  };

  const selectedProvince = async (event) => {
    setLoading(true);
    const res = await fetch(`/api/city/${event.target.value}`);
    const resultsCity = await res.json();
    setDataCity(resultsCity.dataCity.rajaongkir?.results);
    setLoading(false);
  };

  const selectedCity = (event) => {
    setCity(event.target.value);
  };

  const onchangeCourrier = (event) => {
    setCourier(event.target.value);
  };

  const postCost = async () => {
    let body = {
      origin: "457",
      destination: city,
      weight: weight,
      courier: courier,
    };
    const newBody = Object.keys(body)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(body[key]);
      })
      .join("&");
    const res = await fetch(`/api/cost`, {
      headers: {
        key: process.env.NEXT_PUBLIC_ENV_LOCAL_KEY_EXPEDITION,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: newBody,
    });
    const dataCost = await res.json();
    const paymentData = {
      shippingData: dataCost,
      email: form.email,
      name: form.name,
      address: form.address,
      phonenumber: form.phonenumber,
      productImage: dataDetailOrder?.productImage,
      productSubTotal: dataDetailOrder?.productSubTotal,
      productQuantity: dataDetailOrder?.productQuantity,
      productName: dataDetailOrder?.productName,
    };
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    router.push({
      pathname: "/Payment/[id]",
      query: { id: router.query.id },
    });
  };

  const getDataFromStorage = () => {
    setDataDetailOrder(JSON.parse(localStorage.getItem("dataDetailOrder")));
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  return (
    <>
      <Header />
      {dataDetailOrder === null || dataDetailOrder === "" ? (
        <h1 className="text-center"> Belanjaan Kosong </h1>
      ) : (
        <Content props='bg-silverWhite'>
          <div className='sm:flex sm:justify-center lg:justify-evenly sm:-mx-4 sm:flex-wrap md:py-4'>
            <div className='m-10 bg-white border-2 lg:w-1/3'>
              <h1 className='text-3xl m-5'>Detail Order</h1>
              <div className='flex flex-row my-2 justify-between'>
                <h2 className='text-lg ml-10'>Jumlah</h2>
                <h2 className='text-lg mr-10'>
                  {dataDetailOrder?.quantity === null ||
                  dataDetailOrder?.quantity === ""
                    ? 0
                    : dataDetailOrder?.quantity}
                </h2>
              </div>
              <div className='flex flex-row my-2 justify-between'>
                <h2 className='text-lg ml-10'>Subtotal</h2>
                <h2 className='text-lg mr-10'>
                  {convertToRupiah(
                    dataDetailOrder?.productSubTotal === null ||
                      dataDetailOrder?.productSubTotal === ""
                      ? 0
                      : dataDetailOrder?.productSubTotal
                  )}
                </h2>
              </div>
            </div>
            <div className='m-10 bg-white border-2 lg:w-1/3'>
              <h1 className='text-3xl m-5'>Billing Address</h1>
              <div className='mb-3 pt-0 mx-5'>
                <h1 className='text-base mb-2'>Fullname</h1>
                <input
                  onChange={onChangeName}
                  type='text'
                  placeholder='Ex: Sulta Zico'
                  className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full'
                />
              </div>
              <div className='mb-3 pt-0 mx-5'>
                <h1 className='text-base mb-2'>Email</h1>
                <input
                  onChange={onChangeEmail}
                  type='text'
                  placeholder='Ex: sultanzico@gmail.com'
                  className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full'
                />
              </div>
              <div className='mb-3 pt-0 mx-5'>
                <h1 className='text-base mb-2'>Phone Number</h1>
                <input
                  onChange={onChangePhoneNumber}
                  type='text'
                  placeholder='Ex: 089111888999'
                  className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full'
                />
              </div>
              <div className='mb-3 pt-0 mx-5'>
                <h1 className='text-base mb-2'>Shipping Address</h1>
                <input
                  onChange={onChangeAddress}
                  type='text'
                  placeholder='Ex: ADJ Street Number 200, Tangerang Selatan, Bintaro '
                  className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full'
                />
              </div>
              <div className='mb-3 pt-0 mx-5'>
                <h1 className='text-base mb-2'>State/Province</h1>
                <select
                  className='border w-full h-10 text-center'
                  onChange={selectedProvince}
                >
                  {data?.dataProvince?.rajaongkir.results.map((item, index) => (
                    <option key={index} value={item.province_id}>
                      {item.province}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3 pt-0 mx-5 flex flex-row justify-between'>
                <h1 className='text-base mb-2 ml-2'>City</h1>
              </div>
              <div className='mb-3 pt-0 mx-5 flex flex-row'>
                <select
                  className='border w-1/2 mr-2 h-10 text-center'
                  onChange={selectedCity}
                >
                  {dataCity?.map((item, index) => (
                    <option key={index} value={item.city_id}>
                      {item.city_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3 pt-0 mx-5'>
                <h1 className='text-base mb-2'>Choose Courier</h1>
                <select
                  className='border w-1/2 h-10 text-center'
                  placeholder='Silahkan Pilih Kurir'
                  onChange={(event) => onchangeCourrier(event)}
                >
                  {dummyCourrier.map((item, index) => (
                    <option value={item.id_courirer} key={index}>
                      {item.name_courirer}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-center lg:justify-end md:justify-center xl:mr-40 lg:mr-32'>
            <button
              onClick={() => router.push("/")}
              className='bg-white border border-primaryBlue  text-primaryBlue py-2 px-4 mr-5'
            >
              Continue Shipping
            </button>
            <button
              disabled={
                city === "" || weight === "" || weight === 0 || courier === ""
                  ? true
                  : false
              }
              onClick={postCost}
              className='bg-primaryBlue border border-primaryBlue text-white py-2 px-4 ml-5'
            >
              Place My Order
            </button>
          </div>
        </Content>
      )}
      <Footer />
    </>
  );
}
