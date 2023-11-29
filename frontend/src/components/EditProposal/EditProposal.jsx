import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeywordsField  from "../ProposalForm/KeywordsField.jsx"
import DropdownField from "../ProposalForm/DropdownField.jsx"
import "./ProposalForm.css";
import {MyOutlinedButton} from "../index.js";
import Stack from '@mui/material/Stack';

const EditForm = ({ userId, proposalId, thesis}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: thesis.title,
        coSupervisors: thesis.coSupervisors,
        keywords: thesis.keywords,
        type: thesis.type,
        groups: thesis.groups,
        description: thesis.description,
        requiredKnowledge: thesis.requiredKnowledge,
        notes: thesis.notes,
        expiration: thesis.expiration,
        level: thesis.level,
        CdS: thesis.cds,
    });


    // Function to handle changes in child components and update the form data
    const handleFormChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Update the proposal with the modified data
            await updateProposal(proposalId, thesis);
            console.log("Proposal Updated");
            navigate("/login");
        } catch (error) {
            console.error("Error updating proposal:", error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>Edit Proposal</h1>
            <div className="mb-6">
                <label htmlFor="text" className="label">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="input"
                    value={formData.title}
                    onChange={(value) => {
                        handleFormChange("title",value);
                    }}
                    required
                />
            </div>
            <KeywordsField
                labelText={"CoSupervisors"}
                placeholderText={"Please type in the name and surname..."}
                isRequired={false}
                onValueChange={(value) => handleFormChange("coSupervisors",value)}
                initialValue={formData.coSupervisors}
            />
            <KeywordsField
                labelText={"Keywords"}
                placeholderText={"Add keywords here..."}
                isRequired={true}
                onValueChange={(value) => handleFormChange("keywords",value)}
                initialValue={formData.keywords}
            />
            <DropdownField
                data={[{ id: 1, name: 'Research' }, { id: 2, name: 'Development' }]}
                placeholder={"Select a type..."}
                onValueChange={(value) => handleFormChange('type', value)}
                initialValue={formData.type}
            />

            <KeywordsField
                labelText={"Groups"}
                placeholderText={"Add IDs of groups here..."}
                isRequired={true}
                onValueChange={(value) => handleFormChange('groups',value)}
                initialValue={formData.groups}
            />

            <div className="mb-6">
                <label htmlFor="text" className="label">
                    Description
                </label>
                <input
                    type="text"
                    id="description"
                    className="input"
                    onChange={(e) => {
                        handleFormChange('description',value);
                    }}
                    value={formData.description}
                    required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="text" className="label">
                    Required Knowledge
                </label>
                <input
                    type="text"
                    id="knowledge"
                    className="input"
                    onChange={(e) => {
                        handleFormChange('requiredKnowledge',value);
                    }}
                    value={formData.requiredKnowledge}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="text" className="label">
                    Notes
                </label>
                <input
                    type="text"
                    id="notes"
                    className="input"
                    onChange={(e) => {
                        handleFormChange('notes', value);
                    }}
                    value={formData.notes}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="text" className="label">
                    Expiration
                </label>
                <input
                    type="date"
                    id="expiration"
                    className="input"
                    onChange={(e) => {
                        handleFormChange('expiration', value);
                    }}
                    value={formData.expiration}
                    required
                />
            </div>

            <DropdownField
                data={[{ id: 1, name: 'BSc' }, { id: 2, name: 'MSc' }]}
                placeholderText={"Choose the level..."}
                onValueChange={(value) => handleFormChange('level',value)}
                initialValue={formData.level}
            />

            <KeywordsField
                labelText={"CdS"}
                placeholderText={"Add CdS here..."}
                isRequired={true}
                onValueChange={(value) => handleFormChange('CdS',value)}
                initialValue={formData.CdS}
            />

        </form>
    );
};


export default EditForm;