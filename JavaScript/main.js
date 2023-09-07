// Selectors
const section = document.querySelectorAll(".section");
const title = document.querySelector("#title");
const addButton = document.querySelector("#add-button");
const unorderList = document.querySelector("#u-list");

const modeContainer = document.querySelector("#mode-container");
const mode = document.querySelector("#mode");
const body = document.querySelector("body");
const input = document.querySelector("#input-form");
const listItems = document.querySelector("#list-container");

// Counters
// let cmpltCounterSize = parseInt(document.querySelector("#cmpltCounter").innerText);
// let uncmpltCounterSize = parseInt(document.querySelector("#uncmpltCounter").innerText);

// when the page loads it will add shadow class to the sections
section.forEach((el) => { el.classList.add("shadow"); });

// list of todo
let todo_list = [];

let toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    mode.innerText = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    mode.classList.toggle("active");
    section.forEach((el) => { el.classList.toggle("shadow"); });
}

let addTodo = (e) => {
    e.preventDefault();
    
    const textBox = document.querySelector("#text-box");
    value = textBox.value.trim();
    
    if (value) {
        uncmpltCounterSize++;

        let id = Date.now();
        todo_list.push({id: id, text: value, check: false});
        renderTodoItem(id, value);
        
        textBox.value = null;
    }
}

let renderTodoItem = (id, val) => {
    const ul = document.querySelector("#u-list");
        
    const li = document.createElement("li");
    const p = document.createElement("p");
    const checkMark = document.createElement("i");
    const editButton = document.createElement("i");
    const deleteButton = document.createElement("i");

    li.setAttribute("list-id", id);
    li.setAttribute("draggable", "true");
    p.setAttribute("id", "list-text");
    p.innerText = val;
    // p.contentEditable = true;
    checkMark.setAttribute("id", "checkbox"); 
    checkMark.setAttribute("class", "fa-regular fa-circle-check ls-action-btns");
    editButton.setAttribute("class", "fa-solid fa-edit ls-action-btns");
    deleteButton.setAttribute("class", "fa-solid fa-trash ls-action-btns");
    deleteButton.setAttribute("id", "del-btn");

    li.appendChild(checkMark);
    li.appendChild(editButton)
    li.appendChild(deleteButton);
    ul.appendChild(li);

    updateCounters();
}

let handleClick = (e) => {
    const target = e.target;

    if(target.classList[0] === "checkbox") {
        toggleCheck(target);
    }
    if(target.classList[0] === "edit") {
        editItem(target);
    }
    if(target.classList.contains("delete")) {
        deleteItem(target);
    }
    if (!target.classList.contains("delete")) {
        closeItem(target);
    }
}

let toggleCheck = (target) => {
    let editState = target.parentNode.children[2].classList;
    let textState = target.parentNode.children[1];
    let text = target.parentNode.children[1].innerText;

    target.classList.toggle("fa-regular");
    target.classList.toggle("fa-solid");

    if(target.classList.contains("fa-regular")) {
        textState.innerHTML = `${text}`;
        editState.toggle("fa-edit");
    } else {
        textState.innerHTML = `<del>${text}</del>`;
        editState.toggle("fa-edit");
    }

    cmpltCounterSize += target.classList.contains("fa-regular") ? -1 : 1;
    uncmpltCounterSize += target.classList.contains("fa-regular") ? 1 : -1;
    updateCounters();
}

let setCursorAtEnd = (element) => {
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Collapse the range to the end
    selection.removeAllRanges();
    selection.addRange(range);
};

// unfinished

let editItem = (target) => {
    let buttonState = target.parentNode.children[2].classList.contains("fa-edit");

    target.parentNode.children[2].classList.toggle("fa-edit");
    target.parentNode.children[2].classList.toggle("fa-solid");
    target.parentNode.children[2].classList.toggle("fa-check");
    target.parentNode.children[3].classList.toggle("delete");
    target.parentNode.children[0].classList.toggle("fa-circle-check");

    if (buttonState) {
        target.parentNode.children[1].contentEditable = true;
        target.parentNode.classList.add("edit-highlight");
        setCursorAtEnd(target.parentNode.children[1]);

    } else {
        target.parentNode.children[1].contentEditable = false;
        target.parentNode.classList.remove("edit-highlight");
    }
    
}

// let closeItem = (target) => {
//     target.parentNode.children[3].classList.toggle("delete");
//     target.parentNode.children[2].classList.toggle("fa-edit");
//     target.parentNode.children[2].classList.toggle("fa-solid");
//     target.parentNode.children[2].classList.toggle("fa-check");
//     target.parentNode.children[1].contentEditable = false;
//  }

let deleteItem = (target) => {
    let id = target.parentNode.attributes["list-id"].nodeValue;
    delete todo_list.find((todo) => todo.id === id); 
    // console.log(`{${id} => ${todo_list.find((todo) => todo.id === id)}} Deleted!`)
    target.parentNode.remove();

    cmpltCounterSize += target.parentNode.children[0].classList.contains("fa-solid") ? -1 : 0;
    uncmpltCounterSize += target.parentNode.children[0].classList.contains("fa-regular") ? -1 : 0;
    updateCounters();
}

// Event Listeners
modeContainer.addEventListener("click", toggleDarkMode);
addButton.addEventListener("click", addTodo);
listItems.addEventListener("click", handleClick);

let updateCounters = () => {
    document.querySelector("#cmpltCounter").innerText = cmpltCounterSize;
    document.querySelector("#uncmpltCounter").innerText = uncmpltCounterSize;
}

// class Todo {
//     constructor(obj) {
//         this.obj = obj;
//     }
//     save() {
//         let obj_stringfy = JSON.stringify(this.obj);

//         if (localStorage.getItem("Todo List") === null) {
//             localStorage.setItem("Todo List", obj_stringfy);
//         } else {
//             var todo_obj = JSON.stringify(this.fetch("Todo List"));
//             if (obj_stringfy == todo_obj) {
//                 localStorage.setItem("Todo List", obj_stringfy);
//             } else {
                
//             }
//             localStorage.clear;
//         }
//         return todo_obj;
//     }
//     fetch() {
//         let items_str = localStorage.getItem(this.obj);
//         let todo_obj = JSON.parse(items_str);
//         return todo_obj;
//     }
// }
