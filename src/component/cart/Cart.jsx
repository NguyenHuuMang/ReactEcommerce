import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiOutlineShoppingBag, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const [showResult, setShowResult] = useState(false)

  const ref = useRef()
  useOnClickOutside(ref, () => setShowResult(false))

  function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}

  return (
    <div className="fixed top-0 lef-0 w-full bg-[#0000004b] h-screen z-10 overflow-y-scroll" ref={ref}>
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
        {
          cart && cart.length === 0  && showResult ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                 <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenCart(false)}
                 />
              </div>
              <h5>Cart Items is Empty!</h5>
            </div>
          ) : (
            <>
             <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* Items length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <HiOutlineShoppingBag size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">{cart && cart.length} items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {cart &&
              cart.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
          </div>
        </div>

        <div className="px-5 mb-3">
          {/* checkout buttons */}
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now (${totalPrice})
              </h1>
            </div>
          </Link>
        </div>
            </>
          )
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };


  return (
    <div className="border-b p-4">
       <RxCross1 className="cursor-pointer" size={20} onClick={() => removeFromCartHandler(data)} style={{marginLeft: 390}}/>
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
           src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[80px] h-min ml-2 mr-2 rounded-[5px]"
        />
         <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className=" font-bold text-[15px] text-[#00000082]">
            $ {data.discountPrice} * {value} 
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            $ {totalPrice}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
