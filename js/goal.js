const mainForm = document.querySelector(".main");
const mainInput = document.querySelector(".main__goal");
const currentGoal = document.querySelector(".current__goal");
const GOAL_KEY = "goal";

let goal = "";

function saveGoal(event) {
  event.preventDefault();
  goal = mainInput.value;
  localStorage.setItem(GOAL_KEY, goal);
  currentGoal.innerText = goal;
  currentGoal.classList.remove(HIDDEN_CLASSNAME);
  mainInput.classList.add(HIDDEN_CLASSNAME);
}

const savedGoal = localStorage.getItem(GOAL_KEY);

if (savedGoal) {
  goal = savedGoal;
  currentGoal.innerText = goal;
  currentGoal.classList.remove(HIDDEN_CLASSNAME);
  mainInput.classList.add(HIDDEN_CLASSNAME);
}

mainForm.addEventListener("submit", saveGoal);
