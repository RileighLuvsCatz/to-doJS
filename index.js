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
}

function deleteItem(id) {
    const temp = document.getElementById(id);
    if (completed.includes(id)) {
        completedList.removeChild(temp);
        completed.pop(id);

    } else if (todo.includes(id)) {
        list.removeChild(temp);
        list.pop(id);
    }
}

function clearLists() {
    completedList.innerHTML = "";
    list.innerHTML = "";
    todo = [];
    completed = [];
}

function addToCompletedList(id) {
    const temp = document.getElementById(id);
    completed.push(todo.pop(id));
    list.removeChild(temp);
    completedList.appendChild(temp);
}
