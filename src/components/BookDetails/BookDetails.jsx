import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStoredReadBooks,
  saveReadBooks,
  saveWishlistedBooks,
  getStoredWishlistedBooks,
} from "../../utilities/localStorage";

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!book);

  useEffect(() => {
    if (!book) {
      fetch("../../../public/Books.json")
        .then((res) => res.json())
        .then((data) => {
          const foundBook = data.find((b) => b.bookId == id);
          setBook(foundBook);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
          setLoading(false);
        });
    }
  }, [id, book]);

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (!book) {
    return <div className="text-center">Book not found.</div>;
  }

  const handleReadBtn = () => {
    const storedReadBooks = getStoredReadBooks();
    const exists = storedReadBooks.find((bookId) => bookId === id);

    if (!exists) {
      toast.success("Book added to 'Read Books' successfully.");
      saveReadBooks(id);
    } else {
      toast.warning("Book is already added to 'Read Books'.");
    }
  };

  const handleWishlistBtn = () => {
    const storedReadBooks = getStoredReadBooks();
    const isRead = storedReadBooks.find((bookId) => bookId === id);

    const storedWishlistedBooks = getStoredWishlistedBooks(); // Properly parsed
    const exists = storedWishlistedBooks.find((bookId) => bookId === id);

    if (isRead) {
      toast.error("This Book is Already Read.");
    } else if (!isRead && !exists) {
      toast.success("The book is added to 'Wishlist' successfully.");
      saveWishlistedBooks(id);
    } else {
      toast.warning("The book is already added to 'Wishlist'.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-success text-white text-xl font-bold mb-8"
      >
        Go Back
      </button>

      <div className="flex flex-col items-center md:flex-row gap-12 mb-24">
        <div className="bg-zinc-200 rounded-3xl px-16 py-16 w-full md:w-2/5 h-auto">
          <img src={book.image} alt={book.bookName} />
        </div>
        <div className="text-base text-slate-500">
          <h1 className="text-5xl text-black font-bold font-serif mb-4">
            {book.bookName}
          </h1>

          <h4 className="text-2xl font-medium pb-6 border-b-2 border-slate-400">
            By: {book.author}
          </h4>

          <h4 className="text-2xl font-medium mb-6 py-4 border-b-2 border-slate-400">
            {book.category}
          </h4>

          <p>
            <span className="font-bold text-black">Review : </span> {book.review}
          </p>

          <div className="py-6 border-b-2 border-slate-400">
            <span className="font-bold text-black">Tag</span>
            {book.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-green-50 text-base text-success font-medium py-2 px-4 rounded-3xl ms-4"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-6 mb-8 flex gap-16">
            <div className="flex flex-col gap-3">
              <p>Number of Pages :</p>
              <p>Publisher :</p>
              <p>Year of Publishing :</p>
              <p>Rating :</p>
            </div>
            <div className="flex flex-col gap-3 text-black font-semibold">
              <p>{book.totalPages}</p>
              <p>{book.publisher}</p>
              <p>{book.yearOfPublishing}</p>
              <p>{book.rating}</p>
            </div>
          </div>

          <div className="text-xl font-semibold">
            <button
              onClick={handleReadBtn}
              className="btn btn-outline me-4"
            >
              <span className="text-black">Read</span>
            </button>

            <button
              onClick={handleWishlistBtn}
              className="btn btn-info text-white"
            >
              Wishlist
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
