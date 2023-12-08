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
// import { deleteProposalById } from "../../api";
import { copyProposalById } from "../../api";

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

  const handleDelete = async (id) => {
    try {
      // await deleteProposalById(id);
      const newThesesData = proposals.filter((proposal) => proposal.id !== id);
      setProposals(newThesesData);
      setSortedThesisData(newThesesData);
    } catch (error) {
      console.error("Failed to delete proposal:", error);
    }
  };

  const handleCopy = async (id) => {
    try {
      // Call the API function to copy the proposal
      const copiedProposal = await copyProposalById(id);

      if (copiedProposal) {
        // Add the new copied proposal to the proposals list
        const newThesesData = [...proposals, copiedProposal];
        setProposals(newThesesData);
        setSortedThesisData(newThesesData);
      } else {
        console.error("No response for the copied proposal");
      }
    } catch (error) {
      console.error("Failed to copy proposal:", error);
    }
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
          <ThesesList
            thesesData={sortedThesisData}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <SkeletonThesisList count={3} />
      )}
    </>
  );
}
