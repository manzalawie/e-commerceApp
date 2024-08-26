import React from "react";
import amazonPay from '../../assets/amazon.png'
import logo from '../../assets/freshcart-logo.svg'
import MasterCard from '../../assets/masterCard.png'
import PayPal from '../../assets/paybal.webp'
import AppStore from '../../assets/appstore.avif'
import googleplay from '../../assets/googleplay.png'
import AmericanExpress from '../../assets/AmericanExpress.png'

export default function Footer() {
  return (
    <>
      <div className="bg-gray-200 p-3 relative w-full bottom-0 right-0 left-0">
        <div className=" p-8">
      <div className=" mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">Get the FreshCart app</h2>
        <p className="text-gray-600 mb-4">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Email .."
            className="border border-gray-300 p-3 rounded-l-md w-1/2 focus:outline-none"
          />
          <button className="bg-green-500 text-white p-3 rounded-r-md">
            Share App Link
          </button>
        </div>
       
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-semibold text-xl">Payment Partners</span>
            <img
              src={amazonPay}
              alt="Amazon Pay"
              className="w-[80px]"
            />
            <img
              src={AmericanExpress}
              alt="American Express"
              className="w-[80px]"
            />
            <img
              src={MasterCard}
              alt="MasterCard"
              className="w-[80px]"
            />
            <img
              src={PayPal}
              alt="PayPal"
              className="w-[80px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-semibold text-xl">Get deliveries with FreshCart</span>
            <a href="#" className="block">
              <img
                src={AppStore}
                alt="App Store"
                className="h-6"
              />
            </a>
            <a href="#" className="block">
              <img
                src={googleplay}
                alt="Google Play"
                className="h-6"
              />
            </a>
          </div>
        </div>
      </div>

      </div>
    </div>
      </div>
    </>
  );
}
