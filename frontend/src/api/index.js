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
    getArchived
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
    searchProposalsArchive,
    searchProposals,
} from './API_search.js';

import {
    getVirtualClock,
    setVirtualClock,
}from './API_Virtual_Clock.js';

// Export all the API functions and the axios instance
export {
    getAllProposals, 
    GetProposalsByCds, 
    getProposalsByCds,
    searchProposalsArchive,
    searchProposals, 
    insertProposal, 
    applyToProposal,
    updateProposal,
    getProposalsByStudentId,
    deleteProposalById,
    copyProposalById,
    getThesisStatusById,
    getArchived,

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

    getVirtualClock,
    setVirtualClock,

    getAllApplicationsForLoggedInStudent,
    getProfileApi

};
