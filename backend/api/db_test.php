<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$database = new Database();
$db = $database->getConnection();

if ($db) {
    // Count tables
    $stmt = $db->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        'status' => 'success',
        'message' => 'Successfully connected to MySQL database!',
        'tables_found' => $tables,
        'table_count' => count($tables)
    ], JSON_PRETTY_PRINT);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Could not connect to database. Please check your DB credentials in config/database.php.',
        'error_detail' => $database->last_error
    ], JSON_PRETTY_PRINT);
}
?>
