const { getDB } = require("../../db");
const { ObjectId } = require("mongodb");

function messagesCollection() {
  return getDB().collection("messages");
}

module.exports = {
  async addMessage(text, authorId) {
    const message = {
      text,
      author: new ObjectId(authorId),
      createdAt: new Date(),
    };

    const result = await messagesCollection().insertOne(message);
    return result.insertedId;
  },

  async getMessages(filter = {}, sort = {}) {
    return messagesCollection()
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        { $sort: sort },
      ])
      .toArray();
  },

  async getOne(id) {
    return messagesCollection().findOne({
      _id: new ObjectId(id),
    });
  },

  async updateMessage(id, newText) {
    await messagesCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { text: newText } }
    );
  },

  async deleteMessage(id) {
    await messagesCollection().deleteOne({
      _id: new ObjectId(id),
    });
  },
};
