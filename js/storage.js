class Storage {
    static getTask(){
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    static saveTask(tasks){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    static addTask(task) {
        const tasks = Storage.getTask();
        tasks.push(task);
        Storage.saveTask(tasks);
    }

    
    static deleteTask( id ) {
        let tasks = Storage.getTask();
        tasks = tasks.filter(task => task.id !== id);
        Storage.saveTask(tasks);
    }
    
    static updateTask( updateTask ) {
        let tasks = Storage.getTask();
        tasks = tasks.map(task => task.id === updateTask.id ? updateTask : task);
        Storage.saveTask(tasks);
    }
}