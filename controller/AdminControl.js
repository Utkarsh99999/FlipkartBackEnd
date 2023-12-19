import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

//-------------------------------------------------------------------->
//Register Admin:-
export const RegisterAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const {email,phone,password,sellerType,country,address,gst,pan} = req.body;
    console.log(email,phone,password,sellerType,country,address,gst,pan);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);
    const newAdmin = new Admin({
          address: address,
          email:email,
          phone:phone,
          pan:pan,
          gstin:gst,
          country: country,
          password:passwordHash,
          sellerType:sellerType,
        });
    console.log("new admin created");
   const savedAdmin = await newAdmin.save();
   console.log(savedAdmin);
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//-------------------------------------------------------------------->
//Login  Admin:-
export const LoginAdmin = async (req, res) => {
  try {
    const { phone,email, password } = req.body;
    const admin = await Admin.findOne({ $or: [{ email },{ phone }] });
    if (!admin) return res.status(404).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    delete admin.password;
    res.status(200).json({ admin });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//-------------------------------------------------------------------->
//Upload Image of Admin:-
export const UploadImageAdmin = async (req, res) => {
  try {
    const {PicturePath,email}=req.body;
    const admin= await Admin.findOne({email:email});
    if(!admin)res.status(404).json('Admin Not Found');
    if(admin)admin.PicturePath = PicturePath;
    const UpdatedAdmin = await admin.save();
    res.status(200).json(UpdatedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//-------------------------------------------------------------------->


