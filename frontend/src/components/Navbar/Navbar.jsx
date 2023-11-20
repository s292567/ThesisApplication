import NavbarNormal from "./NavbarNormal";
import LoggedInNavbar from "./LoggedInNavbar";
import { useUserContext } from "../../contexts";

export default function Navbar() {
  const { loggedIn } = useUserContext();

  return <>{loggedIn ? <LoggedInNavbar /> : <NavbarNormal />}</>;
}
