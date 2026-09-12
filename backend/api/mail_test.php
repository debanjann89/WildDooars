<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/mailer.php';

header('Content-Type: application/json; charset=utf-8');

$testEnquiry = [
    'name' => 'Demo Customer (Test)',
    'phone' => '9876543210',
    'email' => 'wilddooarstoursandtravels@gmail.com',
    'travelDate' => date('Y-m-d', strtotime('+7 days')),
    'travellersCount' => '4 Adults, 2 Kids',
    'destination' => 'Jaldapara & Buxa Tiger Reserve',
    'tripType' => 'Family Holiday Tour',
    'vehiclePreference' => 'Toyota Innova Crysta',
    'hotelPreference' => 'Eco Resort / Cottage',
    'message' => 'This is a test notification from Wild Dooars Tours & Travels enquiry system.'
];

$sentAdmin = Mailer::sendAdminNotification($testEnquiry);
$sentCustomer = Mailer::sendCustomerConfirmation($testEnquiry);

echo json_encode([
    'status' => ($sentAdmin || $sentCustomer) ? 'success' : 'failed',
    'admin_notification_sent' => $sentAdmin,
    'customer_receipt_sent' => $sentCustomer,
    'target_email' => Mailer::$admin_email,
    'note' => 'Please check your Gmail inbox (and Spam/Junk folder if testing for the first time).'
], JSON_PRETTY_PRINT);
?>
