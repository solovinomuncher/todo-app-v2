localStorage.clear();

// todo methods and todo factory
const todoActions = {};

const createTodo = (title, dueDate, description, priority) => {
  let todo = Object.create(todoActions);

  todo.title = title;
  todo.dueDate = dueDate;
  todo.description = description;
  todo.priority = priority;

  return todo;
};

// project methods and project factory
const projectActions = {
  addTodo(todo) {
    this.todoArray.push(todo);
    saveProject(this);
    generateProjectArray();
  },
  findTodo(title) {
    for (let i = 0; i < this.todoArray.length; i++) {
      if (this.todoArray[i].title === title) {
        return this.todoArray[i];
      }
    }
  },
  changeTodoTitle(todo, newTitle) {
    todo.title = newTitle;
    saveProject(this);
    generateProjectArray();
  },
  changeTodoDueDate(todo, newDueDate) {
    todo.dueDate = newDueDate;
    saveProject(this);
    generateProjectArray();
  },
  changeTodoDesc(todo, newDesc) {
    todo.description = newDesc;
    saveProject(this);
    generateProjectArray();
  },
  changeTodoPriority(todo, newPriority) {
    todo.priority = newPriority;
    saveProject(this);
    generateProjectArray();
  },
  deleteTodo(todo) {
    for (let i = 0; i < this.todoArray.length; i++) {
      if (this.todoArray[i].title === todo.title) {
        this.todoArray.splice(i, 1);
      }
    }
    saveProject(this);
    generateProjectArray();
  },

  changeTitle(newTitle) {
    const newProject = this;
    localStorage.removeItem(this.title);
    newProject.title = newTitle;
    saveProject(newProject);
    generateProjectArray();
  },
  makeSelected() {
    this.isSelected = true;
    saveProject(this);
    generateProjectArray();
  },
  removeSelected() {
    this.isSelected = false;
    saveProject(this);
    generateProjectArray();
  },
  //   deleteProject() {
  //     localStorage.removeItem(this.title);
  //     generateProjectArray();
  //   },

  //   selectNewProject() {
  //     selectedProject = this;
  //   },
  //   selectNewTodo(todo) {
  //     selectedTodo = todo;
  //   },
};

const createProject = (title) => {
  const project = Object.create(projectActions);

  project.title = title;
  project.todoArray = [];
  project.isSelected = false;

  saveProject(project);
  generateProjectArray();

  return project;
};

// helper functions
const generateProjectArray = () => {
  for (let i = 0; i < localStorage.length; i++) {
    projectArray[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
  }
};

const saveProject = (project) => {
  localStorage.setItem(project.title, JSON.stringify(project));
};

const findProject = (title) => {
  return JSON.parse(localStorage.getItem(title));
};

const deleteProject = () => {
  localStorage.removeItem(selectedProject.title);
  generateProjectArray();
};

// attempts to debug
const findProject2 = (title) => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].title === title) {
      return projectArray[i];
    }
  }
};

// setting defaults
let projectArray = [];

let defaultProject = createProject("My Project");
let defaultTodo = createTodo("My Todo", 1, "Todo description", "med");
defaultProject.addTodo(defaultTodo);
defaultProject.makeSelected();
console.log(defaultProject);

const findSelectedProject = () => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].isSelected === true) {
      return projectArray[i];
    }
  }
};

// let selectedProject = defaultProject;
let selectedProject = findSelectedProject();
let selectedTodo = defaultTodo;

console.log(projectArray);
console.log(localStorage);

// DOM related functions
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// likely source of bug
const selectNewProjectDOM = (e) => {
  const newSelectedProject = findProject2(e.target.textContent); // might be the issue
  // const selectedProject1 = findSelectedProject();

  // selectedProject = newSelectedProject;
  selectedProject.removeSelected();
  console.log(selectedProject1);
  newSelectedProject.makeSelected();
  console.log(newSelectedProject);

  // saveProject(selectedProject);
  // saveProject(newSelectedProject);

  generateProjectListDOM(); // prob not the issue
  generateTodoListDOM(); // prob not the issue
};

