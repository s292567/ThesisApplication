// ThesesPage.jsx
import { useState, useEffect, useCallback } from "react";

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
  RequestThesisForm,
} from "../../components";
import { useUserContext } from "../../contexts/index.js";
import {
  searchProposals,
  copyProposalById,
  deleteProposalById,
  updateProposal,
  insertProposal,
  getProposalsByStudentId,
  getProposalsByProfessorId,
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

  const handleResearch = useCallback(async (filters, searchQuery) => {
    try {
      // Call the API with filters and search query
      const thesisData = await searchProposals({
        ...filters,
        queryString: searchQuery,
      });
      setSortedThesisData(thesisData);
    } catch (error) {
      console.error("Error while fetching filtered data:", error);
    }
  }, []);

  const clearSearch = async () => {
    try {
      const freshData = await fetchProposals(); // Retrieve the initial data
      reapplySorting(freshData); // Reapply sorting to the updated list
    } catch (error) {
      console.error("Failed to clear filters:", error);
    }
  };

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteProposalById(id);
        const newThesesData = sortedThesisData.filter(
          (proposal) => proposal.id !== id
        );
        reapplySorting(newThesesData); // Reapply sorting to the updated list
      } catch (error) {
        console.error("Failed to delete proposal:", error);
      }
    },
    [sortedThesisData]
  );

  const handleCopy = useCallback(
    async (id) => {
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
    },
    [sortedThesisData]
  );

  const handleEdit = useCallback(
    async (editedThesis) => {
      try {
        // Call API to update the thesis
        await updateProposal(editedThesis);

        // Update the thesis in the sortedThesisData array
        const updatedThesisData = sortedThesisData.map((thesis) =>
          thesis.id === editedThesis.id
            ? {
                ...editedThesis,
                supervisor: { name: "Luca", surname: "Ferrari" }, // This must be changed when there will be the API to retrieve the profile infos
              }
            : thesis
        );
        reapplySorting(updatedThesisData); // Reapply sorting to the updated list
      } catch (error) {
        console.error("Failed to edit proposal:", error);
      }
    },
    [sortedThesisData]
  );

  const handleNewThesis = useCallback(
    async (newThesis) => {
      try {
        // Call API to create the thesis
        await insertProposal(userId, newThesis);

        // Add the new thesis to the sortedThesisData array
        const updatedThesisData = [
          ...sortedThesisData,
          { ...newThesis, supervisor: { name: "Luca", surname: "Ferrari" } }, // This must be changed when there will be the API to retrieve the profile infos
        ];
        reapplySorting(updatedThesisData); // Reapply sorting to the updated list
      } catch (error) {
        console.error("Failed to create proposal:", error);
      }
    },
    [userId, sortedThesisData]
  );

  const handleNewRequestThesis = useCallback(
    async (newThesis) => {
      try {
        // Call API to create the thesis
        // await insertRequestThesis(userId, newThesis);
      } catch (error) {
        console.error("Failed to create proposal:", error);
      }
    },
    [userId]
  );

  const handleArchive = useCallback(
    async (id) => {
      try {
        // Call API to archive the thesis
        // await archiveProposal(id);

        // Remove the thesis from the sortedThesisData array
        const updatedThesisData = sortedThesisData.filter(
          (thesis) => thesis.id !== id
        );
        reapplySorting(updatedThesisData); // Reapply sorting to the updated list
      } catch (error) {
        console.error("Failed to archive proposal:", error);
      }
    },
    [sortedThesisData]
  );

  return (
    <>
      <SectionTitle
        text={"Theses: "}
        style={{ marginTop: "10rem", marginBottom: 0 }}
      />
      <Searchbar handleResearch={handleResearch} clearSearch={clearSearch} />

      <PastelComponent
        bgColor={"#687EFF"}
        textColor={"white"}
        text={user.role === "Professor" ? "Thesis" : "Request Thesis"}
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
        user.role === "Professor" ? (
        <ThesisForm
          open={newThesisOpen}
          onClose={() => setNewThesisOpen(false)}
          onSubmit={handleNewThesis}
        />) : 
          user.role === "Student" ? (
            <RequestThesisForm 
              open={newThesisOpen}
              onClose={() => setNewThesisOpen(false)}
              onSubmit={handleNewRequestThesis}
            />
          ) : null
      ) : null}

      {isLoading ? (
        <SkeletonThesisList count={3} />
      ) : sortedThesisData && sortedThesisData.length === 0 ? (
        <NoDataDisplayed textNoDataDisplayed={"No theses found."} />
      ) : (
        <>
          <SortingToolbar
            proposals={sortedThesisData}
            onSortedData={handleSortedData}
          />
          {user.role === "Professor" ? (
            <ThesesList
              thesesData={sortedThesisData}
              handleDelete={handleDelete}
              handleCopy={handleCopy}
              handleEdit={handleEdit}
              handleArchive={handleArchive}
            />
          ) : (
            <ThesesList thesesData={sortedThesisData} />
          )}
        </>
      )}
    </>
  );
}
