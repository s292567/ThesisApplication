// SecretaryPage.jsx

import React, {useContext, useEffect, useState} from "react";
import {SectionTitle, SortingToolbar,} from "../../components";
import RequestList from "../../components/RequestList/RequestList.jsx"
import sortedThesisData from "../../components/GeneralComponents/SortingToolbar.jsx"
import {getProposalsByProfessorId} from "../../api/index.js";
import {getAllPendingRequests} from "../../api/API_requests.js";
import {useUserContext} from "../../contexts/index.js";
import {AuthContext} from "react-oauth2-code-pkce";


export default function SecretaryPage() {
    const [requests, setRequests] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                return await getAllPendingRequests();
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            }
        };

        fetchRequests().then((data) => {
            setRequests(data);
        });
    },[refresh])




    return (
        <>
            <SectionTitle text={"Request List:"} />
            <>
                <RequestList requests={requests} refreshList={()=>setRefresh((r)=>!r)}/>
            </>


        </>
    );
}


