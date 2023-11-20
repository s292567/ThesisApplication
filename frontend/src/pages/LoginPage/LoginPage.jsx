import {LoginForm} from "../../components";
import {useUserContext} from "../../contexts";
import {Box} from "@mui/material";

const LoginPage = () => {

  const {isLoggedIn} = useUserContext();

  if (isLoggedIn) {
    return <p>Already LoggedIn</p>;
  }

  return (
    <Box bgcolor={"#003576"} sx={{height: "100dvh"}}>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
