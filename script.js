document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("add-task");
    const toggleThemeButton = document.getElementById("toggle-theme");
    const filterAllButton = document.getElementById("filter-all");
    const filterCompletedButton = document.getElementById("filter-completed");
    const filterIncompleteButton = document.getElementById("filter-incomplete");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let theme = localStorage.getItem("theme") || "light";

    document.body.classList.add(theme);
    renderTasks();

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    });

    toggleThemeButton.addEventListener("click", () => {
        theme = theme === "light" ? "dark" : "light";
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
        localStorage.setItem("theme", theme);
        toggleThemeButton.textContent = theme === "light" ? "Mudar Tema" : "Mudar Tema";
    });

    filterAllButton.addEventListener("click", () => renderTasks());
    filterCompletedButton.addEventListener("click", () => renderTasks("completed"));
    filterIncompleteButton.addEventListener("click", () => renderTasks("incomplete"));

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "all" || 
                (filter === "completed" && task.completed) || 
                (filter === "incomplete" && !task.completed)) {
                
                const li = document.createElement("li");
                li.className = "list-group-item";
                
                // Checkbox para marcar/desmarcar como completo
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "checkbox-complete";
                checkbox.checked = task.completed;
                checkbox.addEventListener("change", () => {
                    toggleComplete(index);
                });

                const label = document.createElement("label");
                label.textContent = task.text;
                label.classList.toggle("completed", task.completed);

                li.appendChild(checkbox);
                li.appendChild(label);
                
                taskList.appendChild(li);

                // Animação de fade ao adicionar a tarefa
                li.classList.add("fade");
                setTimeout(() => li.classList.remove("fade"), 0);
            }
        });
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
