import React, { useContext, useEffect } from "react";
import Style from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import Navbar from "./../Navbar/Navbar";
import { UserContext } from "../../Context/userContext";
import { Offline } from "react-detect-offline";


export default function Layout() {
  // let { setUserToken } = useContext(UserContext);
  // useEffect(() => {
  //   if (localStorage.getItem('userToken') !== null) {
  //     setUserToken({ token: localStorage.getItem("userToken") });
  //   }
  // }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Offline>
        <div className="network">
          <i class="fa-solid fa-wifi"></i> You Are offline (surprise!)
        </div>
      </Offline>
      <Footer />
    </>
  );
}
