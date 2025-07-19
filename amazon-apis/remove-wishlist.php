
<?php
require('common/connection.php');
require('db.php');
require('cors.php');
$user_id = $_POST['user_id'];
$product_id = $_POST['product_id'];

if (!$user_id || !$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing parameters']);
    exit;
}

$query = "DELETE FROM Wishlist_Items WHERE user_id = '$user_id' AND product_id = '$product_id'";
$result = mysqli_query($connection, $query);

if ($result && mysqli_affected_rows($connection) > 0) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Item not found or already removed']);
}
?>
