import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle: String,
    viewCount: Number,
    date: String,
    readTime: Number,
    description: String,
    imageCover: String,
    descHtml: String,
});

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;