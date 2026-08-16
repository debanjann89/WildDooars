<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['phone'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and phone number are required.']);
    exit();
}

$database = new Database();
$db = $database->getConnection();

if ($db) {
    $id = 'enq-' . time();
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
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your enquiry has been received. Our travel team will contact you shortly.'
]);
?>
