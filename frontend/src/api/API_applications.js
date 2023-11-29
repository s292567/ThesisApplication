// API_applications.js

import axiosInstance from './API_Config.js'; // Import your axios instance
import { apiRoutes as routes } from '../routes';


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