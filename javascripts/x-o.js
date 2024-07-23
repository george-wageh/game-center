function xo() {
    var DivGame;
    var score1 = 0;
    var score2 = 0;
    var DivPlayer1;
    var DivPlayer2;
    var playnow = "";
    var Count = 0;
    function start() {
        DivGame = document.getElementById("game");
        DivGame.setAttribute("style", "display:grid ; grid-template-columns: 1fr 1fr 1fr; width : 660px ;height :700px");
        document.getElementById("h_1").style.display="none";
        document.getElementById("h_2").style.display="block";
        document.getElementById("h_2").style.height="50px";

        DivGame.innerHTML = "";
        var DivPlayer = document.createElement("div");
        DivPlayer1 = DivPlayer.cloneNode(true);
        DivPlayer1.setAttribute("id", "p1");
        DivPlayer1.innerText = "Player1 : " + score1;
        DivPlayer2 = DivPlayer.cloneNode(true);
        DivPlayer2.setAttribute("id", "p2");
        DivPlayer2.innerText = "Player2 : " + score2;
        DivGame.appendChild(DivPlayer1);
        DivGame.appendChild(DivPlayer);
        DivGame.appendChild(DivPlayer2);
        var CellX_o = document.createElement("button");
        CellX_o.setAttribute("style", "background-color: aliceblue; width: 200px; height: 200px; font-size: 175px; text-align: center;");
        for (var i = 1; i < 10; i++) {
            var new_cell = CellX_o.cloneNode(true);
            new_cell.setAttribute("id", "b" + i)
            new_cell.addEventListener("click", play);
            DivGame.appendChild(new_cell);
        }
        playnow = "p1";
        Count = 0;
    }
    start();
    function play() {
        if (playnow == "p1") {
            if (this.innerText == "") {
                this.innerText = "X";
                playnow = "p2";
                Count++;
                update_score();
            }
        }
        else if (playnow == "p2") {
            if (this.innerText == "") {
                this.innerText = "O";
                playnow = "p1";
                Count++;
                update_score();
            }
        }
    }
    function getValue(id) {
        return document.getElementById(id).innerText;
    }
    function update_score() {
        if (Count == 9) {
            start();
        }
        var a = "";
        if ((getValue("b1") == getValue("b2")) && (getValue("b1") == getValue("b3"))) {
            a = getValue("b1");
        }
        else if ((getValue("b4") == getValue("b5")) && (getValue("b4") == getValue("b6"))) {
            a = getValue("b4");
        }
        else if ((getValue("b7") == getValue("b8")) && (getValue("b7") == getValue("b9"))) {
            a = getValue("b7");
        }
        else if ((getValue("b1") == getValue("b4")) && (getValue("b1") == getValue("b7"))) {
            a = getValue("b1");
        }
        else if ((getValue("b2") == getValue("b5")) && (getValue("b2") == getValue("b8"))) {
            a = getValue("b2");
        }
        else if ((getValue("b3") == getValue("b6")) && (getValue("b3") == getValue("b9"))) {
            a = getValue("b3");
        }
        else if ((getValue("b1") == getValue("b5")) && (getValue("b1") == getValue("b9"))) {
            a = getValue("b1");
        }
        else if ((getValue("b3") == getValue("b5")) && (getValue("b3") == getValue("b7"))) {
            a = getValue("b3");
        }
        if (a == "X") {
            score1++;
            start();
        }
        else if (a == "O") {
            score2++;
            start();
        }
    }
}