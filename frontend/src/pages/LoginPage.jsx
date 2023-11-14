import Navbar from "../components/Navbar/Navbar";
import LoginForm from "../components/LoginForm/LoginForm";

// in some way this page must not display the login button on the top navbar
const LoginPage = () => {
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

export default LoginPage;
