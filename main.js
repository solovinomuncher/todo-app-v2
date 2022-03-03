// localStorage.clear();

const todoActions = {
  changeTitle(newTitle) {
    this.title = newTitle;
  },
  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  },
  changeDesc(newDesc) {
    this.description = newDesc;
  },
  changePriority(newPriority) {
    this.priority = newPriority;
  },
};

const createTodo = (title, dueDate, description, priority) => {
  let todo = Object.create(todoActions);

  todo.title = title;
  todo.dueDate = dueDate;
  todo.description = description;
  todo.priority = priority;

  return todo;
};

const projectActions = {
  addTodo(todo) {
    this.todoArray.push(todo);
  },
  changeTitle(newTitle) {
    this.title = newTitle;
  },

  saveProject() {
    localStorage.setItem(this.title, JSON.stringify(this));
    projectArray.push(this);
  },
  getProject() {
    return JSON.parse(localStorage.getItem(this.title));
  },
  deleteProject() {
    localStorage.removeItem(this.title);

    const index = projectArray.findIndex(
      (project) => this.title === project.title
    );

    projectArray.splice(index, 1);
  },
};

const createProject = (title) => {
  let project = Object.create(projectActions);

  project.title = title;
  project.todoArray = [];

  project.saveProject();

  return project;
};

const projectArray = [];

// const populateProjectArrayWithLocalStorage = () => {
//   for (let i = 0; i < localStorage.length; i++) {
//     let project = JSON.parse(localStorage.getItem(localStorage.key(i)));
//     console.log(project);
//     projectArray.push(project);
//   }
// };

// populateProjectArrayWithLocalStorage();

let defaultProject = createProject("My Project");
let defaultTodo = createTodo("My Todo", 1, "Todo description", "med");
defaultProject.addTodo(defaultTodo);

let selectedProject = defaultProject;
let selectedTodo = defaultTodo;

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const createNewProject = () => {
  let input = document.querySelector("#input-create-project").value;

  if (input === "") {
    return;
  }

  generateProjectDOM(createProject(input));
  generateProjectListDOM();
};

const createNewTodo = () => {
  const title = document.querySelector("#input-create-todo__title").value;
  const dueDate = document.querySelector("#input-create-todo__duedate").value;
  const priority = document.querySelector("#input-create-todo__priority").value;
  const desc = document.querySelector("#input-create-todo__desc").value;

  const newTodo = createTodo(title, dueDate, desc, priority);
  selectedProject.addTodo(newTodo);

  generateTodoDOM(newTodo);
  generateTodoListDOM();
};

const findProject = (title) => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].title === title) {
      return projectArray[i];
    }
  }
};

const findTodo = (title) => {
  for (let i = 0; i < selectedProject.todoArray.length; i++) {
    if (selectedProject.todoArray[i].title === title) {
      return selectedProject.todoArray[i];
    }
  }
};

const selectNewProject = (project) => {
  selectedProject = project;
};

const selectNewProjectDOM = (e) => {
  const newSelectedProject = findProject(e.target.textContent);
  selectNewProject(newSelectedProject);

  generateProjectListDOM();
  generateTodoListDOM();
};

const selectNewTodo = (todo) => {
  selectedTodo = todo;
};

const selectNewTodoDOM = (e) => {
  if (e.target.className !== "todo__title") {
    return;
  }

  const newSelectedTodo = findTodo(e.target.textContent);
  selectNewTodo(newSelectedTodo);

  generateTodoListDOM();
  generateTodoViewDOM(newSelectedTodo);
};

const changeProjTitle = () => {
  const newTitle = document.querySelector("#input-edit-project").value;
  selectedProject.changeTitle(newTitle);
  generateProjectListDOM();
};

const deleteProjectFn = () => {
  selectedProject.deleteProject();

  generateProjectListDOM();
  generateTodoListDOM();

  console.log(selectedProject);
  console.log(projectArray);
  console.log(localStorage);
};

const deleteTodoFn = () => {
  for (let i = 0; i < selectedProject.todoArray.length; i++) {
    if (selectedProject.todoArray[i].title === selectedTodo.title) {
      selectedProject.todoArray.splice(i, 1);
      generateTodoListDOM();
    }
  }
};

const editTodoFn = () => {};

const btns = (() => {
  const createProjectBtn = document.querySelector(".btn-create-project");
  createProjectBtn.addEventListener("click", createNewProject);
  const createTodoBtn = document.querySelector(".btn-create-todo");
  createTodoBtn.addEventListener("click", createNewTodo);
  const editProjectBtn = document.querySelector(".btn-edit-project");
  editProjectBtn.addEventListener("click", changeProjTitle);
  const deleteProjectBtn = document.querySelector(".btn-delete-project");
  deleteProjectBtn.addEventListener("click", deleteProjectFn);
  const deleteTodoBtn = document.querySelector(".btn-delete-todo");
  deleteTodoBtn.addEventListener("click", deleteTodoFn);
  const editTodoBtn = document.querySelector(".btn-edit-todo");
  editTodoBtn.addEventListener("click", editTodoFn);
})();

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
  //   const DOMTodoView = document.createElement("div");
  //   DOMTodoView.classList.add("todo-view");

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

  //   DOMTodoView.appendChild(DOMTodoViewTitle);
  //   DOMTodoView.appendChild(DOMTodoViewDueDate);
  //   DOMTodoView.appendChild(DOMTodoViewPriority);
  //   DOMTodoView.appendChild(DOMTodoViewDesc);

  todoViewListDOM.appendChild(DOMTodoViewTitle);
  todoViewListDOM.appendChild(DOMTodoViewDueDate);
  todoViewListDOM.appendChild(DOMTodoViewPriority);
  todoViewListDOM.appendChild(DOMTodoViewDesc);

  return todoViewListDOM;
};

// const generateTodoViewListDOM = () => {
//   let DOMtodoView = generateTodoViewDOM(selectedTodo);
//   removeAllChildNodes(todoViewListDOM);
//   todoViewListDOM.appendChild(DOMtodoView);
// };

// generateTodoViewListDOM();
