import express from "express";
import ProductModel from "../Model/productModel";
import blogModel from "../Model/blogModel";
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const productRouter = express.Router();

// Search Products
productRouter.get("/searchProduct/:textSearch", async (req, res) => {
    const textSearch = req.params.textSearch;
    const allProducts = await ProductModel.find({});
    const result = allProducts.filter(item => {
        return item.productName.includes(textSearch)
    })
    res.send(result);
})

// Get All Product
productRouter.get("/getAllProduct", async (req, res) => {
    const allProduct = await ProductModel.find({});
    res.send(allProduct);
});

// Get all house Plant
productRouter.get("/getHousePlants", async (req, res) => {
    const housePlants = await ProductModel.find({ category: "housePlant" });
    res.send(housePlants);
});

// Get all succulent
productRouter.get("/getSucculentPlants", async (req, res) => {
    const housePlants = await ProductModel.find({ category: "succulent" });
    res.send(housePlants);
});

// Get all cactus
productRouter.get("/getCactusPlants", async (req, res) => {
    const housePlants = await ProductModel.find({ category: "cactus" });
    res.send(housePlants);
});

// Get Product by ID
productRouter.get("/getProduct/:id", async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.send(product);
})

// Add Product
productRouter.post("/addProduct", upload.fields([{ name: "imageCover", maxCount: 1 }, { name: "imageDescription", maxCount: 1 }]), async (req, res) => {
    const newProductData = {
        productName: req.body.productName,
        price: req.body.price,
        heightPlant: req.body.heightPlant,
        heightPot: req.body.heightPot,
        imageCover: req.files["imageCover"][0].path,
        imageDescription: req.files["imageDescription"][0].path,
        description: req.body.description,
        category: req.body.category,
    }

    const newProduct = new ProductModel(newProductData);

    await newProduct.save()
        .then(() => res.send(`product ${req.body.productName} save to DB`))
})


export default productRouter;