import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";
import { getAllCourses } from "../../services/courseService";
import { getAllVideos, deleteVideoById } from "../../services/videoService";
import { toast } from "react-toastify";

function AllVideos() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (token) {
      loadCourses();
      loadVideos(); // load ALL videos initially
    }
  }, [token]);

  const loadCourses = async () => {
    const result = await getAllCourses(token);
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  const loadVideos = async (courseId = "") => {
    const result = await getAllVideos(token, courseId);
    if (result.status === "success") {
      setVideos(result.data);
    } else {
      setVideos([]);
    }
  };

  const handleFilter = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    loadVideos(courseId);
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    const result = await deleteVideoById(id, token);
    if (result.status === "success") {
      toast.success("Video deleted");
      loadVideos(selectedCourse);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">All Videos</h2>

        <div className="mb-3 w-25">
          <label className="form-label">Filter by Course</label>
          <select
            className="form-select"
            value={selectedCourse}
            onChange={handleFilter}
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Title</th>
              <th>Description</th>
              <th>YouTube</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No videos found
                </td>
              </tr>
            ) : (
              videos.map((v) => (
                <tr key={v.video_id}>
                  <td>{v.video_id}</td>
                  <td>{v.course_name}</td>
                  <td>{v.title}</td>
                  <td>{v.description}</td>
                  <td>
                    <a href={v.youtube_url} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() =>
                        navigate("/admin/update-video", {
                          state: { video: v }
                        })
                      }
                    >
                      ✏️
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteVideo(v.video_id)}
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

export default AllVideos;
