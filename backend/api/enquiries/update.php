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
    $id = $input['id'];
    $status = htmlspecialchars($input['status'] ?? 'New');
    $notes = isset($input['internalNotes']) ? json_encode($input['internalNotes']) : null;

    $query = "UPDATE enquiries SET status = :status";
    $params = [':status' => $status, ':id' => $id];

    if ($notes !== null) {
        $query .= ", internal_notes_json = :notes";
        $params[':notes'] = $notes;
    }

    $query .= " WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute($params);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Enquiry updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Enquiry not found or no changes made.']);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to update enquiry: ' . $e->getMessage()]);
}
?>
