import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllCourses } from "../../services/courseService";
import AppNavbar from "../../components/AppNavbar";
import { deleteCourseById } from "../../services/courseService";
import { toast } from "react-toastify";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate()

  const token = sessionStorage.getItem("token");

  // On first render
  // React runs useEffect
  // token is read from sessionStorage
  // If token exists → getCourses() is called
  // If not → nothing happens

  // Whenever token changes
  // Effect runs again
  // If user logs in (token appears) → courses load automatically
  // If user logs out (token removed) → effect runs, but if(token) blocks API call

  useEffect(() => {
    if (token) {
      getCourses();
    }
  }, [token]);

  const getCourses = async () => {
    const result = await getAllCourses(token);

    if (result.status === "success") {
        console.log(result)
        setCourses(result.data);
    } else {
        console.log(result)
        setCourses([]);
    }
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const result = await deleteCourseById(courseId, token);

    if (result.status === "success") {
      toast.success("Course deleted");
      getCourses(); // refresh table
    } else {
      toast.error(result.error);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });


  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <h2 className="mb-3 text-center">All Courses</h2>

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Fees</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Expire Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((e) => (
                <tr key={e.course_id}>
                  <td>{e.course_id}</td>
                  <td>{e.course_name}</td>
                  <td>{e.description}</td>
                  <td>₹{e.fees}</td>
                  <td>{formatDate(e.start_date)}</td>
                  <td>{formatDate(e.end_date)}</td>
                  <td>{e.video_expire_days}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate("/admin/update-course", { state: { course: e } })}
                    >
                      ✏️
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCourse(e.course_id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllCourses;
