const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Dune", author: "Frank Herbert" },
  { id: 3, title: "The Hobbit", author: "Tolkien" },
];

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.json(book);
});

app.post("/books", (req, res) => {
  console.log(req.body);
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  books = books.filter((b) => b.id !== id);

  res.send("Book deleted");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
