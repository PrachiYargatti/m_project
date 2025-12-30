import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { useContext } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const role = sessionStorage.getItem("role");

  const logout = () => {
    sessionStorage.clear();
    setLoginStatus(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Student Portal</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#studentNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="studentNavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            {role === "student" && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-courses">My Courses</Link>
              </li>
            )}
          </ul>

          {!loginStatus ? (
            <button
              className="btn btn-outline-light"
              onClick={() => navigate('/')}
            >
              Login
            </button>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {role === "admin" ? "Admin" : "Student"}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/change-password">
                    Change Password
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
