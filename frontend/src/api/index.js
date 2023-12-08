// Import functions from the API modules
import { 
    getAllProposals, 
    GetProposalsByCds, 
    getProposalsByCds, 
    searchProposals, 
    insertProposal, 
    applyToProposal,
    getProposalsByProfessorId, 
    deleteProposalById,
} from './API_proposals.js';

import {
    getAllApplicationsDataForProfessor,
    getAllApplicationsForLoggedInStudent,
} from './API_applications.js';

import axiosInstance from './API_Config.js'; // Import axios instance

import { 
    loginApi, 
    getProfileApi 
} from './API_User.js';


// Export all the API functions and the axios instance
export {
    getAllProposals, 
    GetProposalsByCds, 
    getProposalsByCds, 
    searchProposals, 
    insertProposal, 
    applyToProposal,

    deleteProposalById,

    axiosInstance,
    getProposalsByProfessorId,
    getAllApplicationsDataForProfessor,

    loginApi, 
    getAllApplicationsForLoggedInStudent,
    getProfileApi
};
