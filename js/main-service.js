'use strict'

var gProjects;
var idx = 1;

function init(){
    createProjects()
}

function createProjects(){
    gProjects = [
    createProject('pacman','pacman.jpg','Eat cherry and run!',
                    'fun game for all the ages, hours of fun guranteed',
                    'proj/pacman/index.html',getTimestamp(),["cherry","fun"]),
    createProject('Chess','chess.jpg','Lets play some chess!',
                    'become expert in chess and become chess master',
                    'proj/chess/index.html',getTimestamp(),["white","black"]),
    createProject('Numbers','in-nums.jpg','Play the numbers game!',
                'finish count the numbers in the fastest time',
                'proj/touch-nums/index.html',getTimestamp(),["count","time"]),
    createProject('MineSweeper','mine-sweeper.jpg','Play the windows classic mineSweeper!',
                'mineSweeper, the classic game of windows.',
                'proj/mine-sweeper/index.html',getTimestamp(),["mine","smiley"]),
    createProject('BookShop','book-shop.jpg','Welcome to my BookShop!',
                'my book shop, where you can order and see the books and even add yours',
                'proj/book-shop/index.html',getTimestamp(),["buy","sell"]),
    createProject('BallBoard','ballboard.jpg','Eat all the balls in fastest time!',
                'eat all the balls and beware of the glue,fun game for all the ages, hours of fun guranteed',
                'proj/ballboard/index.html',getTimestamp(),["monster","ball"])
]
}

function createProject(name,imgLink,title,desc,link,published,lables){
    return {
       id: idx++,
       name: name,
       img:imgLink,
          title: title,
             desc: desc,
                url: link,
                   publishedAt: published,
                      labels: lables,
                     }
}



function getGameDetalis(gameIdx) {
    var gameIdx = gProjects.findIndex(function (game) {
        return game.id === gameIdx;
    })
    return gProjects[gameIdx];
}