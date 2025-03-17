// import {Storage} from "./storage";
document.addEventListener("DOMContentLoaded", () => {
    showTasks(); //Muestra las tareas apenas el HTML cargue
});

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Previene errores por defecto.

    const   title       = document.getElementById("title").value, // Recupera el valor de el que escribio el usuario en el campo de texto
            description = document.getElementById("description").value,
            priority    = document.getElementById("priority").value;

    if(title.trim() === "" || description.trim() === ""){ //Verificacion para que el titulo y descripcion no sean espacios en blanco
        alert("Please, complete all spaces whit valid value");
        return;
    };

    const newTask = new Task(Date.now(), title, description, priority); // Datos necesarios para crear una nueva tarea.
    Storage.addTask(newTask); // Aniade la nueva tarea a la lista de tareas.

    showTasks();
    document.getElementById("taskForm").reset(); // Coloca el formulario en blanco (lo resetea)

});

const showTasks = ( filter = "all" ) => { // Funcion la cual muestra tareas (Por default se muestran todas apenas cargue la pagina.)
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = Storage.getTask();
    
    if ( filter !== "all" ) {
        tasks = tasks.filter(task => task.priority === filter); // Se encarga de que el filtro coincida con la prioridad y que se muestren especificamente esas tareas.
    };

    tasks.forEach(task => {
        const row = document.createElement("tr"); // Creando etiqueta tr

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskList.appendChild(row); //Inseta todo el codigo html que colocamos en la constante row en el elemento HTML con el id taskList
    });
}
//TODO : Estilo para los botones.

const deleteTask = (id) => { // Se manda el id para saber que tarea se tiene que eliminar.
    Storage.deleteTask(id); //Se hace uso de el metodo deletetask de la clase storage para elminar la tarea
    showTasks(); // Muestra la lista de tareas actualizadas.
}

const editTask = ( id ) => { // Requerimos el id de la tarea que queremos editar.
    const tasks = Storage.getTask(), // Se hace uso de el metodo getTask de la clase storge para mostrar las tareas acutales
            task = tasks.find(t => t.id === id); //Devuelve el primer elemento de el arreglo el cual cumpla con la condicion.
    if (!task) return; //El codigo termina en este punto si la tarea no fue encontrada o fue undefined.
    
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("priority").value = task.priority;

    deleteTask(id);
}
document.getElementById("filterByPriority").addEventListener("change", (e) => { // Modifica la etiqueta con el id especificado y escucha ele evento de cambio
    showTasks(e.target.value); // Muestra el nuevo valor de la tarea ( el valor editado o modificado. )
});