import Navbar from "../components/Navbar/Navbar";
import SettingsProposalsBar from "../components/SettingsProposalsBar/SettingsProposalsBar";

const LandingPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">
          <SettingsProposalsBar />
        </div>
      </main>
    </>
  );
};

export default LandingPage;
