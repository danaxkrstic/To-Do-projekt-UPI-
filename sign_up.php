<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="sign_up.css">
    <title> Sign In </title>
</head>
<body>
    <div class="container">

        <h1>Sign Up</h1>

        

        <form name="prijava" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <div class="input">

                <label for="username">Username</b></label>
                <input type="text" name="username" required>

                <label for="email">E-mail</label>
                <input type="text" name="email" required>

                <label for="password">Password</label>
                <input type="password" name="password" required>
                </div>

                
                <input type="submit" name="submit_signup" value="Sign Up">

            </div>
                
                
        </form>

        

    

    </div>
    
    <?php

if (isset($_POST["submit_signup"])) {

    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    
    $con = mysqli_connect("localhost", "root", "", "to_do");

    $upit = "INSERT INTO user(email,username,passw) VALUES('$email', '$username', '$password')";

    $rezupit = mysqli_query($con, $upit);

}	

?>
</body>
</html>