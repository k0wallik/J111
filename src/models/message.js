const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');

const collectionName = 'messages';

async function createMessage(userId, username, text) {
    const db = getDB();
    const result = await db.collection(collectionName).insertOne({
        userId: ObjectId(userId),
        username,
        text,
        createdAt: new Date()
    });
    return result;
}

async function getMessages(filter = {}, sort = { createdAt: 1 }) {
    const db = getDB();
    return db.collection(collectionName)
        .find(filter)
        .sort(sort)
        .toArray();
}

async function updateMessage(id, userId, newText) {
    const db = getDB();
    const result = await db.collection(collectionName).updateOne(
        { _id: ObjectId(id), userId: ObjectId(userId) },
        { $set: { text: newText } }
    );
    return result;
}

async function deleteMessage(id, userId) {
    const db = getDB();
    const result = await db.collection(collectionName).deleteOne(
        { _id: ObjectId(id), userId: ObjectId(userId) }
    );
    return result;
}

module.exports = {
    createMessage,
    getMessages,
    updateMessage,
    deleteMessage
};
