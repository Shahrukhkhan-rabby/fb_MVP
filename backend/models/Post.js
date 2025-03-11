const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    image: { type: String, default: "" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ user: mongoose.Schema.Types.ObjectId, text: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
