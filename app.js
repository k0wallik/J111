const express = require('express');
const path = require('path');
const session = require('express-session');

const { connectDB } = require('./db');

const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const userRoutes = require('./src/routes/userRoutes');
const leaderboardRoutes = require('./src/routes/leaderboardRoutes');

const { isLoggedIn } = require('./src/middleware/authMiddleware');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
  })
);

app.use('/auth', authRoutes);
app.use('/chat', isLoggedIn, chatRoutes);
app.use('/leaderboard', isLoggedIn, leaderboardRoutes);
app.use('/', userRoutes); 

app.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null });
});

app.use((req, res) => {
  res.status(404).render('404', { user: req.session.user || null });
});

app.use(errorHandler);

module.exports = app;
