/*<?php

require('common/connection.php');

$wishlist_item_id = $_REQUEST['wishlist_item_id'];

$query = " DELETE FROM `Wishlist_Items` WHERE `wishlist_item_id`='$wishlist_item_id' ";

$result = mysqli_query($connection,$query);

if($result ){
    if(mysqli_affected_rows($connection)>0){
   
    $output = array('status'=>'success');
    }
    else{
        echo 'error1';
    }
}
else{
    $output = array('status'=>'error');
}

echo json_encode($output);


?>*/
<?php

require('common/connection.php');
require('cors.php'); // Optional if CORS is used in your setup

if (isset($_POST['user_id']) && isset($_POST['product_id'])) {
    $user_id = $_POST['user_id'];
    $product_id = $_POST['product_id'];

    $query = "DELETE FROM Wishlist_Items WHERE user_id = '$user_id' AND product_id = '$product_id'";
    $result = mysqli_query($connection, $query);

    if ($result) {
        if (mysqli_affected_rows($connection) > 0) {
            $output = array('status' => 'success');
        } else {
            $output = array('status' => 'error', 'message' => 'Item not found');
        }
    } else {
        $output = array('status' => 'error', 'message' => 'Query failed');
    }
} else {
    $output = array('status' => 'error', 'message' => 'Missing data');
}

echo json_encode($output);
?>
