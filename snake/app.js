const gamearea = document.getElementById('snake_area').getContext("2d");
const canvas = document.getElementById('snake_area');

headposition_x = 130
headposition_y = 130
past_positions = [[130, 140],[130, 150],[130, 160]]
current_positions = []
length = 3
x_change = 0
y_change = -10
apple_x =0
apple_y =0
apples_collected = 0
direction = "up"
enable = true
document.getElementById("all").addEventListener("keydown", (event) => {
   if (event.key == "ArrowDown" && direction != "up" && enable == true) {
        x_change = 0
        y_change = 10
        direction = "down"
        enable = false
   } else if (event.key == "ArrowUp" && direction != "down" && enable == true) {
        x_change = 0
        y_change = -10
        direction = "up"
        enable = false
   } else if (event.key == "ArrowLeft" && direction != "right" && enable == true) {
        x_change = -10
        y_change = 0
        direction = "left"
        enable = false
   } else if (event.key == "ArrowRight" && direction != "left" && enable == true) {
        x_change = 10
        y_change = 0
        direction = "right"
        enable = false
   }
}) 
function add_apple() {
    valid_coords = false
    while (valid_coords == false) {
        x = Math.floor(Math.random() * 28)*10
        y = Math.floor(Math.random() * 28)*10
        if (x != headposition_x && y != headposition_y  ) {
            collision = false
            for (i in current_positions) {
                console.log(i)
                if ([x, y] == i) {
                    collision = true
                }
            }
            if (collision == false) {
                valid_coords = true
                apple_x = x
                apple_y = y
                
            }
        }
    }
    
}
add_apple()
function update_snake() {
    if (headposition_x == apple_x && headposition_y == apple_y) {
        add_apple()
        apples_collected++
        length++
    }
    
    
    
    
    current_positions = []
    var background = new Image();
    background.src = "grid.png";
    
    background.onload = function(){
        gamearea.drawImage(background,0,0)
        gamearea.font = "16px Arial";
        gamearea.fillStyle = "black";
        gamearea.fillText(`Score: ${(length-3)}`, 8, 20);
    gamearea.fillStyle = "orange"
    gamearea.fillRect(apple_x,apple_y, 10, 10)
    gamearea.fillStyle = "darkgreen"
    gamearea.fillRect(headposition_x,headposition_y,10,10)
    enable = true
    past_positions.unshift([headposition_x, headposition_y])
    count = 0
    for (let i = 0; i < length; i++) {
        gamearea.fillRect(past_positions[count][0],past_positions[count][1],10,10)
        count++
        current_positions.unshift(past_positions[count])
    }
    for (i in current_positions){
        console.log(current_positions[i])
        console.log("head" + [headposition_x,headposition_y])
        if ((headposition_x == current_positions[i][0] && headposition_y ==current_positions[i][1]) || (headposition_x < 0 || headposition_x > 280) || (headposition_y < 0 || headposition_y > 270)) {
            x_change =0
            y_change=0
            gamearea.font = "16px Arial";
            gamearea.fillStyle = "black";
            gamearea.fillText("GAME OVER", 130,130)
        }}
    headposition_x += x_change
    headposition_y += y_change
    }
}
setInterval(update_snake, 100);