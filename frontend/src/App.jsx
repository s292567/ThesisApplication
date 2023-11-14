import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import StudentDashboardPage from "./pages/StudentDashBoardPage";
import ProfessorDashboardPage from "./pages/ProfessorDashboardPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/** TO GO THE SPECIFIC ROUTE YOU NEED TO PUT professorDashboard/1 */}
            <Route path="/ProfessorDashboard/:professorId" element={<ProfessorDashboardPage />} />
            {/*<Route path="/ProfessorDashboard-:professorId/CreateNewProposal" element={<... />} />*/ }
            
            <Route path="/studentDashboard/:studendId" element={<StudentDashboardPage />} />
            
            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
