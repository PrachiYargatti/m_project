const jwt = require("jsonwebtoken")
const config = require("./config")
const result = require("./result")

function authUser(req, res, next) {
  const openRoutes = [
    "/user/signin",
    "/course/all-active-courses",
    "/student/register-to-course"
  ]

  if (openRoutes.includes(req.path)) return next()

  const token = req.headers.token
  if (!token) 
    return res.status(401).send(result.createResult("Token missing"))

  try {
    const payload = jwt.verify(token, config.SECRET)
    req.user = payload
    next()
  } catch {
    res.status(401).send(result.createResult("Invalid token"))
  }
}

function checkAuthorization(req, res, next) {
  if (req.user.role === "admin") 
    return next()
  res.status(403).send(result.createResult("Unauthorized"))
}

function checkAuthorizationForStudent(req, res, next) {
  if (req.user.role === "student") 
    return next()
  res.status(403).send(result.createResult("Unauthorized"))
}

module.exports = {authUser, checkAuthorization, checkAuthorizationForStudent}

// function checkAuthorization(req,res,next) {
//     const role = req.headers.role
//     if (role === 'admin'){
//         return next()
//     }
//     else{
//         res.send(result.createResult("Unauthorized Access"))
//     }
// }

// function checkAuthorizationForStudent(req,res,next) {
//     const role = req.headers.role 
//     if (role === "student"){
//         return next()
//     }
//     else{
//         res.send(result.createResult("Unauthorized Access"))
//     }
// }

// function checkAuthorizationForStudent(req, res, next) {
//   const token = req.headers.token

//   if (!token) {
//     return res.status(401).send(result.createResult("Token missing"))
//   }

//   try {
//     const payload = jwt.verify(token, config.SECRET) 
//     req.user = payload

//     if (payload.role !== "student") {
//       return res.status(403).send(result.createResult("Access denied"))
//     }

//     next()
//   } catch (err) {
//     return res.status(401).send(result.createResult("Invalid token"))
//   }
// }

// function authUser(req,res,next) {
//     const path = req.url
//     if(path == '/user/signin' || path == '/user/signup' || path == '/course/all-active-courses')
//         return next()
//     else {
//         const token = req.headers.token
//         if (!token)
//             res.send(result.createResult("Token is missing"))
//         else{
//             try {
//                 //authorization
//                 const payload = jwt.verify(token, config.SECRET)
//                 req.headers.email = payload.email
//                 req.headers.role = payload.role
//                 return next()
//             }
//             catch (err){
//                 res.send(result.createResult("Token is Invalid"))
//             }
//        }
//     }
// }