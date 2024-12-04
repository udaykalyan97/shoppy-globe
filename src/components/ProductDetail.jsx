import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [filteredProduct, setFilteredProduct] = useState(null);
  const { data, error, loading } = useFetch("/api");
  const products = data?.products || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (products && productId) {
      const product = products.find((p) => p.id === Number(productId));
      setFilteredProduct(product);
    }
  }, [productId, products]);

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

  if (!filteredProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-5xl font-bold">Product not found</div>
      </div>
    );
  }

  const isOutOfStock = filteredProduct.stock < filteredProduct.minimumOrderQuantity;

  return (
    <div className="product-detail p-6 max-w-4xl mx-auto bg-white rounded-lg">
      <div className="flex flex-col">
        <img
          src={filteredProduct.thumbnail}
          alt={filteredProduct.title}
          className="w-full max-w-sm rounded-lg mb-6 h-64 w-64"
        />
        <h1 className="text-2xl font-bold mb-4">{filteredProduct.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{filteredProduct.description}</p>
        <div className="text-xl font-semibold text-blue-600 mb-4">
          Price: ${filteredProduct.price}
        </div>
        <p className="text-gray-600 mb-2">
          <strong>Stock:</strong> {filteredProduct.stock}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Minimum Order Quantity:</strong> {filteredProduct.minimumOrderQuantity}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {filteredProduct.category}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Brand:</strong> {filteredProduct.brand}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>SKU:</strong> {filteredProduct.sku}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Rating:</strong> {filteredProduct.rating} / 5
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Stock:</strong> {filteredProduct.stock}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Dimensions:</strong> {`W: ${filteredProduct.dimensions.width} x H: ${filteredProduct.dimensions.height} x D: ${filteredProduct.dimensions.depth}`}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Weight:</strong> {filteredProduct.weight} kg
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Warranty:</strong> {filteredProduct.warrantyInformation}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Shipping Information:</strong> {filteredProduct.shippingInformation}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Return Policy:</strong> {filteredProduct.returnPolicy}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Tags:</strong> {filteredProduct.tags.join(", ")}
        </p>
        <h3 className="text-lg font-semibold mb-2">Customer Reviews:</h3>
        <ul className="mb-4">
          {filteredProduct.reviews.map((review, index) => (
            <li key={index} className="mb-2">
              <p>
                <strong>{review.reviewerName}:</strong> {review.comment}{" "}
                <span className="text-gray-500">({review.rating} / 5)</span>
              </p>
            </li>
          ))}
        </ul>
        <strong>Product Images: </strong>
        <p className="text-gray-600 mb-2 flex flex-wrap">
            {filteredProduct.images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt="img"
                    className="h-24 w-24 object-cover m-4"
                />
            ))}
        </p>
        <div className="flex gap-4 mt-4">
          {isOutOfStock ? (
            <button
              disabled
              className="bg-gray-400 text-white py-2 px-6 rounded-lg cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : (
            <button
              onClick={() => dispatch(addItem(filteredProduct))}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500"
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
