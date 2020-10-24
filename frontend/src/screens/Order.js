import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import Loading from "../components/Loading";

function Order({ match }) {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;
  const orderPay = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = orderDetails;

  if (!loading) {
    order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (successPay || !order || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full">
                <div>
                  <h2 className="text-center text-2xl font-semibold text-blue-900 tracking-wider uppercase">Order Details</h2>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="my-6">
                    <div className="flex justify-around">
                      {order.isPaid ? (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-100 text-teal-800">
                          Paid on {order.paidAt}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800">
                          Not Paid
                        </span>
                      )}
                      {order.isDelivered ? (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-100 text-teal-800">
                          Paid on {order.deliveredAt}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800">
                          Not Delivered
                        </span>
                      )}
                    </div>
                    <div className="my-6">
                      <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Account</h2>
                      <p> Order ID: {orderId}</p>
                      <p>{order.user.name}</p>
                      <p>{order.user.email}</p>
                      <div className="border-b-2 mt-4" />
                    </div>
                    <div className="my-6">
                      <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Shipping</h2>
                      <p>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </p>
                      <div className="border-b-2 mt-4" />
                    </div>
                    <div className="my-6">
                      <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Payment Method</h2>
                      <p>{order.paymentMethod}</p>
                      <div className="border-b-2 mt-4" />
                    </div>
                    <div className="my-6">
                      <h2 className=" text-lg text-blue-900 tracking-wide uppercase mb-2">Order Items</h2>
                      <table className="w-full">
                        <tbody>
                          {order.orderItems.map((item) => (
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
                                    <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${order.itemsPrice}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">Shipping</td>
                                    <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${order.shippingPrice}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">Tax</td>
                                    <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${order.taxPrice}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">Total</td>
                                    <td className="py-2 whitespace-no-wrap text-base leading-5 text-gray-900">${order.totalPrice}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!order.isPaid && (
                      <div className="my-6">
                        {loadingPay && <Loading />}
                        {!sdkReady ? <Loading /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Order;
