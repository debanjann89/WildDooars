<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

$defaults = [
    'businessName' => 'Wild Dooars Tours & Travels',
    'bengaliName' => 'ওয়াইল্ড ডুয়ার্স ট্যুরস & ট্রাভেলস',
    'phone' => '081164 42729',
    'alternatePhone' => '062961 56601',
    'whatsapp' => '918116442729',
    'email' => 'wilddooarstoursandtravels@gmail.com',
    'address' => 'Near Jaldapara National Park, Badaitari, Khauchandpara, West Bengal 735220',
    'plusCode' => 'J7F5+25 Badaitari, West Bengal',
    'googleRating' => '4.8 ★',
    'reviewsCount' => '97 reviews',
    'googleMapsUrl' => 'https://maps.app.goo.gl/BKCtmveG53u8TuVn6',
    'googleReviewsWidgetId' => '5fd3fd64-4120-4944-aaec-dc354e139523',
    'facebookUrl' => 'https://www.facebook.com/profile.php?id=100086449080365&mibextid=ZbWKwL',
    'instagramUrl' => 'https://www.instagram.com/wilddooarstoursandtravels?stkn=MXEyeG1taXJpOXc1eg==',
    'heroHeadline' => 'Explore the Wild Heart of Dooars',
    'heroSubheadline' => 'Wildlife, forests, rivers and unforgettable journeys — planned around your travel experience.',
    'heroImage' => '/images/package_rhino_main.jpg'
];

$database = new Database();
$db = $database->getConnection();
$settings = $defaults;

if ($db) {
    try {
        $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
        if ($stmt) {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($results as $row) {
                if (!empty($row['setting_value'])) {
                    $settings[$row['setting_key']] = $row['setting_value'];
                }
            }
        }
    } catch (Throwable $e) {
        // Fall back to $defaults gracefully
    }
}

echo json_encode([
    'success' => true,
    'data' => $settings
]);
?>
