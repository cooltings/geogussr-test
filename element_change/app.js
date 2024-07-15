//array of available colours
let colors = ["yellow","green","red","blue","purple","turquoise","IndianRed"] 
for (var x in colors) {
    var elementC = document.createElement("h1");
    var typeC = document.createTextNode(colors[x]);
    var parentC = document.getElementById("change");
    parentC.appendChild(elementC);
    elementC.appendChild(typeC);
}

console.log(Math.floor(Math.random() * colors.length))
function bgChange(){
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
    const para = document.createElement("p");
    const node = document.createTextNode("*click*");
    const element = document.getElementById("change");
    element.appendChild(para);
    para.appendChild(node);
}