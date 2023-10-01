import React from 'react'
import Header from "../component/Layout/Header"
import Hero from "../component/Route/Hero/Hero"
import Categories from "../component/Route/Categories/Categories";
import BestDeals from "../component/Route/BestDeals/BestDeals";
import FeatureProduct from "../component/Route/FeatureProduct/FeatureProduct";
// import Events from "../component/Events/Events";
import Sponsored from "../component/Route/Sponsored";
import Footer from "../component/Layout/Footer"

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
        <br />
        <br />
      {/* <Events /> */}
        <FeatureProduct />
        <Sponsored />
        <Footer />
    </div>
  )
}

export default HomePage