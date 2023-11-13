import {useNavigate,useLocation} from 'react-router-dom';
function SideBar(props){
    const path = useLocation().pathname;
    const navigate = useNavigate();

    //const { loggedIn, user } = props;

return (
        <div className="d-flex flex-column flex-shrink-0 bg-light col-3 p-2">

                <aside>
                    <ul className="nav nav-pills flex-column mb-auto nav-fill ">


                        {props.loggedIn && props.user.role==="Student" ?
                            <>
                            <li className="nav-item">
                                <button className={path==='/student-things' ? "nav-link active link-light text-start":"nav-link link-dark text-start"}  onClick={()=>{navigate('/student-things')}}>
                                    student things
                                </button>
                            </li>

                            </>
                            :
                            <></>
                        }
                        {props.loggedIn && (props.user.role==="Professor") ?
                            <>
                                <li className="nav-item">
                                    <button className={path==='/prof-thing' ? "nav-link active link-light text-start":"nav-link link-dark text-start"}   onClick={()=>{navigate('/prof-thing')}}>
                                        Prof things
                                    </button>
                                </li>
                            </>
                            :
                            <></>
                        }

                        {path==='/login' ?
                            <li className="nav-item">
                                <button className="nav-link active link-light text-start" >
                                    Login
                                </button>
                            </li>
                            :
                            <></>
                        }

                    </ul>
                </aside>

        </div>

)

}


export default SideBar;
