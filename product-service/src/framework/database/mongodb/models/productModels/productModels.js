import mongoose from "mongoose";

//set the userSchema//
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    
  },
  category: {
    type: String,

  },
  price: {
    type: String,
  },
  discription: {
    type: String
  }
});

const productData = mongoose.model("product", productSchema); // Set the collection name to "user"

export default productData;