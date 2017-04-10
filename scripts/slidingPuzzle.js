/**
 * Created by Jaleesa on 04/09/17.
 */

var puzzlePieces = [];

var boardOption = [{
        mode:"Easy",
        array:[0, 1, 2, "X"],
        columns: 6
    },
    {
        mode:"Medium",
        array:[0, 1, 2, 3, 4, 5, 6, 7, "X"],
        columns: 4
    },
    {
        mode:"Hard",
        array:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,"X"],
        columns: 3
    }];

init();
function init()
{
    eventListeners();
}

function eventListeners()
{
    var mode = boardOption[1];
    $(".startBtn").click(function ()
    {
        $(".mainMenuContainer").hide();

        generateBoard(mode);
        $(".game").show();
    });

    $(".game").on("drag", "button", function (event)
    {
       updatePieces();
       event.stopPropagation();
    });

    $("#reset").click( function ()
    {
       $('.board').empty();
       generateBoard(mode);
    });
}

function generateBoard(mode)
{
    var shuffleArray = mode.array;
    var columns = mode.columns;
    // While there remain elements to shuffle…
    shuffleArray = shuffle(shuffleArray);
    var prevId = -1;
    for(var i = 0; i < shuffleArray.length; i ++)
    {
        if(shuffleArray[i] !== "X")
        {
            $('.board').append("<div class='col-lg-" + columns + "col-md-"+ columns + " col-sm-" + columns + " col-xs-" + columns + "'><button class='box' draggable='true'>" + shuffleArray[i] + "</button></div>");

        }
        else
        {
            $('.board').append("<div class='col-lg-" + columns + "col-md-" + columns + " col-sm-" + columns + " col-xs-" + columns + "'><button class='box' id='lastBtn' draggable='true'>" + shuffleArray[i] + "</button></div>");
        }
        prevId = shuffleArray[i];
    }
}

function updatePieces()
{

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