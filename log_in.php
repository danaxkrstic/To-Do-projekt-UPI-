<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="sign_up.css">
    <title> Prijava </title>
</head>
<body>
    <div class="container">

        <h1>Prijava</h1>

        <form name="prijava" method="post" action="log_in.php">

            <div class="input">

                <label for="email">E-mail</b></label>
                <input type="text" name="email" required>

                <label for="password">Lozinka</label>
                <input type="password" name="password" required>

            </div>

            <input type="submit" name="submit_login" value="Prijavi se">
      
        </form>

    </div>

</body>
</html>
<?php

    include("pomocne_funkcije.php");

    session_start();

    if (is_post_request()) {

        $email = $_POST['email'];
        $password = $_POST['password'];

        $con = connectdatabase(); 

        $provjera_upit = "SELECT * FROM user WHERE email = '".$email."' AND passw = '".$password."'"; 
        $rezprovjera = mysqli_query($con,$provjera_upit);

        if ($rezprovjera && mysqli_num_rows($rezprovjera) == 1){

            $row = mysqli_fetch_assoc($rezprovjera);

            $_SESSION["username"] = $row['username'];
            $_SESSION["email"] = $row['email'];

            header("location: to_do.php");
            exit();

        }
        else{

            echo "<div class='error_div'>
        
                Neispravno korisničko ime ili lozinka.
        
                </div>";

        }
    
        
    }	

      
?>
