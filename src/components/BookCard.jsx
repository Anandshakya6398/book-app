function BookCard({ book }) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://dummyimage.com/150x200/cccccc/000000&text=No+Image";

  const description =
    book.first_sentence?.[0] ||
    book.subject?.slice(0, 3)?.join(", ") ||
    "No description available";

  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg transition">
      <img
        src={cover}
        alt="book"
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="font-bold mt-2 text-lg line-clamp-2">
        {book.title}
      </h2>

      <p className="text-sm text-gray-600">
        {book.author_name?.[0] || "Unknown Author"}
      </p>

      <p className="text-sm mt-2 text-gray-700 line-clamp-3">
        {description}
      </p>

      <div className="mt-2">
        <span className="text-yellow-500 font-semibold">
          ⭐ {rating}
        </span>
      </div>
    </div>
  );
}

export default BookCard;