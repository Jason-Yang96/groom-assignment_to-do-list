document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks: call local stored tasks from local storage
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-task" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add a task
    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listener for adding a task
    addTaskButton.addEventListener('click', addTask);

    // Event delegation for deleting a task
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-task')) {
            const index = event.target.getAttribute('data-index');
            deleteTask(index);
        }
    });

    // Initial rendering of tasks
    renderTasks();
});
