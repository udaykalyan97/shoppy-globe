import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart} from "../utils/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function Cart() {
  const dispatch = useDispatch();

  // Access cart items from the Redux store
  const cartItems = useSelector((store) => store.cart.items);

  // Handle removing the item from the cart
  const handleRemoveItem = (item) => {
    if (item.quantity > item.minimumOrderQuantity) {
      // Decrease quantity by 1 if above minimumOrderQuantity
      dispatch(removeItem(item));
    } else {
      // Remove the item entirely if quantity is at the minimumOrderQuantity
      dispatch(removeItem(item));
    }
  };

  // Handle adding the item to the cart
  const handleAddItem = (item) => {
    if (item.quantity === 0 || !item.quantity) {
      // Initialize the quantity with minimumOrderQuantity when adding for the first time
      dispatch(addItem({ ...item, quantity: item.minimumOrderQuantity }));
    } else {
      // Increase the quantity by 1 for subsequent additions
      dispatch(addItem({ ...item, quantity: item.quantity + 1 }));
    }
  };

  // Handle clearing the whole cart
  const handleClearCart = () => {
    dispatch(clearCart());
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Cart is empty!</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Cart</h1>
            <div>
            <button onClick={handleClearCart} className="bg-slate-700 text-white py-2 px-6 mr-2 rounded-lg hover:bg-rose-500 cursor-pointer">
                    Clear Cart Items
                </button>
            {/* Checkout Button */}
            <Link to="/checkout">
                <button className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-500 cursor-pointer">
                    Proceed to Checkout
                </button>
            </Link></div>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300"
          >
            {/* Link only wraps the div and not the buttons */}
            <Link to={`/cart-item/${item.id}`}
              className="block"
              onClick={(e) => {
                if (e.target.tagName === "BUTTON" || e.target.tagName === "SVG" || e.target.tagName === "PATH") {
                  e.preventDefault(); // Prevent navigation if the click is on a button or icon
                }
              }}
              >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">Price: ${item.price}</p>
              <p className="text-gray-500 mb-2">
                Quantity: {item.quantity ? item.quantity : item.minimumOrderQuantity}
              </p> {/* Display minimumOrderQuantity if quantity is not set */}
            </Link>

            <div className="flex items-center gap-2 mt-2">
              {/* Decrease quantity or remove item */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Stop event propagation
                  handleRemoveItem(item);
                }}
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
                onClick={(e) => {
                  e.stopPropagation(); // Stop event propagation
                  handleAddItem(item);
                }}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
