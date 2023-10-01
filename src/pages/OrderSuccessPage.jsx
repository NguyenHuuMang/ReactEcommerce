import React from "react";
import Footer from "../component/Layout/Footer";
import Header from "../component/Layout/Header";
import success from "../Assests/animations/success.gif";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: success,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  return (
    <div>
        <img src={success} className="flex mx-auto mt-20" alt="" />
      <h5 className="text-center mb-14 text-[25px] text-[green]">
        Your order is successfully!!!
        <br />
      </h5>
      <a href="/profile" className="text-end ml-24 text-[red]">  Check Your Order </a>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
