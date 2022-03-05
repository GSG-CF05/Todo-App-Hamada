const form = document.querySelector("#new-todo-form");
const input = document.querySelector("#new-todo-input");
const list_el = document.querySelector("#tasks");
let todos = [];

document.addEventListener("DOMContentLoaded", () => {
  getItemInLoad();
});

form.addEventListener("submit", (e) => {
  console.log("submit");
  e.preventDefault();
  const task = input.value;
  if (!task) {
    alert("your input is empty please fill the input to create todo task");
    return;
  }
  const task_el = document.createElement("div");
  task_el.classList.add("task");

  const task_content_el = document.createElement("div");
  task_content_el.classList.add("content");

  const task_input_el = document.createElement("input");
  task_input_el.classList.add("text");
  task_input_el.type = "text";
  task_input_el.value = task;
  task_input_el.setAttribute("readonly", "readonly");

  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  var date = Date.now();
  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerText = "Edit";
  task_edit_el.dataset.id = date;

  const task_delete_le = document.createElement("button");
  task_delete_le.classList.add("delete");
  task_delete_le.innerText = "Delete";
  task_delete_le.dataset.id = date;

  task_el.appendChild(task_content_el);
  task_el.appendChild(task_actions_el);
  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_le);
  list_el.appendChild(task_el);
  task_content_el.appendChild(task_input_el);
  console.log(task_el);

  saveToLocalStorge({ id: date, text: task_input_el.value });
  input.value = "";

  editItem();
  deleteItem();
});
function saveToLocalStorge(todo) {
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getItemInLoad() {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = todo.text;
    task_input_el.setAttribute("readonly", "readonly");

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";
    task_edit_el.dataset.id = todo.id;

    const task_delete_le = document.createElement("button");
    task_delete_le.classList.add("delete");
    task_delete_le.innerText = "Delete";
    task_delete_le.dataset.id = todo.id;

    task_el.appendChild(task_content_el);
    task_el.appendChild(task_actions_el);
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_le);
    list_el.appendChild(task_el);
    task_content_el.appendChild(task_input_el);
    console.log(task_el);

    editItem();
    deleteItem();
  });
}

function deleteItem() {
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const task_el = event.target.parentElement.parentElement;
      var id = event.target.dataset.id;
      console.log(id);
      deletefromlocalStorge(id);
      list_el.removeChild(task_el);
    });
  });
}

function deletefromlocalStorge(id) {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  todos.forEach((todo, index) => {
    console.log(todo.id == id);
    if (todo.id == id) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editItem() {
  const editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const task_el = event.target;
      var id = event.target.dataset.id;
      var input =
        event.target.parentElement.parentElement.querySelector("input");
      console.log(input);
      if (task_el.innerText.toLowerCase() == "edit") {
        task_el.innerText = "Save";
        input.removeAttribute("readonly");
        input.focus();
      } else {
        task_el.innerText = "Edit";
        editfromlocalStorge(input, id);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.setAttribute("readonly", "readonly");
      }
    });
  });
}

function editfromlocalStorge(input, id) {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo, index) => {
    if (todo.id == id) {
      todo.text = input.value;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
