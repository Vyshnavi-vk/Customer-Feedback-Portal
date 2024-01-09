const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getFeedback, getAllFeedbacks, getFeedbackById, addFeedback, updateFeedback, deleteFeedback } = require('../controllers/feedbackController')



router.get('/getfeedback', protect, getFeedback)
router.get('/getAllFeedbacks', getAllFeedbacks)
router.get('/getfeedback/:id', protect, getFeedbackById)
router.post('/addfeedback', protect, addFeedback)
router.put('/:id', protect, updateFeedback)
router.delete('/:id', protect, deleteFeedback)

module.exports = router



//john: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWJkNGU0ZWVmNTViMWQzYzZmNTMyMCIsImlhdCI6MTcwNDcxNTExNCwiZXhwIjoxNzA3MzA3MTE0fQ.WnsFq2WnNSRT_lONSmhAtcdizrVVrGA35-a0a1pr_40
