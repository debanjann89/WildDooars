<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/mailer.php';

header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['comment'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and review comments are required.']);
    exit();
}

$id = $input['id'] ?? ('rev-' . time());
$name = htmlspecialchars(trim($input['name']));
$email = htmlspecialchars(trim($input['email'] ?? ''));
$location = htmlspecialchars(trim($input['location'] ?? ''));
$rating = intval($input['rating'] ?? 5);
if ($rating < 1 || $rating > 5) $rating = 5;

$reviewType = ($input['reviewType'] === 'Experience') ? 'Experience' : 'Package';
$packageId = !empty($input['packageId']) ? htmlspecialchars($input['packageId']) : null;
$packageName = !empty($input['packageName']) ? htmlspecialchars($input['packageName']) : null;
$experienceType = !empty($input['experienceType']) ? htmlspecialchars($input['experienceType']) : null;
$title = htmlspecialchars(trim($input['title'] ?? ''));
$comment = htmlspecialchars(trim($input['comment']));
$travelDate = htmlspecialchars(trim($input['travelDate'] ?? ''));
$source = 'Website';
$status = 'Approved';
$createdAt = date('Y-m-d H:i');

$database = new Database();
$db = $database->getConnection();

if ($db) {
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

        $stmt = $db->prepare("INSERT INTO reviews 
            (id, name, email, location, rating, review_type, package_id, package_name, experience_type, title, comment, travel_date, source, status) 
            VALUES (:id, :name, :email, :location, :rating, :review_type, :package_id, :package_name, :experience_type, :title, :comment, :travel_date, :source, :status)");

        $stmt->execute([
            ':id' => $id,
            ':name' => $name,
            ':email' => $email,
            ':location' => $location,
            ':rating' => $rating,
            ':review_type' => $reviewType,
            ':package_id' => $packageId,
            ':package_name' => $packageName,
            ':experience_type' => $experienceType,
            ':title' => $title,
            ':comment' => $comment,
            ':travel_date' => $travelDate,
            ':source' => $source,
            ':status' => $status
        ]);
    } catch (Throwable $e) {
        error_log("Review DB insertion warning: " . $e->getMessage());
    }
}

// Send Admin Email Alert
$starsStr = str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);
$categoryLabel = ($reviewType === 'Package') ? ("Package: " . ($packageName ?: 'General Package')) : ("Experience: " . ($experienceType ?: 'Overall Experience'));
$subject = "🌟 New Traveler Review ({$starsStr}) - {$name}";

$body = <<<HTML
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 20px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #15803d; color: white; padding: 20px; text-align: center;">
      <h2 style="margin: 0; font-size: 20px;">WILD DOOARS TOURS & TRAVELS</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px;">New Traveler Review Submitted on Website</p>
    </div>
    <div style="padding: 24px;">
      <div style="text-align: center; margin-bottom: 16px;">
        <span style="font-size: 24px; color: #f59e0b;">{$starsStr}</span>
        <div style="font-weight: bold; font-size: 14px; margin-top: 4px; color: #15803d;">{$categoryLabel}</div>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr><td style="padding: 6px 0; color: #64748b; width: 30%;"><strong>Traveler:</strong></td><td style="padding: 6px 0; font-weight: bold;">{$name} ({$location})</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td><td style="padding: 6px 0;">{$email}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Travel Date:</strong></td><td style="padding: 6px 0;">{$travelDate}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Headline:</strong></td><td style="padding: 6px 0; font-weight: bold;">{$title}</td></tr>
      </table>
      <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; margin-top: 14px; font-size: 13px; line-height: 1.5;">
        "{$comment}"
      </div>
    </div>
  </div>
</body>
</html>
HTML;

@Mailer::sendMail(Mailer::$admin_email, $subject, $body, !empty($email) ? $email : null);

$createdReview = [
    'id' => $id,
    'name' => $name,
    'email' => $email,
    'location' => $location,
    'rating' => $rating,
    'reviewType' => $reviewType,
    'packageId' => $packageId,
    'packageName' => $packageName,
    'experienceType' => $experienceType,
    'title' => $title,
    'comment' => $comment,
    'travelDate' => $travelDate,
    'source' => $source,
    'status' => $status,
    'createdAt' => $createdAt
];

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your review has been submitted successfully.',
    'review' => $createdReview
]);
?>
