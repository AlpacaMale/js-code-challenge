const toDoForm = document.querySelector(".tasks");
const toDoInput = document.querySelector(".tasks__new");
const toDoList = document.querySelector(".tasks__list");
const toDoToggle = document.querySelector(".footer__task-btn");
const toDoUsage = document.querySelector(".tasks__content");
const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.closest("li");
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  console.log("deleted");
  if (toDoList.children.length === 0) {
    toDoUsage.classList.remove(HIDDEN_CLASSNAME);
    toDoList.classList.add(HIDDEN_CLASSNAME);
  }
  saveToDos();
}

function paintToDo(newToDoObj) {
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  const span = document.createElement("span");
  span.innerText = newToDoObj.text;
  const button = document.createElement("button");
  button.innerHTML = '<i class="fa-solid fa-x"></i>';
  button.type = "button";
  button.addEventListener("click", deleteToDo);
  li.appendChild(button);
  li.appendChild(span);
  toDoList.appendChild(li);
  toDoList.classList.remove(HIDDEN_CLASSNAME);

  if (toDoList.children.length !== 0) {
    toDoUsage.classList.add(HIDDEN_CLASSNAME);
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
toDoToggle.addEventListener("click", () => toDoForm.classList.toggle(HIDDEN_CLASSNAME));

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
