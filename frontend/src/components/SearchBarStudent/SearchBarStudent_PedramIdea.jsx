const FiltersDropdown = ({
  handleFilterByCds,
  handleSearch,
  handleApplyFilters,
  cdsFilter,
  setCdsFilter,
  checked,
  setChecked,
}) => {
  const handleCdsChange = (event) => {
    setCdsFilter(event.target.value);
  };

  const handleCheckboxChange = (option) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [option]: !prevChecked[option],
    }));
  };

  return (
    <div className="filters-dropdown">
      <div className="filter-sections">
        {/* Filter by CDS */}
        <div className="filter-section">
          <h4>Filter by CDS:</h4>
          <select onChange={handleCdsChange} value={cdsFilter}>
            <option value="">Select CDS</option>
            <option value="ENG4">ENG4</option>
            {/* Add more options */}
          </select>
        </div>

        {/* Add additional filter sections for each option */}
        {Object.keys(checked).map((option) => (
          <div className="filter-section" key={option}>
            <label>
              <input
                type="checkbox"
                checked={checked[option]}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button className="apply-filters" onClick={handleApplyFilters}>
        Apply
      </button>
    </div>
  );
};

const SearchBarStudent = () => {
  // ... (previous code remains unchanged)

  const [checked, setChecked] = useState({
    title: false,
    supervisor: false,
    coSupervisors: false,
    keywords: false,
    type: false,
    groups: false,
    description: false,
    requiredKnowledge: false,
    notes: false,
    expiration: false,
    Msc: false,
    Bsc: false,
    cds: false,
  });

  return (
    <div className="search-bar">
      {/* ... (previous code remains unchanged) */}
      <div className="filter-container">
        {/* ... (previous code remains unchanged) */}
        {showFilters && (
          <FiltersDropdown
            handleFilterByCds={handleFilterByCds}
            handleSearch={handleSearch}
            handleApplyFilters={handleApplyFilters}
            cdsFilter={cdsFilter}
            setCdsFilter={setCdsFilter}
            checked={checked}
            setChecked={setChecked}
          />
        )}
      </div>
      {/* ... (previous code remains unchanged) */}
    </div>
  );
};
