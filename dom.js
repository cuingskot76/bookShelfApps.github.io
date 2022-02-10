const uncompleted_book_shelf_id = "incompleteBookshelfList";
const completed_book_shelf_id = "completeBookshelfList";
const booksId = "booksId";
const checkBox = document.getElementById("inputBookIsComplete");
let belumSelesaiCount = 0;
let sudahSelesaiCount = 0;

function addBooks() {
    if (checkBox.checked == true) {
        const tittle = document.getElementById("inputBookTitle").value;
        const writer = "Penulis : " + document.getElementById("inputBookAuthor").value;
        const year = "Tahun : " + document.getElementById("inputBookYear").value;

        const completedCheckBox = document.getElementById(completed_book_shelf_id);
        const books = makeBooks(tittle, writer, year, true);

        const booksObject = composeBooksObject(tittle, writer, year, true);
        books[booksId] = booksObject.id;
        book.push(booksObject);

        completedCheckBox.append(books);
        sudahSelesaiCount++
        jumlahBuku();
        updateDataToStorage();

    } else {
        const tittle = document.getElementById("inputBookTitle").value;
        const writer = "Penulis : " + document.getElementById("inputBookAuthor").value;
        const year = "Tahun : " + document.getElementById("inputBookYear").value;

        const uncompletedBookShelfList = document.getElementById(uncompleted_book_shelf_id);
        const books = makeBooks(tittle, writer, year);

        const booksObject = composeBooksObject(tittle, writer, year, false);
        books[booksId] = booksObject.id;
        book.push(booksObject);

        uncompletedBookShelfList.append(books);
        belumSelesaiCount++;
        jumlahBuku();
        updateDataToStorage();
    }
}

function makeBooks(tittle, writer, year, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = tittle;

    const textWriter = document.createElement("p");
    textWriter.classList.add("writer");
    textWriter.innerText = writer;

    const textYear = document.createElement("p");
    textYear.classList.add("year");
    // textYear.innerText = `Tahun :  ${year}`;
    textYear.innerText = year;

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle, textWriter, textYear);


    if (isCompleted) {
        textContainer.append(createdUndoButton(), createdTrashButton());
    } else {
        textContainer.append(createdFinishButton(), createdTrashButton());
    }
    return textContainer;
}

// buat button
function createButton(buttonTypeClass, evenListener, textButton) {
    const buttonForEveryone = document.createElement("button");
    buttonForEveryone.classList.add(buttonTypeClass);
    buttonForEveryone.innerText = textButton;
    buttonForEveryone.addEventListener("click", function (e) {
        e.stopPropagation();
        evenListener(e);
    })
    return buttonForEveryone;
}

function taskToCompleted(taskElement) {
    const taskTittle = taskElement.querySelector(".book_item h2").innerText;
    const taskWritter = taskElement.querySelector(".book_item p.writer").innerText;
    const taskYear = taskElement.querySelector(".book_item p.year").innerText;

    const newBook = makeBooks(taskTittle, taskWritter, taskYear, true);
    // * param "true", mengacu pada param "isCompleted"
    const completed = document.getElementById(completed_book_shelf_id);

    const book = findBooks(taskElement[booksId]);
    book.isCompleted = true;
    newBook[booksId] = book.id;

    completed.append(newBook);

    taskElement.remove();

    sudahSelesaiCount++;
    belumSelesaiCount--;
    jumlahBuku();
    updateDataToStorage();
}

function createdFinishButton() {
    return createButton("green", function (event) {
        taskToCompleted(event.target.parentElement);
    }, "Selesai dibaca");

}

function removeButton(taskEl) {
    const indexBuku = findBooksIndex(taskEl[booksId]);
    const bookStatus = book[indexBuku].isCompleted;
    const valueTittle = taskEl.querySelector(".book_item h2").innerText;
    const confirmation = confirm("Apakah anda ingin menghapus buku dengan judul " + valueTittle);

    if (confirmation) {
        if (bookStatus) {
            sudahSelesaiCount--;
        } else {
            belumSelesaiCount--;
        }
        book.splice(indexBuku, 1);
        taskEl.remove();
        jumlahBuku();
        updateDataToStorage();
    }

}

function jumlahBuku() {
    const totalbook = document.getElementById("jumlah_buku");
    const bukuBelumSelesai = document.getElementById("belum-selesai");
    const bukuSudahSelesai = document.getElementById("sudah-selesai");

    totalbook.innerText = book.length;
    bukuBelumSelesai.innerText = belumSelesaiCount;
    bukuSudahSelesai.innerText = sudahSelesaiCount;
}

function createdTrashButton() {
    return createButton("red", function (e) {
        removeButton(e.target.parentElement);
    }, "Hapus buku");
}

function createdUndoButton() {
    return createButton("orange", function (e) {
        undoBookFromCompleted(e.target.parentElement);
    }, "Belum selesai dibaca");
}

function undoBookFromCompleted(taskEl) {
    const taskTittle = taskEl.querySelector(".book_item h2").innerText;
    const taskWritter = taskEl.querySelector(".book_item p.writer").innerText;
    const taskYear = taskEl.querySelector(".book_item p.year").innerText;

    const newBooks = makeBooks(taskTittle, taskWritter, taskYear, false);

    const uncompleted = document.getElementById(uncompleted_book_shelf_id);

    const book = findBooks(taskEl[booksId]);
    book.isCompleted = false;
    newBooks[booksId] = book.id;

    uncompleted.append(newBooks);
    taskEl.remove();
    sudahSelesaiCount--;
    belumSelesaiCount++;
    jumlahBuku();

    updateDataToStorage();
}

const filterInput = document.querySelector("#pencarian");
filterInput.addEventListener("keyup", filterBooks);

function filterBooks(e) {
    const text = e.target.value.toLowerCase();
    const bookItems = document.querySelectorAll(".book_item");

    bookItems.forEach((book) => {
        const itemText = book.textContent.toLowerCase();

        if (itemText.indexOf(text) !== -1) {
            book.setAttribute("style", "display: inherit");
        } else {
            book.setAttribute("style", "display: none !important");
        }
    });
    updateDataToStorage();
}