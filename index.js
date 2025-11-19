//todo

function Item(id, list, text, note) {
    this.id = id;
    this.list = list;
    this.text = text;
    this.note = note;
}
let sidebarState = 'closed';

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

    const name = document.createElement('button');
    name.innerText = "- " + newItemObject.text;
    //set id for name to match item id
    name.setAttribute("id", "name-" + newItemObject.id);
    name.addEventListener('click', () => openNotesSidebar(newItemObject.id));

    const done = document.createElement('button');
    done.addEventListener('click', () => addToCompletedList(newItemObject.id));
    done.innerText = "Done!";
    done.setAttribute("id", "done-" + newItemObject.id);
    
    const remove = document.createElement('button');
    remove.addEventListener('click', () => deleteItem(newItemObject.id, 'todo'));
    remove.innerText = "X";
    remove.setAttribute("id", "remove-" + newItemObject.id);

    newItemDiv.appendChild(name);
    newItemDiv.appendChild(done);
    newItemDiv.appendChild(remove);
    list.appendChild(newItemDiv);
    input.value = "";
    saveToLocalStorage();
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
    const doneButton = temp.querySelector('#done-' + id);
    temp.removeChild(doneButton);
    //remap delete button
    const deleteButton = temp.getElementById('#remove-' + id);
    deleteButton.addEventListener('click', () => deleteItem(id, 'completed'));

    saveToLocalStorage();
}

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addToList();
    }
});
window.addEventListener('DOMContentLoaded', loadFromLocalStorage());
document.getElementById('closeBtn').addEventListener('click', closeNotesSidebar);
document.getElementById('addBtn').addEventListener('click', addToList);
document.getElementById('clearBtn').addEventListener('click', clearLists);

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
        const name = document.createElement('button');
        name.innerText = '- ' + item.text;
        name.addEventListener('click', () => openNotesSidebar(item.id));
        const done = document.createElement('button');
        done.addEventListener('click', () => addToCompletedList(item.id));
        done.innerText = "Done!";
        const remove = document.createElement('button');
        remove.addEventListener('click', () => deleteItem(item.id,'todo'));
        remove.innerText = "X";

        newItem.appendChild(name);
        newItem.appendChild(done);
        newItem.appendChild(remove);
        list.appendChild(newItem);
    }
    
    for(let item of completed) {
        const newItem = document.createElement('div');
        newItem.setAttribute("id",item.id);
        const name = document.createElement('button');
        name.innerText = "- " + item.text;
        name.addEventListener('click', () => openNotesSidebar(item.id));
        const remove = document.createElement('button');
        remove.addEventListener('click', () => deleteItem(item.id, 'completed'));
        remove.innerText = "X";
        
        newItem.appendChild(name);
        newItem.appendChild(remove);
        completedList.appendChild(newItem);
    }
    console.log("Loaded from local storage");
    console.log(todo);
    console.log(completed);
}

function openNotesSidebar(id) {
    if (sidebarState != 'closed') return;
    sidebarState = "open " + id;
    
    let theItem = todo.find(item => item.id === id);
    if (!theItem) theItem = completed.find(item => item.id === id);
    
    const content = theItem.note;
    const textArea = document.getElementById('notesInput');
    textArea.value = content;
    const notesHeader = document.getElementById('notes');
    notesHeader.innerText = "Notes: " + theItem.text;
    const hiding = document.getElementById('notes sidebar');
    hiding.className = "sidebar";
}

function closeNotesSidebar() {

    let id = sidebarState.slice(5);
    let theItem = todo.find(item => item.id === id);
    if (!theItem) theItem = completed.find(item => item.id === id);
    theItem.note = document.getElementById('notesInput').value;
    let hiding = document.getElementById('notes sidebar');
    hiding.className = "sidebar hidden";
    sidebarState = 'closed';
    saveToLocalStorage();
}