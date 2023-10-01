import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoute from "./Routes.js";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllProductsShop } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import Store from "./redux/store";
import axios from "axios";
import { server } from "./server";


const App = () => {
  const navigate = useNavigate(); 
  const { isSeller, seller } = useSelector((state) => state.seller);
  // eslint-disable-next-line
  const [stripeApikey, setStripeApiKey] = useState("");

  
  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller()); 
    Store.dispatch(getAllProductsShop());
    Store.dispatch(getAllEvents());
    getStripeApikey();

    if(isSeller) {
      navigate(`/shop/${seller._id}`);
    }
    // eslint-disable-next-line
  }, []);

  return <AppRoute/>;
};

export default App;
