function init() {
    createBooks();
    renderBooks();
}

//render all the books to the page
function renderBooks() {
    var books = getBooks()
    var strHTMLS = `<thead><tr>
        <th class="id-th" scope="col" onclick="onId()">Id</th>
        <th class="title-th" scope="col" onclick="onTitle()">Title</th>
        <th class="price-th" scope="col" onclick="onPrice()">Price</th>
        <th class="id-th" scope="col" onclick="onRating()">Rating</th>
        <th scope="col">Actions</th>
        </tr></thead><tbody>`
    for (var i = 0; i < books.length; i++) {
        strHTMLS += `<tr>
        <td scope="row">${books[i].id}</td>
        <td>${books[i].name}</td>
        <td class="book-update${i}">${books[i].price}$</td>
        <td>${books[i].rating}</td>
        <td>
            <button class="btn bg-primary" 
            <button type="button" class="btn btn-info"onclick="onReadBook(${books[i].id})">Read</button>
            <button class="btn bg-warning" onclick="onUpdateBook(${books[i].id})">Update</button>
            <button class="btn bg-danger" onclick="onDeleteBook(${books[i].id})">Delete</button>
        </td>
      </tr>`
    }
    $('.current-page').html(gCurrPageNo)
    $('.table').html(strHTMLS)
}

//delete and render the books again to page
function onDeleteBook(book) {
    $('.add-book-container').hide()
    var bookDelete = confirm('Are you sure you want to delete the book?')
    if (bookDelete) {
        deleteBook(book)
        renderBooks()
    }
}

//open the new title section.
function onOpenSection() {
    closeReadBook()
    $('.add-book-container').show()
}

//read the input and add book - hide section after
function onReadAndAddNewBook() {
    addBook()
    renderBooks()
    $('.add-book-container').hide()
    clearNewBookSection()
}


//update book price
function onUpdateBook(bookId) {
    renderBooks()
    $('.add-book-container').hide()
    makePriceBecomeASection(bookId)
}

//after push update make the current book price td as input
function makePriceBecomeASection(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    var strHTML = `<section class="update-book-container">
                    <input id="updatePrice" type="text" placeholder="Price of title" />
                    <button class="btn btn-warning" onclick="onUpdatePrice(${bookIdx})">Update</button>
                </section>`
    $(`.book-update${bookIdx}`).html(strHTML)
    return bookIdx;
}

//the button that appear near the input after we push update
function onUpdatePrice(idx) {
    updatePrice(idx)
    renderBooks()
}

//sort the books by title
function onTitle() {
    $('.add-book-container').hide()
    sortByABC()
    renderBooks()
}

//sort books by id
function onId() {
    $('.add-book-container').hide()
    sortById()
    renderBooks()
}

//sort books by rating
function onRating() {
    $('.add-book-container').hide()
    sortByRating()
    renderBooks()
}

//sort books by price
function onPrice() {
    $('.add-book-container').hide()
    sortByPrice()
    renderBooks()
}

//the render book card
function renderBookRead(name, price, link, bookid, rating) {
    var strHTMLS = `<div class="card-header"><h3>${name}</h3><button onclick="closeReadBook()" type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>
    <div class="card-body">
      <h5 class="card-title">Price:</h5>
      <p class="card-text">${price}$</p>
      <img src="${link}"></div>
      <section class="rating-sec">
        <button class="btn btn-info" onclick="onDecreaseBookRating(${bookid})">-</button>
        <span class="rate">${rating}</span>
        <button class="btn btn-info" onclick="onIncreaseBookRating(${bookid})">+</button>
    </section>`
    $('.card').html(strHTMLS)
    $('.card').show()
}


//show book card
function onReadBook(id) {
    $('.add-book-container').hide()
    var book = readBook(id)
    renderBookRead(book.name, book.price, book.img, book.id, book.rating)
    $('.modal').addClass('reveal')
    clickOutsideModal()
}

//close book card
function closeReadBook() {
    $('.card').hide()
    $('.modal').removeClass('reveal')
}

//render the decrease of rating on screen
function onDecreaseBookRating(id) {
    decreaseBookRating(id)
    $('.rate').html(gBooks[id - 1].rating)
    renderBooks()
}

//render the increase of rating on screen
function onIncreaseBookRating(id) {
    increaseBookRating(id)
    $('.rate').html(gBooks[id - 1].rating)
    renderBooks()
}

//close modal when click outside modal area
function clickOutsideModal() {
    var modal = document.getElementById('myModal');
    window.onclick = function (event) {
        if (event.target == modal) {
            $('.modal').removeClass('reveal')
        }
    }
}

//render the next page
function onGoNextPage() {
    goNextPage()
    renderBooks()
}

//render the last page
function onGoLastPage() {
    goLastPage()
    renderBooks()
}

//render page by num
function onPageNum(pageNum) {
    goPageNumber(pageNum)
    renderBooks()
}