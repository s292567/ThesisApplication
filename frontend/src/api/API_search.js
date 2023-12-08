// API_search.js
import axiosInstance from "./API_Config.js"; // Import your axios instance
import { apiRoutes as routes } from "../routes";

// getDistinctSupervisors
export const getDistinctSupervisors = async () => {
  return axiosInstance
    .get(routes.getDistinctSupervisors)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct supervisors: ", error);
    });
};

// getDistinctCds
export const getDistinctCds = async () => {
  return axiosInstance
    .get(routes.getDistinctCds)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct cds: ", error);
    });
};

// getDistinctCoSupervisors
export const getDistinctCoSupervisors = async () => {
  return axiosInstance
    .get(routes.getDistinctCoSupervisors)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct coSupervisors: ", error);
    });
};

// getDistinctKeywords
export const getDistinctKeywords = async () => {
  return axiosInstance
    .get(routes.getDistinctKeywords)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct keywords: ", error);
    });
};

// getDistinctTypes
export const getDistinctTypes = async () => {
  return axiosInstance
    .get(routes.getDistinctTypes)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct types: ", error);
    });
};

// getDistinctGroups
export const getDistinctGroups = async () => {
  return axiosInstance
    .get(routes.getDistinctGroups)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct groups: ", error);
    });
};

// getDistinctLevels
export const getDistinctLevels = async () => {
  return axiosInstance
    .get(routes.getDistinctLevels)
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct levels: ", error);
    });
};
