
import React, {useEffect, useState} from "react";
import {SectionTitle, SortingToolbar,} from "../../components";
import RequestList from "../../components/RequestList/RequestList.jsx"
import sortedThesisData from "../../components/GeneralComponents/SortingToolbar.jsx"
import {getAllPendingRequests, getAllPendingRequestsByProfessor} from "../../api/API_requests.js";
import {useUserContext} from "../../contexts/index.js";


export default function NewProposalPage() {
    // const [reload, setReload] = useState(false);
    // const [requested, setRequested] = useState(null);
    // const [sortedRequest, setSortedRequest] = useState([]);
    //
    // const handleSortedData = (sortedRequestList) => {
    //
    //     const sortedRequestTmp = sortedRequest.sort((a, b) => {
    //         let valueA, valueB;
    //         valueA = sortedRequestList.findIndex((el) => el.id === a.request.id);
    //         valueB = sortedRequestList.findIndex((el) => el.id === b.request.id);
    //         if (valueA < valueB) {
    //             return -1;
    //         }
    //         if (valueA > valueB) {
    //             return 1;
    //         }
    //         return 0;
    //     });
    //
    //     setSortedRequest(sortedRequestTmp);
    //     setReload(!reload);
    // };
    const { userId } = useUserContext();
    const [requests, setRequests] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                return await getAllPendingRequestsByProfessor(userId);
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
            <SectionTitle text={"New Requests:"} />
            <>
                {/*<SortingToolbar*/}
                {/*    proposals={requested.map((app) => app.request())}*/}
                {/*    onSortedData={handleSortedData}*/}
                {/*/>*/}
                <RequestList requests={requests} refreshList={()=>setRefresh((r)=>!r)}/>
            </>


        </>
    );
}


