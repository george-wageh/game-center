function mario() {
    var DivGame;
    var player;
    var Land;
    var coins;
    var score = 0;
    var varscroll = 0;
    var SrcPlayerLevel1 = ["media/mario/Images/level1/mario/01.png"
        , "media/mario/Images/level1/mario/02.png"
        , "media/mario/Images/level1/mario/03.png"
        , "media/mario/Images/level1/mario/04.png"
        , "media/mario/Images/level1/mario/05.png"];
    var SrcPlayerLevel1Count = 0;
    var SrcEnemy1 = "media/mario/Images/level1/enemy1/";
    var SrcEnemyCount = 0;
    var SrcEnemy2 = "media/mario/Images/level1/enemy2/";
    var SrcCoin = ["media/mario/Images/level1/coin/01.png"
        , "media/mario/Images/level1/coin/02.png"
        , "media/mario/Images/level1/coin/03.png"
        , "media/mario/Images/level1/coin/04.png"];
    var SrcCoinCount = 0;
    var SrcBlock = "media/mario/Images/level1/stone/stone4.png";

    var Stheme = new Audio('media/mario/Sound/theme.ogg');
    function playAudio() {
        Stheme.play();
    }

    class Player {
        constructor(element) {
            this.element = element;
            this.IsDrop = true;
            this.Isfly = false;
            this.IsRight = true;
            this.IsLeft = true;
            this.maxHeight = 0;
            this.standElement = null;
            this.Sjump = "";
            this.Skill = "";
            this.Scoin = "";
        }
    }
    class Enemy {
        constructor(element) {
            this.element = element;
            this.StartPos = 0;
            this.EndPos = 0;
            this.right = false;
            this.left = true;
        }
    }
    var arrEnemy = [];
    function getValue(Property = "") {
        return Number(Property.split('px')[0]);
    }
    function start() {
        DivGame = document.getElementById("game");
        document.getElementById("h_1").style.display = "none";
        document.getElementById("h_2").style.display = "block";
        document.getElementById("h_2").style.height = "50px";
        DivGame.innerHTML = "";
        DivGame.setAttribute("style", "");
        DivGame.setAttribute("style", "position: relative;");
        DivGame.style.setProperty('height', "calc(100% - 50px)");
        DivGame.scroll(0, 0);
        Stheme.play();
        Stheme.loop = true;
        document.body.style.overflow = "hidden";
        DivGame.style.width = '100%';
        DivGame.style.backgroundColor = "#003d74";
        DivGame.style.backgroundImage = "url('media/mario/Images/Playing_BackGround1.png')";
        DivGame.style.backgroundRepeat = "repeat-x";
        DivGame.style.backgroundPosition = "9px calc(100% - 96px)";

        Land = document.createElement("div");
        DivGame.appendChild(Land);
        Land.style.backgroundImage = "url('media/mario/Images/Land.png')";
        Land.style.backgroundRepeat = "repeat-x";
        Land.className = "land";
        Land.style.position = 'absolute';
        Land.style.height = '261px';
        Land.style.width = '11800px';
        Land.style.bottom = '-165px';
        Land.style.left = '0px';

        player = document.createElement("img");
        DivGame.appendChild(player);
        player.setAttribute("src", SrcPlayerLevel1[0]);
        player.style.position = 'absolute';
        player.className = 'player';
        player.style.bottom = '150px';
        player.style.left = '20px';
        player.style.width = '60px';
        player.addEventListener('click', playAudio);
        player = new Player(player);
        player.Sjump = new Audio('media/mario/Sound/jump.wav');
        player.Skill = new Audio('media/mario/Sound/kill.wav');
        player.Scoin = new Audio('media/mario/Sound/coin.wav');
        var coin = document.createElement('img');
        coin.src = SrcCoin[0];
        coin.className = 'coin';
        coin.style.position = 'absolute';
        coin.style.width = '40px';
        coin.style.bottom = '370px';

        var block = document.createElement('img');
        block.src = SrcBlock;
        block.className = 'block';
        block.style.height = '50px';
        block.style.position = 'absolute';
        block.style.bottom = '300px';

        var enemy1 = document.createElement('img');
        enemy1.src = SrcEnemy1 + 1 + '.png';
        enemy1.className = 'enemy1';
        enemy1.style.height = '50px';
        enemy1.style.position = 'absolute';
        enemy1.style.bottom = '100px';
        enemy1.style.transform == 'scaleX(1)'

        var enemy2 = document.createElement('img');
        enemy2.src = SrcEnemy2 + 1 + '.png';
        enemy2.className = 'enemy2';
        enemy2.style.height = '50px';
        enemy2.style.position = 'absolute';
        enemy2.style.bottom = '100px';
        enemy2.style.transform == 'scaleX(1)'

        for (var i = 1; i < 12; i++) {
            var New_block = block.cloneNode(true);
            New_block.style.left = i * 1000 + 'px';
            DivGame.appendChild(New_block);
            for (var j = 0; j < 11; j++) {
                var New_coin = coin.cloneNode(true);
                New_coin.style.left = (i * 1000) + (j * 50) + 'px';
                DivGame.appendChild(New_coin);
            }
            if (i % 2 == 0) {
                var enemy = enemy1.cloneNode(true);
                DivGame.appendChild(enemy);
                enemy.style.left = (i * 1000) + (750) + 'px';
                var enemy = new Enemy(enemy);
                enemy.StartPos = (i * 1000) + (550);
                enemy.EndPos = (i * 1000) + (950);
                arrEnemy.push(enemy);
            } else {
                var enemy = enemy2.cloneNode(true);
                DivGame.appendChild(enemy);
                enemy.style.left = (i * 1000) + (750) + 'px';
                var enemy = new Enemy(enemy);
                enemy.StartPos = (i * 1000) + (550);
                enemy.EndPos = (i * 1000) + (950);
                arrEnemy.push(enemy);
            }
        }
    }
    start();


    document.addEventListener("keydown", KeyDown);
    startAnimCoins = setInterval(() => {
        AnimationCoins();
    }, 50);
    setInterval(() => {
        AnimationEnemy(arrEnemy);
    }, 100);
    setInterval(() => {
        var arr = document.getElementsByClassName("coin");
        Collision(player, arr);
        arr = document.getElementsByClassName("block");
        Collision(player, arr);
        arr = document.getElementsByClassName("land");
        Collision(player, arr);
        Drop(player);
        Fly(player);
        MoveEnemy(arrEnemy);
    }, 0);


    function MoveEnemy(arrEnemy) {
        for (var i = 0; i < arrEnemy.length; i++) {
            var ar = elementsOverlap(player.element, arrEnemy[i].element);
            if (arrEnemy[i].left) {
                MoveElement(arrEnemy[i].element, -0.5, 0);
                arrEnemy[i].element.style.transform = 'scaleX(1)';
            }
            if (arrEnemy[i].right) {
                MoveElement(arrEnemy[i].element, 0.5, 0);
                arrEnemy[i].element.style.transform = 'scaleX(-1)';
            }
            if (getValue(arrEnemy[i].element.style.left) == arrEnemy[i].EndPos) {
                //left
                arrEnemy[i].left = true;
                arrEnemy[i].right = false;
            }
            if (getValue(arrEnemy[i].element.style.left) == arrEnemy[i].StartPos) {
                //right
                arrEnemy[i].left = false;
                arrEnemy[i].right = true;
            }
            if (ar[0] && ar[1] == 3 && player.IsDrop) {
                ar[2].style.bottom = "-100px";
                player.Skill.play();
            }
            else if (ar[0]) {
                // console.log(12);
            }
        }
    }
    function MoveElement(element, x = 0, y = 0) {
        element.style.bottom = ChangePx(element.style.bottom, y);
        element.style.left = ChangePx(element.style.left, x);
    }
    function ChangePx(d, t = 0) {
        d = d.split('px')[0];
        d = (Number(d) + t) + 'px';
        return d;
    }
    function KeyDown(e) {
        if ((e.keyCode == 38) && (player.Isfly == false) && (player.IsDrop == false)) {
            //  38 up
            player.element.setAttribute("src", SrcPlayerLevel1[SrcPlayerLevel1Count++ % 5]);
            player.Isfly = true;
            player.maxHeight = getValue(player.element.style.bottom) + 450;
            player.Sjump.play();
        }
        if (e.keyCode == 37) {
            //  37 left
            player.element.setAttribute("src", SrcPlayerLevel1[SrcPlayerLevel1Count++ % 5]);
            player.element.style.transform = 'scaleX(-1)';
            if (player.element.getBoundingClientRect().left > 5) {
                MoveElement(player.element, -20, 0);
            }
        }
        if (e.keyCode == 39) {
            //  39 right
            player.element.style.transform = 'scaleX(1)';
            player.element.setAttribute("src", SrcPlayerLevel1[SrcPlayerLevel1Count++ % 5]);
            if ((player.element.getBoundingClientRect().left) > (DivGame.getBoundingClientRect().right / 3)) {
                varscroll += 15;
                DivGame.scroll(varscroll, 0);
            }
            if (getValue(player.element.style.left) < 11725)
                MoveElement(player.element, 20, 0);
        }
    }
    function elementsOverlap(el1, el2) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect()
        var where = 0;
        var bool = (
            domRect1.top < domRect2.bottom &&
            domRect1.right > domRect2.left &&
            domRect1.bottom > domRect2.top &&
            domRect1.left < domRect2.right
        );
        var Diff_1 = Math.abs(domRect1.top - domRect2.bottom);
        var Diff_2 = Math.abs(domRect1.right - domRect2.left);
        var Diff_3 = Math.abs(domRect1.bottom - domRect2.top);
        var Diff_4 = Math.abs(domRect1.left - domRect2.right);
        if (Diff_1 <= Diff_2 && Diff_1 <= Diff_3 && Diff_1 <= Diff_4) {
            where = 1;
            //bottom
        }
        if (Diff_2 <= Diff_1 && Diff_2 <= Diff_3 && Diff_2 <= Diff_4) {
            where = 2;
            //left
        }
        if (Diff_3 <= Diff_2 && Diff_3 <= Diff_1 && Diff_3 <= Diff_4) {
            where = 3;
            //top
        }
        if (Diff_4 <= Diff_2 && Diff_4 <= Diff_3 && Diff_4 <= Diff_1) {
            where = 4;
            //right
        }
        return [bool, where, el2];
    }
    function Collision(element, arr) {
        for (var i = 0; i < arr.length; i++) {
            var re = elementsOverlap(element.element, arr[i]);
            if (element.element.className == "player") {
                if (element.standElement != null && arr[i] == element.standElement && !re[0]) {
                    if (!element.Isfly)
                        element.IsDrop = true;
                    element.standElement = null;
                }
                if (re[0] && arr[i].className == "coin") {
                    element.Scoin.play();
                    re[2].remove();
                }
                else if (arr[i].className == "block") {
                    if (re[0] && re[1] == 3) {
                        //top
                        element.IsDrop = false;
                        element.standElement = arr[i];
                    }
                    else if (re[0]) {
                        element.Isfly = false;
                        element.IsDrop = true;
                    }
                }
                else if (arr[i].className == "land") {
                    if (re[0] && arr[i].className == "land") {
                        element.IsDrop = false;
                        element.standElement = arr[i];
                    }
                }
            }
        }
    }

    function Drop(element = Player()) {
        if (element.IsDrop) {
            MoveElement(element.element, 0, -1.8);
        }
    }
    function Fly(element = Player()) {
        if (element.Isfly) {
            if (getValue(element.element.style.bottom) > element.maxHeight) {
                element.Isfly = false;
                element.IsDrop = true;
                element.maxHeight = 0;
            } else {
                MoveElement(element.element, 0, 1.8);
            }
        }
    }
    function AnimationCoins() {
        var arr = document.getElementsByClassName('coin');
        ++SrcCoinCount;
        for (var i = 0; i < arr.length; i++) {
            arr[i].src = SrcCoin[(SrcCoinCount) % 4];
        }
    }
    function AnimationEnemy(arrEnemy) {
        SrcEnemyCount++;
        for (var i = 0; i < arrEnemy.length; i++) {
            if (arrEnemy[i].element.className == 'enemy1') {
                arrEnemy[i].element.src = SrcEnemy1 + (SrcEnemyCount) % 2 + '.png';
            }
            else if (arrEnemy[i].element.className == 'enemy2') {
                arrEnemy[i].element.src = SrcEnemy2 + (SrcEnemyCount) % 2 + '.png';
            }
        }
    }
}
