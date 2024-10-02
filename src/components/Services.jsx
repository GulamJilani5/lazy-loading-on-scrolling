import React, { useState, useEffect } from "react";
import { useFetchItems } from "../hooks/reactQueryCustomHooks";
import ProductCart from "./ProductCart";
import Skeleton from "./skeleton/Skeleton";

const Services = () => {
  const { data, isError, isPending } = useFetchItems();
  const products = data?.products || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Dynamically set itemsPerPage

  // Adjust itemsPerPage based on screen size
  const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      setItemsPerPage(3); // For large screens
    } else if (screenWidth >= 768) {
      setItemsPerPage(2); // For medium screens (tablets)
    } else {
      setItemsPerPage(1); // For small screens (mobile)
    }
  };

  useEffect(() => {
    updateItemsPerPage(); // Set itemsPerPage on component mount
    window.addEventListener("resize", updateItemsPerPage); // Update itemsPerPage on window resize
    return () => window.removeEventListener("resize", updateItemsPerPage); // Clean up event listener on unmount
  }, []);

  // Pagination controls
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isPending) {
    return <Skeleton />;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <section className="bg-orange-600 min-h-screen p-4">
        <h1 className="flex justify-center text-4xl mt-8 mb-12 font-bold uppercase">
          Services
        </h1>
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((item) => (
            <ProductCart key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center w-full mt-12 mb-12">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="mx-2 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="mx-2 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default Services;
