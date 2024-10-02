import { useState } from "react";
import Spinner from "./spinner/Spinner";

const ProductCart = ({ item }) => {
  console.log(item);
  const [isImageLoading, setImageLoading] = useState(true); // Track the loading state of each image individually

  return (
    <div className="p-4 border bg-lime-200 border-gray-300 rounded shadow-lg">
      {/* Row 1: Brand and Category */}
      <div className="flex flex-col justify-between mb-2 ">
        <h1 className="text-lg">
          <span className="font-semibold">Title: </span>
          {item.title}
        </h1>
        <h1 className="text-lg font-semibold">
          <span className="font-semibold">Category:</span> {item.category}
        </h1>
      </div>

      {/* Row 2: Description */}
      <div className="mb-4">
        <p>
          <span className="font-semibold">Description:</span>
          {item.description}
        </p>
      </div>

      {/* Row 3: Image Section with Loading Spinner */}
      <div className="flex justify-center items-center bg-lime-50 rounded-md">
        {isImageLoading && <Spinner />} {/* Show Spinner while loading */}
        <img
          src={item.thumbnail}
          alt={item.description}
          className={`max-w-full object-cover transition-opacity duration-500 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoading(false)} // Hide the spinner when the image loads
          onError={() => setImageLoading(false)} // Hide the spinner on error
        />
      </div>
    </div>
  );
};

export default ProductCart;
