const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You have to add a task");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // The "X" symbol for deletion
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Toggle task checked or delete
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Edit task on double click
listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        const li = e.target;
        const currentValue = li.innerText.slice(0, -1); // Remove the "X"
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        li.innerHTML = "";
        li.appendChild(input);

        input.focus();

        // Save the edited task on Enter or when clicking outside (blur event)
        input.addEventListener("blur", function() {
            saveEdit(li, input.value);
        });
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                saveEdit(li, input.value);
            }
        });
    }
});

function saveEdit(li, newValue) {
    if (newValue.trim() === "") {
        li.remove();
    } else {
        li.innerHTML = newValue;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // The "X" symbol
        li.appendChild(span);
    }
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTasks();
