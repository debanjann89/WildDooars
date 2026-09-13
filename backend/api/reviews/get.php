<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    echo json_encode(['success' => false, 'message' => 'Database connection unavailable', 'data' => []]);
    exit();
}

try {
    $db->exec("CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150),
        location VARCHAR(150),
        rating INT NOT NULL DEFAULT 5,
        review_type ENUM('Package', 'Experience') DEFAULT 'Package',
        package_id VARCHAR(100) NULL,
        package_name VARCHAR(255) NULL,
        experience_type VARCHAR(150) NULL,
        title VARCHAR(255),
        comment TEXT NOT NULL,
        travel_date VARCHAR(50),
        avatar_url VARCHAR(500),
        source ENUM('Website', 'Google') DEFAULT 'Website',
        status ENUM('Approved', 'Pending', 'Hidden') DEFAULT 'Approved',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    $sql = "SELECT id, name, email, location, rating, review_type as reviewType, package_id as packageId, package_name as packageName, experience_type as experienceType, title, comment, travel_date as travelDate, avatar_url as avatarUrl, source, status, created_at as createdAt FROM reviews WHERE 1=1";
    $params = [];

    if (!empty($_GET['package_id'])) {
        $sql .= " AND package_id = :package_id";
        $params[':package_id'] = $_GET['package_id'];
    }

    if (!empty($_GET['type'])) {
        $sql .= " AND review_type = :type";
        $params[':type'] = $_GET['type'];
    }

    if (!empty($_GET['status'])) {
        $sql .= " AND status = :status";
        $params[':status'] = $_GET['status'];
    }

    $sql .= " ORDER BY created_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $reviews]);
} catch (Throwable $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage(), 'data' => []]);
}
?>
