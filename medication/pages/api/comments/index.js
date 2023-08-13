import connectMongoDB from "@/libs/mongodb";
import MedTopic from "@/models/mongoHistory";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { commentData } = req.body;
    const { disease, now, userID } = commentData;
    await connectMongoDB();
    await MedTopic.create({
      userId: userID,
      id: Date.now(),
      text: disease,
      date: {
        month: now.temp_month,
        day: now.temp_day,
        hour: now.temp_day,
      },
    });
    res.status(201).json({ message: "Disease tracked", comment: "works" });
  } else if (req.method === "GET") {
    try {
        const {user} = await getSession({req});
        if(!user) {
            return res.status(401).json({error: "User not authenticated"});
        }
        await connectMongoDB();
        const userComments = await MedTopic.find({userId: user.id});
        res.status(200).json(userComments);
        console.log(userComments);
    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }
  } else {
    res.status(405).json({ error: "Method not programmed" });
  }
}
