import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Footer from "./components/Footer";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8); // 👈 initial 8 books

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await res.json();

      setBooks(data.docs);
      setVisibleCount(8); // 👈 reset when search changes
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query]);

  // 👇 Show More function
  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-5">
        <h1 className="text-2xl font-bold text-center mb-4">
          📚 Book Finder
        </h1>

        <SearchBar setQuery={setQuery} />

        {loading && <Loader />}
        {error && <Error />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.slice(0, visibleCount).map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>

        {/* 👇 Show More Button */}
        {visibleCount < books.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {/* 👇 Footer */}
      <Footer />
    </div>
  );
}

export default App;