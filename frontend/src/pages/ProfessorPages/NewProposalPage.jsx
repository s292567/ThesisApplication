
import React, {useState} from "react";
import {SectionTitle, SortingToolbar,} from "../../components";
import RequestList from "../../components/RequestList/RequestList.jsx"
import sortedThesisData from "../../components/GeneralComponents/SortingToolbar.jsx"


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


    return (
        <>
            <SectionTitle text={"New Proposals:"} />
            <>
                {/*<SortingToolbar*/}
                {/*    proposals={requested.map((app) => app.request())}*/}
                {/*    onSortedData={handleSortedData}*/}
                {/*/>*/}
                <RequestList />
            </>


        </>
    );
}


