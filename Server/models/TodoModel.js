const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  user: { type: Types.ObjectId, ref: "UserModel" },
  text: { type: String, required: true },
  done: false,
  important: false,
  date: { type: Date, default: Date.now },
});

module.exports = model("TodoModel", schema);
