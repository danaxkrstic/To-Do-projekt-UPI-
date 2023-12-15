<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $new_pass = $_POST["passw"];

    $con = mysqli_connect("localhost", "root", "", "to_do");

    
    $query = "UPDATE user SET passw = ? WHERE email = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "ss", $new_pass, $email);
    mysqli_stmt_execute($stmt);


    
    mysqli_stmt_close($stmt);
    mysqli_close($con);
}
?>