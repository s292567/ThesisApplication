import React, {useState} from "react";
import "./ProposalForm.css"

const KeywordsField = () => {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const [keywordId, setKeywordId] = useState(0)  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' && inputValue.trim() !== '') {
      // Call your function here
      handleAddition({
        id: keywordId, 
        name: inputValue
      }); 

      console.log(tags); 
      setInputValue('');
      setKeywordId(keywordId + 1);  
    }
  };

  const handleAddition = newTag => {
    setTags([...tags, newTag]);
  };

  const handleDelete = index => {
    const newTags = tags.filter((tag) => tag.id !== index);
    setTags(newTags);
  };

  const AddedKeywordsList = () => {
    return (
      tags.map((keyword) => {
        return (
          <div key={keyword.id} htmlFor="keyword" className="keyword-container">
            <p htmlFor="keywordtext" className="keyword-text">{keyword.name}</p>
            <button htmlFor="keyworddeletebutton" className="delete-button" onClick={() => {handleDelete(keyword.id)}}>Delete</button>
          </div>
          )
        })
    )
  }; 

  return (
    <div>
        <label htmlFor="text" className="label">Keywords</label>
        <input
        type="text"
        className="input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        />
        <AddedKeywordsList />
    </div>
  );
};

export default KeywordsField;
