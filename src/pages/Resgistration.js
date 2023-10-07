import React, { useState } from "react";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

const Resgistration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error Message start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  // loading State start
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // handle function

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  // Email validateion start
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // Submit button start
  const handleRegistration = (e) => {
    e.preventDefault();

    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setFirebaseErr("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else {
      if (password.length < 6) {
        setErrPassword(" Password must be at laest 6 characters ");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm your password");
    } else {
      if (!cPassword !== password) {
        setErrCPassword("Password not matched");
      }
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL:
              "https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/324670733_562598458776899_6135115654264725272_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=LDrM25NTKysAX-Gb0QZ&_nc_ht=scontent.fbkk28-1.fna&oh=00_AfCXjWOVUv_08w6lPzfw-9lQtTCIFqUVN3bQTh22LEXgfw&oe=65267EAB",
          });
          // signin
          const user = userCredential.user;

          setLoading(false);
          setSuccessMsg("Account Created Succesfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, Try another one");
          }
        });
      // ====== firebase Registartion End here
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setErrCPassword("");
      setFirebaseErr("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <img className="w-32 py-5" src={darkLogo} alt="darklogo" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  type="text"
                  className="w-full  py-1 border
                   border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] 
                   focus-within:shadow-amazonInput duration-100"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Email or moblie phone number
                </p>
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  className="w-full py-1 border
                   border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] 
                   focus-within:shadow-amazonInput duration-100"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  className="w-full py-1 border
                   border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] 
                   focus-within:shadow-amazonInput duration-100"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be at laest 6 characters{" "}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-Password</p>
                <input
                  value={cPassword}
                  onChange={handleCPassword}
                  type="password"
                  className="w-full py-1 border
                   border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] 
                   focus-within:shadow-amazonInput duration-100"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errCPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal 
              rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b]
               hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 
               active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center ">
                  <RotatingLines
                    strokeColor="#febf69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}
              {successMsg && (
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold
                     text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's{" "}
              <span className="text-blue-600">Conditions of Use</span> and{" "}
              <span className="text-blue-600">Privace Notice.</span>
            </p>
            <p className="text-xs text-gray-600 mt-4 cursor-pointer">
              <ArrowRightIcon />
              <span
                className="text-blue-600 hover:text-orange-700
              hover:underline underline-offset-1"
              >
                Need help?
              </span>
            </p>

            <div>
              <p className="text-xs text-black">
                Already have an acount?{" "}
                <Link to="/signin">
                  <span
                    className=" text-xs text-blue-600 hover:text-orange-700
              hover:underline underline-offset-1"
                  >
                    Sign in
                  </span>{" "}
                  <span>
                    <ArrowRightIcon />
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">
                Buying for work?{" "}
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resgistration;
