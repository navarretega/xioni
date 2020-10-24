import React from "react";
import { Link } from "react-router-dom";

function Steps({ step1, step2, step3, step4 }) {
  return (
    <>
      {/* <div>{step1 ? <Link to="/login">Sign In</Link> : <button disabled>Sign In</button>}</div>
      <div>{step2 ? <Link to="/shipping">Shipping</Link> : <button disabled>Shipping</button>}</div>
      <div>{step3 ? <Link to="/payment">Payment</Link> : <button disabled>Sign In</button>}</div>
      <div>{step4 ? <Link to="/placeorder">Place Order</Link> : <button disabled>Place Order</button>}</div> */}
      <div>
        <nav className="-mb-px flex">
          {step1 ? (
            <Link
              to="/login"
              className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700 focus:border-gray-300"
            >
              Sign In
            </Link>
          ) : (
            <div className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-300 focus:outline-none">Sign In</div>
          )}
          {step2 ? (
            <Link
              to="/shipping"
              className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700 focus:border-gray-300"
            >
              Shipping
            </Link>
          ) : (
            <div className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-300 focus:outline-none">Shipping</div>
          )}
          {step3 ? (
            <Link
              to="/payment"
              className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700 focus:border-gray-300"
            >
              Payment
            </Link>
          ) : (
            <div className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-300 focus:outline-none">Payment</div>
          )}
          {step4 ? (
            <Link
              to="/placeorder"
              className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700 focus:border-gray-300"
            >
              Place Order
            </Link>
          ) : (
            <div className="w-1/4 py-4 px-1 text-center font-medium text-sm leading-5 text-gray-300 focus:outline-none">Place Order</div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Steps;
