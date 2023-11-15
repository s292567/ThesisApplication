import React, {useState} from "react";
import "./ProposalForm.css"; 
import KeywordsField from "./KeywordsField";
import DropdownField from "./DropdownField";

const ProposalForm = () => {

  return (
    <form className="form">
        <h1>Create Proposal</h1>
      <div className="mb-6">
        <label htmlFor="text" className="label">Title</label>
        <input type="text" id="title" className="input" required />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Supervisor</label>
        <input type="text" id="supervisor" className="input" required />
      </div>
      <KeywordsField />
      <DropdownField data={[{id: 1, name: 'Hallo'}, {id: 2, name: 'Hallo'}]} placeholder={"Select a type..."}/>
      <div className="mb-6">
        <label htmlFor="text" className="label">Description</label>
        <input type="text" id="description" className="input" required />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Required Knowledge</label>
        <input type="text" id="knowledge" className="input" />
      </div>
      <div className="mb-6">
        <label htmlFor="text" className="label">Notes</label>
        <input type="text" id="notes" className="input" />
      </div>
      <DropdownField data={[{id: 1, name: 'BSc'}, {id: 2, name: 'MSc'}]}/>
      <div className="mb-6">
        <label htmlFor="text" className="label">CdS</label>
        <input type="text" id="cds" className="input" required />
      </div>
      <button type="submit" className="button">Create Proposal</button>

    </form>
  );
}

export default ProposalForm;

