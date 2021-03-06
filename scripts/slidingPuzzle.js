/**
 * Created by Jaleesa on 04/09/17.
 */

class Point {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class PuzzlePiece {
    constructor(value){
        this.value = value;
        this.htmlInfo = "";
    }
}

class Board
{
    constructor() {
        this.puzzlePieces = [];
    }

    addPuzzlePiece(piece)
    {
        this.puzzlePieces.push(piece);
    }
}

var boardOption = [{
        mode:"Easy",
        array:[1, 2, 3, "X"],
        columns: 6
    },
    {
        mode:"Medium",
        array:[1, 2, 3, 4, 5, 6, 7, 8, "X"],
        columns: 4
    },
    {
        mode:"Hard",
        array:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "X"],
        columns: 3
    }];

$(document).ready(function ()
{
    eventListeners();
});

var gameBoard = new Board();
function eventListeners()
{
    console.log("added event listeners");
    var mode = boardOption[1];
    $(".startBtn").click(function ()
    {
        $(".mainMenuContainer").hide();

        generateBoard(mode);
        $(".game").show();
    });

    $("body").on("dragstart",".box", dragStartHandler);
    $("body").on("drop",".box", dropHandler);
    $("body").on("dragover",".box", dragOverHandler);


    $("#reset").click( function ()
    {
       $('.board').empty();
       generateBoard(mode);
    });
}

function dragOverHandler(event)
{
    event.preventDefault();
    console.log("dragOver");
    event.stopPropagation();
}

function dropHandler(event)
{
    console.log("dropHandler");
    event.stopPropagation();
}

function dragStartHandler(event)
{
    console.log("ondragstart event:" + event);
    var originalEvent = event.originalEvent;
    var currentElement = originalEvent.target;
    // set the data for browsers like Firefox to determine what to drag
    originalEvent.dataTransfer.setData("text", $(currentElement).data("task-id"));
    originalEvent.dataTransfer.effectAllowed = "move";
    updatePieces();
    event.stopPropagation();
}

function generateBoard(mode)
{
    var shuffleArray = mode.array;
    var columns = mode.columns;
    // While there remain elements to shuffle…
    shuffleArray = shuffle(shuffleArray);
    for(var i = 0; i < shuffleArray.length; i ++)
    {
        var piece = new PuzzlePiece(shuffleArray[i]);
        var html = "<div class='col-lg-" + columns + "col-md-"+
            columns + " col-sm-" + columns + " col-xs-" + columns + "'>\
            <div class='box' draggable='true' dropzone='move'>" + shuffleArray[i] +
            "</div></div>";
        piece.htmlInfo = html;
        $('.board').append(piece.htmlInfo);
        gameBoard.addPuzzlePiece(piece);
    }
}

function updatePieces()
{
    console.log("update pieces");
}

/*Fisher-Yates Shuffle*/
function shuffle(array)
{
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m)
    {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}