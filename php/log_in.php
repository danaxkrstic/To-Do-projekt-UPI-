<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    

    $con = mysqli_connect("localhost", "root", "", "to_do");

    $upit = "SELECT * FROM user WHERE email = ? AND passw = ?";
    
    $stmt = mysqli_prepare($con, $upit);

    // bind parametara
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);

    // izvršimo $stmt
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    // je li vraćen red
    if (mysqli_num_rows($result) === 1) {
        echo "success";
    } else {
        echo "failure";
    }

    // moramo sve zatvorit
    mysqli_stmt_close($stmt);
    mysqli_close($con);

}
      
?>
