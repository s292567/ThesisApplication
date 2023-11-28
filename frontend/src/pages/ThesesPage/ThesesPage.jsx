// ProfessorDashboardPage.jsx
import {useState, useEffect, useContext} from "react";
import {Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList} from "../../components";
import {getAllProposals} from "../../api";
import {AuthContext} from "react-oauth2-code-pkce";


export default function ThesesPage() {

  const {tokenData,token} = useContext(AuthContext);
  const user={username:tokenData.preferred_username,role:tokenData.realm_access.roles[3]}


  const [proposals, setProposals] = useState(null);
  const fetchProposals = async () => {
    try {
      let response = undefined;
      /* API CALL BASED ON ROLE */
      (user.role === "Professor" ?
              response = await getAllProposals(token) : response = await getAllProposals()
      )
      return response
    } catch (error) {
      console.error("Failed to fetch proposals:", error);
    }
  };
  useEffect(() => {

    fetchProposals().then(response=>setProposals(response))
  }, []);


  return (<>
      <Typography variant="h3" color={"orange"} mb={3} mt={3}>Theses:</Typography>
      {proposals ? (
        <ThesesList thesesData={proposals}/>
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}


