import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Steps from "../components/Steps";
import { saveShippingAddress } from "../actions/cartActions";

function Shipping({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
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
                    <Steps step1 step2 />
                  </div>
                  <h2 className="text-center text-2xl font-semibold text-blue-900 tracking-wider uppercase">Shipping</h2>
                </div>
                <div className="my-4 inline-block" />
                <form onSubmit={submitHandler}>
                  <div className="rounded-md shadow-sm">
                    <div>
                      <input
                        aria-label="Address"
                        name="address"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="-mt-px">
                      <input
                        aria-label="City"
                        name="city"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="-mt-px">
                      <input
                        aria-label="zip"
                        name="zip"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="-mt-px">
                      <input
                        aria-label="Country"
                        name="country"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="mt-6 flex items-center justify-end">
                    <div className="text-sm leading-5">
                      <div className="font-medium text-gray-600 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Have an account?{" "}
                        <Link
                          to={redirect ? `/login?redirect=${redirect}` : "/login"}
                          className="underline text-blue-600 hover:text-blue-500 "
                        >
                          Sign in
                        </Link>
                      </div>
                    </div>
                  </div> */}

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

export default Shipping;
