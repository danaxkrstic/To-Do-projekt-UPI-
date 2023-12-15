<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    $con = mysqli_connect("localhost", "root", "", "to_do");

    $upit = "SELECT username FROM user WHERE email = ?";

    $stmt = mysqli_prepare($con, $upit);

    mysqli_stmt_bind_param($stmt, "s", $email);

    mysqli_stmt_execute($stmt);

    mysqli_stmt_bind_result($stmt, $username);

    mysqli_stmt_fetch($stmt);


    echo $username;

    mysqli_stmt_close($stmt);
    mysqli_close($con);
}
?>