import dayjs from "dayjs";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Hidden from "@mui/material/Hidden";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import ProposalFilters from "../../components/SearchBar/ProposalFilters.jsx";
import { TEACHER_PROPOSALS_FILTERS } from "../../components/SearchBar/constans.js";

function ProposalsPage(props) {
    const proposals = props.proposals;
    const applications = props.applications;
    const currentDate = props.currentDate;
    const user = useContext(UserContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filterValues, setFilterValues] = useState({
        type: [],
        groups: [],
        startDate: null,
        endDate: null
    });
    const [selectedTeacherFilter, setSelectedTeacherFilter] = useState("all");

    const handleTeacherFilterChange = (selectedFilter) => {
        setSelectedTeacherFilter(selectedFilter);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleSearchInputChange = (value) => {
        setSearchInput(value);
    };

    const handleMenuInputChange = (filter, value) => {
        setFilterValues((prevValues) => ({
            ...prevValues,
            [filter]: value
        }));
    };

    const resetMenuFilters = () => {
        setFilterValues({
            type: [],
            groups: [],
            startDate: null,
            endDate: null
        });
    };

    const filteredStudentProposals = proposals
        .filter((proposal) => {
            const { title, co_supervisors, keywords, description, required_knowledge, notes } = proposal;

            // Convert supervisor ID to name
            const supervisor = props.teachers.find((teacher) => teacher.id === proposal.supervisor);
            const supervisorName = supervisor?.name || "";
            const supervisorSurname = supervisor?.surname || "";

            // Check if any field contains the search input
            const searchFields = [
                title,
                supervisorName,
                supervisorSurname,
                co_supervisors,
                keywords,
                description,
                required_knowledge,
                notes || ""
            ];

            return searchFields.some((field) => {
                if (field !== null && field !== undefined) {
                    return field.toLowerCase().includes(searchInput.toLowerCase());
                }
                return false;
            });
        })
        .filter((proposal) => {
            // Apply additional filters based on filterValues
            const { type, groups, startDate, endDate } = filterValues;

            // Check if proposal matches the filter values
            const proposalTypeArray = proposal.type.split(",").map((type) => type.trim());
            const typeMatch = type.length === 0 || proposalTypeArray.some((t) => type.includes(t));
            const groupsMatch = groups.length === 0 || groups.includes(proposal.groups);
            const expirationDate = dayjs(proposal.expiration_date);
            let isExpirationDateInRange = true;
            if (startDate !== null && endDate !== null) {
                isExpirationDateInRange =
                    (expirationDate.isAfter(dayjs(startDate)) || expirationDate.isSame(dayjs(startDate))) &&
                    (expirationDate.isBefore(dayjs(endDate)) || expirationDate.isSame(dayjs(endDate)));
            }
            return typeMatch && groupsMatch && isExpirationDateInRange;
        });

    const studentView = (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" sx={{ paddingY: { md: 4, xs: 2 }, marginLeft: { md: 4, xs: 0 } }}>
                    Theses Proposals
                </Typography>
            </Stack>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: 96,
                    marginX: { md: 3, xs: -1 }
                }}
            >
                <OutlinedInput
                    sx={{ borderRadius: 4, width: { md: "400px", xs: "200px" } }}
                    placeholder="Search proposal..."
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    value={searchInput}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "text.disabled", width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
                <ProposalFilters
                    groups={props.groups}
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={toggleDrawer}
                    filterValues={filterValues}
                    handleMenuInputChange={handleMenuInputChange}
                    resetMenuFilters={resetMenuFilters}
                />
            </Toolbar>
            <ProposalTable data={filteredStudentProposals} getTeacherById={props.getTeacherById} />
            <Box height={5} marginTop={3} />
        </>
    );

    const filteredTeacherProposals = proposals.filter((proposal) => {
        if (selectedTeacherFilter === "all") {
            return true;
        }
        if (selectedTeacherFilter === "active") {
            const isNotExpired = dayjs(proposal.expiration_date).isAfter(currentDate);
            const hasAcceptedApplications = applications.some(
                (application) => application.proposal_id === proposal.id && application.state === "accepted"
            );
            return isNotExpired && !hasAcceptedApplications;
        }
        return true;
    });

    const teacherView = (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" sx={{ paddingY: { md: 4, xs: 2 }, marginLeft: { md: 4, xs: 0 } }}>
                    My Theses Proposals
                </Typography>
                <Hidden smDown>
                    <Button component={Link} to="/add-proposal" variant="contained" sx={{ mr: 4 }} endIcon={<CreateIcon />}>
                        New Proposal
                    </Button>
                </Hidden>
            </Stack>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginX: 3,
                    marginY: -2
                }}
            >
                <Stack direction="row" spacing={1}>
                    {TEACHER_PROPOSALS_FILTERS.map((filter) => (
                        <Chip
                            key={filter.id}
                            label={filter.label}
                            variant={selectedTeacherFilter === filter.id ? "filled" : "outlined"}
                            onClick={() => handleTeacherFilterChange(filter.id)}
                            sx={{ height: 30 }}
                        />
                    ))}
                </Stack>
            </Toolbar>
            <ProposalTable data={filteredTeacherProposals} />
            <Box height={5} marginTop={3} />
            <Hidden smUp>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ position: "fixed", bottom: 24, right: 24 }}
                >
                    <Fab component={Link} to="/add-proposal" aria-label="Add" color="primary">
                        <AddIcon />
                    </Fab>
                </Stack>
            </Hidden>
        </>
    );

    return <div id="proposals-page">{user?.role === "student" ? studentView : teacherView}</div>;
}

export default ProposalsPage;
