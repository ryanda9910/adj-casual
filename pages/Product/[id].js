import React, { useState } from "react";
import {
  Card,
  Content,
  Footer,
  Header,
  Modals,
} from "../../public/src/Components";
import { useRouter } from "next/router";
import { convertToRupiah } from "../../public/src/utils/function";
import useSWR from "swr";
import useRequestAllProduct from "../../public/src/helpers/useRequestAllProduct";
const fetcher = (url) => fetch(url).then((result) => result.json());
export default function DetailProduct() {
  const [quantity, setQuantity] = useState(0);
  const [productquantityPrice, setproductQuantityPrice] = useState(0);
  const [productSubTotal, setProductSubTotal] = useState(0);
  const [modal, setmodalOpen] = useState(false);
  const [saveProduct, setSavedProduct] = useState([]);
  const router = useRouter();
  const productDetail = useSWR(`/api/product/${router.query.id}`, fetcher);

  const allProduct = useRequestAllProduct();

  const onDirectCheckout = () => {
    setmodalOpen(false);
    const data = {
      quantity: quantity,
      productPrice: productDetail.data?.data?.price,
      productImage: productDetail.data?.data?.image_url,
      productName: productDetail.data?.data?.name,
      productquantityPrice: productquantityPrice,
      productSubTotal: productSubTotal,
    };
    router.push({
      pathname: "/Checkout/[id]",
      query: { id: router.query.id, data: JSON.stringify(data) }
    });
  };

  const openModal = () => {
    saveData();
    const dataProduct = JSON.parse(localStorage.getItem("dataProduct"));
    setSavedProduct(dataProduct);
    setmodalOpen(true);
  };
  const Increment = () => {
    setQuantity(quantity + 1);
    setproductQuantityPrice((quantity + 1) * productDetail.data?.data?.price);
    setProductSubTotal((quantity + 1) * productDetail.data?.data?.price);
  };

  const saveData = () => {
    const data = {
      productName: productDetail.data?.data?.name,
      productPrice: productquantityPrice,
      productImage: productDetail.data?.data?.image_url,
    };
    let arrProduct = JSON.parse(localStorage.getItem("dataProduct")) || [];
    arrProduct.push(data);

    localStorage.setItem("dataProduct", JSON.stringify(arrProduct));
  };

  const onCloseModal = () => {
    setmodalOpen(false);
  };
  const Decrement = () => {
    if (quantity === 0) {
      setQuantity(0);
      setproductQuantityPrice(productDetail.data?.data?.price);
      setproductQuantityPrice(productDetail.data?.data?.price);
    } else {
      setQuantity(quantity - 1);
      setproductQuantityPrice((quantity - 1) * productDetail.data?.data?.price);
      setProductSubTotal((quantity - 1) * productDetail.data?.data?.price);
    }
  };

  return (
    <div>
      <Header />
      <Content>
        {productDetail.data ? (
          <Card
            productMaterial={""}
            onDecrement={Decrement}
            onIncrement={Increment}
            cardDetailProducts
            productQuantity={quantity}
            productDesc={productDetail.data?.data?.desc}
            productPrice={convertToRupiah(productDetail.data?.data?.price)}
            productName={productDetail.data?.data?.name}
            onClickModal={openModal}
            productImage={productDetail.data?.data?.image_url}
          />
        ) : null}
        <p className='uppercase text-center py-4 text-2xl'>
          Recomended Products
        </p>
        <div className='sm:flex sm:flex-wrap  md:py-4'>
          {allProduct.data?.data.map((item, index) => (
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
        {modal ? (
          <Modals
            onDecrement={Decrement}
            onIncrement={Increment}
            productImage={productDetail.data?.data?.image_url}
            productName={productDetail.data?.data?.name}
            productquantityPrice={convertToRupiah(productquantityPrice)}
            productQuantity={quantity}
            productPrice={convertToRupiah(productDetail.data?.data?.price)}
            productDiscount={30}
            disabled={quantity === 0 || productSubTotal === 0 ? true : false}
            productTotal={convertToRupiah(productSubTotal)}
            closeModal={onCloseModal}
            directCheckout={onDirectCheckout}
          />
        ) : null}
      </Content>
      <Footer />
    </div>
  );
}
