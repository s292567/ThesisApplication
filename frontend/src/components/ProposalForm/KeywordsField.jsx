import React, {useEffect, useState} from "react";
import "./ProposalForm.css"

const KeywordsField = ({labelText, placeholderText, isRequired, onValueChange, initialValue}) => {
    const [inputValue, setInputValue] = useState('');
    /* objects with {id, name}*/
    const [tags, setTags] = useState([]);
    const [keywordId, setKeywordId] = useState(0)
    useEffect(() => {
        // add tags if initial value set
        if(initialValue){
            const initialTags=[]

            for (let i = 0; i < initialValue.length; i++) {
                initialTags.push({id: i, name: initialValue[i]})
            }
            setTags(initialTags)
            setKeywordId(initialValue.length)
        }
    }, []);
  const handleInputChange = (event) => {
     if (event.target.value.slice(-1)!==",")
        setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === ',' && inputValue.trim() !== '') {
      // Call your function here
      handleAddition({
        id: keywordId,
        name: inputValue.trim()
      });

      console.log(tags);
      setInputValue('');
      setKeywordId(keywordId + 1);
    }
  };

  const handleAddition = newTag => {
      const newTags=tags
      newTags.push(newTag)
      setTags(newTags);
      const tagsValues=newTags.map(t=>t.name);
      onValueChange(tagsValues);
  };

  const handleDelete = index => {
    const newTags = tags.filter((tag) => tag.id !== index);
    setTags(newTags);
      const tagsValues=newTags.map(t=>t.name);
      onValueChange(tagsValues);
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
        <label htmlFor="text" className="label">{labelText}</label>
        {(isRequired && tags.length===0) ?
          <input
          type="text"
          className="input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          required
          /> : 
          <input
          type="text"
          className="input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          />
        }
        <AddedKeywordsList />
    </div>
  );
};

export default KeywordsField;
