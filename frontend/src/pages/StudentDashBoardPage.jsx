import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";
import ThesisProposalsList from "../components/ThesisProposalList/ThesisProposalList";


const StudentDashBoardPage = () => {
  return (
    <div >
      
      <header style={{display: "flex"}}>
        <LoggedInNavbar />
      </header>
      
        <ThesisProposalsList />
      
      <BottomNavbar />
    </div>
  );
};

export default StudentDashBoardPage;
