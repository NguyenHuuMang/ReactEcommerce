import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { categoriesData } from "../../static/data";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import logo from "./logo.png";

import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";

import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { backend_url } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { getAllProducts } from "../../redux/actions/product";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { allProducts } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const ref = useRef();
  useOnClickOutside(ref, () => setShowResult(false))

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
    setShowResult(true)
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Hook
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
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link style={{ paddingRight: "520px" }} to="/">
              <img
                src={logo}
                style={{
                  maxWidth: "12%",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
                alt=""
                // src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                // alt=""
              />
            </Link>
          </div>
          {/* {search box} */}
          <div className="w-[50%] relative" ref={ref}>
            <input
              style={{ marginLeft: "-220px" }}
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#ff3d3d] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute top-1.5 right-56 cursor-pointer"
            />
            {searchData && searchData.length !== 0 && showResult ? (
              <div
                className=" absolute w-[84vh] min-h-[10vh] bg-slate-50 shadow-sm-2 z-[5] p-8 flex flex-col"
                style={{ marginLeft: -220 }}
              >
                {/* <RxCross1 className="ml-36 cursor-pointer"  size={30} onClick={() => setOpen(false)}  /> */}
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`} key={index}>
                        <div className="w-full min-h-[10vh] flex items-start-py-3">
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[80px] h-[80px] mr-[40px] flex flex-col mb-3"
                          />
                          <h1 className="flex flex-col text-[20px] mt-5">
                            {i.name}
                          </h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.buttonseller}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}` }>
              <h1 className="text-[black] flex items-center">
                {isSeller ? "Dashboard" : "Become Seller"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
        <div
          className={`${
            active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } transition hidden 800px:flex item-center justify-between w-full bg-white h-[70px]`}
        >
          <div
            className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
          >
            {/* categories */}
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <Link to="/products">
                <button
                  className={`h-[80%] w-full flex justify-between items-center pl-10 bg-white font-sas text-lg font-[500] select-none rounded-md`}
                >
                  All Categories
                </button>
              </Link>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
            {/* navitems */}
            <div className={`${styles.noramlFlex}`}>
              <Navbar active={activeHeading} />
            </div>

            <div className="flex">
              <div className={`${styles.noramlFlex}`}>
                <Link to="/inbox">
                  <div className="relative cursor-pointer mr-[15px]">
                    <AiOutlineMessage size={30} color="rgb(255,61,61)" />
                  </div>
                </Link>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishlist(true)}
                >
                  <AiOutlineHeart size={30} color="rgb(255,61,61)" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart size={30} color="rgb(255,61,61)" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart && cart.length}
                  </span>
                </div>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_url}/${user.avatar}`}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full border-[3px] border-[#0ee34a]"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255,61,61)" />
                    </Link>
                  )}
                </div>
              </div>

              {/* <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full border-[3px] border-[#ff3d3d]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div> */}
            </div>
          </div>
          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>
      {/* popup cart */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="mt-1 cursor-pointer"
                style={{ maxWidth: "50px" }}
              />
            </Link>
          </div>
          <div>
            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${backend_url}/${user.avatar}`}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full border-[3px] border-[#ff3d3d]"
                    style={{ marginRight: "16px" }}
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile
                    size={30}
                    color="rgb(255,61,61)"
                    className="w-[40px] h-[40px] rounded-full"
                    style={{ marginRight: "16px" }}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px] mt-[20px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <div className="relative mr-[20px]">
                  <AiOutlineShoppingCart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 mt-5 right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {cart && cart.length}
                  </span>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#ff3d3d] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i, index) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`} key={index}>
                          <div className="flex items-center" >
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.buttonseller} ml-4 !rounded-[4px]`}>
                <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                  <h1 className="text-[#000] flex items-center">
                    {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
