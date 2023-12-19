import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import {
  UploadImageAdmin,
  RegisterAdmin,
  LoginAdmin,
} from "./controller/AdminControl.js";
import {
  UploadImageUser,
  RegisterUser,
  LoginUser,
  UpdateProfileUser,
} from "./controller/UserControl.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Admin Routes :-
app.post("/upload/image/admin", upload.single("picture"), UploadImageAdmin);
app.post("/register/admin", RegisterAdmin);
app.post("/login/admin", LoginAdmin);

//User Routes :-
app.post("/upload/image/user", upload.single("picture"), UploadImageUser);
app.post("/register/user", RegisterUser);
app.post("/login/user", LoginUser);
app.put("/update/profile/user", UpdateProfileUser);

/* MONGOOSE SETUP */
const PORT = 3001 || process.env.PORT;
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
