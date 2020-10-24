import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Steps from "../components/Steps";
import { createOrder } from "../actions/orderActions";

function PlaceOrder({ history }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Not ideal but works for this demo
  cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
  cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 100).toFixed(2);
  cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full">
                <div>
                  <div className="mb-4">
                    <Steps step1 step2 step3 step4 />
                  </div>
                  <h2 className="text-center text-2xl font-semibold text-blue-900 tracking-wider uppercase">Place Order</h2>
                </div>
                <div className="my-6">
                  <div className="my-6">
                    <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Shipping</h2>
                    <p>
                      {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                      {cart.shippingAddress.country}
                    </p>
                    <div className="border-b-2 mt-4" />
                  </div>
                  <div className="my-6">
                    <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Payment Method</h2>
                    <p>{cart.paymentMethod}</p>
                    <div className="border-b-2 mt-4" />
                  </div>
                  <div className="my-6">
                    <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Order Items</h2>
                    {cart.cartItems.length === 0 ? (
                      <p>Cart is Empty</p>
                    ) : (
                      <table className="w-full">
                        <tbody>
                          {cart.cartItems.map((item) => (
                            <tr className="flex items-center justify-around w-full" key={item.product}>
                              <td className="py-2">
                                <img className="h-16 w-24 rounded-sm" src={item.image} alt={item.name} />
                              </td>
                              <td className="w-56 px-4 py-2 whitespace-wrap text-sm leading-5">
                                <Link to={`/product/${item.product}`}>
                                  <div className="text-blue-900">{item.name}</div>
                                </Link>
                              </td>
                              <td className="w-56 px-4 py-2 whitespace-wrap text-sm leading-5 text-right">
                                <div className="text-gray-600">
                                  <div>
                                    {item.qty} * ${item.price} = ${item.qty * item.price}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <div className="border-b-2 mt-4" />
                  </div>
                  <div className="my-6">
                    <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Summary</h2>
                    <div className="flex flex-col">
                      <div>
                        <div className="inline-block min-w-full">
                          <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <tbody>
                                <tr>
                                  <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    Before Shipping & Taxes
                                  </td>
                                  <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${cart.itemsPrice}</td>
                                </tr>
                                <tr>
                                  <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">Shipping</td>
                                  <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${cart.shippingPrice}</td>
                                </tr>
                                <tr>
                                  <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">Tax</td>
                                  <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${cart.taxPrice}</td>
                                </tr>
                                <tr>
                                  <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">Total</td>
                                  <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${cart.totalPrice}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b-2 mt-4" />
                  </div>
                  {error && <h4>{error}</h4>}
                  <div className="mt-6">
                    <button
                      type="submit"
                      onClick={placeOrderHandler}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PlaceOrder;
