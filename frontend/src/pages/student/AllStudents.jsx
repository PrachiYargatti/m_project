import { useEffect, useState } from "react";
import AppNavbar from "../../components/AppNavbar";
import { getEnrolledStudents } from "../../services/studentService";
import { getAllCourses } from "../../services/courseService";

function AllStudents() {
  const token = sessionStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  const loadStudents = async (cid = "") => {
    const res = await getEnrolledStudents(cid, token);
    if (res.status === "success") {
      setStudents(res.data);
    }
  };

  const loadCourses = async () => {
    const res = await getAllCourses(token);
    if (res.status === "success") {
      setCourses(res.data);
    }
  };

  const handleFilterChange = (e) => {
    const cid = e.target.value;
    setCourseId(cid);
    loadStudents(cid);
  };

  return (
    <>
      <AppNavbar />

      <div className="container py-5">
        <h3 className="text-center mb-4">All Students</h3>

        {/* Filter */}
        <div className="mb-4 w-25">
          <label className="form-label">Filter by Course</label>
          <select
            className="form-select"
            value={courseId}
            onChange={handleFilterChange}
          >
            <option value="">All Courses</option>
            {courses.map(c => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <table className="table table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.reg_no}>
                <td>{s.reg_no}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course_name || "N/A"}</td>
                <td>{s.mobile_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllStudents;
