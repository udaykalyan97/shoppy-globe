import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";

function ProductList() {
  const { data, error, loading } = useFetch("/api");

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
        {products.map((prod) => (
          <Link
            key={prod.id}
            to={`/product-detail/${prod.id}`}
            className="flex flex-col p-4 border rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
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
        ))}
      </div>
    </div>
  );
}

export default ProductList;
