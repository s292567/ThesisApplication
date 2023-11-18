import { Navbar, LoginForm } from "../../components";
import { useUserContext } from "../../contexts";

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
