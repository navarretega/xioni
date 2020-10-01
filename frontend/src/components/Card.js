import React from "react";
import { Link } from "react-router-dom";

import Rating from "./Rating";

function Card({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="">
          <img className="h-full w-full" src={product.image} />
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h4 className="font-semibold truncate">{product.name}</h4>
          <h6 className="text-xl my-2">${product.price}</h6>
          <Rating rating={product.rating} reviews={product.numReviews} />
        </div>
      </div>
    </Link>
  );
}

export default Card;
