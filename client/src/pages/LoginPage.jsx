import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) return;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username });
      localStorage.setItem('jwtToken', res.data.token);
      navigate('/profile'); // Redirect to profile page
    } catch (err) {
      setError('Login failed. Please try a valid username.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <input
        type="text"
        placeholder="Enter username (e.g. Bret)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default LoginPage;
