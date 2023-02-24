const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todo: [{ type: Types.ObjectId, ref: "TodoModel" }],
});

module.exports = model("UserModel", schema);
