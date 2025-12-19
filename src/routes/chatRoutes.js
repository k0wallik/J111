const express = require('express');
const router = express.Router();

const {
    showChat,
    addMessage,
    deleteMessage,
    editMessageForm,
    editMessage
} = require('../controllers/chatController');

router.get('/', showChat);

router.post('/add', addMessage);

router.post('/delete/:id', deleteMessage);

router.get('/edit/:id', editMessageForm);

router.post('/edit/:id', editMessage);

module.exports = router;

