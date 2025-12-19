const { getDB } = require('../../db');

async function showLeaderboard(req, res, next) {
    try {
        const db = getDB();
        const { sort } = req.query;

        const sortOrder = sort === 'asc' ? 1 : -1;

        const users = await db.collection('users')
            .find()
            .sort({ points: sortOrder, username: 1 })
            .toArray();

        res.render('leaderboard', { user: req.session.user, users, sort });
    } catch (err) {
        next(err);
    }
}

module.exports = { showLeaderboard };

