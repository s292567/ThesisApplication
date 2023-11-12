import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";
import RequestedProposals from "../components/RequestedProposalList/RequestedProposalList";

const StudentDashBoardPage = () => {
  return (
    <>
      {/** Is important to wrap the elements into some container and make the container flex, otherwise it will not be responsive */}
      <header style={{display: "flex"}}>
        <LoggedInNavbar />
      </header>
      <main style={{marginLeft: "8rem"}} >
        <h1>Student DashBoard Page</h1>
        <RequestedProposals />
      </main>
      <BottomNavbar />
    </>
  );
};

export default StudentDashBoardPage;
