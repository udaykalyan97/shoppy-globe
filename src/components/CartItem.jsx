import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartItem() {
  const { cartId } = useParams(); // Extract cartId from the URL
  const dispatch = useDispatch();

  // Access cart items from the Redux store
  const cartItems = useSelector((store) => store.cart.items);

  // Find the item in the cart by cartId
  const item = cartItems.find((item) => item.id === Number(cartId));

  // If item is not found, display a message
  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Item not found in cart!</h1>
      </div>
    );
  }

  // Handle removing the item from the cart
  const handleRemoveItem = () => {
    if (item.quantity <= item.minimumOrderQuantity) {
      dispatch(removeItem(item)); // Remove if below minimum quantity
    } else {
      dispatch(removeItem(item)); // Remove one unit from cart if it's above minimum
    }
  };

  // Handle adding the item to the cart
  const handleAddItem = () => {
    if (item.quantity === 0 || !item.quantity) {
      // Initialize the quantity with minimumOrderQuantity when adding for the first time
      dispatch(addItem({ ...item, quantity: item.minimumOrderQuantity }));
    } else {
      // Increase the quantity by 1 for subsequent additions
      dispatch(addItem({ ...item, quantity: item.quantity + 1 }));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          key={item.id}
          className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-40 object-cover rounded mb-4 hover:scale-105 transition-transform duration-300"
          />
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-2">Price: ${item.price}</p>
          <p className="text-gray-500 mb-2">Brand: {item.brand}</p>
          <p className="text-gray-500 mb-2">SKU: {item.sku}</p>
          <p className="text-gray-500 mb-2">Weight: {item.weight}g</p>
          <p className="text-gray-500 mb-2">Dimensions: {item.dimensions.width} x {item.dimensions.height} x {item.dimensions.depth} cm</p>
          <p className="text-gray-500 mb-2">Warranty: {item.warrantyInformation}</p>
          <p className="text-gray-500 mb-2">Shipping: {item.shippingInformation}</p>
          <p className="text-gray-500 mb-2">Availability: {item.availabilityStatus}</p>
          <p className="text-gray-500 mb-2">Return Policy: {item.returnPolicy}</p>

          <div className="flex items-center gap-2 mt-2">
            {/* Decrease quantity or remove item */}
            <button
              onClick={handleRemoveItem}
              className={`py-1 px-3 rounded ${
                item.quantity === item.minimumOrderQuantity
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-red-500 hover:bg-red-400"
              } text-white`}
            >
              {item.quantity === item.minimumOrderQuantity ? (
                <FontAwesomeIcon icon={faTrash} />
              ) : (
                "-"
              )}
            </button>

            {/* Increase quantity */}
            <button
              onClick={handleAddItem}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400"
            >
              +
            </button>
            <p className="text-gray-500 mb-2">
            Quantity: {item.quantity ? item.quantity : item.minimumOrderQuantity}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
