import connectMongoDB from "@/libs/mongodb";
import MedTopic from "@/models/mongoHistory";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { commentId } = req.query;
  const userID = await getSession();

  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      await MedTopic.deleteOne({ id: commentId });
      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
