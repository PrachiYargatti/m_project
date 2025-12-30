const express = require("express")
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

const result = require("../utils/result")
const config = require("../utils/config")
const pool = require("../db/pool")
const { checkAuthorization } = require("../utils/auth")

const router = express.Router()

// // POST : /user/signup
// router.post("/signup", (req, res) => {
//     const {email, password, role} = req.body
//     const sql = `INSERT INTO users(email, password, role) VALUES(?,?,?)`
//     const hashedPassword = cryptojs.SHA256(password).toString()
//     pool.query(sql, [email, hashedPassword, role], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })

// POST : /user/signin
router.post("/signin", (req, res) => {
    const {email, password} = req.body
    const hashedPassword = cryptojs.SHA256(password).toString()
    const sql = `SELECT * FROM users WHERE email=? AND password=?`
    pool.query(sql, [email, hashedPassword], (error, data) => {
        if(error)
            res.send(result.createResult(error))
        else if(data.length == 0)
            res.send(result.createResult("Invalid email or password"))
        else{
            console.log(data)
            const user = data[0]
            const payload = {
                email: user.email,
                role: user.role
            }
            const token = jwt.sign(payload, config.SECRET)

            const userData = {
                email: user.email,
                role: user.role,
                token
            }
            res.send(result.createResult(null, userData))
        }
    })
})

// GET : get details by email (student) path => /user/
router.get("/", (req,res) => {
    const email = req.headers.email 
    const sql = `SELECT * FROM users WHERE email=?`
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

//GET : /user/all-students (get all students (admin))
router.get("/all-students", checkAuthorization, (req,res) => {
    const sql = `SELECT * FROM users;`
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error,data))
    })
}) 

// // DELETE : /user/delete (admin )
// router.delete("/delete", (req,res) => {
//     const email = req.headers.email
//     const sql = `DELETE FROM users WHERE email=?;`
//     pool.query(sql, [email], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// PUT : /user/update-password
// router.put("/update-password", (req,res) => {
//     const {newPassword, confirmPassword} = req.body
//     const email = req.headers.email
    
//     if(newPassword !== confirmPassword) {
//         res.send(result.createResult("New Password and Confirm Password do not match"))
//     }
//     else {
//         const hashedPassword = cryptojs.SHA256(newPassword).toString()
//         const sql = `UPDATE users SET password=? WHERE email=?;`
//         pool.query(sql, [hashedPassword, email], (error, data) => {
//             res.send(result.createResult(error,data))
//         })
//     }
// })

module.exports = router

// router.get("/", (req,res) => {
//     const sql = `SELECT * FROM users;`
//     pool.query(sql, (error,data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.post("/", (req,res) => {
//     const {email, password, role} = req.body
//     const sql = `INSERT INTO users(email, password, role) VALUES(?,?,?);`
//     pool.query(sql, [email,password,role], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })
