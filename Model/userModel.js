import mongoose from "mongoose";

const userSChema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    cartItems: []
});

const userModel = mongoose.model("users", userSChema);

export default userModel;