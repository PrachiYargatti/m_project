const express = require("express")
const pool = require("../db/pool")
const cryptojs = require("crypto-js")
const { checkAuthorization } = require("../utils/auth")
const result = require("../utils/result")

const router = express.Router()

// GET : /admin/enrolled-students?course_id=205
router.get("/enrolled-students", checkAuthorization, (req, res) => {
  const { course_id } = req.query 

  let sql = `
    SELECT 
      s.reg_no,
      s.name,
      s.email,
      s.course_id,
      c.course_name,
      s.mobile_no
    FROM students s
    LEFT JOIN courses c 
      ON c.course_id = s.course_id
  `

  const params = []

  if (course_id) {
    sql += " WHERE s.course_id = ?"
    params.push(course_id)
  }

  sql += " ORDER BY s.reg_no ASC"

  pool.query(sql, params, (error, data) => {
    if (error)
      return res.send(result.createResult(error)) 

    res.send(result.createResult(null, data))
  })
})

//GET : /user/all-students (get all students (admin))
router.get("/all-students", checkAuthorization, (req,res) => {
    const sql = `SELECT * FROM users;`
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error,data))
    })
})

module.exports = router

// Additional APIs

// // PUT : admin/change-password
// router.put("/change-password", checkAuthorization, (req, res) => {
//   const { newPassword, confirmPassword } = req.body
//   const email = req.headers.email

//   if (!newPassword || !confirmPassword)
//     return res.send(result.createResult("Password fields required"))

//   if (newPassword !== confirmPassword)
//     return res.send(result.createResult("Passwords do not match"))

//   const hashed = cryptojs.SHA256(newPassword).toString()

//   const sql = `UPDATE users SET password=? WHERE email=?`
//   pool.query(sql, [hashed, email], (err, data) =>
//     res.send(result.createResult(err, data))
//   )
// })


// // PUT : admin/update-profile
// router.put("/update-profile", checkAuthorization, (req, res) => {
//   const oldEmail = req.headers.email
//   const { newEmail } = req.body

//   if (!newEmail)
//     return res.send(result.createResult("New email required"))

//   // Update users table
//   const userSql = `UPDATE users SET email=? WHERE email=?`

//   pool.query(userSql, [newEmail, oldEmail], (err) => {
//     if (err) return res.send(result.createResult(err))

//     // Keep students table in sync
//     const studentSql = `UPDATE students SET email=? WHERE email=?`
//     pool.query(studentSql, [newEmail, oldEmail], (err2) =>
//       res.send(result.createResult(err2, { email: newEmail }))
//     )
//   })
// })
