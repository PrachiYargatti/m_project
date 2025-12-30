import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";
import { getAllCourses } from "../../services/courseService";
import { addVideo } from "../../services/videoService";
import { toast } from "react-toastify";

function AddVideo() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [video, setVideo] = useState({
    course_id: "",
    title: "",
    description: "",
    youtube_url: ""
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const result = await getAllCourses(token);
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const result = await addVideo(video, token);
    if (result.status === "success") {
      toast.success("Video added");
      navigate("/admin/videos");
    } else {
      toast.error(result.error);
      toast.error("input all the fields")
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container mt-4 w-50">
        <div className="shadow-lg border rounded p-4">
          <h2 className="text-center mb-4">Add Video</h2>

          <div className="mb-3">
            <label className="form-label">Course</label>
            <select
              className="form-select"
              name="course_id"
              value={video.course_id}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              name="title"
              value={video.title}
              onChange={handleChange}
              placeholder="Enter video title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              name="description"
              value={video.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">YouTube URL</label>
            <input
              className="form-control"
              name="youtube_url"
              value={video.youtube_url}
              onChange={handleChange}
              placeholder="Enter YouTube URL"
            />
          </div>

          <button className="btn btn-success d-block mx-auto" onClick={submit}>
            Add Video
          </button>
        </div>
      </div>
    </>
  );
}

export default AddVideo;
