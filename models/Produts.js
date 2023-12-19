import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    AdminId: {
      type: String,
      required: true,
    },
   
    productName: {
      type: String,
      required: true,
    },

    productPicturePath: {
      type: String,
      default: "",
    },
    reviews: {
      type: Array,
      default: [],
    },
    description: String,
    productPrize:String,
    rating:String,
    discount:String,
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);

export default Product;
