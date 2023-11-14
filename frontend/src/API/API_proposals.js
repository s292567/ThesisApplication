import axiosInstance from './axiosInstance'; // Import your axios instance
import routes from './routes.json'; // Import your routes

/**
 * Get all thesis proposals.
 */
export const getAllProposals = () => {
  return axiosInstance.get(routes.getAllProposals).then(response => {
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

/**
 * Get thesis proposals filtered by Course of Study (CDS).
 */
export const getProposalsByCds = (cds) => {
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
export const searchProposals = (query) => {
  return axiosInstance.get(routes.searchProposals + `?query=${query}`).then(response => {
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
export const insertProposal = (professorId, proposalData) => {
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
export const applyToProposal = (applicationData) => {
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
