import { useParams, Link } from "react-router-dom"; // Import Link
import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";

function Search() {
  const { query } = useParams(); // Extract query from URL parameter
  const [results, setResults] = useState([]);
  console.log(query);

  // Fetch product data using useFetch
  // const { data, error, loading } = useFetch("/api");
  const { data, error, loading } = useFetch("https://dummyjson.com/products");

  useEffect(() => {
    if (data && query) {
      // Filter products based on the query
      const filteredResults = data.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [data, query]); // Re-run when data or query changes

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <li key={item.id} className="py-2">
              {/* Link to Product Detail page */}
              <Link to={`/product-detail/${item.id}`} className="block hover:bg-slate-200">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found for "{query}"</p>
      )}
    </div>
  );
}

export default Search;
