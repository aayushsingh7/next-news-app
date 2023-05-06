import dbConnect from "@/database/dbConnection";
import News from "@/database/models/newsModel"

export default async function handler(req, res) {
  try {

    if(req.method !== "GET") return res.status(400).send({success:false,message:"Method Not Allowed"})

    dbConnect().catch((err)=> console.log(err))

    const latestNews = await News.find({})
      .sort({ createdAt: -1 }) 
      .limit(5);

    res.status(200).json({success:true,message:"Fetched Successfully",data:latestNews});
  } catch (err) {
    res.status(500).send(err);
  }
}
