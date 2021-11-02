// Define UI elements
let form = document.querySelector("#task_form");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector("#new_task");

// Define event listener
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTask);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);

// Define function
// addTask

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a task!");
  } else {
    // Create Li element
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }
}

// Remove Task
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let ele = e.target.parentElement;
      ele.remove();
      removeFromLS(ele);
    }
  }
}

// Clear Task
function clearTask(e) {
  taskList.innerHTML = "";
  localStorage.clear();
}

// Filter Task
function filterTask(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get Tasks from local Storage
function getTasks() {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeFromLS(taskItem) {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
