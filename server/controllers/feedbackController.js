const Feedback = require('../models/feedbackModel')

const getFeedback = async (req, res) => {
    const feedbacks = await Feedback.find({ user: req.user._id })
    res.json(feedbacks)
}

const getAllFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.find({})
    res.json(feedbacks)
}

const addFeedback = async (req, res) => {
    const { customerName, feedback } = req.body
    if (!customerName || !feedback) {
        res.status(400)
        throw new Error("Please fill all the details")
    }
    else {
        const feed = await Feedback.create({ user: req.user._id, customerName, feedback })
        res.status(201).json({ feed })
    }
}


const getFeedbackById = async (req, res) => {
    const feedback = await Feedback.findOne({ _id: req.params.id, user: req.user._id })
    if (feedback) {
        res.json(feedback)
    }
    else {
        res.status(404).json({ message: "feedback not found" })
    }

}


const updateFeedback = async (req, res) => {
    const { customerName, feedback } = req.body

    const feed = await Feedback.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { customerName, feedback },
        { new: true }
    )
    if (feed.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("You cant perform this action")
    }

    if (feed) {
        res.json(feed)
    }
    else {
        res.status(404)
        throw new Error("Feedback Not found")
    }
}


const deleteFeedback = async (req, res) => {
    const feedback = await Feedback.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!feedback) {
        return res.json({ msg: "Note not found" })
    }
    if (feedback) res.send('Note deleted successfully')
}

module.exports = { getFeedback, getAllFeedbacks, getFeedbackById, addFeedback, updateFeedback, deleteFeedback }