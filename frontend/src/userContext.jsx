// userContext
import React, {useState, createContext, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, getProfileApi } from './API/API_User.js'; // Assicurati che il percorso sia corretto
import routes from './assets/Routes.json';


const UserContext = createContext(undefined);

const useUserContext = () => useContext(UserContext);

// it's used to Load the user context the first time the app is loaded
const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");
    let userId = undefined;
    const [jwtToken, setJwtToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (jwtToken !== "") {
            localStorage.setItem("jwt", jwtToken)
        } else {
            const jwt = localStorage.getItem("jwt");
            if (jwt !== null) {
                setJwtToken(jwt);
                setLoggedIn(true);
            }
        }
        if (user !== "") {
            localStorage.setItem("username", user.username);
        } else {
            const username = localStorage.getItem("username");
            if (username !== null) {
                getProfileApi(username).then((loggedUser) => {
                    setUser(loggedUser);
                }).catch((err) => {
                    setErrorMsg(err.detail)
                    setJwtToken('');
                    setUser('');
                    setLoggedIn(false);
                    navigate(routes.login);
                });
            }
        }


    }, [jwtToken, user])
    // Funzione di login
    // FOR THE FUTURE --> It's better to have the userId inside the user object directly, instead of retrieving it after
    const login = async (username, password) => {
        try {
            const token = await loginApi(username, password);
            setJwtToken(token);
            setLoggedIn(true);
            const loggedUser = await getProfileApi(username);
            setUser(loggedUser);
            userId = user.username.split("@")[0];
            navigateBasedOnRole(loggedUser);
        } catch (error) {
            setErrorMsg(error.detail);
            navigate("/login");
            // this is a temporary solution, we should handle the error in a better way
            // in fact it's not working at all
        }
    };

    // Funzione di logout
    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("jwt");
        setJwtToken("");
        setUser("");
        setLoggedIn(false);
        navigate("/");
    };

    // Funzione per navigare in base al ruolo dell'utente
    const navigateBasedOnRole = (user) => {
        if (user.role === "Student") {
            navigate(routes.studentDashboard);
        } else if (user.role === "Professor") {
            navigate(routes.professorDashboard);
        }
    };

    const contextValue = {
        user,
        userId,
        setUser,
        jwtToken,
        setJwtToken,
        loggedIn,
        setLoggedIn,
        errorMsg,
        setErrorMsg,
        login,
        logout
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext};