import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const { data, error, loading } = useFetch("/api");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Check if a product is in the cart
  const findCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  // Handle Add/Remove logic
  const handleCartToggle = (product) => {
    const cartItem = findCartItem(product.id);

    if (cartItem) {
      // Product is already in the cart
      if (cartItem.quantity > product.minimumOrderQuantity) {
        dispatch(removeItem(product));
      } else {
        dispatch(removeItem(product)); // Remove completely if below min quantity
      }
    } else {
      // Add product with minimum order quantity if not already in the cart
      dispatch(addItem({ ...product, quantity: product.minimumOrderQuantity }));
    }
  };

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
        <div className="text-5xl font-bold">Error: {error.message}</div>
      </div>
    );
  }

  const products = data?.products || [];

  return (
    <div className="m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((prod) => {
          const isOutOfStock = prod.stock < prod.minimumOrderQuantity;

          return (
            <div
              key={prod.id}
              className={`relative flex flex-col p-4 border rounded shadow transition-transform duration-300 ${
                isOutOfStock ? "bg-gray-200 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
              }`}
            >
              {/* Add to Cart/Check Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Link navigation
                  handleCartToggle(prod);
                }}
                className="absolute top-2 right-2 bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-100 disabled:opacity-50"
                disabled={isOutOfStock}
              >
                <FontAwesomeIcon
                  icon={findCartItem(prod.id) ? faCheck : faCartShopping}
                />
              </button>

              {/* Product Thumbnail */}
              <Link
                to={`/product-detail/${prod.id}`}
                className={`flex flex-col h-full ${isOutOfStock ? "pointer-events-none" : ""}`}
              >
                <div className="flex-shrink-0 h-48">
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 mt-4">
                  <h3 className="text-lg font-semibold truncate">{prod.title}</h3>
                  <p className="text-gray-600">Price: ${prod.price}</p>
                </div>
              </Link>

              {/* Out of Stock Label */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-20 text-white font-bold text-lg rounded">
                  Out of Stock
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
