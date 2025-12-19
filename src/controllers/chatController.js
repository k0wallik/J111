const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');

async function showChat(req, res, next) {
    try {
        const db = getDB();
        const { user } = req.query;

        let filter = {};
        if (user) filter.username = user;

        const messages = await db
            .collection('messages')
            .find(filter)
            .sort({ createdAt: 1 })
            .toArray();

        res.render('chat', {
            user: req.session.user,
            messages,
            selectedUser: user || ''
        });
    } catch (err) {
        next(err);
    }
}

async function addMessage(req, res, next) {
    try {
        const db = getDB();
        const { message } = req.body;
        const user = req.session.user;

        if (!message || message.trim() === '') {
            return res.render('chat', { user, messages: [], selectedUser: '', error: 'Wiadomość nie może być pusta' });
        }

        await db.collection('messages').insertOne({
            username: user.username,
            message,
            createdAt: new Date()
        });

        await db.collection('users').updateOne(
            { username: user.username },
            { $inc: { points: 1 } }
        );

        const updatedUser = await db.collection('users').findOne({ username: user.username });
        req.session.user.points = updatedUser.points;

        res.redirect('/chat');
    } catch (err) {
        next(err);
    }
}

async function deleteMessage(req, res, next) {
    try {
        const db = getDB();
        const { id } = req.params;
        const user = req.session.user;

        await db.collection('messages').deleteOne({
            _id: new ObjectId(id),
            username: user.username
        });

        res.redirect('/chat');
    } catch (err) {
        next(err);
    }
}

async function editMessageForm(req, res, next) {
    try {
        const db = getDB();
        const { id } = req.params;
        const user = req.session.user;

        const message = await db.collection('messages').findOne({
            _id: new ObjectId(id),
            username: user.username
        });

        if (!message) return res.status(403).render('error', { status: 403, message: 'Brak dostępu', user });

        res.render('editMessage', { message, user });
    } catch (err) {
        next(err);
    }
}

async function editMessage(req, res, next) {
    try {
        const db = getDB();
        const { id } = req.params;
        const { message } = req.body;
        const user = req.session.user;

        if (!message || message.trim() === '') {
            return res.render('editMessage', { message: { _id: id, message: '' }, user, error: 'Wiadomość nie może być pusta' });
        }

        await db.collection('messages').updateOne(
            { _id: new ObjectId(id), username: user.username },
            { $set: { message } }
        );

        res.redirect('/chat');
    } catch (err) {
        next(err);
    }
}

module.exports = { showChat, addMessage, deleteMessage, editMessageForm, editMessage };
