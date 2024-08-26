import React from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import style from './Layout.module.css'

export default function Layout() {
  return (
    <>
      <Navbar />
        <div className="container w-[85%] py-20 mx-auto">
            <Outlet />
        </div>
      <Footer />
    </>
  );
}
