const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = [];

function renderTasksOnHTML(taskTitle, done = false) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox"); // input type="checkbox
  li.style.display = "flex";
  li.style.alignItems = "center";
  input.addEventListener("change", function (e) {
    const liToToggle = e.target.parentElement;

    const spanToToggle = liToToggle.querySelector("span");

    const done = e.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;
  span.style.marginLeft = "10px";
  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.classList.add("fa-regular", "fa-trash-can", "remove-button");
  button.addEventListener("click", function (e) {
    const liToRemove = e.target.parentElement;

    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove);

    todoListUl.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;
  tasks = JSON.parse(tasksOnLocalStorage);
  tasks.forEach((t) => {
    renderTasksOnHTML(t.title, t.done);
  });
};

form.addEventListener("submit", function (e) {
  e.preventDefault(); // evita que a página recarregue ao submeter o form
  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caracteres");
    return;
  }

  // Adiciona a tarefa na lista de tasks
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Adiciona a nova tarefa no HTML
  renderTasksOnHTML(taskTitle);

  taskTitleInput.value = "";
});

//Tema escuro
const themeButton = document.querySelector("#dark-mode-button");
const body = document.querySelector("body");
const icon = themeButton.querySelector("i");

let darkTheme;

window.onload = () => {
  const isDarkThemeStorage = localStorage.getItem("isDarkTheme");
  darkTheme = isDarkThemeStorage === "true";

  if (darkTheme) {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
};

themeButton.addEventListener("click", () => {
  darkTheme = !darkTheme;
  localStorage.setItem("isDarkTheme", darkTheme);
  body.classList.toggle("dark-mode");
  icon.classList.remove(darkTheme ? "fa-moon" : "fa-sun");
  icon.classList.add(darkTheme ? "fa-sun" : "fa-moon");
});
