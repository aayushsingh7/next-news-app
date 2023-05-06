import dbConnect from "@/database/dbConnection";
import News from "@/database/models/newsModel";

export default async function handler(req, res) {
  try {
    if(req.method !== "GET") return res.status(400).send({success:false,message:"Method Not Allowed"})

    await dbConnect().catch((err) => console.log(err));
    let newsId = req.query.newsId;
    if (!newsId)
      return res.status(400).send({ success: false, message: "No News Id" });
    let getNews = await News.findOne({ _id: newsId });
    if (!getNews) {
      return res
        .status(404)
        .send({ success: false, message: "News Not Found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Fetching Successfull", data: getNews });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
