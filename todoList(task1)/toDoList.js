// task ==> title , note 
// add , edit , delet ,display

let tasks = [];

const getTasks = () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

const storeTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = (title, note) => {
    let task = {
        id: ((new Date()).getTime()) * Math.random(),
        title: title,
        note: note
    }
    tasks = getTasks();
    tasks.push(task);

    storeTasks(tasks);
}

const displayAllTasks = () => {
    let tasks = getTasks();
    tasks.forEach(task => {
        console.log(`task id: ${task.id} , title: ${task.title} , note: ${task.note}`);
    });
}

const getSpisificTask = (id) => {
    let tasks = getTasks();
    let foundTask = tasks.findIndex(task => task.id == id);
    return foundTask;
}

const deleteTask = (id) => {
    taskIndex = getSpisificTask(id);
    if (taskIndex == -1) {
        return console.log("Not Found");
    }
    let tasks = getTasks();
    tasks.splice(taskIndex, 1);
    storeTasks(tasks);
}

const editTask = (id, newTitle, newNote) => {
    taskIndex = getSpisificTask(id);
    if (taskIndex == -1) {
        return console.log("Not Found");
    }
    let tasks = getTasks();
    tasks[taskIndex].title = newTitle;
    tasks[taskIndex].note = newNote;
    storeTasks(tasks);
}

const createCustomElement = (parent, element, classes, text) => {
    customElement = document.createElement(element);
    parent.appendChild(customElement);
    if (classes != '') {
        customElement.className = classes
    }
    if (text != '') {
        customElement.textContent = text;
    }
    return customElement
}


const displayTasks=(parent)=>{
    let tasks=getTasks();
    tasks.forEach(t => {
        let taskContainer = createCustomElement(parent, 'div', 'col-4');
        let task = createCustomElement(taskContainer, 'div', 'bg-primary m-2 text-center');
        let h4=createCustomElement(task,'h4','p-2',t.title);
        let p=createCustomElement(task,'p','p-2',t.note);
        let deleteBtn=createCustomElement(task,'button','m-2 btn btn-danger','Delete');
        deleteBtn.addEventListener('click', function(e){
            deleteTask(t.id);
            taskContainer.remove();
        });
        let editBtn=createCustomElement(task,'button','m-2 btn btn-warning','Edit');
        editBtn.addEventListener('click', function(e){
//***************************Must be edited ***/
            editTask(t.id ,'editedTitel', 'editedNote');
            
            h4.textContent=t.title;
            p.textContent=t.note;
        });
    })
}


let parent = document.querySelector('#toDoSection');
displayTasks(parent);


// addTask('title1','test note');
// addTask('title2','test note');
// addTask('title3','test note');
// addTask('title4','test note');
// addTask('title5','test note');
displayAllTasks();
console.log(1)
editTask(1334860062825.409, 'editedTitel', 'editedNote')
// deleteTask(1333259085319.019 );

// displayAllTasks();