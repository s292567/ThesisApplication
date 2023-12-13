import axiosInstance from "./API_Config.js"; // Import your axios instance
import { apiRoutes as routes } from "../routes";

/**
 * Function to get JWT from localStorage
 */
const getJwt = () => {
  const jwt = localStorage.getItem("ROCP_token");
  return jwt ? jwt.substring(1, jwt.length - 1) : null;
};

//set virtual clock starting form virtual date in format "yyyy-MM-dd"
export const setVirtualClock = async (dateString) => {
    const jwt = getJwt();
    return axiosInstance.post(routes.setVirtualDate + dateString,{
        headers: {
            'Content-Type' : 'application/json' ,
            'Authorization': 'Bearer '+ jwt
        }}).then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Request failed with status: ', response.status);
        }
    }).catch(error => {
        console.error('Error while retrieving proposals by professorId: ', error);
    });
};
export const getVirtualClock = async () => {
  const jwt = getJwt();

  return axiosInstance
    .get(routes.getVirtualDate, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving proposals by professorId: ", error);
    });
};
