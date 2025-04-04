import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect handled by the router
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to HomeCare</h1>
      <p className="mb-6 text-gray-600">You are logged in as: {currentUser?.email}</p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">This is your personal dashboard where you'll see all your HomeCare services.</p>
      </div>
      
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;