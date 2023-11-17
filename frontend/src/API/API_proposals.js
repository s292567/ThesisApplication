import axiosInstance from './API_Config.js'; // Import your axios instance
import routes from '../assets/ApiRoutes.json'; // Import your routes

/**
 * Get all thesis proposals.
 */
export const getAllProposals = async () => {
  return axiosInstance.get(routes.getAllProposals,{        headers: {
          'Content-Type' : 'application/json' ,            'Authorization': 'Bearer '+ localStorage.getItem("jwt")
      }}).then(response => {
      if (response.status === 200) {
          console.log("getAllProposals: ", response.data);
          return response.data;
      } else {
          console.error('Request failed with status: ', response.status);
      }
  }).catch(error => {
      console.error('Error while retrieving all proposals: ', error);
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
            console.error('Request failed with status: ', response.status);
        }
    } catch (error) {
        console.error('Error while retrieving proposals by CDS: ', error);
    }
};





/**
 * Get thesis proposals filtered by Course of Study (CDS).
 */
export const getProposalsByCds = async (cds) => {
  return axiosInstance.get(routes.getProposalsByCds + `?cds=${cds}`).then(response => {
      if (response.status === 200) {
          console.log("getProposalsByCds: ", response.data);
          return response.data;
      } else {
          console.error('Request failed with status: ', response.status);
      }
  }).catch(error => {
      console.error('Error while retrieving proposals by CDS: ', error);
  });
};

/**
 * Search thesis proposals based on a query string.
 */
export const searchProposals = async (studentId,query) => {
  return axiosInstance.post( routes.searchProposals + studentId + '?query='+query).then(
      (response) => {
      if (response.status === 200) {
          console.log("searchProposals: ", response.data);
          return response.data;
      } else {
          console.error('Request failed with status: ', response.status);
      }
  }).catch(error => {
      console.error('Error while searching for proposals: ', error);
  });
};

/**
 * Insert a new thesis proposal.
 */
export const insertProposal = async (professorId, proposalData) => {
  return axiosInstance.post(routes.insertProposal + `${professorId}`, proposalData).then(response => {
      if (response.status === 201) {
          console.log("insertProposal: ", response.data);
          return response.data;
      } else {
          console.error('Request failed with status: ', response.status);
      }
  }).catch(error => {
      console.error('Error while inserting a new proposal: ', error);
  });
};

/**
 * Apply to a thesis proposal.
 */
export const applyToProposal = async (applicationData) => {
  return axiosInstance.post(routes.applyToProposal, applicationData).then(response => {
      if (response.status === 201) {
          console.log("applyToProposal: ", response.data);
          return response.data;
      } else {
          console.error('Request failed with status: ', response.status);
      }
  }).catch(error => {
      console.error('Error while applying to a proposal: ', error);
  });
};
