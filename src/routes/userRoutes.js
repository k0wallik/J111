const express = require('express');
const router = express.Router();
const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');
const { isLoggedIn } = require('../middleware/authMiddleware');

router.get('/user/:id', isLoggedIn, async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        if (!user) return res.status(404).render('404', { user: req.session.user || null });
        res.render('profile', { user: req.session.user, profile: user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
