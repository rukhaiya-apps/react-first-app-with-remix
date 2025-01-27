import React, { useState, useEffect } from 'react';

function SearchForm({ query: initialQuery = '', onSearch }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-form">
      <input
        className="form-input"
        type="text"
        placeholder="What do you want to watch..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{ width: '30%' }}
      />
      <button className="form-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchForm;