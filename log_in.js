function attemptLogin(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // AJAX za komunikaciju php i js

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = xhr.responseText;
                console.log(response);

                if (response === "success") {

                    localStorage.setItem("email", email);
                    window.location.href = "to_do.html";

                } else {
                    document.getElementById('error').innerHTML = "Netočan mail ili lozinka";
                }
            } else {
                alert("Error: " + xhr.status);
            }
        }
    };

    xhr.open("POST", "./php/log_in.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password));

    
}


