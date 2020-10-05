import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import Message from "../components/Message";

function Product({ history, match }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div onClick={history.goBack} className="text-xs font-semibold text-blue-900 tracking-wider uppercase underline cursor-pointer">
            GO BACK
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message>{error}</Message>
            ) : (
              <div className="grid gap-8 grid-cols-2">
                <img className="w-full rounded-md" src={product.image} alt={product.name} />
                <div>
                  <h2 className="uppercase font-semibold tracking-wider text-xl text-blue-900">{product.name}</h2>
                  <div className="my-4 flex items-center">
                    <h4 className="text-xl">${product.price}</h4>
                    <span className="mx-2 text-2xl text-gray-300">|</span>
                    <p className="text-sm text-gray-600">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
                  </div>
                  <Rating rating={product.rating} reviews={product.numReviews} />
                  <p className="my-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
                  <span className="inline-flex rounded-md shadow-sm">
                    {product.countInStock > 0 ? (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-300">
                        Add to Cart
                      </div>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default withRouter(Product);