// testing different variations of the function
const switchSelectedProject123 = (e) => {
  const prevSelectedProject = document.querySelector(".selected-project");

  // prob not the issue
  if (prevSelectedProject === null) {
    e.target.classList.toggle("selected-project");
  } else {
    prevSelectedProject.classList.toggle("selected-project");
    e.target.classList.toggle("selected-project");
  }

  // probably the issue!!!
  const newSelectedProject = findProject2(e.target.textContent);
  selectedProject = newSelectedProject;
  console.log(selectedProject);

  // prob not the issue
  generateTodoListDOM();
};

// const switchSelectedTask = (e) => {
//   const prevSelectedTask = document.querySelector(".selected-task");

//   if (e.target.nodeName === "P") {
//     return;
//   }

//   if (prevSelectedTask === null) {
//     e.target.classList.toggle("selected-task");
//   } else {
//     prevSelectedTask.classList.toggle("selected-task");
//     e.target.classList.toggle("selected-task");
//   }

//   renderTask();
// };

const selectNewTodoDOM = (e) => {
  if (e.target.className !== "todo__title") {
    return;
  }

  const selectedProject1 = findSelectedProject();

  const newSelectedTodo = selectedProject1.findTodo(e.target.textContent);
  selectedTodo = newSelectedTodo;

  generateTodoListDOM();
  generateTodoViewDOM(newSelectedTodo);
};

const editProject = (e) => {
  const selectedProject1 = findSelectedProject();

  if (e.target.className === "btn-edit-project") {
    const newTitle = document.querySelector("#input-edit-project").value;
    selectedProject1.changeTitle(newTitle);
    generateProjectListDOM();
  } else if (e.target.className === "btn-delete-project") {
    deleteProject();

    generateProjectListDOM();
    generateTodoListDOM();

    console.log(selectedProject1);
    console.log(projectArray);
    console.log(localStorage);
  }
};

const editTodo = (e) => {
  const selectedProject1 = findSelectedProject();

  if (e.target.className === "btn-delete-todo") {
    selectedProject1.deleteTodo(selectedTodo);

    generateProjectListDOM();
    generateTodoListDOM();

    console.log(selectedProject1);
    console.log(projectArray);
    console.log(localStorage);
  } else if (e.target.className === "btn-edit-todo") {
    const title = document.querySelector("#input-create-todo__title").value;
    const dueDate = document.querySelector("#input-create-todo__duedate").value;
    const desc = document.querySelector("#input-create-todo__desc").value;
    const priority = document.querySelector(
      "#input-create-todo__priority"
    ).value;

    if (title === "" || dueDate === "" || desc === "" || priority === "") {
      return;
    }

    selectedProject1.changeTodoTitle(selectedTodo, title);
    selectedProject1.changeTodoDueDate(selectedTodo, dueDate);
    selectedProject1.changeTodoDesc(selectedTodo, desc);
    selectedProject1.changeTodoPriority(selectedTodo, priority);

    generateProjectListDOM();
    generateTodoListDOM();

    console.log(selectedProject1);
    console.log(projectArray);
    console.log(localStorage);
  }
};

const createNewProject = () => {
  let title = document.querySelector("#input-create-project").value;

  if (title === "") {
    return;
  }

  createProject(title);

  generateProjectListDOM();
};

let projectListDOM = document.querySelector(".project-list");

const generateProjectDOM = (project) => {
  const DOMProject = document.createElement("p");
  DOMProject.classList.add("project-list__project");
  DOMProject.textContent = project.title;
  DOMProject.addEventListener("click", selectNewProjectDOM);
  // DOMProject.addEventListener("click", switchSelectedProject123);

  // keep an eye on this
  // if (project.title === selectedProject.title) {
  //   DOMProject.classList.add("selected-project");
  // }

  if (project.isSelected === true) {
    DOMProject.classList.add("selected-project");
  }

  return DOMProject;
};

