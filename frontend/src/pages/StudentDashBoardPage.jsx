import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";

const StudentDashBoardPage = () => {
  return (
    <>
      {/** Is important to wrap the elements into some container and make the container flex, otherwise it will not be responsive */}
      <header style={{display: "flex"}}>
        <LoggedInNavbar />
      </header>
      <main>
        <h1>Student DashBoard Page</h1>
      </main>
      <BottomNavbar />
    </>
  );
};

export default StudentDashBoardPage;
