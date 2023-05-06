import dbConnect from "@/database/dbConnection";
import multer from "multer";
import cloudinary from "cloudinary";
import News from "@/database/models/newsModel";
import { eslint } from "../../../../next.config";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    },
  }),
}).single("image");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await dbConnect().catch((err) => console.log(err));

      const uploadMiddlewarePromise = new Promise((resolve, reject) => {
        uploadMiddleware(req, res, (err) => {
          if (err) reject(err);
          resolve();
        });
      });

      await uploadMiddlewarePromise;

      const { discription, title, tags, subtitle } = req.body;

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      if (!req.file) {
        return res.status(400).send({
          success: false,
          message: "Cannot Upload Image as it is undefined or not",
        });
      }

      let news = new News({
        discription: discription,
        title: title,
        subtitle: subtitle,
        tags: JSON.parse(tags[1]),
      });

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      news.image = result.secure_url;

      await news.save();

      res.status(200).send({
        success: true,
        msg: "true",
        news: news,
        imageLink: result.secure_url,
      });
    } else {
      res.status(400).send({ success: false, message: "Method Not Allowed" });
    }
  } catch (err) {
    res.status(500).send({ error: err, req: req.body });
  }
}
