import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

function SidePanel() {
  // Fetch products data
  // const { data, error, loading } = useFetch("/api");
  const { data, error, loading } = useFetch("https://dummyjson.com/products");

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Extract categories and remove duplicates
  const categories = [...new Set(data.products.map((product) => product.category))];

  return (
    <div className="p-4 rounded-lg sm:w-64 lg:w-52">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/product-list/${category}`}
              className="text-blue-600 hover:underline capitalize block sm:text-base lg:text-lg">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidePanel;
