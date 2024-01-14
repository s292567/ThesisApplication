// API_proposals.js

import axiosInstance from "./API_Config.js"; // Import your axios instance
import { apiRoutes as routes } from "../routes";

/**
 * Function to get JWT from localStorage
 */
const getJwt = () => {
  const jwt = localStorage.getItem("ROCP_token");
  return jwt ? jwt.substring(1, jwt.length - 1) : null;
};

/**
 * Get all thesis requests (only for secretary).
 */
export const getAllPendingRequests = async () => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
    .get(routes.allRequests, {
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
      console.error("Error while retrieving all proposals: ", error);
    });
};


/**
 * EDIT PROPOSAL
 * @param {*} requestData with fields `requestId` and `status`
 * @returns
 */
export const updateRequestStatus = async (requestData) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
    .patch(routes.allRequests, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Request status updated");
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while updating a proposal request: ", error);
    });
};

export const getAllPendingRequestsByProfessor = async (professorId) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
      .get(`${routes.allRequests}/${professorId}`, {
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
        console.error("Error while retrieving all proposals: ", error);
      });
};

export const updateRequestSupervisorStatus = async (requestData, professorId) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
      .patch(`${routes.allRequests}/${professorId}`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Request status updated");
        } else {
          console.error("Request failed with status: ", response.status);
        }
      })
      .catch((error) => {
        console.error("Error while updating a proposal request: ", error);
      });
};
