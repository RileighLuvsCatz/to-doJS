//todo

function Item(id, list, text, note) {
    this.id = id;
    this.list = list;
    this.text = text;
    this.note = note;
}

let todo = [];
let completed = [];
const input = document.getElementById("input");
const list = document.querySelector('.list');
const completedList = document.querySelector('.completed');

function addToList() {
    if (input.value === "") {
        return;
    }

    const newItemObject = new Item('item-' + Date.now(),'todo', input.value, "")
    todo.push(newItemObject);

    const newItemDiv = document.createElement('div');
    newItemDiv.setAttribute("id",newItemObject.id);

    const name = document.createElement('p');
    name.innerText = "- " + newItemObject.text;

    const done = document.createElement('button');
    done.setAttribute("onclick", `addToCompletedList('${newItemObject.id}')`);
    done.innerText = "Done!";
    
    const remove = document.createElement('button');
    remove.setAttribute("onclick", `deleteItem('${newItemObject.id}', '${newItemObject.list}')`);
    remove.innerText = "X";

    newItemDiv.appendChild(name);
    newItemDiv.appendChild(done);
    newItemDiv.appendChild(remove);
    list.appendChild(newItemDiv);
    input.value = "";
    //saveToLocalStorage();
}

function deleteItem(id, listType) {
    let type = listType;
    
    if (type == 'completed') {
        const temp = document.getElementById(id);
        completed = completed.filter(item => item.id !== id);
        completedList.removeChild(temp);
        saveToLocalStorage();
        return;

    } else if (type == 'todo') {
        const temp = document.getElementById(id);
        todo = todo.filter(item => item.id !== id);
        list.removeChild(temp);
        saveToLocalStorage();
        return;
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
    //array manipulation
    const itemA = todo.find(item => item.id === id);
    itemA.list = 'completed';
    completed.push(itemA);
    todo = todo.filter(item => item.id !== id);

    //move element in DOM
    list.removeChild(temp);
    completedList.appendChild(temp);
    //remove done button
    const doneButton = temp.querySelector('button');
    temp.removeChild(doneButton);
    //remap delete button
    const deleteButton = temp.querySelector('button');
    deleteButton.setAttribute("onclick", `deleteItem('${id}', 'completed')`);

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
        newItem.setAttribute("id",item.id);
        const name = document.createElement('p');
        name.innerText = '- ' + item.text;
        const done = document.createElement('button');
        done.setAttribute("onclick", `addToCompletedList('${item.id}')`);
        done.innerText = "Done!";
        const remove = document.createElement('button');
        remove.setAttribute("onclick", `deleteItem('${item.id}', 'todo')`);
        remove.innerText = "X";

        newItem.appendChild(name);
        newItem.appendChild(done);
        newItem.appendChild(remove);
        list.appendChild(newItem);
    }
    
    for(let item of completed) {
        const newItem = document.createElement('div');
        newItem.setAttribute("id",item.id);
        const name = document.createElement('p');
        name.innerText = "- " + item.text;
        const remove = document.createElement('button');
        remove.setAttribute("onclick", `deleteItem('${item.id}', 'completed')`);
        remove.innerText = "X";
        
        newItem.appendChild(name);
        newItem.appendChild(remove);
        completedList.appendChild(newItem);
    }
    console.log("Loaded from local storage");
    console.log(todo);
    console.log(completed);
}

