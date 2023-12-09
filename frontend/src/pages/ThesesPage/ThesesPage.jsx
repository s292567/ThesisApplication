// ThesesPage.jsx
import React, { useState, useEffect } from "react";

import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  SortingToolbar,
  sortThesisData,
  Searchbar,
} from "../../components";
import { getAllProposals, getProposalsByProfessorId } from "../../api";
import { useUserContext } from "../../contexts/index.js";
import { copyProposalById, deleteProposalById } from "../../api";

export default function ThesesPage() {
  const { user } = useUserContext();

  const [sortedThesisData, setSortedThesisData] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState({
    field: null,
    order: null,
  });

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

  useEffect(() => {
    fetchProposals().then((response) => {
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
  };

  const handleResearch = async (filters, searchQuery) => {
    try {
      // Call the API with filters and search query

      // const thesisData = await yourSearchApiFunction(filters, searchQuery); // Replace with your actual API call

      const thesisData = await fetchProposals(); // Retrieve the initial data just now so that it's doing something
      setSortedThesisData(thesisData);
    } catch (error) {
      console.error("Error while fetching filtered data:", error);
    }
  };

  const clearSearch = async () => {
    try {
      const freshData = await fetchProposals(); // Retrieve the initial data
      reapplySorting(freshData); // Reapply sorting to the updated list
    } catch (error) {
      console.error("Failed to clear filters:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProposalById(id);
      const newThesesData = sortedThesisData.filter(
        (proposal) => proposal.id !== id
      );
      reapplySorting(newThesesData); // Reapply sorting to the updated list
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
        const newThesesData = [...sortedThesisData, copiedProposal];
        reapplySorting(newThesesData); // Reapply sorting to the updated list
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

      {sortedThesisData ? (
        <>
          <Searchbar
            handleResearch={handleResearch}
            clearSearch={clearSearch}
          />
          <SortingToolbar
            proposals={sortedThesisData}
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
