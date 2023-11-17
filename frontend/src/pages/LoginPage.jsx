import Navbar from "../components/Navbar/Navbar";
import LoginForm from "../components/LoginForm/LoginForm";
import { useUserContext } from "../userContext";

const LoginPage = () => {

  const {isLoggedIn} = useUserContext();

  if (isLoggedIn) {
    return <p>Already LoggedIn</p>;
  }

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main >
        <div className="container">
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
