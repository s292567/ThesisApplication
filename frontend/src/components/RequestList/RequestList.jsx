// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Grid,
    Typography,
    useTheme,
    Divider,
    useMediaQuery, styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PastelComponent, WarningPopup } from "../../components";
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses } from '@mui/material/Tooltip';
import {useUserContext} from "../../contexts/index.js";
import {updateRequestStatus} from "../../api/API_requests.js";




const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 400,
        fontSize: '1.1rem',
        color: '#ffffff',
        backgroundColor: 'rgba(35,16,87,0.88)', // Add your desired background color
        padding: '10px',
        borderRadius: '5px',
    },
});

const fakeRequestData = [
    {
        id: 1,
        title: "Thesis Title 1",
        description: "Thesis Description 1",
        supervisor: {name:"Supervisor", surname: "1"},
        coSupervisors: [],
        student: {name:"Romina", surname: "Nemati", email: "s309760@example.com"}
    },
    {
        id: 2,
        title: "Thesis Title 2",
        description: "Thesis Description 2",
        supervisor: {name:"Supervisor", surname: "1"},
        coSupervisors: ["Cosupervisor 2"],
        student: {name:"Lara", surname: "Moresco", email: "s320153@example.com"}
    },
    // Add more data as needed
];

export default function RequestList({requests, refreshList}) {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [warningOpen, setWarningOpen] = useState(false);
    const [msgWarning, setMsgWarning] = useState("");
    const [status, setStatus] =useState("")
    const [requestId, setRequestId] = useState("")
    const { user } = useUserContext();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleAccept = (requestId) => {
        setStatus("accepted")
        setRequestId(requestId)
        setMsgWarning("Are you sure you want to Accept this Request?");
        setWarningOpen(true);
    };

    const handleDecline = (requestId) => {
        setStatus("rejected")
        setRequestId(requestId)
        setMsgWarning("Are you sure you want to Decline this Request?");
        setWarningOpen(true);
    };
    const handleChangeRequest = (requestId) => {
        setStatus("change request")
        setRequestId(requestId)
        setMsgWarning("Are you sure you want to Change this Request?");
        setWarningOpen(true);
    };
    const handleChangeRequestStatus = ()=>{
        /*const fetchRequests = async () => {
            try {
                return await getAllPendingRequests();
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            }
        };
        fetchRequests().then((data) => {
            setRequests(data);
        });*/
        updateRequestStatus({requestId:requestId, status: status})
            .then((_)=>refreshList())
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingX: isMobile ? "16px" : "300px",
                    flexGrow: 1,
                    borderRadius: "20px",
                }}
            >
                <Grid container direction="column" justifyContent="center" spacing={3}>
                    {requests.map(({ id, title, description, supervisor, coSupervisors, student }) => (
                        <Grid key={id} item xs={10} sm={10} md={8} lg={6} xl={5}>

                            <Accordion

                                expanded={expanded === `panel${id}`}
                                onChange={handleChange(`panel${id}`)}
                                sx={{
                                    alignItems: "flex-start",
                                    paddingX: "300px",
                                    borderRadius: "30px !important",
                                    maxWidth: "100%",
                                    backgroundColor: "#F4F5FF",
                                    padding: "2rem",
                                    position: "relative",
                                    ...theme.typography.body2,
                                    transition: "box-shadow .3s",
                                    "&:hover": {
                                        boxShadow: theme.shadows[24],
                                        "& button": { display: "block" },
                                    },
                                    "&::before": {
                                        content: "''",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: -1,
                                        borderRadius: "30px",
                                        background: "#2196F3",
                                    },
                                }}
                            >

                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon
                                            style={{
                                                color: "#2f1c6a",
                                                fontWeight: 'bold',
                                                fontSize: '3rem',
                                            }}
                                        />
                                    }
                                    aria-controls={`panel${id}bh-content`}
                                    id={`panel${id}bh-header`}
                                    sx={{
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center'}} >

                                            <Typography variant="h4" sx={{ color: "#301c6e", fontWeight: "bold", marginBottom: "0.5rem", ...(isMobile && { fontSize: "1.5rem" }) }}>
                                                {title}
                                            </Typography>
                                            <CustomWidthTooltip
                                                title={
                                                <div>
                                                        <Typography variant="body1">{` ${student.name} ${student.surname}`}</Typography>
                                                        <Typography variant="body1">{` ${student.email}`}</Typography>
                                                    </div>

                                                }

                                                placement="top-start" arrow
                                            >
                                                <InfoIcon sx={{ marginRight: '0.5rem', color: '#2f1c6a', fontSize: '2rem',marginTop: '-0.5rem',}} />

                                            </CustomWidthTooltip>
                                        </div>

                                    </div>
                                </AccordionSummary>
                                <Divider sx={{ marginBottom: "30px", marginLeft: 2.5, width: "300px", backgroundColor: theme.palette.primary.main }} />
                                <AccordionDetails sx={{ marginTop: "8px" }}>
                                    <Box>

                                        <Typography variant="body1" mb={2} sx={{ marginRight: "1rem" }}>
                                            <span style={{ fontWeight: "bold" }}>Description:</span> {description}
                                        </Typography>
                                        {user.role !== 'Professor' && (
                                        <Typography variant="body1" mb={2} sx={{ marginRight: "1rem" }}>
                                            <span style={{ fontWeight: "bold" }}>Supervisor:</span>
                                            <span style={{ marginRight: "2rem" }}  > {supervisor.name} {supervisor.surname}</span>
                                        </Typography>
                                        )}
                                        {coSupervisors.length>0 && (
                                            <Typography variant="body1" mb={2} sx={{ marginRight: "1rem" }}>
                                                <span style={{ fontWeight: "bold" }}>Co-supervisors:</span> {coSupervisors.join(", ")}
                                            </Typography>
                                        )}
                                    </Box>


                                    <Box sx={{ display: 'flex', flexDirection: user.role === 'Professor' ? 'row' : 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {user.role === 'Professor' && (
                                            <PastelComponent
                                                bgColor="darkorange"
                                                text="change"
                                                textColor="white"
                                                style={{ width: "90px", height: "50px", borderRadius: "8px", fontSize: "14.7px" }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleChangeRequest(id);
                                                }}
                                            />
                                        )}

                                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                                            <PastelComponent
                                                bgColor="#00B090"
                                                textColor="white"
                                                text="accept"
                                                fontSize="large"
                                                style={{ marginLeft: "1rem",width: "90px", height: "50px", borderRadius: "8px", fontSize: "14.7px" }}
                                                onClick={() => handleAccept(id)}
                                            />
                                            <PastelComponent
                                                bgColor="#ED174F"
                                                textColor="white"
                                                text="decline"
                                                fontSize="large"
                                                style={{ width: "90px", height: "50px", borderRadius: "8px", fontSize: "14.6px" }}
                                                onClick={() => handleDecline(id)}
                                            />
                                        </Box>
                                    </Box>


                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
                <WarningPopup
                    warningOpen={warningOpen}
                    setWarningOpen={setWarningOpen}
                    warningMessage={msgWarning}
                    handleApplied={handleChangeRequestStatus}
                />
            </Box>
        </>
    );
}


