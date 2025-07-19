
<?php
// created by ravi

require('common/connection.php');
if (isset($_REQUEST['promotion_id'])) {
    $promotionId = $_REQUEST['promotion_id'];
}



$query = "DELETE FROM `Promotions` WHERE `promotion_id`='$promotionId'";

$result = mysqli_query($connection, $query);

if ($result && mysqli_affected_rows($connection) > 0) {

    $output = array("status" => "successfully deleted shipping");
} else {
    $output = array("status" => "something went wrong");
}


echo json_encode($output);
