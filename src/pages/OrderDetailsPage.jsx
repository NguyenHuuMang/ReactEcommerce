import React from 'react'
import Header from './../component/Layout/Header';
import UserOrderDetails from './../component/UserOrderDetails';
import Footer from './../component/Layout/Footer';

const OrderDetailsPage = () => {
  return (
    <div>
        <Header/>
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage