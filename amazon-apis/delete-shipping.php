
<?php
// created by ravi

require('common/connection.php');
if (isset($_REQUEST['shipping_id'])) {
    $shippingId = $_REQUEST['shipping_id'];
}



$query = "DELETE FROM `Shipping` WHERE `shipping_id` ='$shippingId'";

$result = mysqli_query($connection, $query);

if ($result && mysqli_affected_rows($connection) > 0) {

    $output = array("status" => "successfully deleted shipping");
} else {
    $output = array("status" => "something went wrong");
}


echo json_encode($output);
