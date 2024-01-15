// API_search.js
import axiosInstance from "./API_Config.js"; // Import your axios instance
import { apiRoutes as routes } from "../routes";

/**
 * Search thesis proposals based on selected filters.
 */
export const searchProposals = async (filterCriteria) => {
  try {
    let jwt = localStorage.getItem("ROCP_token");
    jwt = jwt.substring(1, jwt.length - 1);
    const response = await axiosInstance.post(routes.searchProposals, filterCriteria, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    if (response.status === 200) {
      console.log("searchProposals: ", response.data);
      return response.data;
    } else {
      console.error("Request failed with status: ", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error while searching for proposals: ", error);
    return [];
  }
};
export const searchProposalsArchive = async (filterCriteria) => {
    try {
        let jwt = localStorage.getItem("ROCP_token");
        jwt = jwt.substring(1, jwt.length - 1);
        const response = await axiosInstance.post(routes.searchProposalsArchive, filterCriteria, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt,
            },
        });

        if (response.status === 200) {
            console.log("searchProposals: ", response.data);
            return response.data;
        } else {
            console.error("Request failed with status: ", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error while searching for proposals: ", error);
        return [];
    }
};

// getDistinctSupervisors
export const getDistinctSupervisors = async () => {
  return axiosInstance
    .get(routes.getDistinctSupervisors)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct supervisors: ", error);
    });
};

// getDistinctCds V
export const getDistinctCds = async () => {
  return axiosInstance
    .get(routes.getDistinctCds)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct cds: ", error);
    });
};

// getDistinctCoSupervisors V
export const getDistinctCoSupervisors = async () => {
  return axiosInstance
    .get(routes.getDistinctCoSupervisors)
    .then((response) => {
      if (response.status === 200) {
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
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all distinct levels: ", error);
    });
};

