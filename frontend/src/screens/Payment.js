import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Steps from "../components/Steps";
import { savePaymentMethod } from "../actions/cartActions";

function Payment({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  }

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full">
                <div>
                  <div className="mb-4">
                    <Steps step1 step2 step3 />
                  </div>
                  <h2 className="text-center text-2xl font-semibold text-blue-900 tracking-wider uppercase">Payment Method</h2>
                </div>
                <div className="my-4 inline-block" />
                <form onSubmit={submitHandler}>
                  <div className="">
                    <div className="mt-4">
                      <div className="flex items-center">
                        <input
                          id="PayPal"
                          name="paymentMethod"
                          type="radio"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          checked
                          value="PayPal"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="push_everything" className="ml-3">
                          <span className="block text-sm leading-5 font-medium text-gray-700">PayPal</span>
                        </label>
                      </div>
                      <div className="mt-4 flex items-center">
                        <input
                          id="Stripe"
                          name="paymentMethod"
                          type="radio"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          value="Stripe"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="push_everything" className="ml-3">
                          <span className="block text-sm leading-5 font-medium text-gray-700">Stripe</span>
                        </label>
                      </div>
                      <div className="mt-4 flex items-center">
                        <input
                          id="Conekta"
                          name="paymentMethod"
                          type="radio"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          value="Conekta"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="push_everything" className="ml-3">
                          <span className="block text-sm leading-5 font-medium text-gray-700">Conekta</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Payment;
