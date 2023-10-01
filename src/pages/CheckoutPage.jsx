import React from 'react'
import Header from '../component/Layout/Header'
import CheckoutSteps from "../component/Checkout/CheckoutSteps";
import Checkout from "../component/Checkout/Checkout";
import Footer from '../component/Layout/Footer';

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage