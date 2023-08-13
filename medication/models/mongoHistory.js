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
        }
    }, {
        timestamps: true,
    }
)

const MedTopic = mongoose.models.MedTopic || mongoose.model("MedTopic", historySchema);

export default MedTopic;