// StudentApplications.jsx is used to display the list of theses that the student has applied to.
import React, { useEffect, useState } from "react";
import { SectionTitle, SkeletonThesisList } from "../../components";
import StudentApplications from "./StudentApplications.jsx";
import { getAllApplicationsForLoggedInStudent } from "../../api/API_applications.js";

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      let username = localStorage.getItem("username");
      try {
        // This should be your API call
        return await getAllApplicationsForLoggedInStudent(username);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications().then((response) => setApplications(response));
  }, []);

  return (
    <>
      <SectionTitle text={'My applications:'} />
      {applications ? (
        <StudentApplications applications={applications}/>
      ) : (
        <SkeletonThesisList count={3} />
      )}
    </>
  );
}
