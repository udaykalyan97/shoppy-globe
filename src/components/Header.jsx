import { Link } from 'react-router-dom';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faStripeS } from '@fortawesome/free-brands-svg-icons';

function Header() {
  return (
    <>
      <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
        <Link to={`/`}><div className="text-xl font-bold flex items-center">
          <FontAwesomeIcon icon={faStripeS} className="mr-2" />
            <div className="text-white">ShoppyGlobe</div>
          </div></Link>

          {/* Search Icon and Input */}
            <div className="flex items-center bg-white text-gray-600 rounded-full p-2 w-auto">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-500 mr-2"
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none placeholder-gray-500 text-sm w-auto"
                />
            </div>

        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <p className="hover:text-blue-300 cursor-pointer">Log In</p>
          <p className="hover:text-blue-300 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
            Cart
          </p>
        </nav>
      </div>
    </>
  );
}

export default Header;
