<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $task_id = $_POST["task_id"];

    $con = mysqli_connect("localhost", "root", "", "to_do");

    //dohvacanje staroga
    $query = "SELECT finished FROM task WHERE task_id = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "i", $task_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $current_finished);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    // Update na novi
    $new_finished = $current_finished ? 0 : 1;
    $query = "UPDATE task SET finished = ? WHERE task_id = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "ii", $new_finished, $task_id);
    mysqli_stmt_execute($stmt);

    echo $new_finished;
    
    mysqli_stmt_close($stmt);
    mysqli_close($con);
}
?>