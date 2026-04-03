import { useState } from "react";

function SearchBar({ setQuery }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() !== "") {
      setQuery(input);
    }
  };

  // Enter key press handle
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 mb-5 justify-center">
      <input
        type="text"
        placeholder="Search books..."
        className="border p-2 rounded w-60"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}  //  important line
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;