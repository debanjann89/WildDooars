<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Enquiry ID is required.']);
    exit();
}

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

try {
    $stmt = $db->prepare("DELETE FROM enquiries WHERE id = :id");
    $stmt->execute([':id' => $input['id']]);

    echo json_encode(['success' => true, 'message' => 'Enquiry deleted successfully.']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to delete enquiry: ' . $e->getMessage()]);
}
?>
