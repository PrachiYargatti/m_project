import axios from "axios";
import config from "./config";

export async function getAllActiveCourses() {
  const URL = config.BASE_URL + "/course/all-active-courses";
  const response = await axios.get(URL);
  return response.data;
}

export async function getAllCourses(token) {
  const URL = config.BASE_URL + "/course/all-courses";
  const response = await axios.get(URL, {
    headers: { token }
  });
  return response.data;
}

export async function deleteCourseById(courseId, token) {
  const URL = config.BASE_URL + `/course/delete/${courseId}`;
  const response = await axios.delete(URL, {
    headers: { token } 
  });
  return response.data;
}

export const updateCourse = async (courseId, course, token) => {
  const URL = config.BASE_URL + `/course/update/${courseId}`;
  const response = await axios.put(URL, course, {
    headers: { token }
  });
  return response.data;
};

export const addCourse = async (course, token) => {
  const URL = config.BASE_URL + `/course/add`;
  const response = await axios.post(
    URL,
    course,
    {
      headers: {
        token
      }
    }
  );
  return response.data;
};

export const registerCourse = async (courseId, student, token) => {
  const URL = config.BASE_URL + `/student/register-to-course`;

  const response = await axios.post(
    URL,
    {
      course_id: courseId,
      name: student.name,
      email: student.email,
      mobile_no: student.mobile_no
    },
    {
      headers: { token }
    }
  );

  return response.data;
};
