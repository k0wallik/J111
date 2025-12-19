const { getDB } = require("../../db");
const { ObjectId } = require("mongodb");

function usersCollection() {
  return getDB().collection("users");
}

module.exports = {
  async createUser(username, hashedPassword) {
    const user = {
      username,
      password: hashedPassword,
      points: 0,
      createdAt: new Date(),
    };

    const result = await usersCollection().insertOne(user);
    return result.insertedId;
  },

  async findByUsername(username) {
    return usersCollection().findOne({ username });
  },

  async findById(id) {
    return usersCollection().findOne({
      _id: new ObjectId(id),
    });
  },

  async addPoint(userId) {
    await usersCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { points: 1 } }
    );
  },

  async listUsers(filter = {}, sort = {}) {
    return usersCollection()
      .find(filter)
      .sort(sort)
      .toArray();
  },
};
