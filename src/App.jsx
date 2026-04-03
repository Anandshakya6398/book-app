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
  const [noResults, setNoResults] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(false);
      setNoResults(false);

      if (!query || query.trim().length < 3) {
        setBooks([]);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();

      if (data.docs.length === 0) {
        setNoResults(true);
        setBooks([]);
      } else {
        setBooks(data.docs);
      }

      setVisibleCount(8);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query]);

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

        {noResults && (
          <div className="text-center mt-10">
            <h2 className="text-xl font-semibold">No Results Found 😔</h2>
            <p className="text-gray-500">
              Try searching something else
            </p>
          </div>
        )}

        {books.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {books.slice(0, visibleCount).map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>

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
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;