// Initialize variables and storing/ retriving data from array 
// using json Parse to get the string into object
var users = JSON.parse(localStorage.getItem("users")) || [];
// using parseINT to get the string in Int foem
var userID = parseInt(localStorage.getItem("userID")) || 101;
// using json Parse to get the string into object (for the use of portal )
var userDataForPortal= JSON.parse(localStorage.getItem("userDataForPortal"));

// getting data from dom
var firstNameInput = document.getElementById("firstName");
var lastNameInput = document.getElementById("lastName");
var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var password1Input = document.getElementById("password1");
var password2Input = document.getElementById("password2");
var exampleCheck1Input = document.getElementById("exampleCheck1");
var usernameAlert = document.getElementById("usernameAlert");
var emailAlert = document.getElementById("emailAlert");
var password1Alert = document.getElementById("password1Alert");
var password2Alert = document.getElementById("password2Alert");
var exampleCheck1Alert = document.getElementById("exampleCheck1Alert");





// Handle sign up process
function signUp() {
  // Get input values
  var firstName = firstNameInput.value;
  var lastName = lastNameInput.value;
  var fullName = firstName.toUpperCase() + " " + lastName.toUpperCase();
  var username = usernameInput.value;
  var email = emailInput.value;
  var password1 = password1Input.value;
  var password2 = password2Input.value;
  var exampleCheck1 = exampleCheck1Input.checked;




// checking if the user already exist or not 
  if (users.some(function(users) { return users.username === username || users.email === email; })) {
    showAlert("Username or email already exists, Please choose a different one.");
    return;
  }

  // Check for empty first name or last name
  else if (firstName === "" || lastName === "") {
    if (firstName === "") {
      showAlert("Write Your First Name");
    } else if (lastName === "") {
      showAlert("Write Your Last Name");
    }
    return;
  }

  // Check for empty username or username length less than 5
  if (username === "" || username.length < 5) {
    if (username === "") {
      showAlert("Username Can't Be Left Empty");
    } else if (username.length < 5) {
      showAlert("Username Can't Be Less Than 5 Characters");
    } else {
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
        showAlert("Username Must Include A Special Character");
      } else if (!/\d/.test(username)) {
        showAlert("Username Must Include A Number");
      }
    }
    return;
  }

  // Check for empty email
  if (email === "") {
    showAlert("Write Your Email First");
    return;
  }

  // Check for valid email format
  if (!/@/.test(email)) {
    showAlert("Must Have A Mailing Account As @anymail.com");
    return;
  }

  // Check for empty password or password length less than 6
  if (password1 === "" || password1.length < 6) {
    if (password1 === "") {
      showAlert("Write Your Password");
    } else if (password1.length < 6) {
      showAlert("Password Length Is Short");
    } else {
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password1)) {
        showAlert("Password Must Include A Special Character");
      } else if (!/[A-Z]/.test(password1)) {
        showAlert("Password Must Include A Capital Letter");
      } else if (!/\d/.test(password1)) {
        showAlert("Password Must Include A Number");
      }
    }
    return;
  }

  // Check if passwords match
  if (password2 === "") {
    showAlert("Confirm Password Field Is Empty");
    return;
  } else if (password1 !== password2) {
    showAlert("Confirm Password Doesn't Match");
    return;
  }

  // Check if terms and conditions checkbox is checked
  if (!exampleCheck1) {
    showAlert("You Must Check Our T&C");
    return;
  }

  // pushing the user data to array named as user
  var user={
    userID: userID,
    firstName: firstName,
    lastName: lastName,
    fullName: fullName,
    username: username,
    email: email,
    password1: password1,
    password2: password2,
  };
  // pushing the user data to users
  users.push(user)

  // inclement the user ID and set into the local storage
  userID++;
  localStorage.setItem("userID", userID);

  localStorage.setItem("users", JSON.stringify(users));
  successFireSweetAlert();
  window.location.href = "../index.html";


  // psuhing the whole data to new array for portal use

// userDataForPortal.push(user)
localStorage.setItem("userDataForPortal", JSON.stringify(user));
}

// Show alert message
function showAlert(message) {
  Swal.fire({
    position: "center",
    icon: "warning",
    title: message,
    showConfirmButton: false,
    timer: 3000,
  });
}

// Show success message
function successFireSweetAlert() {
  Swal.fire(
    "Good job!",
    "Your Account Successfully Registered!",
    "success"
  );
}