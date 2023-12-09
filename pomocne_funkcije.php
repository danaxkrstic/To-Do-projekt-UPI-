<?php

function connectdatabase() {

    return mysqli_connect("localhost", "root", "", "to_do");
    
}

function isValidEmail($email) {

    $emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/"; //regex za provjeru

    return preg_match($emailRegex, $email);
}
function is_post_request() {
    return $_SERVER['REQUEST_METHOD'] == 'POST';
  }

?>