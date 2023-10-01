import React, { useEffect, useState } from 'react'
import Header from './../component/Layout/Header';
import Footer from '../component/Layout/Footer';
import ProductDetails from "../component/Products/ProductDetails"
import { useParams } from 'react-router-dom';
import SuggestedProduct from "../component/Products/SuggestedProduct"
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const {name} = useParams();
    const {allProducts} = useSelector((state) => state.products);
    const [data, setData] = useState(null);
    const productName = name.replaceAll(/-/g, " ");

    useEffect(() => {
        const data = allProducts && allProducts.find((i) => i.name === productName);
        setData(data);
      },[data, allProducts, productName]);

  return (
    <div>
        <Header />
        <ProductDetails data={data}  />
        { 
            data && <SuggestedProduct data={data} key={data}/>
        }
        <Footer />
    </div>
  )
}

export default ProductDetailsPage

