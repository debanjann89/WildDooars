<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Could not connect to database.',
        'error' => $database->last_error
    ], JSON_PRETTY_PRINT);
    exit();
}

$sqlFile = __DIR__ . '/../database/hostinger_setup.sql';
if (!file_exists($sqlFile)) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'hostinger_setup.sql not found at ' . $sqlFile
    ], JSON_PRETTY_PRINT);
    exit();
}

$sqlContent = file_get_contents($sqlFile);
$cleanedSql = preg_replace('/^--.*$/m', '', $sqlContent);
$queries = array_filter(array_map('trim', explode(';', $cleanedSql)));

$executed = 0;
$errors = [];

foreach ($queries as $query) {
    if (empty($query)) continue;
    try {
        $db->exec($query);
        $executed++;
    } catch (PDOException $e) {
        $errors[] = [
            'query_snippet' => substr($query, 0, 80) . '...',
            'error' => $e->getMessage()
        ];
    }
}

// Fetch tables created
$stmt = $db->query("SHOW TABLES");
$tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode([
    'status' => count($errors) === 0 ? 'success' : 'completed_with_warnings',
    'queries_executed' => $executed,
    'errors_count' => count($errors),
    'errors' => $errors,
    'tables_in_db' => $tables,
    'table_count' => count($tables)
], JSON_PRETTY_PRINT);
?>
