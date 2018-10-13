function sortByABC() {
  gBooks.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
}

function sortById() {
  gBooks.sort(function (a, b) {
    return a.id - b.id;
  });
}

function sortByRating() {
  gBooks.sort(function (a, b) {
    return b.rating - a.rating;
  });
}

function sortByPrice() {
  gBooks.sort(function (a, b) {
    return a.price - b.price;
  });
}