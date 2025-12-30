const express = require("express")
const cors = require("cors")

const userRouter = require("./routes/user")
const studentRouter = require("./routes/student")
const courseRouter = require("./routes/course")
const videoRouter = require("./routes/video")
const adminRouter = require("./routes/admin")
const { authUser } = require("./utils/auth")

const app = express()

// CORS FIRST
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// JSON
app.use(express.json())

// PUBLIC ROUTES (NO AUTH)
app.use("/user", userRouter)

// AUTH AFTER LOGIN/SIGNUP
app.use(authUser)

// PROTECTED ROUTES
app.use("/course", courseRouter)
app.use("/video", videoRouter)
app.use("/admin", adminRouter)
app.use("/student", studentRouter)

app.listen(4000, () => {
  console.log("Server running on port 4000")
})
