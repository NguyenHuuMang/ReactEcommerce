import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {
       navItems && navItems.map((i,index) => (
          <div key={(i, index)} className="flex">
            <Link
              to={i.url}
              className={` ${
                active === index + 1
                  ? "text-[rgb(255,61,61)]"
                  : "text-black 800px:text-[#000]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
