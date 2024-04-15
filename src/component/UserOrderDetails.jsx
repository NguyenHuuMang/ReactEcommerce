import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop, getAllOrdersOfUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { Country } from "country-state-city";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id || ""));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const formatCountry = (dataCountry) => {
    const options = Country.getAllCountries();
    console.log(options);
    if (options) {
      const selectedOption = options.find(
        (option) => option.isoCode === dataCountry
      );

      if (selectedOption) {
        // Return the label of the selected country option
        return selectedOption.name;
      } else {
        // If the value is not a valid country value, throw an error or return a default value
        console.log("Something went wrong");
        // Or return a default value like "Unknown country"
        // return "Unknown country";
      }
    }
  };

  return (
    <div className="bg-[white] w-[80%] h-[100vh] 1000px:w-[70%] block 500px:flex ml-72 mt-5 mb-5  rounded-[4px] p-3 overflow-y-scroll">
      <div className={`py-4 min-h-screen ${styles.section}`}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <HiOutlineShoppingBag size={30} color="crimson" />
            <h1 className="pl-2 text-[25px]">Order Details</h1>
          </div>
          <Link to="/profile">
            <div
              className={`${styles.button} !bg-[#fce1e6]  !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
            >
              Order List
            </div>
          </Link>
        </div>

        <div className="w-full flex items-center justify-between pt-6">
          <h5 className="text-[#00000084]">
            Order ID: <span>#{data?._id?.slice(0, 50)}</span>
          </h5>
          <h5 className="text-[#00000084]">
            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>

        {/* order items */}
        <br />
        <br />
        {data &&
          data?.cart.map((item, index) => (
            <div className="flex flex-direction" key={index}>
              <div className="w-full flex-direction items-start mb-5">
                <img
                  src={`${backend_url}/${item.images[0]}`}
                  alt=""
                  className="w-[80x] h-[80px]"
                />
              </div>
              <div className="flex flex-col">
                <div className="w-full flex text-center">
                  <h5 className="pl-3 text-[20px]" style={{ marginLeft: -870 }}>
                    {item.name}
                  </h5>
                  <br />
                  <h5 className="pl-3 text-[20px] text-[#00000091]">
                    {item.discountPrice}$ x {item.qty}
                  </h5>
                </div>
              </div>
              {/* {
                item.isReviewed ? 
                  null
                : ( */}
              <div
                className={`${styles.buttonseller} text-[red]`}
                onClick={(e) => setOpen(true) || setSelectedItem(item)}
              >
                Write A Review
              </div>
              {/* )
              } */}
            </div>
          ))}

        {/* review popup */}
        {open && (
          <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
            <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
              </div>
              <h2 className="text-[25px] font-[500] font-Poppins text-center">
                GIVE A REVIEW
              </h2>
              <br />
              <div className="w-full flex">
                <img
                  src={`${backend_url}/${selectedItem?.images[0]}`}
                  alt=""
                  className="w-[80px] h-[80px]"
                />
                <div>
                  <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                  <h4 className="pl-3 text-[20px]">
                    {selectedItem?.discountPrice}$ x {selectedItem?.qty}
                  </h4>
                </div>
              </div>
              <br />
              <br />

              {/* ratings */}
              <h5 className="pl-3 text-[20px] font-[500]">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex w-full ml-2 pt-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </div>
              <br />
              <div className="w-full ml-3">
                <label className="block text-[20px] font-[500]">
                  Write a Comment
                  <span className="ml-2 font-[400] text-[16px] text-[#00000052]">
                    (optional)
                  </span>
                </label>
                <textarea
                  name=""
                  id=""
                  cols="20"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Did you receive the item? Give us your rating..."
                  className="mt-2 w-[95%] border p-2 outline-none"
                ></textarea>
              </div>
              <div
                className={`${styles.buttonseller} text-[red] text-[20px] ml-3`}
                onClick={rating > 1 ? reviewHandler : null}
              >
                Submit
              </div>
            </div>
          </div>
        )}

        <div className="border-t w-full text-right">
          <h5 className="pt-3 text-[18px]">
            Total Price: <strong>{data?.totalPrice}$</strong>
          </h5>
        </div>
        <br />
        <br />
        <div className="w-full 800px:flex items-center flex flex-items">
          <div className="w-full 800px:w-[60%]">
            <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
            <h4 className="pt-3 text-[20px]">
              {data?.shippingAddress.address2 +
                ", " +
                data?.shippingAddress.address1}
            </h4>
            <h4 className="text-[20px]">
              {formatCountry(data?.shippingAddress.country)}
            </h4>
            <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
          </div>
          <div className="w-full 800px:w-[60%]">
            <h4
              className="pt-3 text-[20px] font-[600] flex flex-items"
              style={{ marginTop: -70, marginLeft: 300 }}
            >
              Payment Info:
            </h4>
            <h4
              className="pt-3 text-[20px] flex flex-items"
              style={{ marginLeft: 300 }}
            >
              Status:{" "}
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h4>
          </div>
        </div>
        <br />
        <Link to="/">
          <div className={`${styles.buttonseller} text-[red]`}>
            Send Message
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserOrderDetails;
