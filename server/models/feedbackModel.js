const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },
        feedback: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
    }
)

const Feedback = mongoose.model("Feedback", feedbackSchema)
module.exports = Feedback