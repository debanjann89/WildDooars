<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit();
}

$database = new Database();
$db = $database->getConnection();

if ($db) {
    foreach ($input as $key => $val) {
        if (is_string($val)) {
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (:k, :v) ON DUPLICATE KEY UPDATE setting_value = :v2");
            $stmt->execute([':k' => $key, ':v' => $val, ':v2' => $val]);
        }
    }
}

echo json_encode(['success' => true, 'message' => 'Settings saved successfully']);
?>
