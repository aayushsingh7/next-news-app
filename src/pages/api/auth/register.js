import dbConnect from "@/database/dbConnection";
import User from "@/database/models/userModel";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res
        .status(400)
        .send({
          success: false,
          message: "Invalid Method Detected",
          validMethod: "POST",
        });
    await dbConnect().catch((err) => console.log(err));
    const { email, password, name } = req.body;

    const isUserExists = await User.findOne({ email: email });
    if (isUserExists)
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    const hashPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    if (!newUser._id) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Something went wrong while registering user ",
        });
    } else {
      res
        .status(200)
        .send({ success: true, message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
