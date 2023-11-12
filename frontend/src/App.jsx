import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import StudentDashBoardPage from "./pages/StudentDashBoardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/studentDashBoard" element={<StudentDashBoardPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
