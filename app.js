const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`;

  list.innerHTML += html; //not the best way to do this. recreates DOM tree. should append instead
};

addForm.addEventListener("submit", (e) => {
  //prevent page from refreshing
  e.preventDefault();
  //get value from input box
  const todo = addForm.add.value.trim();
  if (todo.length) {
    //if its a positive int, will evaluate to true. truthy/falsy
    generateTemplate(todo);
    addForm.reset();
  }
});

list.addEventListener("click", (e) => {
  //check if trash can is clicked
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => {
      //return true to keep item
      return !todo.textContent.toLowerCase().includes(term);
    })
    .forEach((todo) => {
      todo.classList.add("filtered");
    });

  Array.from(list.children)
    .filter((todo) => {
      //return true to keep item
      return todo.textContent.toLowerCase().includes(term);
    })
    .forEach((todo) => {
      todo.classList.remove("filtered");
    });
};

//keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
