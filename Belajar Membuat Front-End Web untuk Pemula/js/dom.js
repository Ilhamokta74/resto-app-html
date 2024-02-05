const incomplete_Book_id = "incompleteBookshelfList";
const complete_Book_id = "completeBookshelfList";
const book_item_id = "itemId";

function makeBook(title, author, year, isComplete) {
  //judul
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  //penulis
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  //tahun
  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");
  if (isComplete) {
    //untuk "selesai dibaca"
    bookAction.append(createUndoButton(), createTrashButton());
  } else {
    //untuk "belum selesai dibaca"
    bookAction.append(createCheckButton(), createTrashButton());
  }

  //untuk isi article
  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(bookTitle, bookAuthor, bookYear, bookAction);

  return container;
}

//untuk button "Belum selesai dibaca", di bagian "selesai dibaca"
function createUndoButton() {
  return createButton("green", "Belum selesai dibaca", function (event) {
    undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}

//untuk button "Hapus buku"
function createTrashButton() {
  return createButton("red", "Hapus buku", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

//untuk button "Selesai dibaca", di bagian "Belum selesai dibaca"
function createCheckButton() {
  return createButton("green", "Selesai dibaca", function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

//untuk membuat button
function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function addBook() {
  const incompleteBookshelfList = document.getElementById(incomplete_Book_id);
  const completeBookshelfList = document.getElementById(complete_Book_id);
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(bookTitle, `Penulis: ${bookAuthor}`, `Tahun: ${bookYear}`, isComplete);
  const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, isComplete);

  book[book_item_id] = bookObject.id;
  books.push(bookObject);

  if (isComplete) {
    completeBookshelfList.append(book);
  } else {
    incompleteBookshelfList.append(book);
  }
  updateDataToStorage();
}

//untuk mengembalikan nilai ke "selesai dibaca", melalui button "selesai dibaca" ketika berada di "Belum Selesai dibaca"
function addBookToCompleted(bookElement) {
  const completeBookshelfList = document.getElementById(complete_Book_id);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[book_item_id]);
  book.isComplete = true;
  newBook[book_item_id] = book.id;

  completeBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

// alert jika kita mau meng"hapus buku"
function removeBook(bookElement) {
  const isDelete = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
  if (isDelete) {
    const bookPosition = findBookIndex(bookElement[book_item_id]);
    books.splice(bookPosition, 1);

    //alert konfirmasi
    bookElement.remove();
    updateDataToStorage();
    alert("Buku berhasil dihapus");
  } else {
    alert("Buku gagal dihapus");
  }
}

//untuk mengembalikan nilai ke "Belum selesai dibaca", melalui button "Belum selesai dibaca" ketika berada di "Selesai dibaca"
function undoBookFromCompleted(bookElement) {
  const incompleteBookshelfList = document.getElementById(incomplete_Book_id);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[book_item_id]);
  book.isComplete = false;
  newBook[book_item_id] = book.id;

  incompleteBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

//untuk search
function searchBook() {
  const searchBook = document.getElementById("searchBookTitle");
  const filter = searchBook.value.toUpperCase();
  const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .book_item");
  for (let i = 0; i < bookItem.length; i++) {
    txtValue = bookItem[i].textContent || bookItem[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      bookItem[i].style.display = "";
    } else {
      bookItem[i].style.display = "none";
    }
  }
}

//untuk check box
function checkButton() {
  const span = document.querySelector("span");
  if (inputBookIsComplete.checked) {
    span.innerText = "Selesai dibaca"; //jika di ceklis, maka akan muncul "Masukkan Buku ke rak Selesai Dibaca"
  } else {
    span.innerText = "Belum selesai dibaca"; //jika tidak di ceklis, maka akan muncul "Masukkan Buku ke rak Belum Selesai Dibaca"
  }
}
