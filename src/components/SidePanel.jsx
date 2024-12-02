import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

function SidePanel() {
  // Fetch products data
  const { data, error, loading } = useFetch("/api");

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Extract categories and remove duplicates
  const categories = [...new Set(data.products.map((product) => product.category))];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/product-list/${category}`}
              className="text-blue-600 hover:underline capitalize"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidePanel;
