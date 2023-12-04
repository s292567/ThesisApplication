// StudentApplications.jsx is used to display the list of theses that the student has applied to.

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { SectionTitle, SkeletonThesisList } from "../../components";
import MyTheses from "../../components/ThesesList/MyTheses.jsx";
import { getAllApplicationsForLoggedInStudent } from "../../api/API_applications.js";

export default function StudentApplicationsPage() {
  const [proposals, setProposals] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      let username = localStorage.getItem("username");
      try {
        // This should be your API call
        return await getAllApplicationsForLoggedInStudent(username);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals().then((response) => setProposals(response));
  }, []);

  return (
    <>
      <SectionTitle text={'My applications:'} />
      {proposals ? (
        <MyTheses thesesData={proposals} view={"displayApply"} />
      ) : (
        <SkeletonThesisList count={3} />
      )}
    </>
  );
}
