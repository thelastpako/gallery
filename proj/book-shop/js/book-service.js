'use strict'

const PAGE_SIZE = 5;
var gBooks;
var gCurrPageNo = 0;
var idx = 1;

//create first 3 books to gBooks.
function createBooks() {
    gBooks = [
        createBook('Dune', 23, 'img/1.jpg', 10), createBook('Hamlet', 19, 'img/2.jpg', 7), createBook('Odyssey', 21, 'img/3.jpg', 5),
        createBook('Bilbi', 21, 'img/4.jpg', 7), createBook('The secret', 19, 'img/4.jpg', 9), createBook('The three musketeers', 21, 'img/4.jpg', 4),
        createBook('TinyWiny', 8, 'img/4.jpg', 7), createBook('The Shtooob', 5, 'img/4.jpg', 9), createBook('The last first man', 15, 'img/4.jpg', 4),
        createBook('Snoopy', 11, 'img/4.jpg', 9), createBook('Scooby-Doo', 34, 'img/4.jpg', 8), createBook('Batman', 16, 'img/4.jpg', 10)
    ]
    return gBooks;
}

//create a book to the gBooks
function createBook(name, price, link, rating) {
    return {
        id: idx++,
        name: name,
        price: price,
        rating: rating,
        img: link
    }
}

//delete the book from gBooks.
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1)
    idx = 1;
    gBooks.forEach(function (book) {
        book.id = idx++
    })
}

//add new book to gbooks.
function addBook() {
    var elNewTitle = $('#newTitle').val()
    var elNewPrice = parseInt($('#newPrice').val(), 10);
    var elNewImg = $('#newImg').val()
    if (elNewTitle === '' || !elNewPrice) return;
    else if (elNewImg === '') {
        elNewImg = 'img/4.jpg'
    }
    gBooks.push(createBook(elNewTitle, elNewPrice, elNewImg, 0))
}


//clear new book section after add a book.
function clearNewBookSection() {
    $('#newTitle').val('')
    $('#newPrice').val('')
    $('#newImg').val('')
}

//find the book by index and change his price in the gBooks
function updatePrice(idx) {
    var newPrice = parseInt($('#updatePrice').val(), 10)
    if (!newPrice) return;
    gBooks[idx].price = newPrice
}

//getting all the book details by id and return them
function readBook(bookId) {
    var bookDetails;
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    return bookDetails = gBooks[bookIdx]
}

//increase the asked book rating
function increaseBookRating(id) {
    if (gBooks[id - 1].rating === 10) return;
    gBooks[id - 1].rating++;
}

//decrease the asked book rating
function decreaseBookRating(id) {
    if (gBooks[id - 1].rating === 0) return;
    gBooks[id - 1].rating--;
}

//get books for page
function getBooks() {
    var fromBookIdx = gCurrPageNo * PAGE_SIZE;
    return gBooks.slice(fromBookIdx, fromBookIdx + PAGE_SIZE);
}

//go to next book page
function goNextPage() {
    var numOfBooks = (1 + gCurrPageNo) * PAGE_SIZE
    if (numOfBooks > gBooks.length) return;
    gCurrPageNo++;
}

//go to last book page
function goLastPage() {
    if (gCurrPageNo === 0) return;
    gCurrPageNo--;
}

//go page by number 1,2,3
function goPageNumber(pageNum) {
    gCurrPageNo = pageNum - 1;
}







