import NavbarNormal from "./NavbarNormal";
import LoggedInNavbar from "./LoggedInNavbar";

import {AuthContext} from "react-oauth2-code-pkce";
import {useContext} from "react";

export default function Navbar() {
    const {token,loginInProgress}=useContext(AuthContext)
    const loggedIn=token||loginInProgress?true:false;

    return <>{loggedIn ? <LoggedInNavbar/> : <NavbarNormal/>}</>;
    //return <LoggedInNavbar></LoggedInNavbar>;
}
