import React from "react";
import { withRouter } from "react-router-dom";

import Rating from "../components/Rating";
import products from "../products";

function Product({ history, match }) {
  const product = products.find((p) => p._id === match.params.id);

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div onClick={history.goBack} className="text-xs font-semibold text-gray-900 tracking-wider uppercase underline cursor-pointer">
            GO BACK
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="grid gap-8 grid-cols-2">
              <img className="w-full" src={product.image} atl={product.name} />
              <div>
                <h2 className="uppercase font-semibold tracking-wider text-xl">{product.name}</h2>
                <div className="my-4 flex items-center">
                  <h4 className="text-xl">${product.price}</h4>
                  <span className="mx-2 text-2xl text-gray-300">|</span>
                  <p className="text-sm text-gray-600">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
                </div>
                <Rating rating={product.rating} reviews={product.numReviews} />
                <p className="my-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
                <span class="inline-flex rounded-md shadow-sm">
                  {product.countInStock > 0 ? (
                    <button
                      type="button"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-300">
                      Add to Cart
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withRouter(Product);
