/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// import axios from "axios";

// export const axiosSecure = axios.create({
//     baseURL: "https://job-task-server-side-gules.vercel.app"
// });

// const UseAxios = () => {
//     axiosSecure.interceptors.request.use(
//         function (config) {
//             const token = localStorage.getItem("token");
//             config.headers.Authorization = `Bearer ${token}`;
//             return config;
//         },
//         function (error) {
//             return Promise.reject(error);
//         }
//     );

//     axiosSecure.interceptors.response.use(
//         function (response) {
//             return response;
//         },
//         function (error) {
//             const status = error.response.status;
//             console.log("status error", status);
//             return Promise.reject(error);
//         }
//     );

//     return axiosSecure;
// };

// export default UseAxios;

// UseAxios.jsx


import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "https://job-task-server-side-gules.vercel.app",
});

const UseAxios = () => {
  axiosSecure.interceptors.request.use(
    async function (config) {
      try {
        const token = await getToken();

        // Check if the token exists before attaching it to headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      } catch (error) {
        console.error("Error while attaching token to request:", error);
        return Promise.reject(error);
      }
    },
    function (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error?.response?.status;

      // If the error is 401 (Unauthorized) and the token is present, remove the token
      if (status === 401) {
        try {
          const token = await getToken();
          if (token) {
            localStorage.removeItem("token");
            // You may also redirect the user to a login page or handle it as needed
          }
        } catch (error) {
          console.error("Error while handling 401:", error);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

async function getToken() {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token || null);
  });
}

export default UseAxios;




