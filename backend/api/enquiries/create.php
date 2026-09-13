<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/mailer.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['phone']) || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, phone number, and email address are required.']);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$dbSaved = false;
$dbError = null;

if (!$db) {
    $dbError = $database->last_error ?? 'Could not connect to database';
    error_log("Enquiry DB connection failed: " . $dbError);
}

if ($db) {
    try {
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

        $id = $input['id'] ?? ('enq-' . time());
        $query = "INSERT INTO enquiries (id, name, phone, email, travel_date, travellers_count, destination, trip_type, vehicle_preference, hotel_preference, message, status) 
                  VALUES (:id, :name, :phone, :email, :travel_date, :travellers_count, :destination, :trip_type, :vehicle_preference, :hotel_preference, :message, 'New')";
        
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':id' => $id,
            ':name' => htmlspecialchars($input['name']),
            ':phone' => htmlspecialchars($input['phone']),
            ':email' => htmlspecialchars($input['email'] ?? ''),
            ':travel_date' => htmlspecialchars($input['travelDate'] ?? ''),
            ':travellers_count' => htmlspecialchars($input['travellersCount'] ?? ''),
            ':destination' => htmlspecialchars($input['destination'] ?? ''),
            ':trip_type' => htmlspecialchars($input['tripType'] ?? ''),
            ':vehicle_preference' => htmlspecialchars($input['vehiclePreference'] ?? ''),
            ':hotel_preference' => htmlspecialchars($input['hotelPreference'] ?? ''),
            ':message' => htmlspecialchars($input['message'] ?? '')
        ]);
        $dbSaved = true;
    } catch (Throwable $e) {
        $dbError = $e->getMessage();
        error_log("Enquiry DB insertion failed: " . $dbError);
    }
}

// Send automated email notifications (even if DB fails, still try email):
// 1. Notify Wild Dooars team
$adminMailSent = Mailer::sendAdminNotification($input);

// 2. Send instant confirmation receipt to customer
$customerMailSent = false;
if (!empty($input['email'])) {
    $customerMailSent = Mailer::sendCustomerConfirmation($input);
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your enquiry has been received. Our travel team will contact you shortly.',
    'db_saved' => $dbSaved,
    'mail_sent' => [
        'admin' => $adminMailSent,
        'customer' => $customerMailSent
    ]
]);
?>
