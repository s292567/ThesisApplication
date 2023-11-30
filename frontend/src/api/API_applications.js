// API_applications.js

import axiosInstance from './API_Config.js'; // Import your axios instance
import { apiRoutes as routes } from '../routes';
import { getProposalsByProfessorId } from './API_proposals.js';


/**
 * Accept an application to a proposal
 */
export const acceptApplication = async (applicationId, professorId) => {
    return axiosInstance.patch(routes.acceptApplication+`/${professorId}`, {id:applicationId, status:"accepted"})
        .then(response => {
            if (response.status === 200)
                console.log("Application accepted");
            else
                console.error('Request failed with status: ', response.status);
        }).catch(error =>{
            console.error('Error while accepting an application: ', error);
        });
};
/**
 * Decline an application to a proposal
 */
export const declineApplication = async (applicationId, professorId) => {
    return axiosInstance.patch(routes.acceptApplication+`/${professorId}`, {id:applicationId, status:"declined"})
        .then(response => {
            if (response.status === 200)
                console.log("Application declined");
            else
                console.error('Request failed with status: ', response.status);
        }).catch(error =>{
            console.error('Error while declining an application: ', error);
        });
};

/**
 * Get all students that applied for a proposal
 */
export const getAllApplyingStudentsForProposal = async (proposalUUID) => {
    let jwt = localStorage.getItem("ROCP_token");
    jwt=jwt.substring(1,jwt.length-1);
    return axiosInstance.get(routes.browseAllApplyingStudents + String(proposalUUID), {
        headers: {
            'Content-Type' : 'application/json' ,
            'Authorization': 'Bearer '+ jwt
        }
    }).then(response => {
        if (response.status === 200) {
            console.log(response.data);
            return response.data; 
        } else {
            console.error('Request failed with status: ', response.status);
        }
    }).catch(error => {
        console.error('Error while browsing all applying students: ', error);
    }); 
};

/**
 * Get all application objects for a proposal
 */
export const getAllApplicationsForProposal = async (proposalUUID) => {
    let jwt = localStorage.getItem("ROCP_token");
    jwt=jwt.substring(1,jwt.length-1);
    return axiosInstance.get(routes.browseAllApplications + String(proposalUUID), {
        headers: {
            'Content-Type' : 'application/json' ,
            'Authorization': 'Bearer '+ jwt
        }
    }).then(response => {
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            console.error('Request failed with status: ', response.status);
        }
    }).catch(error => {
        console.error('Error while browsing all applications: ', error);
    });
};
/**
 * Get all application objects for loggedIn student
 */
export const getAllApplicationsForLoggedInStudent = async (studentId) => {
    let jwt = localStorage.getItem("ROCP_token");
    jwt=jwt.substring(1,jwt.length-1);
    return axiosInstance.get(routes.getaAllApplicationsForLoggedInStudent+String(studentId), {
        headers: {
            'Content-Type' : 'application/json' ,
            'Authorization': 'Bearer '+ jwt
        }
    }).then(response => {
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            console.error('Request failed with status: ', response.status);
        }
    }).catch(error => {
        console.error('Error while browsing all applications: ', error);
    });
};

/** 
 * Get all proposals, students and status of a thesis with application on it, based on the professor id
 * @param {string} professorId
 */
export const getAllApplicationsDataForProfessor = async (professorId) => {
    
    let proposalsMap = new Map(); // Use a Map for efficient lookup and grouping by proposals
    let studentsMap = new Map(); // Use a Map for efficient lookup and grouping by students

    try {
        const allProposals = await getProposalsByProfessorId(professorId);

        for (const proposal of allProposals) {
            const apps = await getAllApplicationsForProposal(proposal.id);
            const studs = await getAllApplyingStudentsForProposal(proposal.id);

            if (apps.length > 0 && studs.length > 0) {
                // Update proposalsMap
                proposalsMap.set(proposal, studs);

                // Update studentsMap
                studs.forEach(student => {
                    if (!studentsMap.has(student)) {
                        studentsMap.set(student, []);
                    }
                    studentsMap.get(student).push(proposal);
                });
            }
        }

        // Convert Maps to the desired structure
        const groupedByProposals = Array.from(proposalsMap).map(([proposal, students]) => [proposal, students]);
        const groupedByStudents = Array.from(studentsMap).map(([student, proposals]) => [student, proposals]);

        return { groupedByProposals, groupedByStudents };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
