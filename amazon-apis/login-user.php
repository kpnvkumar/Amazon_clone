<?php
require('common/connection.php');
require('db.php');
require('cors.php');

header("Content-Type: application/json");
ob_clean(); // Clean any accidental output

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = mysqli_real_escape_string($connection, $_POST['email']);
    $password = mysqli_real_escape_string($connection, $_POST['password']); // plain-text password

    // Query email and password directly (no hashing)
    $query = "SELECT user_id, email, first_name, last_name FROM Users_Table 
              WHERE email = '$email' AND password = '$password' 
              LIMIT 1";
    
    $result = mysqli_query($connection, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $output = [
            'status' => 'success',
            'data' => [
                'user_id' => $user['user_id'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'email' => $user['email']
            ],
            'title' => 'Login Success',
            'msg' => 'You will be redirected to your account in 5 seconds...'
        ];
    } else {
        $output = [
            'status' => 'error',
            'title' => 'Invalid Email/ Password',
            'msg' => 'Invalid credentials'
        ];
    }
} else {
    $output = [
        'status' => 'error',
        'title' => 'Missing Data',
        'msg' => 'Email and password were not sent!'
    ];
}

echo json_encode($output);
?>
