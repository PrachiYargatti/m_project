import { useEffect, useState } from "react"
import AppNavbar from "../../components/AppNavbar"
import { getMyCourses, getCourseVideos } from "../../services/studentService"

function MyCourses() {
  const token = sessionStorage.getItem("token")

  const [courses, setCourses] = useState([])
  const [videos, setVideos] = useState({})
  const [openCourse, setOpenCourse] = useState(null)

  useEffect(() => {
    loadCourses()
    loadVideos()
  }, [])

  const loadCourses = async () => {
    const res = await getMyCourses(token)
    if (res?.status === "success") {
      setCourses(res.data)
    }
  }

  const loadVideos = async () => {
    const res = await getCourseVideos(token)
    if (res?.status === "success") {
      const map = {}
      res.data.forEach(c => {
        map[c.course_id] = c.videos || []
      })
      setVideos(map)
    }
  }

  const toggleCourse = (courseId) => {
    setOpenCourse(prev => (prev === courseId ? null : courseId))
  }

  return (
    <>
      <AppNavbar />

      <div className="container py-5">
        <h3 className="text-center mb-4">My Registered Courses</h3>

        {courses.map(course => (
          <div key={course.course_id} className="card mb-3">
            <div
              className="card-header bg-primary text-white d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => toggleCourse(course.course_id)}
            >
              <span>{course.course_name}</span>
              <span>{openCourse === course.course_id ? "▲" : "▼"}</span>
            </div>

            {openCourse === course.course_id && (
              <div className="card-body">
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(course.start_date).toDateString()} |{" "}
                  <strong>End:</strong>{" "}
                  {new Date(course.end_date).toDateString()}
                </p>

                <h6>Videos</h6>

                {videos[course.course_id]?.length > 0 ? (
                  <ul className="list-group">
                    {videos[course.course_id].map(v => (
                      <li key={v.video_id} className="list-group-item">
                        {v.youtube_url ? (
                          <a
                            href={v.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fw-bold text-decoration-none"
                          >
                            {v.title}
                          </a>
                        ) : (
                          <span className="fw-bold text-muted">
                            {v.title}
                          </span>
                        )}

                        <br />
                        <small>
                          Added: {new Date(v.added_at).toDateString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No videos available</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default MyCourses
