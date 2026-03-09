import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { registerCourse } from "../services/courseService";

function RegisterCourse() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { course } = state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  if (!course) {
    return <div className="container mt-5">Invalid course</div>;
  }

  const handleRegister = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const student = {
        name,
        email,
        mobile_no: mobile
      };

      const response = await registerCourse(
        course.course_id,
        student,
        token
      );

      if (response.status === "success") {
        alert("Course registered successfully");
        navigate("/");
      } else {
        alert(response.error || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="container py-5 w-50">
        {/* Course summary */}
        <div className="card mb-4">
          <div className="card-body">
            <h5>{course.course_name}</h5>
            <p className="mb-1">Fees: ₹{course.fees}</p>
          </div>
        </div>

        {/* Registration form */}
        <div className="card shadow">
          <div className="card-body">
            <h4 className="mb-4">Register to Course</h4>

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <button
              className="btn btn-info w-100"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterCourse;
