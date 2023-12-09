// API_proposals.js

import axiosInstance from "./API_Config.js"; // Import your axios instance
import { apiRoutes as routes } from "../routes";

/**
 * Get all thesis proposals.
 */
export const getAllProposals = async () => {
  let jwt = localStorage.getItem("ROCP_token");
  jwt = jwt.substring(1, jwt.length - 1);
  return axiosInstance
    .get(routes.getAllProposals, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("getAllProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving all proposals: ", error);
    });
};

/*
getting proposals by CDS
 */
export const GetProposalsByCds = async (cds) => {
  try {
    const response = await fetch(routes.getProposalsByCds + `?cds=${cds}`);

    if (response.ok) {
      const data = await response.json();
      console.log("getProposalsByCds: ", data);
      return data;
    } else {
      console.error("Request failed with status: ", response.status);
    }
  } catch (error) {
    console.error("Error while retrieving proposals by CDS: ", error);
  }
};

/**
 * Get thesis proposals filtered by Course of Study (CDS).
 */
export const getProposalsByCds = async (cds) => {
  return axiosInstance
    .get(routes.getProposalsByCds + `?cds=${cds}`)
    .then((response) => {
      if (response.status === 200) {
        console.log("getProposalsByCds: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving proposals by CDS: ", error);
    });
};

/**
 * Search thesis proposals based on a query string.
 */
export const searchProposals = async (studentId, query) => {
  return axiosInstance
    .post(routes.searchProposals + studentId + "?query=" + query)
    .then((response) => {
      if (response.status === 200) {
        console.log("searchProposals: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while searching for proposals: ", error);
    });
};

/**
 * Insert a new thesis proposal.
 */
export const insertProposal = async (professorId, proposalData) => {
  return axiosInstance
    .post(routes.insertProposal + `${professorId}`, proposalData)
    .then((response) => {
      if (response.status === 201) {
        console.log("insertProposal: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while inserting a new proposal: ", error);
    });
};

/**
 * Apply to a thesis proposal.
 */
export const applyToProposal = async (applicationData) => {
  return axiosInstance
    .post(routes.applyToProposal, applicationData)
    .then((response) => {
      if (response.status === 201) {
        console.log("applyToProposal: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while applying to a proposal: ", error);
    });
};


/**
 * EDIT PROPOSAL
 * @param {*} proposalId 
 * @param {*} proposalData 
 * @returns 
 */
export const updateProposal = async (proposalData) => {
  let jwt = localStorage.getItem("ROCP_token");
  jwt = jwt.substring(1, jwt.length - 1);
  return axiosInstance
    .put(routes.updateProposal + proposalData.id, proposalData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
    .then((response) => {
      if (response.status === 201) {
        console.log("update Proposal: ", response.data);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while inserting a new proposal: ", error);
    });
};

// get all proposals of a professor based on professorId
export const getProposalsByProfessorId = async (professorId) => {
  let jwt = localStorage.getItem("ROCP_token");
  jwt = jwt.substring(1, jwt.length - 1);
  return axiosInstance
    .get(routes.getProposalByProfessorId + professorId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // console.log("API getProposalsByProfessorId: ", response);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving proposals by professorId: ", error);
    });
};

export const deleteProposalById = async (proposalId) => {
  let jwt = localStorage.getItem("ROCP_token");
  jwt = jwt.substring(1, jwt.length - 1);

  return axiosInstance
    .delete(
      routes.deleteProposalById + proposalId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((response) => {
      if (response.status === 204) {
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while deleting proposal by proposalId: ", error);
    });
};

export const copyProposalById = async (proposalId) => {
  let jwt = localStorage.getItem("ROCP_token");
  jwt = jwt.substring(1, jwt.length - 1);

  return axiosInstance
    .post(
      routes.copyProposalById + proposalId,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        // console.log("API getProposalsByProfessorId: ", response);
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while copying proposal by id: ", error);
    });
};