const generateProjectListDOM = () => {
  removeAllChildNodes(projectListDOM);
  projectArray.forEach((project) => {
    let projectDOM = generateProjectDOM(project);
    projectListDOM.appendChild(projectDOM);
  });
};

generateProjectListDOM();

const createNewTodo = () => {
  const title = document.querySelector("#input-create-todo__title").value;
  const dueDate = document.querySelector("#input-create-todo__duedate").value;
  const desc = document.querySelector("#input-create-todo__desc").value;
  const priority = document.querySelector("#input-create-todo__priority").value;

  const selectedProject1 = findSelectedProject();

  if (title === "" || dueDate === "" || desc === "" || priority === "") {
    return;
  }

  const newTodo = createTodo(title, dueDate, desc, priority);
  selectedProject1.addTodo(newTodo);

  generateTodoListDOM();
};

let todoListDOM = document.querySelector(".todo-list");

const generateTodoDOM = (todo) => {
  const DOMTodo = document.createElement("div");
  DOMTodo.classList.add("todo-list__todo");
  DOMTodo.addEventListener("click", selectNewTodoDOM);

  const DOMTodoTitle = document.createElement("p");
  DOMTodoTitle.classList.add("todo__title");
  DOMTodoTitle.textContent = todo.title;

  const DOMTodoDueDate = document.createElement("p");
  DOMTodoDueDate.classList.add("todo__duedate");
  DOMTodoDueDate.textContent = todo.dueDate;

  if (todo.title === selectedTodo.title) {
    DOMTodo.classList.add("selected-todo");
  }

  DOMTodo.appendChild(DOMTodoTitle);
  DOMTodo.appendChild(DOMTodoDueDate);

  return DOMTodo;
};

const generateTodoListDOM = () => {
  removeAllChildNodes(todoListDOM);
  const selectedProject1 = findSelectedProject();

  selectedProject1.todoArray.forEach((todo) => {
    let todoDOM = generateTodoDOM(todo);
    todoListDOM.appendChild(todoDOM);
  });
};

generateTodoListDOM();

let todoViewListDOM = document.querySelector(".todo-view");

const generateTodoViewDOM = (todo) => {
  removeAllChildNodes(todoViewListDOM);

  const DOMTodoViewTitle = document.createElement("p");
  DOMTodoViewTitle.classList.add("todo-view__title");
  DOMTodoViewTitle.textContent = todo.title;

  const DOMTodoViewDueDate = document.createElement("p");
  DOMTodoViewDueDate.classList.add("todo-view__duedate");
  DOMTodoViewDueDate.textContent = todo.dueDate;

  const DOMTodoViewPriority = document.createElement("p");
  DOMTodoViewPriority.classList.add("todo-view__priority");
  DOMTodoViewPriority.textContent = todo.priority;

  const DOMTodoViewDesc = document.createElement("p");
  DOMTodoViewDesc.classList.add("todo-view__desc");
  DOMTodoViewDesc.textContent = todo.description;

  todoViewListDOM.appendChild(DOMTodoViewTitle);
  todoViewListDOM.appendChild(DOMTodoViewDueDate);
  todoViewListDOM.appendChild(DOMTodoViewPriority);
  todoViewListDOM.appendChild(DOMTodoViewDesc);
};

// button setup
const btns = (() => {
  const createProjectBtn = document.querySelector(".btn-create-project");
  createProjectBtn.addEventListener("click", createNewProject);
  const createTodoBtn = document.querySelector(".btn-create-todo");
  createTodoBtn.addEventListener("click", createNewTodo);
  const editProjectBtn = document.querySelector(".btn-edit-project");
  editProjectBtn.addEventListener("click", editProject);
  const deleteProjectBtn = document.querySelector(".btn-delete-project");
  deleteProjectBtn.addEventListener("click", editProject);
  const deleteTodoBtn = document.querySelector(".btn-delete-todo");
  deleteTodoBtn.addEventListener("click", editTodo);
  const editTodoBtn = document.querySelector(".btn-edit-todo");
  editTodoBtn.addEventListener("click", editTodo);
})();
