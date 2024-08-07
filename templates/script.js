// Const Variables
const newToDoText = document.getElementById("newToDoText");
const newToDoAdd = document.getElementById("newToDoAdd");

const toDoList = document.querySelector(".toDoList");

// Script helper variables
let currentToDoList;

// Set Data from LocalStorage
function setToDo() {
    currentToDoList = localStorage.getItem("toDoList");
    if (currentToDoList == null) {
        currentToDoList = { "data": [] };
        return;
    }

    currentToDoList = JSON.parse(currentToDoList);

    for (let i = 0; i < currentToDoList.data.length; i++) {
        let toDoText = currentToDoList.data[i];
        let toDoHtml = `<div class="toDoItem">
        <p class="toDoText"  onclick="toDoDone(this)">${toDoText}</p>
        <button class="toDoRemove" onclick="removeToDo(this)">Remove</button>
    </div>`

        toDoList.innerHTML += toDoHtml;
    }
}

// Update to Do list in LocalStorage
function updateToDo() {
    localStorage.setItem("toDoList", JSON.stringify(currentToDoList));
}

// Remove to do item
function removeToDo(element) {
    let toDoIndex = Array.from(toDoList.children).indexOf(element.parentElement);
    toDoList.removeChild(element.parentElement);

    currentToDoList.data.splice(toDoIndex, 1);

    updateToDo();
}

// To-Do Done!
function toDoDone(element){
    if (element.classList.contains("toDoDone")){
        element.classList.remove("toDoDone");
    } else{
        element.classList.add("toDoDone");
    }
}

// Add to do Item in the List
newToDoAdd.addEventListener("click", () => {
    if (newToDoText.value == "") {
        newToDoText.placeholder = "Enter some Text First!"
        setTimeout(() => {
            newToDoText.placeholder = "Write your To-Do";
        }, 1500);

        return
    }

    let toDoText = newToDoText.value;
    newToDoText.value = "";
    let toDoHtml = `<div class="toDoItem">
        <p class="toDoText"  onclick="toDoDone(this)">${toDoText}</p>
        <button class="toDoRemove" onclick="removeToDo(this)">Remove</button>
    </div>`

    toDoList.innerHTML += toDoHtml;
    currentToDoList.data.push(toDoText);
    updateToDo();
});


// Set to do list
setToDo();
