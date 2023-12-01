import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {SkeletonThesisList} from "../../components";
import MyTheses from "../../components/ThesesList/MyTheses.jsx";
import {getAllApplicationsForLoggedInStudent} from "../../api/API_applications.js";
import Search from "../../components/Search.jsx";

export default function MyThesesPage() {
    const [proposals, setProposals] = useState(null);

    useEffect(() => {
        const fetchProposals = async () => {
            let username=localStorage.getItem("username")
            try {
                 // This should be your API call
                return await getAllApplicationsForLoggedInStudent(username)
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
            <Search />
        {proposals ? (
            <MyTheses thesesData={proposals} view={'displayApply'}/>
        ) : (

                <SkeletonThesisList count={3}/>
        )}
        </>
    );
}
