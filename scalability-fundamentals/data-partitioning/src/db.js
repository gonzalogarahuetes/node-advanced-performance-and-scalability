const { LocalStorage } = require("node-localstorage");

const dbA = new LocalStorage("data-a-m");
const dbB = new LocalStorage("data-n-z");

const whichDB = (title) => (title.match(/^[A-M]|[a-m]^/) ? dbA : dbB);

// Load the books from the local storage, if none exist, return an empty array
const loadBooks = (db) => JSON.parse(db.getItem("books") || "[]");

// Check if a book with the same title already exists in the collection
const hasBook = (title) =>
  loadBooks(whichDB(title))
    .map((book) => book.title)
    .includes(title);

module.exports = {
  // Add a new book to the collection, ensuring no duplicates by title
  addBook(newBook) {
    if (!hasBook(newBook.title)) {
      let db = whichDB(newBook.title);
      let books = loadBooks(db);
      books.push(newBook);
      db.setItem("books", JSON.stringify(books, null, 2));
    }
  },

  // Find a book by its title
  findBookByTitle(title) {
    let books = loadBooks(whichDB(title));
    return books.find((book) => book.title === title);
  },

  // Find all books by a specific genre
  findBooksByGenre(genre) {
    return [
        ...loadBooks(dbA).filter((book) => book.genre === genre),
        ...loadBooks(dbB).filter((book) => book.genre === genre),
    ]
  },
};
