const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const feedbackRoutes = require('./routes/feedbackRoutes')

const app = express()
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/feedback', feedbackRoutes)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})