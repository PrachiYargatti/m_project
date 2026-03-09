import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateCourse } from "../../services/courseService";
import AppNavbar from "../../components/AppNavbar";
import { toast } from "react-toastify";

function UpdateCourse() {
  const { state } = useLocation(); // contains old course data
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // EMPTY fields initially
  const [course, setCourse] = useState({
    course_name: "",
    description: "",
    start_date: "",
    end_date: "",
    fees: "",
    video_expire_days: ""
  });

  if (!state?.course)
    return <div className="container mt-4">No course data</div>;

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    // MERGE old + new
    const updatedCourse = {
      ...state.course,   // existing DB values
      ...course          // overwrite only changed fields
    };

    const result = await updateCourse(
      state.course.course_id,
      updatedCourse,
      token
    );

    if (result.status === "success") {
      toast.success("Course updated successfully");
      navigate("/course/all-courses");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container mt-4 w-50">
        <div className="shadow-lg border rounded p-4">

          <h2 className="mb-4 text-center">Update Course</h2>

          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="course_name"
              className="form-control"
              value={course.course_name}
              onChange={handleChange}
              placeholder={state.course.course_name}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={course.description}
              onChange={handleChange}
              placeholder={state.course.description}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              value={course.start_date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="end_date"
              className="form-control"
              value={course.end_date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fees</label>
            <input
              type="number"
              name="fees"
              className="form-control"
              value={course.fees}
              onChange={handleChange}
              placeholder={state.course.fees}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Video Expire Days</label>
            <input
              type="number"
              name="video_expire_days"
              className="form-control"
              value={course.video_expire_days}
              onChange={handleChange}
              placeholder={state.course.video_expire_days}
            />
          </div>

          <button
            className="btn btn-success d-block mx-auto"
            onClick={submit}
          >
            Update Course
          </button>

        </div>
      </div>
    </>
  );
}

export default UpdateCourse;
