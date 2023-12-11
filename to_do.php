<?php
include("pomocne_funkcije.php");
session_start();

if (isset($_SESSION['username']) && isset($_SESSION['email'])) {
    $username = $_SESSION['username'];
    $email = $_SESSION['email'];
} 

if (isset($_POST["log_out"])) {
    header("Location: main_menu.html");
    exit();
}

if (isset($_POST["add_task"])) {
    $conn = connectdatabase();
    $sql = "INSERT INTO to_do.task(description, due_date, finished, user_id) VALUES ('".$_POST["description_input"]."','".$_POST["date_input"]."',0,'".$email."');";
    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);

    header("Location: to_do.php");
    exit();
}

if (isset($_POST["finish"])) {
    $conn = connectdatabase();
    $taskId = $_POST["task_id"];

    // Toggle the finished status
    $sql = "UPDATE to_do.task SET finished = NOT finished WHERE task_id = $taskId";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
}

if (isset($_POST["delete_task"])) {
    $conn = connectdatabase();
    $taskId = $_POST["task_id"];
    $sql = "DELETE FROM to_do.task WHERE task_id=$taskId";
    mysqli_query($conn, $sql);
    mysqli_close($conn);

    header("Location: to_do.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="to_do.css">
    <title> To Do </title>
</head>

<body>
    <div class="container">

        <form method="post" action="to_do.php">

            <header class="header">
                <h2 name="h2_hello">Hello <?php echo $username; ?></h2>
                <button type="submit" name="log_out">LOG OUT</button>
            </header>

            <div class="task_list">

                <?php
                $conn = connectdatabase();
                $sql = "SELECT * FROM to_do.task WHERE user_id = '".$email."'";
                $result = mysqli_query($conn, $sql);

                while ($row = mysqli_fetch_assoc($result)) {
                    echo '<div class="task">';
                    echo '<div id="description"> ' . $row['description'] . '</div>';
                    echo '<div id="date"> ' . $row['due_date'] . '</div>';
                    echo '<input type="hidden" name="task_id" value="' . $row['task_id'] . '">';

                    $isFinished = ($row['finished'] == 1) ? 'finished' : 'unfinished';
                    
                    echo '<label for="finish">Done: </label>
                          <input type="submit" id="finish" name="finish" value="Finished" class="' . $isFinished . '">';
                    echo '<button type="submit" name="delete_task"> X </button>';
                    echo '</div>';
                }
                mysqli_close($conn);
                ?>

                <div class="task_input">
                    <input type="text" id="description_input" name="description_input">
                    <input type="date" id="date_input" name="date_input">
                    <button type="submit" name="add_task">Add</button>
                </div>

            </div>
            <footer class="footer">
                <button name="change_pass">Change Password?</button>
            </footer>

        </form>

    </div>

</body>

</html>
