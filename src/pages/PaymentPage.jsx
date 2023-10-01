import React from 'react'
import CheckoutSteps from '../component/Checkout/CheckoutSteps'
import Footer from '../component/Layout/Footer'
import Header from '../component/Layout/Header'
import Payment from "../component/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage