var email = "";
var user = "none";
var tasks = [];

function GetUser() {
    document.addEventListener("DOMContentLoaded", function () {
        email = localStorage.getItem("email");
        GetUserTasks();
    });
}

function GetUserTasks() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = xhr.responseText;
                document.getElementById('h2_hello').innerHTML += response + "!";
                user = response;

            } else {
                alert("Error: " + xhr.status);
            }
        }
    };

    xhr.open("POST", "to_do.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email));
}

GetUser();

function LogOut(){
    console.log("Logging out...");
    window.location.href = "main_menu.html";
}