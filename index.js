//todo

let todo = [];
let completed = [];
const input = document.getElementById("input");
const list = document.querySelector('.list');
const completedList = document.querySelector('.completed');

function addToList() {
    if (input.value === "") {
        return;
    }
    todo.push(input.value);
    const newItem = document.createElement('div');
    newItem.setAttribute("id",input.value);
    const name = document.createElement('p');
    name.innerText = input.value;
    const done = document.createElement('button');
    done.setAttribute("onclick", `addToCompletedList('${input.value}')`);
    done.innerText = "Done!";
    const remove = document.createElement('button');
    remove.setAttribute("onclick", `deleteItem('${input.value}')`);
    remove.innerText = "X";

    newItem.appendChild(name);
    newItem.appendChild(done);
    newItem.appendChild(remove);
    list.appendChild(newItem);
    input.value = "";
    saveToLocalStorage();
}

function deleteItem(id) {
    const temp = document.getElementById(id);
    if (completed.includes(id)) {
        completedList.removeChild(temp);
        completed.pop(id);
        saveToLocalStorage();

    } else if (todo.includes(id)) {
        list.removeChild(temp);
        todo.pop(id);
        saveToLocalStorage();
    }
}

function clearLists() {
    completedList.innerHTML = "";
    list.innerHTML = "";
    todo = [];
    completed = [];
    saveToLocalStorage();
}

function addToCompletedList(id) {
    const temp = document.getElementById(id);
    completed.push(todo.pop(id));
    list.removeChild(temp);
    completedList.appendChild(temp);
    saveToLocalStorage();
}

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addToList();
    }
});
window.addEventListener('DOMContentLoaded', loadFromLocalStorage());

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("completed", JSON.stringify(completed));
}

function loadFromLocalStorage() {
    const savedTodo = localStorage.getItem('todo');
    const savedCompleted = localStorage.getItem('completed');

    if (savedTodo) todo = JSON.parse(savedTodo);
    if (savedCompleted) completed = JSON.parse(savedCompleted);

    for(let item of todo) {
        const newItem = document.createElement('div');
        newItem.setAttribute("id",item);
        const name = document.createElement('p');
        name.innerText = item;
        const done = document.createElement('button');
        done.setAttribute("onclick", `addToCompletedList('${item}')`);
        done.innerText = "Done!";
        const remove = document.createElement('button');
        remove.setAttribute("onclick", `deleteItem('${item}')`);
        remove.innerText = "X";

        newItem.appendChild(name);
        newItem.appendChild(done);
        newItem.appendChild(remove);
        list.appendChild(newItem);
    }
    
    for(let item of completed) {
        const newItem = document.createElement('div');
        newItem.setAttribute("id",item);
        const name = document.createElement('p');
        name.innerText = item;
        const remove = document.createElement('button');
        remove.setAttribute("onclick", `deleteItem('${item}')`);
        remove.innerText = "X";
        
        newItem.appendChild(name);
        newItem.appendChild(remove);
        completedList.appendChild(newItem);
    }
}

