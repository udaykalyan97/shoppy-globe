import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg">
        <FontAwesomeIcon
          icon={faUser}
          className="text-blue-600 text-6xl mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">You are Logged In as Guest User</h1>
        <p className="text-gray-600 text-lg">This page is under construction.</p>
        <p className="text-gray-400 text-sm mt-2">
          Check back later for updates.
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
