// ProfessorDashboardPage.jsx
import React, { useState, useEffect } from "react";

import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  SortingToolbar,
} from "../../components";
import { getAllProposals, getProposalsByProfessorId } from "../../api";
import { useUserContext } from "../../contexts/index.js";

export default function ThesesPage() {
  const { user } = useUserContext();

  const [proposals, setProposals] = useState(null);
  const [sortedThesisData, setSortedThesisData] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        let response;
        const userId = localStorage.getItem("username");
        /* API CALL BASED ON ROLE */
        user.role === "Professor"
          ? (response = await getProposalsByProfessorId(userId))
          : (response = await getAllProposals());
        return response;
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };
    fetchProposals().then((response) => {
      setProposals(response);
      setSortedThesisData(response);
    });
  }, []);

  const handleSortedData = (sortedData) => {
    setSortedThesisData(sortedData);
  };

  return (
    <>
      <SectionTitle text={"Theses: "} />

      {proposals ? (
        <>
          <SortingToolbar
            proposals={proposals}
            onSortedData={handleSortedData}
          />
          <ThesesList thesesData={sortedThesisData} />
        </>
      ) : (
        <SkeletonThesisList count={3} />
      )}
    </>
  );
}
