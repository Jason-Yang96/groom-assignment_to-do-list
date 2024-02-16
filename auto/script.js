function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value;

    if (taskText.trim() !== '') {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `${taskText}<button onclick="removeTask(this)">Remove</button>`;
        taskList.appendChild(taskItem);

        taskInput.value = '';
    }
}

function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
