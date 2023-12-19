import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default:null,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      default:null,
      min: 2,
      max: 50,
    },
    phone: {
      type: String,
      default:null,
      min: 6,
      max: 12,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
      default: null,
      validate: [
        {
          validator: function (value) {
            return value || this.phone;
          },
          message: 'Email or phone is required.',
        },
      ],
    },
    PicturePath: {
      type: String,
      default:'',
    },
    location: String,
    cart: Array,
    orders:Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
