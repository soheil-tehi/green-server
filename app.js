import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import productRouter from './Router/productRouter';
import blogRouter from "./Router/blogRouter";
import userRouter from "./Router/userRouter";

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("mongoose connections is successful");
});

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use('/product', productRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);

app.get("/", (req, res) => {
    res.send("you can connect to server 😎")
})

app.listen(process.env.PORT, () => {
    console.log(`app listen on port ${process.env.PORT}`);
})