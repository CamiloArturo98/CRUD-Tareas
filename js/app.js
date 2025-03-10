import {Storage} from "./storage";
import { Task } from "./task";
document.addEventListener("DOMContentLoaded", () => {
    Storage.getTask();
});

document.getElementById("taskForm").addEventListener("submit", (e) =>{
    e.preventDefault();

    const   title       = document.getElementById("title").value,
            description = document.getElementById("description").value,
            priority    = document.getElementById("priority").value;

    if(title.trim() === "" || description.trim() === ""){
        alert("Please, complete al spaces");
        return;
    };

    const newTask = new Task // TODO : CONTINUE HERE.

})