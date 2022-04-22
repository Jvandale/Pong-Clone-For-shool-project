// PonG

// setup canvas
let cnv = document.getElementById("Game")
let ctx = cnv.getContext("2d");
cnv.width = 720;
cnv.height = 400;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, cnv.width, cnv.height)

// get input
document.addEventListener("keydown", Controls)
document.addEventListener("keyup", stopmove)

// variables
let GameState = "Menu"

let Player = {
    X: 40,
    Y: 180,
    moveup: 0,
    movedown: 0,
    C: "white"
};


let Player2 = {
    X: 680,
    Y: 180,
    moveup: 0,
    movedown: 0,
    C: "white"
};

let colour = ['red', 'blue', 'yellow', 'lime', 'cyan', 'orange', 'magenta', 'pink', 'purple', 'white']


let P1score = document.getElementById("Score1")
let P2score = document.getElementById("Score2")
let tracker = document.getElementById("time");

let P1 = 0
let P2 = 0;

let P1Index = 0;
let P2Index = 0;

let Ball = {
    X: 250,
    Y: 200,
    S: 20,
    C: 'white',
    moveX: -4,
    moveY: 0
};




setInterval(timer, 1000)
let Time = 45
// Draw Stuff

requestAnimationFrame(loop);

function loop() {


    // checks gameState and calls the appropiate functions
    if (GameState == "Play") {
        GameVariables()

        DrawBackground()

        DrawElements()

    } else if (GameState == "Menu") {
        Menu()
    } else if (GameState == "End") {
        End()
    }


    if (Ball.X <= 1 || Ball.X >= 700) {
        score()
    }

    


    requestAnimationFrame(loop);
}

function Menu() {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    ctx.fillStyle = "white";
    ctx.font = "30px Brush Script MT";
    ctx.fillText("Pong", 340, 60, 200)

    ctx.fillStyle = "white";
    ctx.font = "30px Brush Script MT";
    ctx.fillText("Press Space To Play", 250, 120, )

    ctx.fillStyle = "cyan";
    ctx.font = "30px Courior";
    ctx.fillText("P1: W,S to move | P2: Up, Down to move", 130, 350, )

    ctx.fillStyle = 'Player.C';
    ctx.globalAlpha = 1
    ctx.fillRect(Player.X, Player.Y, 12, 50);

    ctx.fillStyle = 'Player2.C';
    ctx.fillRect(Player2.X, Player2.Y, 12, 50);


}

function End() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    
    var A = 0
    
    Player.Y = Player.Y
    Player2.Y = Player2.Y
    Ball.X = Ball.X
    Ball.Y = Ball.Y

    if (P1score > P2score) {
        A = 1
    } else {
        A = 2
    }
    
    
    ctx.fillStyle = "white";
    ctx.font = "30px Brush Script MT";
    ctx.fillText("Player " + A + " Wins!", 250, 120, )

}


function DrawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    // ctx.globalAlpha = 1


}

function DrawElements() {



    ctx.fillStyle = 'white';
    ctx.globalAlpha = 1
    ctx.fillRect(Player.X, Player.Y, 12, 50);

    ctx.fillStyle = 'white';
    ctx.fillRect(Player2.X, Player2.Y, 12, 50);

    ctx.fillStyle = Ball.C;
    ctx.fillRect(Ball.X, Ball.Y, Ball.S, Ball.S);

    if (Ball.moveX >= 10 || Ball.moveX <= -10) {
        ctx.fillStyle = Ball.C;
        ctx.globalAlpha = 0.4
        ctx.fillRect(Ball.X, Ball.Y, Ball.S, Ball.S);
    }


    ctx.fillStyle = 'black';
    ctx.fillRect(Ball.X + 5, Ball.Y + 5, Ball.S - 10, Ball.S - 10);
}


