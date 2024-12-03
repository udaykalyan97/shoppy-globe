import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStripeS } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react"; // For managing the search input

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  // Calculate total quantity in the cart
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle "Go" button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // If searchQuery is non-empty, navigate to /search with the query parameter
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <>
      <div className="bg-blue-600 text-white flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Link to={`/`}>
            <div className="hover:text-blue-300 cursor-pointer scale-1 text-lg md:text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faStripeS} className="mr-2" />
              <div className="text-white">ShoppyGlobe</div>
            </div>
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex items-center bg-white text-gray-600 rounded-full p-2 w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange} // Update the searchQuery state
            placeholder="Search by title or description..."
            className="bg-transparent border-none outline-none placeholder-gray-500 text-sm w-full md:w-72"
          />
          <button
            onClick={handleSearch}
            className="rounded ml-2 hover:bg-slate-200 px-3 py-1"
          >
            Go
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 mt-4 md:mt-0">
          <Link to={'/userlogin'}>
            <p className="hover:text-blue-300 cursor-pointer text-sm md:text-base">Log In</p>
          </Link>
          <p className="hover:text-blue-300 cursor-pointer flex items-center text-sm md:text-base">
            <Link to={"/cart"}>
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              Cart ({totalQuantity})
            </Link>
          </p>
        </nav>
      </div>
    </>
  );
}

export default Header;
