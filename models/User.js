const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

// Creates new collection called 'users'
mongoose.model("users", userSchema);
