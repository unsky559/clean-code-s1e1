//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskList = [
  {
    label: "Pay Bills",
    edit: false,
    completed: false
  },
  {
    label: "Go Shopping",
    edit: true,
    completed: false
  },
  {
    label: "See the Doctor",
    edit: false,
    completed: true
  },
]


let taskInput = document.querySelector("#new-task");//Add a new task.
let addButton = document.querySelector(".add-task__button");//first button
let incompleteTaskHolder = document.querySelector("#incomplete-tasks");//ul of #incomplete-tasks
let completedTasksHolder = document.querySelector("#completed-tasks");//completed-tasks

//New task list item
const createNewTaskElement = (taskString) => {

  let listItem = document.createElement("li");
  listItem.className = 'task';
  //input (checkbox)
  let checkBox = document.createElement("input");//checkbx
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox"
  //label
  let label = document.createElement("label");//label
  label.innerText = taskString;
  label.className = "task__label";
  //input (text)
  let editInput = document.createElement("input");//text
  editInput.type = "text";
  editInput.className = "task__input";
  //button.edit
  let editButton = document.createElement("button");//edit button
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "task__button-edit";
  //button.delete
  let deleteButton = document.createElement("button");//delete button
  deleteButton.className = "task__delete";

  let deleteButtonImg = document.createElement("img");//delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = " "
  deleteButtonImg.className = "task__delete-image";

  deleteButton.appendChild(deleteButtonImg);
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}


const addTask = () => {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.

const editTask = function(listItem) {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  if(listItem.type) listItem = this.parentNode

  let editInput = listItem.querySelector(".task__input");
  let label = listItem.querySelector(".task__label");
  let editBtn = listItem.querySelector(".task__button-edit");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .edit-mode
  if(containsClass){
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
const taskCompleted = function(listItem){
  console.log("Complete Task...");
  //Append the task list item to the #completed-tasks
  if(listItem.type) listItem = this.parentNode

  listItem.querySelector('.task__checkbox').checked = true;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function(listItem) {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  if(listItem.type) listItem = this.parentNode

  listItem.querySelector('.task__checkbox').checked = false;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

// TODO: ajaxRequest realization
const ajaxRequest = () => {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");
  //select ListItems children
  let checkBox = taskListItem.querySelector(".task__checkbox");
  let editButton = taskListItem.querySelector(".task__button-edit");
  let deleteButton = taskListItem.querySelector(".task__delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

/**
* Load your tasks according to taskList object
* @namespace taskList -  object that represent a taskList.
* @property {string} taskList.label - label of task
* @property {boolean} taskList.completed - is the task completed
* @property {boolean} taskList.edit - is the task in edit mode
*/
const loadTasks = function(taskList){
  for(let i in taskList){
    let task = taskList[i]
    let taskElemnt = createNewTaskElement(task.label)

    if(task.completed){
      taskCompleted(taskElemnt)
    }else{
      taskIncomplete(taskElemnt)
    }

    if(task.edit) {
      editTask(taskElemnt)
    }
  }
}

loadTasks(taskList);

// Issues with usability don't get seen until they are in front of a human tester.

// TODO: Prevent creation of empty tasks.

// TODO: Change edit to save when you are in edit mode.
