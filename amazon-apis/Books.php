<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require('common/connection.php');
if (!$connection) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . mysqli_connect_error()
    ]));
}
mysqli_set_charset($connection, "utf8");
$response = array();
$query = "SELECT * FROM Toysandgames";
$result = mysqli_query($connection, $query);

if ($result) {
    $rowCount = mysqli_num_rows($result);
    if ($rowCount > 0) {
        $products = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }
        $response["status"] = "success";
        $response["products"] = $products;
    } else {
        $response["status"] = "error";
        $response["message"] = "Query succeeded but no rows returned. Are you sure data is inserted into this instance?";
    }
} else {
    $response["status"] = "error";
    $response["message"] = "Query failed: " . mysqli_error($connection);
}
echo json_encode($response);
mysqli_close($connection);
?>
