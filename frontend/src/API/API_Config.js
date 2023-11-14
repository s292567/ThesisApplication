import routes from '../assets/routes.json'; 
import axios from "axios"; 

/**
 * Base API instance. Call the api endpoints by using the axiosInstance and add .requesttype (f.e. axiosInstance.post(...))
 */
const axiosInstance = axios.create({
    baseURL: routes.baseThesisProposalApiURL
}); 

export default axiosInstance; 