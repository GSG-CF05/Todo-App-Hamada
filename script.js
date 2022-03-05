const form = document.querySelector("#new-todo-form");
const input = document.querySelector("#new-todo-input");
const list_el = document.querySelector("#tasks")
let todos = [];


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

  });
  function saveToLocalStorge(todo) {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  