<?php
$servername = "127.0.0.1";  // or localhost
$username = "root";         // MySQL username (from Workbench)
$password = "Kpnvkumar@2004";
$dbname = "amazon";         // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}
?>
