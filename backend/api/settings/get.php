<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    // Return fallback settings
    echo json_encode([
        'success' => true,
        'data' => [
            'businessName' => 'Wild Dooars Tours & Travels',
            'bengaliName' => 'ওয়াইল্ড ডুয়ার্স ট্যুরস & ট্রাভেলস',
            'phone' => '081164 42729',
            'whatsapp' => '918116442729',
            'email' => 'info@wilddooarstours.com',
            'address' => 'Near Jaldapara National Park, Badaitari, Khauchandpara, West Bengal 735220',
            'plusCode' => 'J7F5+25 Badaitari, West Bengal',
            'googleRating' => '4.8 ★',
            'reviewsCount' => '97 reviews'
        ]
    ]);
    exit();
}

$query = "SELECT setting_key, setting_value FROM settings";
$stmt = $db->prepare($query);
$stmt->execute();
$results = $stmt->fetchAll();

$settings = [];
foreach ($results as $row) {
    $settings[$row['setting_key']] = $row['setting_value'];
}

echo json_encode([
    'success' => true,
    'data' => $settings
]);
?>
