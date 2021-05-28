import React,{useEffect} from "react";
import { Content, Footer, Header, Card } from "../public/src/Components";
import { convertToRupiah } from '../public/src/utils/function';
import useRequestAllProduct from '../public/src/helpers/useRequestAllProduct';
import { useRouter } from 'next/router';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem('userID')===null){
      router.push('/Login')
    }
  
  }, [])
  const allProduct = useRequestAllProduct()
  return (
    <div>
      <Header />
      <Content props="p-12">
        <div className='items-center justify-center m-10'>
          <img
            className="mx-auto"
            src='../src/assets/home-open.png'
            alt='bg-home'
          />
        </div>
      </Content>
      <Content props='bg-silver p-12'>
        <p className='uppercase text-center py-4 text-2xl'>Newest Products</p>
        <div className='sm:flex sm:flex-wrap sm:-mx-4 md:py-4'>
          {allProduct.data?.data.map((item, index) => (
            item.category==='clothes'?
            <Card
              routesId={item.id}
              routesData={item}
              cardProducts
              key={index}
              productImage={item.image_url}
              productName={item.name}
              productPrice={convertToRupiah(item.price)}
            />:null
          ))}
        </div>
        <p className='uppercase text-center py-4 text-2xl'>Shop All</p>
      </Content>
      <Content>
        <Card cardGallery />
      </Content>
      <Content props='bg-silver p-12'>
        <p className='uppercase text-center py-4 text-2xl'>Featured Product</p>
        <div className='sm:flex sm:flex-wrap sm:-mx-4 md:py-4'>
          {allProduct.data?.data.slice(0,4).map((item, index) => (
            <Card
              routesId={item.id}
              routesData={item}
              cardProducts
              key={index}
              productImage={item.image_url}
              productName={item.name}
              productPrice={convertToRupiah(item.price)}
            />
          ))}
        </div>
        <p className='uppercase text-center py-4 text-2xl'>Shop All</p>
      </Content>
      <Footer />
    </div>
  );
}
