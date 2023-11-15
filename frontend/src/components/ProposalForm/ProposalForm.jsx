import React, {useState} from "react";
import "./ProposalForm.css"; 
import KeywordsField from "./KeywordsField";
import DropdownField from "./DropdownField";

const ProposalForm = () => {

  const [formData, setFormData] = useState({
    title: '',
    supervisor: '',
    cosupervisor: '',
    keywords: '',
    type: '',
    groups: '', 
    description: '', 
    requiredknowledge: '', 
    notes: '',
    expiration: '',  
    level: '',
    cds: ''
  });

  // Function to handle changes in child components and update the form data
  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    console.log(formData);
  };

  return (
    <form className="form">
        <h1>Create Proposal</h1>
      <div className="mb-6">
        <label htmlFor="text" className="label">Title</label>
        <input type="text" id="title" className="input" onChange={(e) => {handleFormChange('title', e.target.value)}} required />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Supervisor</label>
        <input type="text" id="supervisor" className="input" onChange={(e) => {handleFormChange('supervisor', e.target.value)}} required />
      </div>
      <KeywordsField 
        labelText={"CoSupervisors"} 
        placeholderText={"Please type in the ID..."} 
        isRequired={false} 
        onValueChange={(value) => handleFormChange('cosupervisor', value)}
      />
      <KeywordsField 
        labelText={"Keywords"} 
        placeholderText={"Add keywords here..."} 
        isRequired={true}
        onValueChange={(value) => handleFormChange('keywords', value)}
      />
      <DropdownField 
        data={[{id: 1, name: 'Hallo'}, {id: 2, name: 'Hallo'}]} 
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
        <input type="text" id="knowledge" className="input" onChange={(e) => {handleFormChange('requiredknowledge', e.target.value)}} />
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
        onValueChange={(value) => handleFormChange('level', value)}
      />
      <div className="mb-6">
        <label htmlFor="text" className="label">CdS</label>
        <input type="text" id="cds" className="input" onChange={(e) => {handleFormChange('cds', e.target.value)}} required />
      </div>
      <button type="submit" className="button" onSubmit={() => {console.log(formData)}}>Create Proposal</button>
    </form>
  );
}

export default ProposalForm;

