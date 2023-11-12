import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";

const StudentDashBoardPage = () => {
  return (
    <>
      <header style={{display: "flex"}}>
        <LoggedInNavbar />
      </header>
      <main>
        <h1>Student DashBoard Page</h1>
      </main>
    </>
  );
};

export default StudentDashBoardPage;
