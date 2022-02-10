document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    submitForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addBooks();
    })

    if (isStorageExist()) {
        loadDataFromStorage();
    }
})

document.addEventListener("ondatasaved", () => {
    console.log("Data anda telah tersimpan");
    jumlahBuku();
})

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
    jumlahBuku();
})

// * navBtn
const toggleBtn = document.querySelector(".toggle-btn");
const navMenu = document.querySelector(".content");
const closeBtn = document.querySelector(".close-btn");

toggleBtn.addEventListener("click", function () {
    navMenu.classList.add("show-menu");
})

closeBtn.addEventListener("click", function () {
    navMenu.classList.remove("show-menu");
})

window.addEventListener("click", function (el) {
    if (el.target == navMenu) {
        navMenu.classList.remove("show-menu");
    }
})