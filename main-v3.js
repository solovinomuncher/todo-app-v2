// localStorage.clear();

// todo methods and todo factory
const todoActions = {
  // if including any todo methods, make sure to process
  // raw todos after parsing stringified data
};

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
    processRawProjects();
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
    processRawProjects();
  },
  changeTodoDueDate(todo, newDueDate) {
    todo.dueDate = newDueDate;
    saveProject(this);
    processRawProjects();
  },
  changeTodoDesc(todo, newDesc) {
    todo.description = newDesc;
    saveProject(this);
    processRawProjects();
  },
  changeTodoPriority(todo, newPriority) {
    todo.priority = newPriority;
    saveProject(this);
    processRawProjects();
  },
  deleteTodo(todo) {
    for (let i = 0; i < this.todoArray.length; i++) {
      if (this.todoArray[i].title === todo.title) {
        this.todoArray.splice(i, 1);
      }
    }
    saveProject(this);
    processRawProjects();
  },

  changeTitle(newTitle) {
    const newProject = this;
    localStorage.removeItem(this.title);
    newProject.title = newTitle;
    saveProject(newProject);
    processRawProjects();
  },
};

const createProject = (title, todoArray = []) => {
  const project = Object.create(projectActions);

  project.title = title;
  project.todoArray = todoArray;

  saveProject(project);

  return project;
};

// helper functions
const processRawProjects = () => {
  const storageData = JSON.parse(localStorage.getItem("projectArray"));

  projectArray = storageData.map((rawProject) => {
    const newProj = createProject(rawProject.title, rawProject.todoArray);
    return newProj;
  });
};

const saveProject = (project) => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].title === project.title) {
      projectArray.splice(i, 1);
    }
  }
  projectArray.push(project);
  localStorage.setItem("projectArray", JSON.stringify(projectArray));
};

const deleteProject = (project) => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].title === project.title) {
      projectArray.splice(i, 1);
    }
  }
  localStorage.setItem("projectArray", JSON.stringify(projectArray));
};

const findProject = (title) => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].title === title) {
      return projectArray[i];
    }
  }
};

// setting defaults
let projectArray = [];
processRawProjects();

let defaultProject = createProject("My Project");
let defaultTodo = createTodo("My Todo", 1, "Todo description", "med");

defaultProject.addTodo(defaultTodo);

let selectedProject = defaultProject;
let selectedTodo = defaultTodo;

// DOM related functions
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const selectNewProjectDOM = (e) => {
  const newSelectedProject = findProject(e.target.textContent);

  selectedProject = newSelectedProject;

  generateProjectListDOM();
  generateTodoListDOM();
};

const selectNewTodoDOM = (e) => {
  if (e.target.className !== "todo__title") {
    return;
  }

  const newSelectedTodo = selectedProject.findTodo(e.target.textContent);
  selectedTodo = newSelectedTodo;

  generateTodoListDOM();
  generateTodoViewDOM(newSelectedTodo);
};

const editProject = (e) => {
  if (e.target.className === "btn-edit-project") {
    const newTitle = document.querySelector("#input-edit-project").value;
    selectedProject.changeTitle(newTitle);
    generateProjectListDOM();
  } else if (e.target.className === "btn-delete-project") {
    deleteProject(selectedProject);

    generateProjectListDOM();
    generateTodoListDOM();
  }
};

const editTodo = (e) => {
  if (e.target.className === "btn-delete-todo") {
    selectedProject.deleteTodo(selectedTodo);

    generateProjectListDOM();
    generateTodoListDOM();
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

    selectedProject.changeTodoTitle(selectedTodo, title);
    selectedProject.changeTodoDueDate(selectedTodo, dueDate);
    selectedProject.changeTodoDesc(selectedTodo, desc);
    selectedProject.changeTodoPriority(selectedTodo, priority);

    generateProjectListDOM();
    generateTodoListDOM();
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

  if (project.title === selectedProject.title) {
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

  if (title === "" || dueDate === "" || desc === "" || priority === "") {
    return;
  }

  const newTodo = createTodo(title, dueDate, desc, priority);
  selectedProject.addTodo(newTodo);

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

  selectedProject.todoArray.forEach((todo) => {
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
