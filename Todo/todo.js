// ---------------------------------------------------------------------------
// getting userdata
var todoUser = JSON.parse(localStorage.getItem("users"));
// getting todos data
var todoAddedInfo = JSON.parse(localStorage.getItem("todoAddedInfo")) || [];

// setting the user taskID
var todoTaskID = parseInt(localStorage.getItem("todoTaskID")) || 0;
// getting userdata for todos portal
var userDataForPortal= JSON.parse(localStorage.getItem("userDataForPortal"));
// ---------------------------------------------------------------------------


// -----------------------
// function to call add todo page
function addTodo() {
// getting the items using id
var noRecord = document.getElementById("noRecord");
// setting to block to display on screen
noRecord.style.display="none";

  // getting the items using id
  var elementsAdding = document.getElementById("elementsAdding");
  // setting to block to display on screen
  elementsAdding.style.display="block";
}

// confirmation and error to user on clicking the add todo button
function todoAdded() {
   // getting the items using id
   var noRecord = document.getElementById("noRecord");
   // setting to block to display on screen
   noRecord.style.display="none";
   
  // getting the data from DOM/ user
  var todoTitleInput1 = document.getElementById("todoTitleInput1").value;
  var todoDescriptionInput1 = document.getElementById(
    "todoDescriptionInput1"
  ).value;
  var todoDeadline = document.getElementById("todoDeadline").value;
  var todoPriorityInput1 = document.getElementById("todoPriorityInput1").value;
  var todoTimeStampInput1 = Date.now();

  // checking if the todo title is empty or not
  if (todoTitleInput1 === "" || todoDeadline === "") {
    Swal.fire({
      // position: "top-end", // if dont want the custom position
      icon: "error",
      title: "Must Have To Add Title Name & Deadline",
      showConfirmButton: false,
      timer: 1500,
    });

  } else {

     // getting the userId so that can be user for every todo item
    var userID=userDataForPortal.userID

    // creating an object of the data
    var newTodoTask =({
      userID,
      todoTitleInput1,
      todoDescriptionInput1,
      todoDeadline,
      todoPriorityInput1,
      todoTimeStampInput1,
      todoTaskID: ++todoTaskID,
    });
    // pushing the data to an array
    todoAddedInfo.push(newTodoTask);


    
// setting all todo items to local storage
    localStorage.setItem("todoAddedInfo", JSON.stringify(todoAddedInfo));

    // showing success alert
    Swal.fire({
      icon: "success",
      title: "Welldone, Task Successfully Added",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      showConfirmButton: true,
    });

    // resetting the values of todo form 
    document.getElementById("todoTitleInput1").value = "";
  document.getElementById("todoDescriptionInput1").value = "";
  document.getElementById("todoDeadline").value = "";
  // document.getElementById("todoPriorityInput1").value = ""; // if dont want to reset the value

  // hiding back the todo entry form
  var elementsAdding = document.getElementById("elementsAdding");
    elementsAdding.style.display="none";

     // function to display all todo items
    displayTodos()

    
  
  }
}

// creating function for alert if user wants to cansel the todo adding form
function todoDontAdd() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, I Dont Wanna Add!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '',
        'Directing Back To Todo Panel',
        'success'
      );
      elementsAdding.style.display="none";
    }
  });
}



// Function to display all todo tasks
function displayTodos() {

  var todoList = todoAddedInfo.filter((data) => data.userID === userDataForPortal.userID);
  var todoTaskListing = document.getElementById("todoTaskListing");
  todoTaskListing.innerHTML = "";

  // Iterate through todoAddedInfo array
  todoAddedInfo.forEach(function (todoAddedInfo, index) {
    var li = document.createElement("li");
    li.classList.add("border" ,"border-primary", "container", "m-3", "p-2", "text-center", ".bg-info-subtle", "w-60", "bg-info-subtle", "mx-auto");
    li.innerHTML = `
      <strong>Task No:</strong> ${index +1}<br>
      <strong>User ID:</strong> ${todoAddedInfo.userID}<br>
      <strong>Title:</strong> ${todoAddedInfo.todoTitleInput1}<br>
      <strong>Description:</strong> ${todoAddedInfo.todoDescriptionInput1}<br>
      <strong>Deadline:</strong> ${todoAddedInfo.todoDeadline}<br>
      <strong>Priority Level:</strong> ${todoAddedInfo.todoPriorityInput1}<br>
      <strong>Time Created:</strong> ${new Date(todoAddedInfo.todoTimeStampInput1).toLocaleString()}<br>
      <button class="btn btn-warning m-2 border border-dark w-40" onclick="removeTodo(${index})">Remove</button>
    `;
    
    todoTaskListing.appendChild(li);
    var noRecord = document.getElementById("noRecord");
   // setting to block to display on screen
   noRecord.style.display="none";
  });
}
displayTodos()

// Function to remove a todo task
function removeTodo(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove the selected task from todoAddedInfo array
      todoAddedInfo.splice(index, 1);

      // Update the local storage
      localStorage.setItem("todoAddedInfo", JSON.stringify(todoAddedInfo));

      // Display the updated list of todo tasks
      displayTodos();

      Swal.fire("Task Removed!", "The task has been removed.", "success");
    }
  });
}




// -----------------------------
// Function for clearing the entire todo list
function clearAllTodo() {
  if (todoAddedInfo.length === 0) {
    Swal.fire({
      title: "Nothing in List",
      text: "Add Something First To Clear List",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonColor: "#d33",
      cancelButtonText: "Okay, Let Me Add!",
    });
  } else {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "List Cleared!",
          "Your TODO List has been Cleared.",
          "success"
        );
        localStorage.removeItem("todoAddedInfo");
        todoAddedInfo = []; // Clear the local data
         todoTaskID = localStorage.setItem("todoTaskID", 0);

         // getting the items using id
   var noRecord = document.getElementById("noRecord");
   // setting to block to display on screen
   noRecord.style.display="block";
      }
    });
  }
}
