import React from "react";

import Card from "../components/Card";
import products from "../products";

function Home() {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wider uppercase">Latest Products</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="grid gap-8 grid-cols-3">
              {products.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
