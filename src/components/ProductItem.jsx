// Category wise filter Page

import { useParams, Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";

function ProductItem() {
  // Extract category from the URL parameters
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch product data
  const { data, error, loading } = useFetch("/api");

  // Extract products from the fetched data
  const products = data?.products || [];

  // Update the filtered products whenever the category or products change
  useEffect(() => {
    const updatedFilteredProducts = products.filter(
      (prod) => prod.category === category
    );
    setFilteredProducts(updatedFilteredProducts);
  }, [category, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold">No products found in this category</div>
      </div>
    );
  }

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-6">Products in "{category}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {filteredProducts.map((prod) => (
          <Link
            to={`/product-detail/${prod.id}`}
            key={prod.id}
            className="p-4 border rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{prod.title}</h3>
            <p className="text-gray-600 mb-2">Price: ${prod.price}</p>
            <p className="text-gray-500 text-sm">{prod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductItem;
