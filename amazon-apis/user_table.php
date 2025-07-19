<?php
$host = "localhost";
$username = "root";
$password = "Kpnvkumar@2004"; // Change if needed
$database = "amazon";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Drop old table (optional for testing)
// $conn->query("DROP TABLE IF EXISTS users_table");

$sql = "CREATE TABLE IF NOT EXISTS users_table (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
  echo "✅ Table 'users_table' created successfully.";
} else {
  echo "❌ Error creating table: " . $conn->error;
}

$conn->close();
?>
