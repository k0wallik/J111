const bcrypt = require('bcrypt');
const { getDB } = require('../../db');

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const MIN_PASSWORD_LENGTH = 6;

async function showLogin(req, res, next) {
    try {
        res.render('login', { error: null });
    } catch (err) {
        next(err);
    }
}

async function showRegister(req, res, next) {
    try {
        res.render('register', { error: null });
    } catch (err) {
        next(err);
    }
}

async function register(req, res, next) {
    try {
        const db = getDB();
        const { username, password } = req.body;

        if (!USERNAME_REGEX.test(username)) {
            return res.render('register', {
                error: 'Login musi mieć 3–20 znaków (litery, cyfry, _)'
            });
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return res.render('register', {
                error: 'Hasło musi mieć co najmniej 6 znaków'
            });
        }

        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return res.render('register', { error: 'Użytkownik już istnieje' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('users').insertOne({
            username,
            password: hashedPassword,
            points: 0,
            createdAt: new Date()
        });

        res.redirect('/auth/login');
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const db = getDB();
        const { username, password } = req.body;

        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.render('login', { error: 'Nieprawidłowy login lub hasło' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('login', { error: 'Nieprawidłowy login lub hasło' });
        }

        req.session.user = { _id: user._id, username: user.username, points: user.points };
        res.redirect('/chat');
    } catch (err) {
        next(err);
    }
}

function logout(req, res, next) {
    try {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { showLogin, showRegister, register, login, logout };
