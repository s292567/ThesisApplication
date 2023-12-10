// ThesesPage.jsx
import  { useState, useEffect } from "react";

import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  SortingToolbar,
  sortThesisData,
  Searchbar,
  NoDataDisplayed,
  PastelComponent,
  ThesisForm,
} from "../../components";
import { getProposalsByProfessorId, getProposalsByStudentId} from "../../api";
import { useUserContext } from "../../contexts/index.js";
import {
  copyProposalById,
  deleteProposalById,
  updateProposal,
  insertProposal,
} from "../../api";
import { Add } from "@mui/icons-material";

export default function ThesesPage() {
  const { user } = useUserContext();
  const userId = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(false);
  const [newThesisOpen, setNewThesisOpen] = useState(false);
  const [sortedThesisData, setSortedThesisData] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState({
    field: null,
    order: null,
  });

  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      let response;
      /* API CALL BASED ON ROLE */
      user.role === "Professor"
        ? (response = await getProposalsByProfessorId(userId))
        : (response = await getProposalsByStudentId(userId));
      return response;
    } catch (error) {
      console.error("Failed to fetch proposals:", error);
    } finally {
      setIsLoading(false);
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

  const handleEdit = async (editedThesis) => {
    try {
      // Call API to update the thesis
      await updateProposal(editedThesis);

      // Update the thesis in the sortedThesisData array
      const updatedThesisData = sortedThesisData.map((thesis) =>
        thesis.id === editedThesis.id ? editedThesis : thesis
      );

      reapplySorting(updatedThesisData); // Reapply sorting to the updated list
    } catch (error) {
      console.error("Failed to edit proposal:", error);
    }
  };

  const handleNewThesis = async (newThesis) => {
    try {
      // Call API to create the thesis
      await insertProposal(userId, newThesis);

      // Add the new thesis to the sortedThesisData array
      const updatedThesisData = [...sortedThesisData, newThesis];
      reapplySorting(updatedThesisData); // Reapply sorting to the updated list
    } catch (error) {
      console.error("Failed to create proposal:", error);
    }
  };

  return (
    <>
      <SectionTitle
        text={"Theses: "}
        style={{ marginTop: "7rem", marginBottom: 0 }}
      />
      {user.role === "Professor" ? (
        <>
          <PastelComponent
            bgColor={"#687EFF"}
            textColor={"white"}
            text={"Thesis"}
            icon={<Add sx={{ marginTop: "-2px" }} />}
            onClick={() => setNewThesisOpen(true)}
            style={{
              zIndex: "10",
              position: "absolute",
              top: { xs: "14%", sm: "18rem" },
              right: "5%",
              fontSize: "x-large",
              paddingRight: "1.5rem",
            }}
          />
          {newThesisOpen ? (
            <ThesisForm
              open={newThesisOpen}
              onClose={() => setNewThesisOpen(false)}
              onSubmit={handleNewThesis}
            />
          ) : null}
        </>
      ) : null}
      {isLoading ? (
        <SkeletonThesisList count={3} />
      ) : sortedThesisData && sortedThesisData.length === 0 ? (
        <NoDataDisplayed textNoDataDisplayed={"No theses found."} />
      ) : (
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
            handleEdit={handleEdit}
          />
        </>
      )}
    </>
  );
}
