import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addCourse } from "../../services/courseService";
import AppNavbar from "../../components/AppNavbar";
import { toast } from "react-toastify";

function AddCourse() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [course, setCourse] = useState({
    course_name: "",
    description: "",
    fees: "",
    start_date: "",
    end_date: "",
    video_expire_days: ""
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const payload = {
      ...course,
      fees: Number(course.fees),
      video_expire_days: Number(course.video_expire_days)
    };

    const result = await addCourse(payload, token);

    if (result.status === "success") {
      toast.success("Course added successfully");
      navigate("/course/all-courses");
    } else {
      toast.error(result.error);
      toast.error("fill all the fields")
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="container mt-4 w-50">
        <div className="shadow-lg border rounded p-4">
          <h2 className="mb-4 text-center">Add Course</h2>

          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="course_name"
              className="form-control"
              value={course.course_name}
              onChange={handleChange}
              placeholder="Enter course name"
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
              placeholder="Enter description"
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
              placeholder="dd-----yyyy"
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
              placeholder="dd-----yyyy"
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
              placeholder="Enter course fees"
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
              placeholder="Enter number of days"
            />
          </div>

          <button className="btn btn-primary d-block mx-auto" onClick={submit}>
            Add Course
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCourse;
