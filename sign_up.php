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

        <h1>Sign-In</h1>

        <form name="prijava" method="post" action="sign_up.php">

            <div class="input">

                <label for="username">Username</b></label>
                <input type="text" name="username" required>

                <label for="email">E-mail</label>
                <input type="text" name="email" required>

                <label for="password">Password</label>
                <input type="password" name="password" required>

            </div>

            <input type="submit" name="submit_signup" value="Sign Up">
      
        </form>

    </div>

</body>
</html>


    
<?php

    include("database.php");

    if (isset($_POST["submit_signup"])) {

        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];

        if (isValidEmail($email)){
            $con = connectdatabase(); 

            $provjera_upit = "SELECT * FROM user WHERE email = '".$email."'"; 
            $rezprovjera = mysqli_query($con,$provjera_upit);

            if (!$rezprovjera || mysqli_num_rows($rezprovjera) == 0){

                $upit = "INSERT INTO user(email,username,passw) VALUES('$email', '$username', '$password')";

                $rezupit = mysqli_query($con, $upit);

            }
            else{

                echo "<div class='error_div'>
        
                E-mail already in use.
        
                </div>";

            }
        }
        else{

            echo "<div class='error_div'>
        
                E-mail not in correct format.
        
                </div>";

        }
    
        
    }	

      
?>