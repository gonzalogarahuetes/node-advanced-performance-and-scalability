const db = require("./db");

// Adding books to the library database
db.addBook({ title: "1984", author: "George Orwell", genre: "Dystopian" });
db.addBook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  genre: "Fiction",
});
db.addBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Classic",
});
db.addBook({
  title: "Moby Dick",
  author: "Herman Melville",
  genre: "Adventure",
});
db.addBook({
  title: "Brave New World",
  author: "Aldous Huxley",
  genre: "Dystopian",
});
db.addBook({
  title: "The Catcher in the Rye",
  author: "J.D. Salinger",
  genre: "Classic",
});

// Finding a book by title
var mobyDick = db.findBookByTitle("Moby Dick");

// Finding books by genre
var dystopianBooks = db.findBooksByGenre("Classic");

console.log("Moby Dick: ", mobyDick);
console.log("Classic books: ", dystopianBooks);
