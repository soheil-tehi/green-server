import express from "express";
import userModel from "../Model/userModel";
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

// Add new user
userRouter.post("/register", async (req, res) => {
    const email = req.body.email
    const getEmail = await userModel.findOne({ email });

    if (!getEmail) {
        const newUserData = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            cartItems: [],
        }
        console.log(newUserData);
        const newUser = new userModel(newUserData);
        const token = jwt.sign({
            userName: req.body.userName,
            email: req.body.email,

        }, "secret123")
        await newUser.save()
            .then(res.json({ status: "ok", user: token }));
    } else {
        res.send(false)
    }
});

// Login user
userRouter.post("/login", async (req, res) => {
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {

        const token = jwt.sign({
            userName: user.userName,
            email: user.email,

        }, "secret123")

        return res.json({ status: "ok", user: token })
    }
    else {
        return res.json({ status: "error", user: false })

    }
})


export default userRouter;