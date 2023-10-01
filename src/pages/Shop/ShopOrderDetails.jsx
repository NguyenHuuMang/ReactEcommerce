import React from "react";
import DashBoardHeader from "../../component/Shop/Layout/DashBoardHeader";
import OrderDetails from "../../component/Shop/Layout/OrderDetails";
import Footer from "../../component/Layout/Footer";

const ShopOrderDetails = () => {
  return (
    <div>      
        <DashBoardHeader />
        <OrderDetails />
        <Footer />
     </div>
  );
};

export default ShopOrderDetails;
