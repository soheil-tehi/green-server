import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    productName: String,
    price: Number,
    heightPlant: Number,
    heightPot: Number,
    imageCover: String,
    imageDescription: String,
    description: String,
    category: String,
});

const ProductModel = mongoose.model("Products", productschema);

export default ProductModel;