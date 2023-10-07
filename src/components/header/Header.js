import React, { useEffect, useRef, useState } from "react";
import { logo } from "../../assets/index";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { allItems } from "../../constants";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "../../redux/amazonSlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [showAll, setShowall] = useState(false);
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  console.log(userInfo);
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {});
  }, [ref, showAll]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        dispatch(userSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full sticky top-0 z-50 ">
      <div className="bg-amazon_blue text-white px-4 py-3 flex items-center gap-4">
        {/* ============= Image Start here =========== */}
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logo" />
          </div>
        </Link>
        {/* ============= Image End here =========== */}

        {/* ============= Deliver Start here =========== */}
        <div className="headerHover hidden md1:inline-flex">
          <LocationOnOutlinedIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to{" "}
            <span className="text-sm text-white font-semibold -mt-1">
              worapon
            </span>
          </p>
        </div>
        {/* ============= Deliver End here =========== */}

        {/* ============= Search Start here =========== */}
        <div className="h-10 rounded-md hidden lgl:flex flex-grow relative">
          <span
            onClick={() => setShowall(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All <span></span>
            <ArrowDropDownOutlinedIcon />
          </span>
          {showAll && (
            <div>
              <ul
                className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 fle
               flex-col gap-1 z-50"
              >
                {allItems.map((item) => (
                  <li
                    key={item._id}
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                  >
                    {item.titie}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        {/* ============= Search End here =========== */}

        {/* ============= Signin Start here =========== */}
        <Link to="/signin">
          <div className="flex flex-col items-start justify-center headerHover gap-1">
            {userInfo ? (
              <p className=" text-sm mdl:text-xs text-gray-100 mdl:text-lightText font-medium">
                {userInfo.userName}
              </p>
            ) : (
              <p className=" text-sm mdl:text-xs text-white mdl:text-lightText font-light">
                Hello,signin
              </p>
            )}

            <p className="text-sm font-semibold -mt-1 text-white hidden mdl:inline-flex">
              Accounts & Lists
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </p>
          </div>
        </Link>
        {/* ============= Signin End here =========== */}

        {/* ============= Orders Start here =========== */}
        <div className="hidden lgl:flex flex-col items-start justify-center headerHover gap-1">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-white">& Orders</p>
        </div>
        {/* ============= Orders End here =========== */}

        {/* ============= Cart Start here =========== */}
        <Link to="/cart">
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="text-xs font-semibold mt-3 text-white">
              Cart{" "}
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex items-center justify-center">
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
        {userInfo && (
          <div
            onClick={handleLogout}
            className="flex flex-col justify-center items-center headerHover relative"
          >
            <LogoutIcon />
            <p className="hidden mdl:inline-flex text-xs font-semibold text-white">
              Logout
            </p>
          </div>
        )}

        {/* ============= Cart End here =========== */}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
