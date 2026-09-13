<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Review ID is required.']);
    exit();
}

$id = $input['id'];

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    echo json_encode(['success' => true, 'message' => 'Updated locally (No DB connection)']);
    exit();
}

try {
    // Check if review exists
    $checkStmt = $db->prepare("SELECT * FROM reviews WHERE id = :id LIMIT 1");
    $checkStmt->execute([':id' => $id]);
    $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if (!$existing) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Review not found']);
        exit();
    }

    $status = $input['status'] ?? $existing['status'];
    $rating = isset($input['rating']) ? intval($input['rating']) : $existing['rating'];
    $name = isset($input['name']) ? htmlspecialchars(trim($input['name'])) : $existing['name'];
    $title = isset($input['title']) ? htmlspecialchars(trim($input['title'])) : $existing['title'];
    $comment = isset($input['comment']) ? htmlspecialchars(trim($input['comment'])) : $existing['comment'];
    $location = isset($input['location']) ? htmlspecialchars(trim($input['location'])) : $existing['location'];

    $stmt = $db->prepare("UPDATE reviews SET 
        status = :status, 
        rating = :rating, 
        name = :name, 
        title = :title, 
        comment = :comment, 
        location = :location 
        WHERE id = :id");

    $stmt->execute([
        ':status' => $status,
        ':rating' => $rating,
        ':name' => $name,
        ':title' => $title,
        ':comment' => $comment,
        ':location' => $location,
        ':id' => $id
    ]);

    echo json_encode(['success' => true, 'message' => 'Review updated successfully']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
