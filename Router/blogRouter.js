import express from 'express';
import blogModel from '../Model/blogModel';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const blogRouter = express.Router();

//Add blog 
blogRouter.post('/addBlog', upload.single("imageCover"), async (req, res) => {

    const newBlogData = {
        blogTitle: req.body.blogTitle,
        viewCount: req.body.viewCount,
        date: req.body.date,
        readTime: req.body.readTime,
        description: req.body.description,
        imageCover: req.file.path,
        descHtml: req.body.descHtml,
    }

    const newBlog = new blogModel(newBlogData);

    await newBlog.save()
        .then(() => res.send("new blog save in db"))
});

// Get ALL Blogs
blogRouter.get("/getBlogs", async (req, res) => {
    const allBLogs = await blogModel.find({});
    res.send(allBLogs);
});

// Get Blog by Id
blogRouter.get("/getBlogById/:id", async (req, res) => {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    res.send(blog);
})


export default blogRouter;

