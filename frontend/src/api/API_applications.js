// API_proposals.js

import axiosInstance from './API_Config.js'; // Import your axios instance
import { apiRoutes as routes } from '../routes';


/**
 * Accept an application to a proposal
 */
export const acceptApplication = async (applicationId) => {
    return axiosInstance.patch(routes.acceptApplication, {id:applicationId, status:"accepted"})
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
export const declineApplication = async (applicationId) => {
    return axiosInstance.patch(routes.acceptApplication, {id:applicationId, status:"declined"})
        .then(response => {
            if (response.status === 200)
                console.log("Application declined");
            else
                console.error('Request failed with status: ', response.status);
        }).catch(error =>{
            console.error('Error while declining an application: ', error);
        });
};