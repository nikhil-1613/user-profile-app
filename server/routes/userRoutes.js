const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

router.get('/:username/profile', auth, async (req, res) => {
  const { username } = req.params;

  try {
    console.log(`Fetching legacy data for username: ${username}`);

    // Try legacy system
    const legacyRes = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`);

    let profile = null;

    if (legacyRes.data.length > 0) {
      // Legacy user found
      const legacyData = legacyRes.data[0];
      const githubUsername = legacyData.username || username;

      console.log(`Legacy user found. Fetching GitHub data for username: ${githubUsername}`);

      let githubData = {};
      try {
        const githubRes = await axios.get(`https://api.github.com/users/${githubUsername}`);
        githubData = githubRes.data;
      } catch (githubErr) {
        console.warn(`GitHub user not found or error for username: ${githubUsername}`);
        githubData = {
          avatar_url: '',
          html_url: '',
          bio: '',
          public_repos: 0,
        };
      }

      profile = {
        username,
        name: legacyData.name,
        email: legacyData.email,
        role: 'developer',
        city: legacyData.address.city,
        companyName: legacyData.company.name,
        github: {
          avatarUrl: githubData.avatar_url,
          profile: githubData.html_url,
          bio: githubData.bio,
          publicRepos: githubData.public_repos,
        }
      };
    } else {
      // Legacy user NOT found, try GitHub directly
      console.log(`Legacy user not found. Trying GitHub directly for username: ${username}`);

      try {
        const githubRes = await axios.get(`https://api.github.com/users/${username}`);
        const githubData = githubRes.data;

        profile = {
          username,
          name: githubData.name || '',
          email: githubData.email || '',
          role: 'developer',
          city: githubData.location || '',
          companyName: githubData.company || '',
          github: {
            avatarUrl: githubData.avatar_url,
            profile: githubData.html_url,
            bio: githubData.bio,
            publicRepos: githubData.public_repos,
          }
        };
      } catch (githubErr) {
        console.warn(`GitHub user not found for username: ${username}`);
        return res.status(404).json({ error: 'User not found in legacy system or GitHub' });
      }
    }

    console.log('Aggregated profile data:', profile);

    res.json(profile);

  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;
