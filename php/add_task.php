<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $desc = $_POST["description"];
    $date = $_POST["due_date"];
    $email = $_POST["email"];
    $finished = 0;

    $con = mysqli_connect("localhost", "root", "", "to_do");

    $insert_query = "INSERT INTO task (description, due_date, finished, user_id) VALUES (?, ?, ?, ?)";

    $stmt_insert = mysqli_prepare($con, $insert_query);
    mysqli_stmt_bind_param($stmt_insert, "ssis", $desc, $date, $finished , $email);
    
    if (mysqli_stmt_execute($stmt_insert)) {
        echo "New task added successfully.";
    } else {
        echo "Error: " . mysqli_error($con);
    }

    mysqli_stmt_close($stmt_insert);
    mysqli_close($con);
}
?>