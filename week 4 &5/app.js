let items = []

function add () {
    //add text from text field to start of array
    items.push(document.getElementById("todoinput").value);
    //call function to add items from array
    createitems();
    //clear input feild
    document.getElementById("todoinput").value = '';
} 
    
//listen for keypress
document.getElementById("todoinput").addEventListener("keydown", (event) =>{
    //don't allow submit on blank textbox
    if (document.getElementById("todoinput").value == "") {
        event.preventDefault()
    //add item on enter
    } else if (event.code == "Enter") {
        add()
        //prevent a carriage return from being added to input field
        event.preventDefault()
    }
})

function createitems () {
    //clear created elements
    document.getElementById("it").innerHTML = '';
    //go through each item  
    for (i in items) {
        //create containers for elements
        document.getElementById("it").appendChild(document.createElement("div")).setAttribute("id","rembuttoncontainer"+i)
        document.getElementById("rembuttoncontainer"+i).setAttribute("class","itemcont")
        //create text
        const para = document.createElement("p");
        const node = document.createTextNode(items[i]);
        const element = document.getElementById("rembuttoncontainer"+i);
        //display text
        element.appendChild(para);
        para.appendChild(node);
        para.setAttribute("id","todoitem"+i);
        //add remove button
        document.getElementById("rembuttoncontainer"+i).appendChild(document.createElement("button")).setAttribute("id","rembutton"+i);
        document.getElementById("rembutton"+i).textContent = "Remove";
        console.log("rembutton"+i);
        document.getElementById("rembutton"+i).setAttribute("onclick", "removeitems("+i+")");
        };
}
//remove item by index
function removeitems (itemtorem) {
    console.log("rembutton"+itemtorem);
    console.log(items.splice(itemtorem,1));
    createitems();
}

