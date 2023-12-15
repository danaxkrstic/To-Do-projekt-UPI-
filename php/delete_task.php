<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $task_id = $_POST["task_id"];

    $con = mysqli_connect("localhost", "root", "", "to_do");

    $insert_query = "DELETE FROM task WHERE task_id = ?";

    $stmt = mysqli_prepare($con, $insert_query);
    mysqli_stmt_bind_param($stmt, "i", $task_id);
    mysqli_stmt_execute($stmt);
    
    mysqli_stmt_close($stmt);
    mysqli_close($con);
}
?>