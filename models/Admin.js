import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default:'',
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      default:'',
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
        type: String,
        required: true,
        min: 6,
        max: 12,
    },
    gstin:{
      type: String,
      max: 20,
    },
    pan:{
      type: String,
      max: 12,
    },
    country:{
     type:String,
     default:''
    },
   address:{
    type:String,
    default:''
   },
    PicturePath: {
      type: String,
      default:''
    },
    location: {
      type: String,
      default:''
    },
    sellerType: {
      type: String,
      default:''
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
