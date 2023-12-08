// ProfessorDashboardPage.jsx
import React, { useState, useEffect } from "react";

import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  SortingToolbar,
  sortThesisData,
} from "../../components";
import { getAllProposals, getProposalsByProfessorId } from "../../api";
import { useUserContext } from "../../contexts/index.js";
import { copyProposalById, deleteProposalById } from "../../api";

export default function ThesesPage() {
  const { user } = useUserContext();

  const [proposals, setProposals] = useState(null);
  const [sortedThesisData, setSortedThesisData] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState({
    field: null,
    order: null,
  });
  const [reload, setReload] = useState(false);

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

  const handleSortedData = (sortedData, criteria, order) => {
    setSortedThesisData(sortedData);
    setSortingCriteria({ field: criteria, order }); // Capture current sorting criteria and order
  };

  const reapplySorting = (newThesesData) => {
    if (sortingCriteria.field && sortingCriteria.order) {
      const sortedData = sortThesisData(
        newThesesData,
        sortingCriteria.field,
        sortingCriteria.order
      );
      setSortedThesisData(sortedData);
    } else {
      // If no sorting is applied, just update with the current newThesesData
      setSortedThesisData(newThesesData);
    }
    // setReload(!reload); // Without the reload the sortedThesisData state is not updated or reloads too late
  };

  const handleDelete = async (id) => {
    try {
      await deleteProposalById(id);
      const newThesesData = proposals.filter((proposal) => proposal.id !== id);
      reapplySorting(newThesesData); // Reapply sorting to the updated list
      setProposals(newThesesData);
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
        reapplySorting(newThesesData); // Reapply sorting to the updated list
        setProposals(newThesesData);
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
            handleCopy={handleCopy}
          />
        </>
      ) : (
        <SkeletonThesisList count={3} />
      )}
    </>
  );
}
