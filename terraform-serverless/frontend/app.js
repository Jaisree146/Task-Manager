const API_URL = "https://xkezicwcr3.execute-api.ap-south-1.amazonaws.com";

async function loadTasks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        const tasks = await response.json();

        const taskList = document.getElementById("tasks");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${task.title}</strong><br>
                ${task.description}
            `;

            taskList.appendChild(li);
        });

    } catch (error) {
        console.error(error);
        alert("Unable to fetch tasks.");
    }
}

async function addTask() {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (title === "" || description === "") {
        alert("Please enter both title and description.");
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        loadTasks();

    } catch (error) {
        console.error(error);
        alert("Unable to add task.");
    }
}

window.onload = function () {
    loadTasks();
};