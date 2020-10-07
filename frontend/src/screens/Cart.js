import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/cartActions";

function Cart({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  function removeHandler(id) {
    dispatch(removeFromCart(id));
  }

  function checkoutHandler() {
    console.log("Checkout");
    history.push("/login?redirect=shipping");
  }

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-blue-900 tracking-wider uppercase">Your Cart</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {cartItems.length === 0 ? (
              <h3>
                Your cart is empty.{" "}
                <Link to="/" className="font-semibold text-blue-800 underline">
                  Go buy some products.
                </Link>
              </h3>
            ) : (
              <div className="flex w-full justify-between">
                <div className="" style={{ width: "60%" }}>
                  <div className="flex flex-col">
                    <div className="align-middle inline-block min-w-full">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody>
                          {cartItems.map((item) => (
                            <tr className="flex items-center justify-between border-b-2" key={item.product}>
                              <td className="py-2">
                                <img className="h-24 w-32 rounded-sm" src={item.image} alt={item.name} />
                              </td>
                              <td className="w-56 px-4 py-2 whitespace-wrap text-sm leading-5">
                                <Link to={`/product/${item.product}`}>
                                  <div className="text-blue-900">{item.name}</div>
                                </Link>
                                <div className="mt-2 flex items-center text-gray-600">
                                  <div>${item.price}</div>
                                  <div className="ml-4">
                                    <select
                                      id="qty"
                                      value={item.qty}
                                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                      className="form-select px-2 py-2 text-base bg-gray-100 leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    >
                                      {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-2 text-right text-sm leading-5 font-medium">
                                <button onClick={() => removeHandler(item.product)} className="text-gray-400 hover:text-gray-500">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div style={{ width: "30%" }}>
                  <h6 className="text-center text-sm text-blue-900 tracking-wider">SUBTOTAL</h6>
                  <h3 className="text-center text-2xl text-blue-900 tracking-wider">
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </h3>
                  <div className="mt-4 w-full rounded-md shadow-sm text-center">
                    <button
                      type="button"
                      onClick={checkoutHandler}
                      className="w-full uppercase px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
