const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

//untuk cek apakah browser mendukung atau tidak
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Mohon maaf! Browser Anda tidak mendukung local storage");
    return false;
  }
  return true;
}

//savedata ke local storage
function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

//load data dari local storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

//mengambil data dari inputan user
function composeBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

//untuk mencari book dengan ID yang sesuai pada array books
function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const incompleteBookshelfList = document.getElementById(incomplete_Book_id);
  const completeBookshelfList = document.getElementById(complete_Book_id);

  for (book of books) {
    const newBook = makeBook(book.title, `Penulis: ${book.author}`, `Tahun: ${book.year}`, book.isComplete);
    newBook[book_item_id] = book.id;

    if (book.isComplete) {
      completeBookshelfList.append(newBook);
    } else {
      incompleteBookshelfList.append(newBook);
    }
  }
}
