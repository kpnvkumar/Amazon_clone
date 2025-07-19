<?php
require('common/connection.php');
require('db.php');
require('cors.php');
header("Content-Type: application/json");

if (!isset($_REQUEST['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user_id"
    ]);
    exit;
}

$user_id = mysqli_real_escape_string($connection, $_REQUEST['user_id']);

$data = [];

// 🔹 Join with Products table
$query1 = "
    SELECT w.*, p.name, p.price, p.images AS image_url, 'Products' AS source
    FROM Wishlist_Items w
    JOIN Products p ON w.product_id = p.product_id
    WHERE w.user_id = '$user_id'
";

$result1 = mysqli_query($connection, $query1);
if ($result1) {
    while ($row = mysqli_fetch_assoc($result1)) {
        $data[] = $row;
    }
}

// 🔹 Join with mxplayer table
$query2 = "
    SELECT w.*, m.name, m.price, m.images AS image_url, 'mxplayer' AS source
    FROM Wishlist_Items w
    JOIN mxplayer m ON w.product_id = m.product_id
    WHERE w.user_id = '$user_id'
";

$result2 = mysqli_query($connection, $query2);
if ($result2) {
    while ($row = mysqli_fetch_assoc($result2)) {
        $data[] = $row;
    }
}
$query3 = "
    SELECT w.*, h.name, h.price, h.images AS image_url, 'homepageimprovements' AS source
    FROM Wishlist_Items w
    JOIN homeimprovements h ON w.product_id = h.product_id
    WHERE w.user_id = '$user_id'
";

$result3 = mysqli_query($connection, $query3);
if ($result3) {
    while ($row = mysqli_fetch_assoc($result3)) {
        $data[] = $row;
    }
}
$query4 = "
    SELECT w.*, t.name, t.price, t.images AS image_url, 'Toysandgames' AS source
    FROM Wishlist_Items w
    JOIN Toysandgames t ON w.product_id = t.product_id
    WHERE w.user_id = '$user_id'
";

$result4 = mysqli_query($connection, $query4);
if ($result4) {
    while ($row = mysqli_fetch_assoc($result4)) {
        $data[] = $row;
    }
}
$query5 = "
    SELECT w.*, m.name, m.price, m.images AS image_url, 'mobiles' AS source
    FROM Wishlist_Items w
    JOIN mobiles m ON w.product_id = m.product_id
    WHERE w.user_id = '$user_id'
";

$result5 = mysqli_query($connection, $query5);
if ($result5) {
    while ($row = mysqli_fetch_assoc($result5)) {
        $data[] = $row;
    }
}

// 🔹 Final output
if (count($data) > 0) {
    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No items found"
    ]);
}
?>
