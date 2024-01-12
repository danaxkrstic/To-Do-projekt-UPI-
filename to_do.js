var email = "";
var user = "none";



function GetUser() {
    email = localStorage.getItem("email");
    GetUserTasks();
    GetTasks();
}

function GetUserTasks() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                var response = xhr.responseText;
                console.log(response);

                Obrada_UserTasks(response);

            } else {
                alert("Error: " + xhr.status);
            }
        }
    };

    xhr.open("POST", "./php/to_do.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email));
}

function Obrada_UserTasks(response){

    document.getElementById('h2_hello').innerHTML += response + "!";
    user = response;
}


function GetTasks(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                Obrada_Tasks(xhr.responseText);

            } else {
                alert("Error: " + xhr.status);
            }
        }
    };

    xhr.open("POST", "./php/get_tasks.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email));
}

function Obrada_Tasks(response){

    
    document.getElementById('task').innerHTML = "";
    

    var jsonResponse = JSON.parse(response);

    for (var i = 0; i < jsonResponse.length; i++) {

            var taskContainer = document.getElementById('task');


            var taskDiv = document.createElement('div');
            taskDiv.id = 'task_'+jsonResponse[i].task_id;  


            taskDiv.innerHTML = jsonResponse[i].description + " " + jsonResponse[i].due_date + " " +
                    "<input type='submit' class= finish_submit name='finish_submit' onclick='ChangeFinishedStatus(this)' value='Finished'> " +
                    "<input type='submit' onclick='DeleteTask(this)' name='delete_task' value='X'>";


            taskContainer.appendChild(taskDiv);

            var finishButton = taskDiv.querySelector('.finish_submit');

            if (jsonResponse[i].finished == 1) {
                    finishButton.style.backgroundColor = 'green'; 
            } else {
                    finishButton.style.backgroundColor = 'red'; 
            }


    }
}

function AddTask() {
    var new_desc = document.getElementById('description_input').value;
    var new_date = document.getElementById('date_input').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/add_task.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // tek nakon sta zavrsi request pozvat osvjezenje
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            document.getElementById('task').innerHTML = "";

            GetTasks();
        }
    };

    xhr.send("description=" + encodeURIComponent(new_desc) + "&due_date=" + encodeURIComponent(new_date) + "&email=" + encodeURIComponent(email));
}


function DeleteTask(button){

    let task_id = button.parentNode.id;
    let task_id_to_send = extractNumberFromString(task_id);

    var xhr = new XMLHttpRequest();
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            document.getElementById(task_id).remove();

        }
    };

    xhr.open("POST", "./php/delete_task.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("task_id=" + encodeURIComponent(task_id_to_send));


    
}



function ChangeFinishedStatus(button){


    let task_id = button.parentNode.id;
    let task_id_to_send = extractNumberFromString(task_id);

    var xhr = new XMLHttpRequest();
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var response = xhr.responseText;

            var finishButton = document.getElementById(task_id).querySelector('.finish_submit');

            if (response == 1) {
                finishButton.style.backgroundColor = 'green'; 
            } else {
                finishButton.style.backgroundColor = 'red'; 
            }

        }
    };

    xhr.open("POST", "./php/finish_task.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("task_id=" + encodeURIComponent(task_id_to_send));

    


}


function ChangePassword(){

    let password = document.getElementById("new_pass").value;

    console.log(password);

    if(password==""){
        document.getElementById("error-pass").innerHTML="Enter new password";
        return;
    }


    var xhr = new XMLHttpRequest();
    

    xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

        document.getElementById("error-pass").innerHTML="Password changed.";

    }
    };

    xhr.open("POST", "./php/change_password.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email) + "&passw=" + encodeURIComponent(password));

}


function SearchTasks(){

    let search_value = document.getElementById("search_input").value;

    var xhr = new XMLHttpRequest();
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            console.log("Tu smo.");
            console.log(JSON.parse(xhr.responseText));
            Obrada_Tasks(xhr.responseText);

        }
    };

    xhr.open("POST", "./php/search_task.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("search=" + encodeURIComponent(search_value) + "&email=" + encodeURIComponent(email));

}

function Refresh(){
    GetTasks();
}


function extractNumberFromString(str) {
    const matches = str.match(/\d+/);

    if (matches) {
        const number = parseInt(matches[0], 10);
        return number;
    } else {
        return null; 
    }
}

function LogOut(){
    console.log("Logging out...");
    window.location.href = "main_menu.html";
}

//PART FOR REGULAR RUN

document.addEventListener("DOMContentLoaded", GetUser);


//PART FOR TESTING

//module.exports = { GetUser, extractNumberFromString , Obrada_UserTasks , ChangePassword};




