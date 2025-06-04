import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    if (savedToken) setToken(savedToken);
  }, []);

  const fetchProfile = async () => {
    if (!username || !token) return;

    setLoading(true);
    setError('');
    setProfile(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/users/${username}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch {
      setError('Failed to fetch profile. Check token or username.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchProfile();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">🔎 User Profile Aggregator</h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <input
            type="text"
            placeholder="Enter GitHub or Legacy Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-3 rounded w-full text-lg"
          />
          <button
            onClick={fetchProfile}
            disabled={!username || !token}
            className={`w-full py-3 text-lg rounded font-semibold text-white transition ${
              !username || !token
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Fetching Profile...' : 'Get Profile'}
          </button>

          {error && <p className="text-red-600 font-medium">{error}</p>}
        </div>

        {profile && (
          <div className="mt-8 bg-white shadow-lg rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={profile.github.avatarUrl || 'https://via.placeholder.com/100'}
                alt="GitHub avatar"
                className="w-20 h-20 rounded-full border-2 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                <p className="text-gray-600">@{profile.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700">
              <div><strong>Email:</strong> {profile.email || 'Not available'}</div>
              <div><strong>City:</strong> {profile.city || 'N/A'}</div>
              <div><strong>Company:</strong> {profile.companyName || 'N/A'}</div>
              <div><strong>Role:</strong> {profile.role || 'N/A'}</div>
            </div>

            <div className="mt-4 bg-gray-100 rounded p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">GitHub Info</h3>
              <a
                href={profile.github.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                View GitHub Profile
              </a>
              <p className="mt-2 text-gray-700">{profile.github.bio || 'No bio available.'}</p>
              <p className="text-sm text-gray-600 mt-1"><strong>Public Repos:</strong> {profile.github.publicRepos}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfilePage = () => {
//   const [username, setUsername] = useState('');
//   const [profile, setProfile] = useState(null);
//   const [token, setToken] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const savedToken = localStorage.getItem('jwtToken');
//     if (savedToken) setToken(savedToken);
//   }, []);

//   const fetchProfile = async () => {
//     if (!username || !token) return;

//     setLoading(true);
//     setError('');
//     setProfile(null);

//     try {
//       const res = await axios.get(`http://localhost:5000/api/users/${username}/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       setProfile(res.data);
//     } catch {
//       setError('Failed to fetch profile. Check token or username.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') fetchProfile();
//   };

//   return (
//     <div className="p-8 max-w-xl mx-auto bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">User Profile Aggregator</h1>

//       <input
//         type="text"
//         placeholder="GitHub Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className="border p-2 mb-2 w-full rounded"
//       />

//       <input
//         type="password"
//         placeholder="JWT Token"
//         value={token}
//         onChange={(e) => {
//           setToken(e.target.value);
//           localStorage.setItem('jwtToken', e.target.value);
//         }}
//         onKeyDown={handleKeyDown}
//         className="border p-2 mb-4 w-full rounded"
//       />

//       <button
//         onClick={fetchProfile}
//         disabled={!username || !token}
//         className={`px-4 py-2 rounded w-full text-white transition ${
//           !username || !token ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
//         }`}
//       >
//         {loading ? 'Loading...' : 'Get Profile'}
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {profile && (
//         <div className="mt-6 border p-4 rounded shadow bg-white">
//           <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>City:</strong> {profile.city}</p>
//           <p><strong>Company:</strong> {profile.companyName}</p>

//           <div className="flex items-center mt-4">
//             <img
//               src={profile.github.avatarUrl}
//               alt="GitHub avatar"
//               className="w-12 h-12 rounded-full mr-3"
//             />
//             <div>
//               <a
//                 href={profile.github.profile}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline font-medium"
//               >
//                 GitHub Profile
//               </a>
//               <p className="text-sm">{profile.github.bio || 'No bio available'}</p>
//               <p className="text-sm"><strong>Repos:</strong> {profile.github.publicRepos}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
