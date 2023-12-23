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
 * Get all thesis proposals.
 */
export const getAllProposals = async () => {
  const jwt = getJwt(); // Fetch JWT here

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
 * Insert a new thesis proposal.
 */
export const insertProposal = async (professorId, proposalData) => {
  return axiosInstance
    .post(routes.insertProposal + professorId, proposalData)
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
 * @param {*} proposalData
 * @returns
 */
export const updateProposal = async (proposalData) => {
  const jwt = getJwt(); // Fetch JWT here

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
      console.error("Error while updating a proposal: ", error);
    });
};

// get all proposals of a professor based on professorId
export const getProposalsByProfessorId = async (professorId) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
    .get(routes.getProposalByProfessorId + professorId, {
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

export const deleteProposalById = async (proposalId) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
    .delete(routes.deleteProposalById + proposalId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
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
  const jwt = getJwt(); // Fetch JWT here

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
        return response.data;
      } else {
        console.error("Request failed with status: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error while copying proposal by id: ", error);
    });
};
export const getProposalsByStudentId = async (studentId) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
    .get(routes.getProposalByStudentId + studentId, {
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

export const getThesisStatusById = async (proposalId) => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
    .get(routes.getThesisStatusByProposalId + proposalId,{
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
export const getArchived = async () => {
  const jwt = getJwt(); // Fetch JWT here

  return axiosInstance
      .get(routes.getArchivedForLoggedProfessor,{
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
        console.error("Error while retrieving archived proposals for logged professor: ", error);
      });
};

