import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

    const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg =  totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);


  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        data.avatar &&
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              
              <img
                src={`${backend_url}${data.avatar}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
              {console.log(`${backend_url}${data.avatar}`)}
            </div>
            <h3 className="text-center py-2 font-bold text-[#000000a6] text-[25px] underline">
              {data.name}
            </h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{seller.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]"> {products && products.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{averageRating}/5 ⭐</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {seller?.createdAt?.slice(0, 10)}
            </h4>
          </div>

          <div className="py-3 px-4">
            <div
              className={`${styles.buttonseller} !w-full !h-[42px] !rounded-[5px]`}
            >
              <Link to="/">
                <span className="text-[red]">Back To Home Page </span>
              </Link>
            </div>
          </div>

          {isOwner && (
            <div className="py-3 px-4" style={{ marginTop: -35 }}>
             <Link to ="/settings">
                <div
                  className={`${styles.buttonseller} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-[red]">Edit Shop</span>
                </div>
             </Link>
              <div
                className={`${styles.buttonseller} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-[red]">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
