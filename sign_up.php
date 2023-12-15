<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $password = $_POST["passw"];
    $username = $_POST["username"];
    

    $con = mysqli_connect("localhost", "root", "", "to_do");

    $upit = "SELECT * FROM user WHERE email = ?";
    
    $stmt = mysqli_prepare($con, $upit);

    // bind parametara
    mysqli_stmt_bind_param($stmt, "s", $email);

    // izvršimo $stmt
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    // je li vraćen red
    if (mysqli_num_rows($result) === 1) {
        echo "failure";
        mysqli_stmt_close($stmt);
        

    } else {

        $upit_unos = "INSERT INTO user (email, username, passw) VALUES (?, ?, ?)";
        
        $stmt_unos = mysqli_prepare($con, $upit_unos);

        //hashed password???

        mysqli_stmt_bind_param($stmt_unos, "sss", $email, $username, $password);

        mysqli_stmt_execute($stmt_unos);

        
        

        mysqli_stmt_close($stmt_unos);
        echo "success";

    }

    mysqli_close($con);
    

}

      
?>