import dbConnect from "@/database/dbConnection";
import News from "@/database/models/newsModel";

export default async function handler(req, res) {
  try {

    if(req.method !== "GET") return res.status(400).send({success:false,message:"Method Not Allowed"})
    const page = parseInt(req.query.page);
    const limit = 8;

    await dbConnect().catch((err) => {
      throw new Error(err);
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    let data = await News.find();
    results.data = data.slice(startIndex, endIndex);

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    


    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
