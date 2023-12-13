function attemptSignUp(event) {

    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    if (!isValidEmail(email)) {
        document.getElementById('error').innerHTML = "Please enter the correct email format.";
        return; 
    }

    // AJAX za komunikaciju php i js

    console.log(isValidEmail(email));

  
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var response = xhr.responseText;

            if (response === "success") {

                localStorage.setItem("email", email);
                window.location.href = "to_do.html";

            } else {
                document.getElementById('error').innerHTML = "Email already in use.";
            }
        } else {
                alert("Error: " + xhr.status);
        }
    }
    };

    xhr.open("POST", "sign_up.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password)+ "&username=" + encodeURIComponent(username));
    
   
    
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validation
    return emailRegex.test(email);
}