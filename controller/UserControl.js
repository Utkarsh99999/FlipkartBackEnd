import User from "../models/User.js";

//Register User:-
export const RegisterUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
   console.log("body data correct",email,phone);
    if (!email && !phone) {
      return res.status(400).json({ msg: "Email or phone is required." });
    }
    console.log("got email phone number");
    var existingUser = null;
    if(email){
      console.log("email present-> ",email);
      existingUser = await User.findOne({ email:email });
    }
    if(phone){
      console.log("phone present-> ",phone);
      existingUser = await User.findOne( { phone:phone });
    }
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }
    console.log("existingUser->",existingUser);

    const newUser = new User({
      email,
      phone,
    });

    console.log("newUser->",newUser);
    const savedUser = await newUser.save();
    console.log("savedUser->",savedUser);
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Login User:-
export const LoginUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    var user = '';
    if(email){
       user = await User.findOne({ email: email });
    }
    if(phone){
       user = await User.findOne({ phone: phone });
    }
    if (!user){
      return res.status(404).json({ msg: "User does not exist. " });
    } 
    res.status(200).json(user);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update Profile:-
export const UpdateProfileUser = async (req, res) => {
  try {
    const { firstName,lastName,email,phone } = req.body;
    console.log(req.body);
    var UpdatedUser = '';
    if(email){
       UpdatedUser = await User.findOneAndUpdate({ email: email },{
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
       });
       console.log(UpdatedUser);
    }
    if(phone){
      UpdatedUser = await User.findOneAndUpdate({ phone: phone },{
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
       });
       console.log(UpdatedUser);
    }
    if (!UpdatedUser){
      return res.status(400).json({ msg: "User does not exist. " });
    } 
    res.status(200).json(UpdatedUser);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//Upload Image of User:-
export const UploadImageUser = async (req, res) => {
  try {
    const { email,phone,Path } = req.body;
    console.log(req.body);
    var UpdatedUser = '';
    if(email){
       UpdatedUser = await User.findOneAndUpdate({ email: email },{
        PicturePath:Path,
       });
       console.log(UpdatedUser);
    }
    else{
      UpdatedUser = await User.findOneAndUpdate({ phone: phone },{
        PicturePath:Path,
       });
       console.log(UpdatedUser);
    }
    if (!UpdatedUser){
      return res.status(400).json({ msg: "User does not exist. " });
    } 
    res.status(200).json(UpdatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};