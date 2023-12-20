<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $search = "%" . $_POST["search"] . "%";
    $email = $_POST["email"];

    $con = mysqli_connect("localhost", "root", "", "to_do");

    $upit = "SELECT * FROM task WHERE user_id = ? AND description LIKE ?";

    $stmt = mysqli_prepare($con, $upit);

    mysqli_stmt_bind_param($stmt, "ss", $email, $search);

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    echo json_encode($rows);

    mysqli_close($con);
}
?>
