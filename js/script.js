/**
 * Created by MKS on 22.09.2015.
 */
$(document).ready(function () {
    //ALWAYS
    $("#footer_load").load("footer.html");
    //ALWAYS

    var playerIs;
    var compIs;
    var playedX = [null, false, false, false, false, false, false, false, false, false];
    var playedY = [null, false, false, false, false, false, false, false, false, false];
    var whoIsPlaying;

    var playedGeneral = [null, false, false, false, false, false, false, false, false, false];

    var round = 0;

    $('#choice-o').click(function () {
        playerIs = 'o';
        compIs = 'x';
        $('.dummy').css('visibility', 'visible');
        $('#buttons').toggle();
        whoIsPlaying = 'x';
        doAI();
    });

    $('#choice-x').click(function () {
        playerIs = 'x';
        compIs = 'o';
        $('.dummy').css('visibility', 'visible');
        $('#buttons').toggle();
        whoIsPlaying = 'x';
    });

    $('.dummy').click(function (event) {

        doMove(event, playerIs);

        doAI();

    });

    var doAI = function () {

        if (compIs == whoIsPlaying) {

            console.log('did AI: ' + compIs + ':::' + whoIsPlaying);

            if (round == 0 && compIs == 'x') {
                doMove(null, compIs, 5)
                return;
            }

            if (round == 1 && compIs == 'o' && playedX[5] == false) {
                doMove(null, compIs, 5)
                return;
            }

            for (var i = 1; i <= 9; i++) {

                console.log('did first loop: ' + i);
                if (compIs == 'x') {

                    var projectedArrX = JSON.parse(JSON.stringify(playedX));
                    projectedArrX[i] = true;

                    if (lookAhead(projectedArrX) && playedGeneral[i] !== true) {
                        console.log('is win: ' + i);
                        doMove(null, compIs, i);
                        return;
                    }
                    console.log('is not win: ' + i);

                } else if (compIs == 'o') {

                    var projectedArrY = JSON.parse(JSON.stringify(playedY));
                    projectedArrY[i] = true;

                    if (lookAhead(projectedArrY) && playedGeneral[i] !== true) {
                        console.log('is win: ' + i);
                        doMove(null, compIs, i);
                        return;
                    }
                    console.log('is not win: ' + i);

                }

            }

            for (var j = 1; j <= 9; j++) {

                console.log('did second loop: ' + j);

                if (compIs == 'x') {

                    var projectedArrY = JSON.parse(JSON.stringify(playedY));
                    projectedArrY[j] = true;
                    if (lookAhead(projectedArrY) && playedGeneral[j] !== true) {
                        console.log('is win: ' + j);
                        doMove(null, compIs, j);
                        return;
                    }
                    console.log('is not win: ' + j);
                } else if (compIs == 'o') {

                    var projectedArrX = JSON.parse(JSON.stringify(playedX));
                    projectedArrX[j] = true;
                    if (lookAhead(projectedArrX) && playedGeneral[j] !== true) {
                        console.log('is win: ' + j);
                        doMove(null, compIs, j);
                        return;
                    }
                    console.log('is not win: ' + j);
                }

            }

            if (compIs == 'x') {
                doMove(null, compIs, randomItemArray(playedGeneral));
            } else if (compIs == 'o') {
                doMove(null, compIs, randomItemArray(playedGeneral));
            }

        }
        else {
            return;
        }

    }

    var doMove = function (event, whoIsPlaying, id) {

        var moveId;

        if (event == null) {
            moveId = id;
        } else {
            moveId = event.target.id.substr(event.target.id.length - 1);
        }

        $('#' + whoIsPlaying + '-' + moveId).css('visibility', 'visible');
        $('#d-' + moveId)
            .attr('class', 'dummy played-' + playerIs)
            .css('visibility', 'hidden');

        if (whoIsPlaying == 'x') {
            playedX[moveId] = true;
            switchPlaying();
            checkWin(playedX, false);
        } else if (whoIsPlaying == 'o') {
            playedY[moveId] = true;
            switchPlaying();
            checkWin(playedY, false);
        }

        playedGeneral[moveId] = true;

        console.log(whoIsPlaying);
        console.log('X: ' + playedX);
        console.log('Y: ' + playedY);
        console.log('ALL: ' + playedGeneral);

    }

    var switchPlaying = function () {
        if (whoIsPlaying == 'x') {
            whoIsPlaying = 'o';
        } else {
            whoIsPlaying = 'x';
        }
    }

    var lookAhead = function (arr) {

        if (arr[1] == true && arr[2] == true && arr[3] == true) {
            return true;
        } else if (arr[4] == true && arr[5] == true && arr[6] == true) {
            return true;
        } else if (arr[7] == true && arr[8] == true && arr[9] == true) {
            return true;
        } else if (arr[1] == true && arr[4] == true && arr[7] == true) {
            return true;
        } else if (arr[2] == true && arr[5] == true && arr[8] == true) {
            return true;
        } else if (arr[3] == true && arr[6] == true && arr[9] == true) {
            return true;
        } else if (arr[1] == true && arr[5] == true && arr[9] == true) {
            return true;
        } else if (arr[3] == true && arr[5] == true && arr[7] == true) {
            return true;
        } else {
            return false;
        }

    }

    var checkWin = function (arr) {

        round++;

        if (arr[1] == true && arr[2] == true && arr[3] == true) {
            overlayWin();
        } else if (arr[4] == true && arr[5] == true && arr[6] == true) {
            overlayWin();
        } else if (arr[7] == true && arr[8] == true && arr[9] == true) {
            overlayWin();
        } else if (arr[1] == true && arr[4] == true && arr[7] == true) {
            overlayWin();
        } else if (arr[2] == true && arr[5] == true && arr[8] == true) {
            overlayWin();
        } else if (arr[3] == true && arr[6] == true && arr[9] == true) {
            overlayWin();
        } else if (arr[1] == true && arr[5] == true && arr[9] == true) {
            overlayWin();
        } else if (arr[3] == true && arr[5] == true && arr[7] == true) {
            overlayWin();
        } else {
            if (round == 9) {
                alert('Draw!');
                $('.indics').css('visibility', 'hidden');
                $('.dummy')
                    .attr('class', 'dummy')
                    .css('visibility', 'visible');
                playerIs = null;
                compIs = null;
                playedX = [null, false, false, false, false, false, false, false, false, false];
                playedY = [null, false, false, false, false, false, false, false, false, false];
                playedGeneral = [null, false, false, false, false, false, false, false, false, false];
                whoIsPlaying = null;
                $('#buttons').toggle();
                round = 0;
            }
        }

    }


    function overlayWin() {
        if (whoIsPlaying == 'x') {
            alert('O' + ' Wins!');
            $('#message').text('O' + ' Wins!');
        } else {
            alert('X' + ' Wins!');
            $('#message').text('X' + ' Wins!');
        }
        $('.indics').css('visibility', 'hidden');
        $('.dummy')
            .attr('class', 'dummy')
            .css('visibility', 'visible');
        playerIs = null;
        compIs = null;
        playedX = [null, false, false, false, false, false, false, false, false, false];
        playedY = [null, false, false, false, false, false, false, false, false, false];
        playedGeneral = [null, false, false, false, false, false, false, false, false, false];
        whoIsPlaying = null;
        $('#buttons').toggle();
        round = 0;
    }

    var randomItemArray = function (arr) {

        var indices = [];
        var retStat;

        for (var i = 0; i < arr.length; i++) {

            if (arr[i] !== true && arr[i] !== null) {
                indices.push(i);
            }
        }

        retStat = indices[Math.floor(Math.random() * (indices.length - 1))];

        console.log('did random @' + retStat);
        return retStat;

    }

})
;