function GameVariables() {
    
    if (Time <= 0 && GameState == Play) {
        GameState = "End"
    }

    
    let Y2 = Player.Y + 50
    let Y1 = Player.Y - 20

    let Y4 = Player2.Y + 50
    let Y3 = Player2.Y - 20

    // Ball Boundry
    if (Ball.X >= 700) {
        Ball.X = 699
        Ball.moveX = -4
        Colour()
    } else if (Ball.X <= 0) {
        Ball.X = 1
        Ball.moveX = 4
        Colour()
    } else if (Ball.Y >= 380) {
        Ball.moveY = -4
        hit = 10;
        minus = -10;
        Colour()
    } else if (Ball.Y <= 0) {
        Ball.moveY = 4
        hit = 10;
        minus = -10;
        Colour()
    }

    // update Time
    if (Time > 0 && Gamestate == Play) {
        Player.Y = Player.Y + Player.moveup
        Player.Y = Player.Y + Player.movedown


        Player2.Y = Player2.Y + Player2.moveup
        Player2.Y = Player2.Y + Player2.movedown


        Ball.X = Ball.X + Ball.moveX
        Ball.Y = Ball.Y + Ball.moveY
    }

    // make Player Boundry
    if (Player.Y > 352) {
        Player.Y = 351
    } else if (Player.Y < 0) {
        Player.Y = 1
    }

    if (Player2.Y > 352) {
        Player2.Y = 351
    } else if (Player2.Y < 0) {
        Player2.Y = 1
    }




    // // detect ball coliding with Player
    if (Ball.X <= 40 && Ball.Y <= Y2 && Ball.Y >= Y1) {
        Ball.moveX = 5
        BallHit()
        console.log("HIT!")
        Colour()
    } else

    if (Ball.X >= 680 && Ball.Y <= Y4 && Ball.Y >= Y3) {
        Ball.moveX = -5
        BallHit()
        console.log("HIT!")
        Colour()
    }
}




function Controls(_event) {
    console.log(event.code)

    if (event.code == "ArrowUp" && GameState == "Play") {
        Player2.moveup = -10
    } else if (event.code == "ArrowDown" && GameState == "Play") {
        Player2.movedown = 10
    }

    if (event.code == "KeyW" && GameState == "Play") {
        Player.moveup = -10
    } else if (event.code == "KeyS" && GameState == "Play") {
        Player.movedown = 10
    }

    if (event.code === "Space" && GameState == "Menu") {
        GameState = "Play"
    } else if (event.code === "Equal" && Time < 120) {
        Time += 10
    } else if (event.code === "Minus" && Time > 30) {
        Time + -10
    }
}

function ChangeColour() {
    P1.Colour = Colour[P1Index]

    P1colour = (P1colour) % (Colour.length);

    console.log("colour change")
}



function stopmove() {
    if (event.code == "ArrowUp") {
        Player2.moveup = 0
    } else if (event.code == "ArrowDown") {
        Player2.movedown = 0
    }

    if (event.code == "KeyW") {
        Player.moveup = 0
    } else if (event.code == "KeyS") {
        Player.movedown = 0
    }
}



function score() {
    if (Ball.X <= 1) {
        P2++
        P2score.innerHTML = (P2)
        console.log("P2 Scores")
    } else if (Ball.X >= 700) {
        P1++
        P1score.innerHTML = (P1)
        console.log("P1 Scores")
    }
}



// Changes Balls Colour
function Colour() {
    let C1 = Math.random();

    if (C1 <= 0.1) {
        Ball.C = 'red'
    } else if (C1 <= 0.2) {
        Ball.C = 'blue'
    } else if (C1 <= 0.3) {
        Ball.C = 'yellow'
    } else if (C1 <= 0.4) {
        Ball.C = 'lime'
    } else if (C1 <= 0.5) {
        Ball.C = 'cyan'
    } else if (C1 <= 0.6) {
        Ball.C = 'orange'
    } else if (C1 <= 0.7) {
        Ball.C = 'magenta'
    } else if (C1 <= 0.8) {
        Ball.C = 'pink'
    } else if (C1 <= 0.9) {
        Ball.C = 'purple'
    } else {
        Ball.C = 'white'
    }


};
let hit = 5;
let minus = -5
const BallHit = () => {
    // if the ball is hit twice in a row then speed it up each hit after

    if (Ball.moveY == 1 || Ball.moveY == -1) {

        hit++
        minus--
        console.log(Ball.moveX)
        if (Ball.moveX > 0) {
            Ball.moveX = hit + 5;
        } else if (Ball.moveX < 0) {
            Ball.moveX = minus - 5;
        }
    } else {
        hit = 5;
        minus = -5;
    }

    // detect if player is moving and make ball move accordingly
    if (Ball.X > 360) {
        if (Player2.moveup < 0) {
            Ball.moveY = -1
        } else if (Player2.movedown) {
            Ball.moveY = 1
        } else {
            if (Ball.moveY > 0) {
                Ball.moveY = 2
            } else {
                Ball.moveY = -2
            }
        }
    } else {
        if (Player.moveup < 0) {
            Ball.moveY = -1
        } else if (Player.movedown) {
            Ball.moveY = 1
        } else {
            if (Ball.moveY > 0) {
                Ball.moveY = 2
            } else {
                Ball.moveY = -2
            }
        }
    }

};


function timer() {
    if (Time > 0 && GameState == "Play") {
        Time--;
        tracker.innerHTML = Time
    } else {
        GameState = "End"
    }

}