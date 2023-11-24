//API_config.js

import { apiRoutes } from "../routes"
import axios from "axios"; 

/**
 * Base API instance. Call the api endpoints by using the axiosInstance and add .requesttype (f.e. axiosInstance.post(...))
 */
const axiosInstance = axios.create({
    baseURL: apiRoutes.baseThesisProposalApiURL
}); 

export default axiosInstance; 