//get canvas from html
const gamearea = document.getElementById('gamearea').getContext("2d");
const canvas = document.getElementById('gamearea');
//draw background
gamearea.fillStyle = "green"
gamearea.fillRect(0,0, 1000, 1000)
//set start positions
var player1padel_y = 200
var player2padel_y = 200
var ballposition_x = canvas.width/2
var ballposition_y = 250
var p1paddle_velocity = 0
var p2paddle_velocity = 0
var initvel = 80
var ballvelocity_x = 0
var ballvelocity_y = 0
var p1score = 0
var p2score = 0
var gamestart = false
//listen for mouseclick to start game
document.getElementById("all").addEventListener("click", (event) =>{
    if (gamestart == false) {
        ballvelocity_x = initvel
        ballvelocity_y = 0
        player1padel_y = 200
        player2padel_y = 200
        gamestart = true
}})
//move player on key press
document.getElementById("all").addEventListener("keydown", (event) =>{
    if (gamestart == false) {
        ballvelocity_x = initvel
        ballvelocity_y = 0
        player1padel_y = 200
        player2padel_y = 200
        gamestart = true
    }
    if (event.code == 'KeyW') {
        player1padel_y = player1padel_y-15
    } else if (event.code == 'KeyS') {
        player1padel_y=player1padel_y+15
    } else if (event.code == 'ArrowUp') {
        player2padel_y = player2padel_y-15

    } else if (event.code == 'ArrowDown') {
        player2padel_y=player2padel_y+15
    }
})
function ballmovement () {
    //change ball position based on velocity
    ballposition_x = ballposition_x+ballvelocity_x/100
    ballposition_y = ballposition_y+ballvelocity_y/100
    //ball bounce off walls
    if (ballposition_y > canvas.height ) {
        ballvelocity_y *= -1
    }
    if (ballposition_x > canvas.width) {  
        ballvelocity_x *= -1
    }
    if (ballposition_y < 0) {
        ballvelocity_y *= -1
    }
    if (ballposition_x < 0) {
        ballvelocity_x *= -1
    }
    if (ballposition_x < 8) {
        ballvelocity_x = 0
        ballvelocity_y = 0
        gamestart = false
        ballposition_x = canvas.width/2
        initvel = 80
        ballposition_y = 250
        p2score += 1
    }
    if (ballposition_x > canvas.width-8) {
        ballvelocity_x = 0
        ballposition_y = 0
        gamestart = false
        ballposition_x = canvas.width/2
        initvel = -80
        ballposition_y = 250
        p1score += 1
    }
    //ball bounce off player padels
    if (ballposition_y <= player1padel_y+100 && ballposition_y >= player1padel_y && ballposition_x < 30 && ballposition_x > 25)
        var relballpos = ballposition_y-player1padel_y
        if (relballpos > 48 && relballpos < 52) {
            ballvelocity_x = 80
            ballvelocity_y = 0
            
        } else if (relballpos<=48) {
            ballvelocity_x = 80
            ballvelocity_y = (Math.abs(50 - relballpos) * -1)-70
        } else if (relballpos>=52) {
            ballvelocity_x = 80
            ballvelocity_y = (Math.abs(100 - relballpos))+70//only returns positive
        }
    if (ballposition_y <= player2padel_y+100 && ballposition_y >= player2padel_y && ballposition_x > canvas.width - 30 && ballposition_x < canvas.width-25) {
        var relballpos = ballposition_y-player2padel_y
        console.log(relballpos)
        if (relballpos > 48 && relballpos < 52) {
            ballvelocity_x = - 100
            ballvelocity_y = 0
            
        } else if (relballpos<=48) {
            ballvelocity_x = -80
            ballvelocity_y = (Math.abs(50 - relballpos) * -1)-70
        } else if (relballpos>=52) {
            ballvelocity_x = -80
            ballvelocity_y = (Math.abs(100 - relballpos))+70
        }
       
    }
}

//draw objects on canvas
function drawobjects () {
    gamearea.fillStyle = "green"
    gamearea.fillRect(0,0, 1000, 1000)

    gamearea.fillStyle = "white"
    gamearea.fillRect(1,player1padel_y,20,100)

    gamearea.fillStyle = "white"
    gamearea.fillRect(canvas.width - 21,player2padel_y,20,100)

    gamearea.fillStyle = "white"
    gamearea.beginPath();
    gamearea.arc(ballposition_x, ballposition_y, 10, 0, 2 * Math.PI);
    
    gamearea.font = "48px sans-serif"
    gamearea.fillText(p1score, 10, 50);

    gamearea.font = "48px sans-serif"
    gamearea.fillText(p2score, canvas.width-40, 50);


    gamearea.fill()

    requestAnimationFrame(drawobjects)
}


setInterval(ballmovement, 1)
requestAnimationFrame(drawobjects)