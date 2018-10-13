console.log('Starting up');

function init(){
  createProjects()
  renderProjectCards()
}

//when you click a specific project from the portfolio
function onGameCard(game){
  var game = getGameDetalis(game)
  console.log(game)
  openInModal(game)
}

//open the project in modal
function openInModal(game){
    var strHTMLS = `<h2>${game.name}</h2>
    <p class="item-intro text-muted">${game.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${game.img}" alt="">
    <p class="desc">${game.desc}</p>
    <ul class="list-inline">
      <li>Published At: ${game.publishedAt}</li>
      <li>Keywords: ${game.labels}</li>
      <li><button class="btn btn-info" onclick="onTryNow('${game.url}')">Try Now!</button></li>
    </ul>
    <button class="btn btn-info" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>`
        $('.modal-body').html(strHTMLS)
}

//render all the portfolio projects cards
function renderProjectCards(){
  var strHTMLS = '';
  for (var i=0; i<gProjects.length; i++){
   strHTMLS += `<div class="col-md-4 col-sm-6 portfolio-item">
  <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onGameCard(${gProjects[i].id})">
    <div class="portfolio-hover">
      <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
      </div>
    </div>
    <img class="img-fluid" src="img/portfolio/${gProjects[i].img}" alt="fuckme">
  </a>
  <div class="portfolio-caption">
    <h4>${gProjects[i].name}</h4>
    <p class="text-muted">${gProjects[i].title}</p>
  </div>
</div>`
}
$('.game-cards').html(strHTMLS)
}

//take the user to gmail page to send massage.
function onSubmitContact(){
  window.location.href='https://mail.google.com/mail/?view=cm&fs=1&to=pakokap1990@gmail.com&su=SUBJECT&b ody=BODY';
}

//try the project and open it in the same tab.
function onTryNow(link){
  window.open(link);
}