const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "You need to leave a positive thought about Chris or Britanni!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  thoughtAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
