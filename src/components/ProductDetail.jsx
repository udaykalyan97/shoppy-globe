import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from '../utils/useFetch';

function ProductDetail() {
  const { productId } = useParams(); // Get the product ID from the URL
  const [filteredProduct, setFilteredProduct] = useState(null);

  // Fetch product details using the productId from the URL
  const { data, error, loading } = useFetch('/api');
  const products = data?.products || [];

  useEffect(() => {
    if (products && productId) {
      // Filter the product by matching the product ID
      const product = products.find((p) => p.id === Number(productId));
      setFilteredProduct(product); // Set the filtered product
    }
  }, [productId, products]); // Re-run when productId or products changes

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold">Loading...</div>
      </div>
    );
  }

  console.log(filteredProduct)

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  // Handle case when product is not found
  if (!filteredProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold">Product not found</div>
      </div>
    );
  }

  // Display product details
  return (
    <div className="product-detail p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
            <img
                src={filteredProduct.thumbnail}
                alt={filteredProduct.title}
                className="w-full max-w-sm rounded-lg mb-6"
            />
            <h1 className="text-2xl font-bold mb-4">{filteredProduct.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{filteredProduct.description}</p>
            <div className="text-xl font-semibold text-blue-600 mb-4">Price: ${filteredProduct.price}</div>
            <div className="flex gap-4">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500">
            Add to Cart
          </button>
          <button className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-200">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
