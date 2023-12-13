// StudentApplications.jsx is used to display the list of theses that the student has applied to.
import React, { useEffect, useState } from "react";
import {
  SectionTitle,
  SkeletonThesisList,
  SortingToolbar,
} from "../../components";
import { getAllApplicationsForLoggedInStudent } from "../../api/API_applications.js";
import StudentApplications from "./StudentApplications.jsx";

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState(null);
  const [sortedApplications, setSortedApplications] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      let username = localStorage.getItem("username");
      try {
        return await getAllApplicationsForLoggedInStudent(username);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications().then((response) => {
      setApplications(response);
      setSortedApplications(response);
    });
  }, []);

  const handleSortedData = (sortedProposals) => {
    
    const sortedApplicationsTmp = sortedApplications.sort((a, b) => {
      let valueA, valueB;
      valueA = sortedProposals.findIndex((el) => el.id === a.proposal.id);
      valueB = sortedProposals.findIndex((el) => el.id === b.proposal.id);
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });

    setSortedApplications(sortedApplicationsTmp);
    setReload(!reload); /// Without the reload the sortedApplications state is not updated or reloads too late
  };

  return (
    <>
      <SectionTitle text={"My applications:"} />
      {applications ? (
        <>
          <SortingToolbar
            proposals={applications.map((app) => app.proposal)}
            onSortedData={handleSortedData}
          />
          <StudentApplications applications={sortedApplications} />
        </>
      ) : (
        <SkeletonThesisList count={3} />
      )}
    </>
  );
}
