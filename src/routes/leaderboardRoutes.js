const express = require('express');
const router = express.Router();

const { showLeaderboard } = require('../controllers/leaderboardController');

router.get('/', showLeaderboard);

module.exports = router;
