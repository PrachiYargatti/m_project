const express = require("express")
const result = require("../utils/result")
const pool = require("../db/pool")
const { checkAuthorization } = require("../utils/auth")
const router = express.Router()

// Admin APIs
// GET : /video/all-videos?course_id=?
router.get("/all-videos", checkAuthorization, (req, res) => {
    const { course_id } = req.query;

    let sql = `
        SELECT 
        v.video_id,
        v.title,
        v.description,
        v.youtube_url,
        v.course_id,
        c.course_name
        FROM videos v
        JOIN courses c ON v.course_id = c.course_id
    `;

    const params = [];

    if (course_id) {
        sql += " WHERE v.course_id = ?";
        params.push(course_id);
    }

    pool.query(sql, params, (error, data) => {
        res.send(result.createResult(error, data));
    });
});


// POST : /video/add
router.post("/add", checkAuthorization, (req,res) => {
    const {course_id, title, description, youtube_url} = req.body
    const sql = `INSERT INTO videos(course_id, title, description, youtube_url) VALUES(?,?,?,?);`
    pool.query(sql, [course_id, title, description, youtube_url], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

// PUT : /video/update/:video_id
router.put("/update/:video_id", checkAuthorization, (req,res) => {
    const {video_id} = req.params
    const {course_id, title, description, youtube_url} = req.body
    const sql = `UPDATE videos SET course_id = ?, title = ?, description = ?, youtube_url = ? WHERE video_id=?`
    pool.query(sql, [course_id, title, description, youtube_url, video_id], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

// DELETE : /video/delete/:video_id
router.delete("/delete/:video_id", checkAuthorization, (req,res) => {
    const {video_id} = req.params 
    const sql = `DELETE FROM videos WHERE video_id=?;`
    pool.query(sql, [video_id], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

module.exports = router

// router.get("/", (req,res) => {
//     const sql = `SELECT * FROM videos;`
//     pool.query(sql, (error,data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.post("/", (req,res) => {
//     const {video_id, course_id, title, description, youtube_url, added_at} = req.body
//     const sql = `INSERT INTO videos(video_id, course_id, title, description, youtube_url, added_at) VALUES(?,?,?,?,?,?);`
//     pool.query(sql, [video_id, course_id, title, description, youtube_url, added_at], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.put("/", (req,res) => {
//     const {title, youtube_url} = req.body
//     const sql = `UPDATE videos SET youtube_url=? WHERE title=?`
//     pool.query(sql, [youtube_url, title], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.delete("/:video_id", (req,res) => {
//     const {video_id} = req.params
//     const sql = `DELETE FROM videos WHERE video_id=?;`
//     pool.query(sql, [video_id], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })