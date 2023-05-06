import dbConnect from "@/database/dbConnection";
import News from "@/database/models/newsModel";

export default async function handler(req, res) {
  try {
    if(req.method !== "GET") return res.status(400).send({success:false,message:"Method Not Allowed"})

    let tags = JSON.parse(req.query.tags);

    await dbConnect().catch((err)=> console.log(err))
    if(!tags || tags.length === 0) {
      return res.status(400).send({ success: false, message: "No tags provided" });
    }

    let relatedNews = await News.find({ tags: { $in: tags.map(tag => new RegExp(tag, "i")) } }).limit(5)
    if(relatedNews.length === 0) {
      return res.status(404).send({ success: false, message: "No Related News Found!", data:[] ,tags:tags});
    } else {
      return res.status(200).send({ success: true, message: "Fetching Successful", data: relatedNews , tags:tags });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
