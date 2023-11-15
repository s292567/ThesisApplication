import "./DefaultButton.css"; 
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const DefaultButton = ({buttonText, navigationRoute}) => {

    const navigation = useNavigate(); 

  return <div className="button-container"><button type="button" className="custom-button" onClick={() => {navigation(navigationRoute)}}>{buttonText}</button></div>;
};

export default DefaultButton;
