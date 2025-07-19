
<?php
// created by ravi

require('common/connection.php');

$query = "SELECT * FROM `Shipping`";

$result = mysqli_query($connection, $query);
$data = array();

if ($result && mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    $output = array("status" => "success", "data" => $data);
} else {
    $output = array("status" => "something went wrong");
}


echo json_encode($output);
