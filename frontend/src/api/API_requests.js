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

  return [
      { id:"da3b6f8c-d6f2-4b11-bbfc-71c412b35d3f",
          student:{id:"s655900",surname:"Anderson",name:"Sophia",gender:"Female",nationality:"Swedish",email:"s655900@example.com",codDegree:"Electrical Engineering",enrollmentYear:2018},
          title:"Intelligent Transportation Systems for Urban Mobility",
          description:"Develop a novel traffic management system using machine learning and IoT to optimize urban mobility, reduce congestion, and enhance traffic flow.",
          supervisor:{surname:"Ferrari",name:"Luca",email:"p101@example.com",group:{id:"G13",department:{codDepartment:"DEP01"}},department:{codDepartment:"DEP01"},id:"p101"},
          coSupervisors:["Hans Müller"]},
      {id:"000003e8-8169-21ee-b511-325096b39f47",
          student:{id:"s634020",surname:"Rossi",name:"Alice",gender:"Female",nationality:"Italian",email:"s634020@example.com",codDegree:"Mechanical Engineering",enrollmentYear:2021},
          title:"Energy-Efficient Building Design",
          description:"Explore sustainable architecture by integrating passive and active systems, leveraging renewables and smart tech for optimal energy efficiency.",
          supervisor:{surname:"Ferrari",name:"Luca",email:"p101@example.com",group:{id:"G13",department:{codDepartment:"DEP01"}},department:{codDepartment:"DEP01"},id:"p101"},
          coSupervisors:[]}
  ];
  /*return axiosInstance
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
      });*/
};

export const updateRequestSupervisorStatus = async (requestData, professorId) => {
  const jwt = getJwt(); // Fetch JWT here
    return;
  /*return axiosInstance
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
      });*/
};
