import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteMovies: [
    {
      movieId: { type: Number, required: true },
      title: { type: String, required: true },
      genre: { type: String },
    },
  ],
});
const User = mongoose.model("User", userSchema);

export default User;
