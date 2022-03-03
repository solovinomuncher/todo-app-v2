localStorage.clear();

// add object to localStorage
const redApple = {
  fruit: "apple",
  color: "red",
};
localStorage.setItem("redApple", JSON.stringify(redApple));

console.log(localStorage);

// remove object from localStorage
localStorage.removeItem("redApple");

console.log(localStorage);

// read object from localStorage
const blueApple = {
  fruit: "apple",
  color: "blue",
};
localStorage.setItem("blueApple", JSON.stringify(blueApple));

const retrieved = JSON.parse(localStorage.getItem("blueApple"));

console.log(retrieved);

console.log(localStorage);

// edit object from localStorage
// NOTE: as long as key name is the same, edited object replaces previous object
retrieved.color = "purple";

localStorage.setItem("blueApple", JSON.stringify(retrieved));

console.log(retrieved);

console.log(localStorage);

// remove item within object from localStorage
localStorage.clear();

const todo1 = {
  title: "My Todo",
  dueDate: 1,
};

const todo2 = {
  title: "Remove Me",
  dueDate: 0,
};

const myProject = {
  title: "Super Cool Project",
  todoArray: [todo1, todo2],
};

localStorage.setItem("myProject", JSON.stringify(myProject));
console.log(localStorage);

let retrievedProject = JSON.parse(localStorage.getItem("myProject"));
console.log(retrievedProject);

for (let i = 0; i < retrievedProject.todoArray.length; i++) {
  if (retrievedProject.todoArray[i].title === "Remove Me") {
    retrievedProject.todoArray.splice(i, 1);
  }
}

console.log(retrievedProject);

localStorage.setItem("myProject", JSON.stringify(retrievedProject));

console.log(localStorage);
