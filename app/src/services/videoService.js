import axios from "axios";
import config from "./config";

export const getAllVideos = async (token, courseId = "") => {
  let URL = config.BASE_URL + "/video/all-videos";

  if (courseId) {
    URL += `?course_id=${courseId}`;
  }

  const response = await axios.get(URL, {
    headers: { token }
  });

  return response.data;
};

export const addVideo = async (video, token) => {
  const URL = config.BASE_URL + "/video/add";
  const response = await axios.post(URL, video, {
    headers: { token }
  });
  return response.data;
};

// UPDATE video
export async function updateVideo(videoId, video, token) {
  const URL = config.BASE_URL + `/video/update/${videoId}`;
  const response = await axios.put(
    URL,
    video,
    {
      headers: { token }
    }
  );
  return response.data;
}

export const deleteVideoById = async (videoId, token) => {
  const URL = config.BASE_URL + `/video/delete/${videoId}`;
  const response = await axios.delete(URL, {
    headers: { token }
  });
  return response.data;
};


// import axios from "axios";
// import config from "./config";

// // GET videos by course (for filter dropdown)
// export async function getVideosByCourse(courseId, token) {
//   const URL = config.BASE_URL + `/video/all-videos/${courseId}`;
//   const response = await axios.get(URL, {
//     headers: { token }
//   });
//   return response.data;
// }

// ADD video
// export async function addVideo(video, token) {
//   const URL = config.BASE_URL + `/video/add`;
//   const response = await axios.post(
//     URL,
//     video,
//     {
//       headers: { token }
//     }
//   );
//   return response.data;
// }

// // UPDATE video
// export async function updateVideo(videoId, video, token) {
//   const URL = config.BASE_URL + `/video/update/${videoId}`;
//   const response = await axios.put(
//     URL,
//     video,
//     {
//       headers: { token }
//     }
//   );
//   return response.data;
// }

// // DELETE video
// export async function deleteVideoById(videoId, token) {
//   const URL = config.BASE_URL + `/video/delete/${videoId}`;
//   const response = await axios.delete(URL, {
//     headers: { token }
//   });
//   return response.data;
// }
