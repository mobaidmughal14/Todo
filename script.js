// Retrieve the users data from localStorage and store it in a variable outside the function
var usersData = JSON.parse(localStorage.getItem("users"));
var currentUser;
console.log(currentUser)
// Get the input elements outside the function
var emailInput = document.getElementById("exampleInputEmail1");
var passwordInput = document.getElementById("exampleInputPassword1");

// Function to handle sign in
function signIn() {
  // Get the input values for email and password
  var email = emailInput.value;
  var password = passwordInput.value;




  // Find the user in the usersData object
  var foundUser = usersData.find(function (cur) {
    return cur.username === email && cur.password2 === password;
  });

  localStorage.setItem("currentUser",JSON.stringify(foundUser));
console.log(currentUser)
  if (!foundUser) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Invalid username or password",
      showConfirmButton: false,
      timer: 3000, // Increased the timer value to 3 seconds
    });
  } else {
    Swal.fire("Good job!", "You've Successfully Logged In!", "success");
    window.location.href = "./Todo/todo.html"; // Add necessary checks for URL validity and user permissions
  }
}