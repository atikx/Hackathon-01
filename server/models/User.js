import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        messages: {
          type: [
            {
              que: {
                type: String,
              },
              ans: {
                type: String,
              },
            },
          ],
        },
        started: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
