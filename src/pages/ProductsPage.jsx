import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../component/Route/ProductCard/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  // // /////

  // const [page, setPage] = useState(1);
  // const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [categoryData, allProducts]);
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-ful pb-[100px] text[20px] ">
            No Products Found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
