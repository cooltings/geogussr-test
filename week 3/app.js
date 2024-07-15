//get 2d canvas from html
const canvasElement = document.getElementById("canvas").getContext("2d");
//get area to listen for keypresses in
const listenarea = document.getElementById("bigarea")
//set colour of canvas fill
canvasElement.fillStyle = "red";
let rect_x = 0
let rect_y = 0
//draw rectangle on canvas element
canvasElement.fillRect(rect_x,rect_y,20,20)
//whenever a key is pressed...
listenarea.addEventListener("keydown", (key) => {
    //if they key is down arrow change y by +20 to move square down
    if (key.key == "ArrowDown") {
        rect_y += 20
    //and so on..
    } else if (key.key == "ArrowRight") {
        rect_x += 20
    } else if (key.key == "ArrowLeft") {
        rect_x -= 20
    } else if (key.key =="ArrowUp") {
        rect_y -=20
    }
    //draw rectangle with new x&y coords
    canvasElement.fillRect(rect_x,rect_y,20,20)
})