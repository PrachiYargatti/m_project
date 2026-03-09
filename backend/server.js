const express = require("express") //js framework, Handles routing, middleware, HTTP lifecycle
const cors = require("cors") //Enables cross-origin requests (frontend ↔ backend)
// Prevents browser-level request blocking

const userRouter = require("./routes/user")
const studentRouter = require("./routes/student")
const courseRouter = require("./routes/course")
const videoRouter = require("./routes/video")
const adminRouter = require("./routes/admin")
const { authUser } = require("./utils/auth")
const db = require("./db/pool")

const app = express() 
app.use(cors())
app.use(express.json()) //Converts raw bytes → JavaScript object, Attaches it to req.body

db.getConnection((err, connection) => {
  if (err) console.log("Database Error:", err);
  else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});


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
