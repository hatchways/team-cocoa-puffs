const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const generateTimeStamp = require('../functions/generateTimestamp');

const ConversationSchema = new Schema({
  members: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      avatar: {
        type: String,
      },
      primaryLanguage: {
        type: String,
      },
    },
  ],
  messages: [
    {
      fromUser: {
        type: String,
      },
      // fromUser: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'users',
      // },
      primaryLanguage: {
        type: String,
      },
      text: {
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      createdOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema,
);
