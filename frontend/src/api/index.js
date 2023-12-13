// Import functions from the API modules
import { 
    getAllProposals, 
    GetProposalsByCds, 
    getProposalsByCds,
    insertProposal, 
    applyToProposal,
    getProposalsByProfessorId, 
    deleteProposalById,
    copyProposalById,
    updateProposal,
    getProposalsByStudentId,
    getThesisStatusById,
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

import {
    getDistinctCds,
    getDistinctCoSupervisors,
    getDistinctSupervisors,
    getDistinctGroups,
    getDistinctKeywords,
    getDistinctTypes,
    getDistinctLevels,
    searchProposals,
} from './API_search.js';


// Export all the API functions and the axios instance
export {
    getAllProposals, 
    GetProposalsByCds, 
    getProposalsByCds, 
    searchProposals, 
    insertProposal, 
    applyToProposal,
    updateProposal,
    getProposalsByStudentId,
    deleteProposalById,
    copyProposalById,
    getThesisStatusById,

    axiosInstance,
    getProposalsByProfessorId,
    getAllApplicationsDataForProfessor,

    getDistinctCds,
    getDistinctCoSupervisors,
    getDistinctSupervisors,
    getDistinctGroups,
    getDistinctKeywords,
    getDistinctTypes,
    getDistinctLevels,

    loginApi, 


    getAllApplicationsForLoggedInStudent,
    getProfileApi

};
