<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . ($database->last_error ?? 'Unknown error'),
        'data' => []
    ]);
    exit();
}

try {
    // Create table if not exists (safety net)
    $db->exec("CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(150),
        travel_date VARCHAR(50),
        travellers_count VARCHAR(50),
        destination VARCHAR(255),
        trip_type VARCHAR(100),
        vehicle_preference VARCHAR(150),
        hotel_preference VARCHAR(150),
        message TEXT,
        status VARCHAR(50) DEFAULT 'New',
        internal_notes_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    $query = "SELECT * FROM enquiries ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Map database column names to frontend camelCase keys
    $enquiries = array_map(function($row) {
        return [
            'id' => $row['id'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'email' => $row['email'] ?? '',
            'travelDate' => $row['travel_date'] ?? '',
            'travellersCount' => $row['travellers_count'] ?? '',
            'destination' => $row['destination'] ?? '',
            'tripType' => $row['trip_type'] ?? '',
            'vehiclePreference' => $row['vehicle_preference'] ?? '',
            'hotelPreference' => $row['hotel_preference'] ?? '',
            'message' => $row['message'] ?? '',
            'status' => $row['status'] ?? 'New',
            'internalNotes' => !empty($row['internal_notes_json']) ? json_decode($row['internal_notes_json'], true) : [],
            'createdAt' => $row['created_at'] ?? date('Y-m-d H:i:s')
        ];
    }, $rows);

    echo json_encode([
        'success' => true,
        'data' => $enquiries
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch enquiries: ' . $e->getMessage(),
        'data' => []
    ]);
}
?>
