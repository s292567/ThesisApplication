import LoginForm from "../components/LoginForm/LoginForm";
import Navbar from "../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default LandingPage;
