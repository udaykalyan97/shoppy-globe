import { useRouteError, useNavigate} from "react-router-dom";


function NotFound(){
    const navigate = useNavigate();
    const err = useRouteError();
    const handleGoHome = () => {
        navigate('/');
      };
      
  return (
        <div className="bg-red-600 min-h-screen flex flex-col justify-center items-center text-center p-6">
            <div className="bg-red-400 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4">OOPS!!</h1>
                <h2 className="text-xl mb-4">Please Enter Correct Path</h2>
                <div className="text-lg mb-4">
                <h3 className="text-red-800">{err.status} {err.statusText}</h3>
                <p className="text-white">{err.data}</p>
                </div>
                <button
                onClick={handleGoHome}
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
                >Back to Homepage
                </button>
            </div>
        </div>
    );
}

export default NotFound;