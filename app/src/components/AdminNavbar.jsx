import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto">

            {/* Dashboard */}
            <li className="nav-item">
              <Link className="nav-link" to="/home">Dashboard</Link>
            </li>

            {/* Courses */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Courses
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/course/all-courses">
                    Get All Courses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/add-course">
                    Add Course
                  </Link>
                </li>
              </ul>
            </li>

            {/* Videos */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Videos
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/admin/videos">
                    Get All Videos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/add-video">
                    Add Video
                  </Link>
                </li>
              </ul>
            </li>

            {/* Students */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Students
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/admin/students">
                    Get All Students
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
