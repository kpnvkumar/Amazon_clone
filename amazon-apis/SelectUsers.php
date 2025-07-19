<?php
require('common/connection.php');

$query = "SELECT * FROM `Users_table`  ";

$result = mysqli_query($connection, $query);

if($connection){
    if ($result) {
    $data = null;
    if (mysqli_num_rows($result) > 0) {
        while ($row =  mysqli_fetch_array($result)) {
            $data[] = $row;
        }
        $output = array("status" => "sucess", "data" => $data);
    }
} else {
    $output = array("status" => "error");
}

echo json_encode($output);
}
?>