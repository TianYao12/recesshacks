import mongoose, {Schema} from "mongoose";

const historySchema = new Schema(
    {
        userId: String,
        id: Number,
        text: String,
        date: {
            month: Number,
            day: String,
            hour: String,
            minute: String,
            seconds: String,
        }
    }, {
        timestamps: true,
    }
)

const Topic = mongoose.models.Topic || mongoose.model("Topic", historySchema);

export default Topic;