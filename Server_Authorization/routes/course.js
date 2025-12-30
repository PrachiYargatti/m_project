const express = require("express")
const result = require("../utils/result")
const pool = require("../db/pool")
const { checkAuthorization } = require("../utils/auth")
const router = express.Router()

// Admin APIs
// GET : course/all-active-courses (both student and admin)
router.get("/all-active-courses", (req,res) => {
    const sql = `SELECT * FROM courses WHERE CURDATE() BETWEEN start_date AND end_date`
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error,data))
    })
})

// /course/all-courses?startDate=2025-01-01&endDate=2025-12-31
router.get("/all-courses", checkAuthorization, (req, res) => {
    const { startDate, endDate } = req.query

    let sql = `SELECT * FROM courses`
    const params = []

    if (startDate && endDate) { //if both dates are provided
        sql += ` WHERE start_date BETWEEN ? AND ?`
        params.push(startDate, endDate)
    }

    sql += ' ORDER BY start_date DESC'

    pool.query(sql, params, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

// POST : /course/add
router.post("/add", checkAuthorization, (req,res) => {
    const {course_name, description, fees, start_date, end_date, video_expire_days} = req.body
    const sql = `INSERT INTO courses(course_name, description, fees, start_date, end_date, video_expire_days) VALUES(?,?,?,?,?,?);`
    pool.query(sql, [course_name, description, fees, start_date, end_date, video_expire_days], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

// PUT : /course/update/:course_id
router.put("/update/:course_id", checkAuthorization, (req,res) => {
    const {course_id} = req.params
    const {course_name, description, fees, start_date, end_date, video_expire_days} = req.body
    const sql = `UPDATE courses SET course_name = ?, description = ?, fees = ?, start_date = ?, end_date = ?, video_expire_days = ? WHERE course_id=?`
    pool.query(sql, [course_name, description, fees, start_date, end_date, video_expire_days, course_id], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

// DELETE : /course/delete/:course_id
router.delete("/delete/:course_id", checkAuthorization, (req,res) => {
    const {course_id} = req.params 
    const sql = `DELETE FROM courses WHERE course_id=?;`
    pool.query(sql, [course_id], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

module.exports = router

// router.get("/all-active-courses", (req,res) => {
//     const sql = `SELECT * FROM courses WHERE CURDATE() BETWEEN start_date AND end_date;`
//     pool.query(sql, (error,data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.get("/", (req,res) => {
//     const sql = `SELECT * FROM courses;`
//     pool.query(sql, (error,data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.put("/", (req,res) => {
//     const {fees, course_name} = req.body
//     const sql = `UPDATE courses SET fees=? WHERE course_name=?`
//     pool.query(sql, [fees, course_name], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.delete("/:course_id", (req,res) => {
//     const {course_id} = req.params
//     const sql = `DELETE FROM courses WHERE course_id=?;`
//     pool.query(sql, [course_id], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })