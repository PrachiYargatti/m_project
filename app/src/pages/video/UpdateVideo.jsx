import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppNavbar from "../../components/AppNavbar";
import { getAllCourses } from "../../services/courseService";
import { updateVideo } from "../../services/videoService";
import { toast } from "react-toastify";

function UpdateVideo() {
  const { state } = useLocation();   // video data comes here
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [video, setVideo] = useState({
    course_id: "",
    title: "",
    youtube_url: "",
    description: ""
  });

  // preload video data
  useEffect(() => {
    if (state?.video) {
      setVideo(state.video);
    }
  }, [state]);

  // load courses
  useEffect(() => {
    getAllCourses(token).then(res => {
      if (res.status === "success") {
        setCourses(res.data);
      }
    });
  }, []);

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const result = await updateVideo(video.video_id, video, token);

    if (result.status === "success") {
      toast.success("Video updated successfully");
      navigate("/video/all");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container mt-5 w-50">
        <div className="shadow-lg border rounded p-4">
          <h3 className="text-center mb-4">Edit Video</h3>

          <div className="mb-3">
            <label className="form-label">Course</label>
            <select
              className="form-select"
              name="course_id"
              value={video.course_id}
              onChange={handleChange}
            >
              <option value="">Select course</option>
              {courses.map(c => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Video Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={video.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">YouTube URL</label>
            <input
              type="text"
              className="form-control"
              name="youtube_url"
              value={video.youtube_url}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={video.description}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-primary d-block mx-auto"
            onClick={submit}
          >
            Update Video
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateVideo;
