import { useState } from "react";

function SearchBar({ setQuery }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setQuery(input);
  };

  return (
    <div className="flex gap-2 mb-5 justify-center">
      <input
        type="text"
        placeholder="Search books..."
        className="border p-2 rounded w-60"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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