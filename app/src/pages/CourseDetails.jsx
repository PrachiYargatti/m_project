import { useLocation, useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import courseImages from "../utils/courseImages";

function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  if (!course) 
    return <div className="container mt-5">Course not found.</div>;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <AppNavbar />
      <div className="container py-5">
        <button 
          className="btn btn-link mb-3 p-0" 
          style={{ textDecoration: 'none' }} 
          onClick={() => navigate(-1)}
        >
          ← Back to Courses
        </button>

        <div className="row align-items-start g-4">
          {/* Smaller, styled image */}
          <div className="col-md-4 d-flex justify-content-center">
            <img
              src={courseImages[course.course_name.trim()]}
              alt={course.course_name}
              className="img-fluid rounded shadow-sm"
              style={{
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Course info */}
          <div className="col-md-8">
            <h2 className="fw-bold mb-2">{course.course_name}</h2>
            <p className="text-muted mb-3">{course.description}</p>
            <p><strong>Start Date: </strong>{formatDate(course.start_date)}</p>
            <p><strong>End Date: </strong>{formatDate(course.end_date)}</p>
            <p><strong>Fees: </strong>₹{course.fees}</p>

            <button className="btn btn-success py-2 px-4" onClick={() => navigate("/register", { state: { course } })}>
              Register to Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
