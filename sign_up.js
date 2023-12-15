function attemptSignUp(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
  
    if (!isValidEmail(email)) {
      displayError("Please enter the correct email format.");
      return;
    }
  
    sendSignUpRequest(email, password, username);
}
  
function isValidEmail(email) {
    
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}
  
function displayError(message) {
    document.getElementById('error').innerHTML = message;
}
  
function sendSignUpRequest(email, password, username) {

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        handleSignUpResponse(xhr.status, xhr.responseText, email);
      }
    };
  
    xhr.open("POST", "sign_up.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email) + "&passw=" + encodeURIComponent(password) + "&username=" + encodeURIComponent(username));
}
  
function handleSignUpResponse(status, response, email) {

    if (status == 200) {
      if (response === "success") {
        localStorage.setItem("email", email);
        window.location.href = "to_do.html";
      } else {
        displayError("Email already in use.");
      }
    } else {
      alert("Error: " + status);
    }
}
  
  // export za test
  module.exports = { attemptSignUp, isValidEmail, displayError, sendSignUpRequest, handleSignUpResponse };
  