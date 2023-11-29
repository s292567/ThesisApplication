import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import KeywordsField from "./KeywordsField";
import DropdownField from "./DropdownField";
import { insertProposal } from "../../api";

import "./ProposalForm.css";


const ProposalForm = ({userId}) => {
    const navigate=useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    coSupervisors: '',
    keywords: '',
    type: '',
    groups: '', 
    description: '', 
    requiredKnowledge: '', 
    notes: '',
    expiration: '',  
    level: '',
    CdS: ''
  });

//   const example = {
//     "title" : "Advanced algorithms for image processing",
//     "coSupervisors": [ "Paolo Ricci", "Mario Rossi" ],
//     "keywords" : ["image processing"],
//     "type" : "in external company",
//     "groups" : ["G13","G21"],
//     "description" : "Work in a company to develop new algorithms for image processing"
//     "requiredKnowledge" : "Basics of machine learning and image processing"
//     "notes": "Collaboration with company equipe. Reimbursement of expenses"
//     "expiration": "2024-04-23"
//     "level" : "MSc"
//     "CdS": ["ENG1", "ENG3"]
// }

  // Function to handle changes in child components and update the form data
  const handleFormChange = (fieldName, value) => {
      const newData=formData
      newData[fieldName]=value
    setFormData(newData);

    console.log(formData);
  };

  // handles the submission of data
  const handleSubmit = (event) => {
    event.preventDefault();
    insertProposal(userId, formData);
    console.log('Form Submitted');
    navigate('/login')
  }; 

  return (
    <form className="form" onSubmit={handleSubmit} style={{ width: '500px'}}>
        <h1>Create Proposal</h1>
      <div className="mb-6">
        <label htmlFor="text" className="label">Title</label>
        <input type="text" id="title" className="input" onChange={(e) => {handleFormChange('title', e.target.value)}} required />
      </div>
      <KeywordsField 
        labelText={"CoSupervisors"} 
        placeholderText={"Please type in the name and surname..."}
        isRequired={false} 
        onValueChange={(value) => handleFormChange('coSupervisors', value)}
      />
      <KeywordsField 
        labelText={"Keywords"} 
        placeholderText={"Add keywords here..."} 
        isRequired={true}
        onValueChange={(value) => handleFormChange('keywords', value)}
      />
      <DropdownField 
        data={[{id: 1, name: 'Research'}, {id: 2, name: 'Development'}]}
        placeholder={"Select a type..."} 
        onValueChange={(value) => handleFormChange('type', value)}
      />
      <KeywordsField 
        labelText={"Groups"} 
        placeholderText={"Add IDs of groups here..."} 
        isRequired={true}
        onValueChange={(value) => handleFormChange('groups', value)}
      />
      <div className="mb-6">
        <label htmlFor="text" className="label">Description</label>
        <input type="text" id="description" className="input" onChange={(e) => {handleFormChange('description', e.target.value)}} required />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Required Knowledge</label>
        <input type="text" id="knowledge" className="input" onChange={(e) => {handleFormChange('requiredKnowledge', e.target.value)}} />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Notes</label>
        <input type="text" id="notes" className="input" onChange={(e) => {handleFormChange('notes', e.target.value)}} />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Expiration</label>
        <input type="date" id="expiration" className="input" onChange={(e) => {handleFormChange('expiration', e.target.value)}} required/>
      </div>
      <DropdownField 
        data={[{id: 1, name: 'BSc'}, {id: 2, name: 'MSc'}]}
        placeholderText={"Choose the level..."}
        onValueChange={(value) => handleFormChange('level', value)}
      />
      <KeywordsField 
        labelText={"CdS"} 
        placeholderText={"Add CdS here..."} 
        isRequired={true}
        onValueChange={(value) => handleFormChange('CdS', value)}
      />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button type="submit" className="button" >Create Proposal</button>
        </div>
    </form>
  );
}

export default ProposalForm;

