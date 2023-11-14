import Navbar from "../components/Navbar/Navbar";
import LoginForm from "../components/LoginForm/LoginForm";

// in some way this page must not display the login button on the top navbar
const LoginPage = (props) => {

  return (
    <>
      <header>

        <Navbar isLoggedIn={props.isLoggedIn} logout={props.logout}/>
      </header>
      <main >
        <div className="container">
          <LoginForm login={props.login} loggedIn={props.loggedIn} logout={props.logout}
                     errorMsg={props.errorMsg} setErrorMsg={props.setErrorMsg}
                     isLoggedIn={props.isLoggedIn}/>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
