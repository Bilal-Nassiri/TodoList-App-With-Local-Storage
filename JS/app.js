document.addEventListener("DOMContentLoaded", () => {
  getTodos();
  removeTodo();
  dayNumber.innerText = today.getDate();
  monthName.innerText = today.toLocaleString("default", { month: "long" });
  year.innerText = today.getFullYear();
  dayName.innerText = dayname.toUpperCase();
});

// Variables and Constants

const userInput = document.getElementById("userInput");
const form = document.querySelector("form");
const todosContainer = document.querySelector(".todos");
const addBtn = document.querySelector(".add-new-todo-btn");
const dayNumber = document.querySelector(".day");
const monthName = document.querySelector(".month");
const year = document.querySelector(".year");
const dayName = document.querySelector(".dayName");
let todos = [];
let today = new Date();
let day = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayname = days[day];

// Functions

function renderTodo(inputValue) {
  return `
        <div class="todo">
        <p class="todoName">${inputValue}</p>
          <button class="remove"><i class="fas fa-check"></i></button>
        </div>
    `;
}

function getTodos() {
  if (localStorage.length === 0) {
    return false;
  } else {
    let getTodos = JSON.parse(localStorage.getItem("todos"));
    todos = getTodos;
    getTodos.forEach((todo) => {
      todosContainer.innerHTML += renderTodo(todo);
    });
  }
}

function removeTodo() {
  const removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      if (localStorage.length === 0) {
        return false;
      } else {
        let getTodos = JSON.parse(localStorage.getItem("todos"));
        todos = getTodos.filter(
          (elem) =>
            elem !==
            removeBtn.parentElement.querySelector(".todoName").innerText
        );
        console.log(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      console.log(todos);
      removeBtn.classList.add("removed");
      removeBtn.parentElement.classList.add("animateToTheTrash");
      removeBtn.parentElement.addEventListener("animationend", function () {
        this.remove();
      });
    });
  });
}

// Events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = userInput.value.trim();
  if (!inputValue) {
    alert("Fill The Input With Text Value Please !");
  } else {
    todos.push(inputValue);
    localStorage.setItem("todos", JSON.stringify(todos));
    todosContainer.innerHTML += renderTodo(inputValue);
    removeTodo();
  }
  userInput.value = "";
});
addBtn.addEventListener("click", (e) => {
  addBtn.firstElementChild.classList.toggle("rotateAddBtn");
  form.classList.toggle("show-form");
});
