
import React, {useState, useEffect} from "react";
import {Typography} from "@mui/material";
import {SkeletonThesisList, ThesesList} from "../../components";
import {getAllProposals} from "../../api";
import MyTheses from "../../components/ThesesList/MyTheses.jsx";

export default function MyThesesPage() {
    const [proposals, setProposals] = useState(null);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await getAllProposals(); // This should be your API call
                setProposals(response);
            } catch (error) {
                console.error("Failed to fetch proposals:", error);
            }
        };

        fetchProposals();
    }, []);
    const fetchStatus = async () => {
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
    };

    // Fetch status when the component mounts
    useEffect(() => {
        fetchStatus();
    }, []); // Empty dependency array ensures the effect runs once on mount


    return (<>
            <Typography variant="h3" color={"orange"} mb={3} mt={3}>My Theses:</Typography>
        {proposals ? (
            <MyTheses thesesData={proposals.slice(0, 3)} view={'displayApply'}/>
        ) : (

                <SkeletonThesisList count={3}/>
        )}
        </>
    );
}
