// ProfessorDashboardPage.jsx
import React, {useState, useEffect} from "react";
import {Box, Paper, Skeleton, Stack, styled, Typography} from "@mui/material";
import {ThesesList} from "../../components";
import {getAllProposals} from "../../api";

export default function ProfessorDashboardPage() {

  const [proposals, setProposals] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await getAllProposals(); // This should be your API call
        setProposals(response);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals();
  }, []);


  return (<>
      <Typography variant="h3" color={"orange"} mb={3} mt={3}>Theses preview:</Typography>
      {proposals ? (
        <ThesesList thesesData={proposals.slice(0, 3)} />
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}

// Helper component to render Skeletons
const SkeletonDemoPaper = styled(Paper)(({theme}) => ({
  width: "90%",
  height: 180, // Adjust the height to match the content of your DemoPaper
  margin: theme.spacing(2), // Provide some space around each skeleton
  padding: theme.spacing(2),
  borderRadius: "0.8rem",
  transition: 'box-shadow .3s', // Smooth transition for shadow
  boxShadow: theme.shadows[1], // Default shadow
  [theme.breakpoints.up('md')]: {
    width: "80%",
  },
}));

function SkeletonThesisList({count}) {
  return (
    <Box sx={{flexGrow: 1}}>
      <Stack direction="column" flexWrap="wrap" justifyContent="center" alignItems="flex-start" spacing={2}>
        {Array.from({length: count}, (_, index) => (
          <SkeletonDemoPaper key={index} variant="rectangular" animation="wave">
            {/* Title Skeleton */}
            <Skeleton variant="text"
                      sx={{borderRadius: '4px', fontSize: '1.5rem', height: 40, width: '60%',}} mb={2}/>
            {/* Description Skeleton */}
            <Skeleton variant="text" sx={{borderRadius: '4px', height: 20, width: '90%',}} mb={1}/>
            <Skeleton variant="text" sx={{borderRadius: '4px', height: 20, width: '90%',}} mb={1}/>
            <Skeleton variant="text" sx={{borderRadius: '4px', height: 20, width: '90%',}} mb={1}/>
            {/* Button Skeleton */}
            <Skeleton variant="rectangular"
                      sx={{borderRadius: '12px', height: 40, width: '15%', marginTop: 2}}/>
          </SkeletonDemoPaper>
        ))}
      </Stack>
    </Box>
  );
}

/* If needed, use this to generate fake proposals
const fakeProposals = [
    {
        id: "P12345",
        title: "Development of an Advanced AI Assistant",
        supervisor: "Dr. Jane Smith",
        coSupervisors: "Prof. John Doe, Dr. Emily White",
        keywords: "Artificial Intelligence, Machine Learning, User Interface",
        type: "Research",
        groups: "AI Lab, ML Group",
        description:
            "This proposal focuses on developing an advanced AI assistant capable of understanding and performing complex tasks. The project will involve developing novel machine learning models and user interface improvements.",
        requiredKnowledge:
            "Python, Machine Learning, Natural Language Processing",
        notes: "Previous experience with deep learning frameworks is a plus.",
        expiration: "2023-12-31",
        level: "MSc",
        cds: "Computer Science and Engineering",
    },
    {
        id: "P67890",
        title: "Exploring Quantum Computing in Cryptography",
        supervisor: "Dr. Alan Turing",
        keywords: "Quantum Computing, Cryptography, Security",
        type: "Research",
        groups: "Quantum Research Lab",
        description:
            "This proposal aims to explore the applications of quantum computing in the field of cryptography, focusing on developing secure communication methods.",
        requiredKnowledge: "Cryptography, Quantum Mechanics, Programming",
        notes: "Interest in quantum algorithms is desirable.",
        expiration: "2024-05-30",
        level: "PhD",
        cds: "Physics and Computer Science",
    },
    {
        id: "P24680",
        title: "Innovations in Renewable Energy Sources",
        supervisor: "Prof. Emma Green",
        coSupervisors: "Dr. John Doe, Dr. Emily White",
        keywords: "Renewable Energy, Sustainability, Environmental Science",
        type: "Development",
        groups: "Sustainable Energy Lab",
        description:
            "The project focuses on developing innovative and efficient renewable energy sources to reduce carbon footprint and promote sustainability.",
        requiredKnowledge: "Environmental Science, Engineering, Material Science",
        expiration: "2023-11-15",
        level: "MSc",
        cds: "Environmental Engineering",
    },
];
*/
