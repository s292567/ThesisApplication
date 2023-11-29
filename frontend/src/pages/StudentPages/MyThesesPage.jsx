
import React, {useState, useEffect} from "react";
import {Typography} from "@mui/material";
import {SkeletonThesisList, ThesesList} from "../../components";
import {getAllProposals} from "../../api";
import MyTheses from "../../components/ThesesList/MyTheses.jsx";
import {getAllApplicationsForLoggedInStudent} from "../../api/API_applications.js";

export default function MyThesesPage() {
    const [proposals, setProposals] = useState(null);

    useEffect(() => {
        const fetchProposals = async () => {
            let username=localStorage.getItem("username")
            try {
                const response = await getAllApplicationsForLoggedInStudent(username); // This should be your API call
                return response
            } catch (error) {
                console.error("Failed to fetch proposals:", error);
            }
        };

        fetchProposals().then(response=>setProposals(response));
    }, []);
    /*const fetchStatus = async () => {
        try {
            // Make your API call to get the status
            const response = await fetch("your-api-endpoint");
            const data = await response.json();

            // Assume the API response has a 'status' property
            setStatus(data.status);
        } catch (error) {
            console.error("Error fetching status:", error);
            // Handle errors if needed
        }
    };*/

    // Fetch status when the component mounts
    /*useEffect(() => {
        fetchStatus();
    }, []); // Empty dependency array ensures the effect runs once on mount

*/
    return (<>
            <Typography variant="h3" color={"orange"} mb={3} mt={3}>My Theses:</Typography>
        {proposals ? (
            <MyTheses thesesData={proposals} view={'displayApply'}/>
        ) : (

                <SkeletonThesisList count={3}/>
        )}
        </>
    );
}
