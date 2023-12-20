// SecretaryPage.jsx

import React, {useState} from "react";
import {SectionTitle, SortingToolbar,} from "../../components";
import RequestList from "../../components/RequestList/RequestList.jsx"
import sortedThesisData from "../../components/GeneralComponents/SortingToolbar.jsx"


export default function SecretaryPage() {







    return (
        <>
            <SectionTitle text={"Request List:"} />
            <>
                <RequestList thesesData={sortedThesisData} />
            </>


        </>
    );
}


