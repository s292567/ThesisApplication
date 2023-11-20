import { LoginForm } from "../../components";
import { useUserContext } from "../../contexts";

const LoginPage = () => {

  const {isLoggedIn} = useUserContext();

  if (isLoggedIn) {
    return <p>Already LoggedIn</p>;
  }

  return (
    <LoginForm style={{marginTop: "2rem"}}/>
  );
};

export default LoginPage;
