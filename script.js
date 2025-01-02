function Book(title, author, pages, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.readStatus = read;
}

const myLibrary = [
  new Book("1984", "George Orwell", 328, "Completed"),
  new Book("Brave New World", "Aldous Huxley", 268, "In Progress"),
  new Book(
    "The Hitchhiker’s Guide to the Galaxy",
    "Douglas Adams",
    193,
    "Completed"
  ),
];

const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookStatus = document.getElementById("readstatus");
const bookSubmit = document.getElementById("submit");
const newBookButton = document.getElementById("new-book");
const formContainer = document.getElementById("second-block");
const bookListContainer = document.getElementById("first-block");
const bookList = document.getElementById("book-list");
const bookForm = document.getElementById("book-form");

newBookButton.addEventListener("click", () => {
  if (bookListContainer.style.display === "none") {
    bookListContainer.style.display = "block";
    formContainer.style.display = "none";
    newBookButton.innerText = "Add New Book";
  } else {
    bookListContainer.style.display = "none";
    formContainer.style.display = "block";
    newBookButton.innerText = "Back";
  }
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookStatus.value
  );

  addBookToLibrary(newBook);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookStatus.value = "";

  formContainer.style.display = "none";
  bookListContainer.style.display = "block";

  newBookButton.innerText = "Add New Book";
});

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const rows = bookList.getElementsByTagName("tr");

  while (rows.length > 1) {
    rows[1].remove();
  }

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.readStatus}</td>
      <td><img src="img/delete.svg" alt="Delete Book" data-index="${index}" class="delete-btn"></td>
      <td><img src="img/status.svg" alt="Change Read Status" data-index="${index}" class="change-status-btn"></td>
    `;
    bookList.appendChild(row);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    displayBooks();
  } else if (e.target.classList.contains("change-status-btn")) {
    const index = e.target.getAttribute("data-index");
    myLibrary[index].readStatus =
      myLibrary[index].readStatus === "Completed" ? "In Progress" : "Completed";

    displayBooks();
  }
});

displayBooks();
