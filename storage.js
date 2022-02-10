const storageBooks = "bookShelf";

let book = [];

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(book);
    localStorage.setItem(storageBooks, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(storageBooks);

    let data = JSON.parse(serializedData);

    if (data !== null)
        book = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBooksObject(tittle, writer, year, isCompleted) {
    return {
        id: +new Date(),
        tittle,
        writer,
        year,
        isCompleted
    };
}

function findBooks(todoId) {
    for (todo of book) {
        if (todo.id === todoId)
            return todo;
    }
    return null;
}

function findBooksIndex(todoId) {
    let index = 0
    for (todo of book) {
        if (todo.id === todoId)
            return index;
        index++;
    }
    return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(uncompleted_book_shelf_id);
    let listCompleted = document.getElementById(completed_book_shelf_id);

    sudahSelesaiCount = 0;
    belumSelesaiCount = 0;
    for (books of book) {
        const newBook = makeBooks(books.tittle, books.writer, books.year, books.isCompleted);
        newBook[booksId] = books.id;

        if (books.isCompleted) {
            sudahSelesaiCount++;
            listCompleted.append(newBook);
        } else {
            belumSelesaiCount++;
            listUncompleted.append(newBook);
        }
    }
}