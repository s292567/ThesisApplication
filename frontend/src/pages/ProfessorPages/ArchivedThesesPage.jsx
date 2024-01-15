// ArchivedThesesPage.jsx
import { useState, useEffect, useCallback } from "react";

import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  SortingToolbar,
  sortThesisData,
  Searchbar,
  NoDataDisplayed,
} from "../../components";
import { useUserContext } from "../../contexts/index.js";
import {

  getArchived,
} from "../../api";
import {searchProposalsArchive} from "../../api/API_search.js";


export default function ArchivedThesesPage() {
  const { user } = useUserContext();
  const userId = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(false);
  const [sortedThesisData, setSortedThesisData] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState({
    field: null,
    order: null,
  });

  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      return await getArchived(userId);
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
      const thesisData = await searchProposalsArchive({
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

  return (
    <>
      <SectionTitle
        text={"Archived theses: "}
        style={{ marginTop: "10rem", marginBottom: 0 }}
      />
      <Searchbar handleResearch={handleResearch} clearSearch={clearSearch} />

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
            <ThesesList thesesData={sortedThesisData} />
        </>
      )}
    </>
  );
}
