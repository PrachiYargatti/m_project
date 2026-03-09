import axios from "axios";
import config from "./config";

export const getEnrolledStudents = async (courseId, token) => {
  let URL = config.BASE_URL + "/admin/enrolled-students";

  if (courseId) {
    URL += `?course_id=${courseId}`;
  }

  const response = await axios.get(URL, {
    headers: { token }
  });

  return response.data;
};

export const getMyCourses = async (token) => {
  const URL = config.BASE_URL + "/student/my-courses";
  const response = await axios.get(URL, { headers: {token} })
  return response.data;
};

export const getCourseVideos = async (token) => {
  const URL = config.BASE_URL + `/student/my-course-with-videos`
  const response = await axios.get(URL, {headers: {token} })
  return response.data;
};

export const updateProfile = async (token, payload) => {
  const URL = config.BASE_URL + "/student/update-profile"

  const response = await axios.put(
    URL,
    payload,
    { headers: { token } }
  )

  return response.data
}
