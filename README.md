# TODO APP

## DESCRIPTION

### WHAT THE APP DOES

It's a todo app, where you can create Projects that hold lists of Todos. Each Project has a title and a Todo array. Each Todo has a title, description, due date, and priority level. You can update any part of the selected Todo, as well as the title of the selected Project.

### WHY I BUILT THIS PROJECT

I needed some practice associating DOM elements with JavaScript logic, as well as working with localStorage API.

### TECHS USED

- HTML
- CSS
- JavaScript

### PROBLEMS ENCOUNTERED / SOLVED

First attempt couldn't get the app to work at all -- too difficult to debug and add new features. I let it sit and continued my studies.

Second attempt got some functionality to work (creating todos and projects), as well as better adherence to SOLID principles, so debugging became easier. But I couldn't get the "click to select project/todo" functionality to work, but since debugging was easier, I was able to methodically find the issue. I narrowed it down to the parts where the functions were working with retrieved localStorage data. That's when I realized that the JSON.stringify function that I was using wasn't including the methods! I also began storing the array of projects itself instead of each individual project.

Third attempt had me remedy the localStorage retrieval issue by re-creating the Projects from the projectArray, now in localStorage. Now the projects had access to the methods required to get the app to work! There was a small bug in the selection of projects, but I fixed that quickly. I added some styling to make the app look nice.

### WHAT I LEARNED

1. Better to keep the logic and the DOM manipulation separate from each other. It's easier to work on the logic first, and then on the DOM manipulation.
2. How the data changes when it's stored in localStorage, and what you get when you retrieve data from localStorage. Only properties are stored, not the methods. You must re-introduce those when retrieving localStorage data.

## FEATURES
