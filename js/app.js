// import {Storage} from "./storage";
document.addEventListener("DOMContentLoaded", () => {
    showTasks();
});

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const   title       = document.getElementById("title").value,
            description = document.getElementById("description").value,
            priority    = document.getElementById("priority").value;

    if(title.trim() === "" || description.trim() === ""){
        alert("Please, complete al spaces");
        return;
    };

    const newTask = new Task(Date.now(), title, description, priority);
    Storage.addTask(newTask);

    showTasks();
    document.getElementById("taskForm").reset();

});

const showTasks = ( filter = "all" ) => {
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = Storage.getTask();
    
    if ( filter !== "all" ) {
        tasks = tasks.filter(task => task.priority === filter);
    };

    tasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });

    const deleteTask = (id) => {
        Storage.deleteTask(id);
        showTasks();
    }

    const editTask = (id) => {
        const tasks = Storage.getTask(),
                task = tasks.find(t => t.id === id);
        if (!task) return; //El codigo termina en este punto si la tarea no fue encontrada o fue undefined.
        
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        document.getElementById("priority").value = task.priority;

        deleteTask(id);
    }
    document.getElementById("filterByPriority").addEventListener("change", (e) => {
        showTasks(e.target.value);
    })
}