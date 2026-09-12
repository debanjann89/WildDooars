<?php
// Wild Dooars Email Notification Service (Gmail SMTP + Fallback)

class Mailer {
    // 1. Gmail SMTP Settings
    public static $smtp_host = "smtp.gmail.com";
    public static $smtp_port = 465; // SSL port
    public static $smtp_user = "wilddooarstoursandtravels@gmail.com";

    // 2. Google 16-Character App Password
    public static $smtp_pass = "navz qjhd ukab lmez"; 

    // Admin recipient
    public static $admin_email = "wilddooarstoursandtravels@gmail.com";
    public static $from_name = "Wild Dooars Tours & Travels";

    /**
     * Send email via Gmail SMTP or fallback to PHP mail()
     */
    public static function sendMail($to, $subject, $htmlBody, $replyTo = null) {
        $pass = getenv('GMAIL_APP_PASSWORD') ?: self::$smtp_pass;
        $pass = trim(str_replace(' ', '', $pass));

        // If Google App Password is configured, use secure Gmail SMTP
        if (!empty($pass)) {
            $sent = self::sendSmtp($to, $subject, $htmlBody, $replyTo, $pass);
            if ($sent) return true;
        }

        // Fallback to PHP mail()
        $fromEmail = !empty(self::$smtp_user) ? self::$smtp_user : "no-reply@wilddooarstoursandtravels.in";
        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/html; charset=UTF-8";
        $headers[] = "From: " . self::$from_name . " <" . $fromEmail . ">";
        
        if ($replyTo) {
            $headers[] = "Reply-To: " . $replyTo;
        } else {
            $headers[] = "Reply-To: " . self::$admin_email;
        }
        
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headerStr = implode("\r\n", $headers);

        return @mail($to, $subject, $htmlBody, $headerStr);
    }

    /**
     * Direct Gmail SSL Socket SMTP Client (No Composer needed)
     */
    public static function sendSmtp($to, $subject, $htmlBody, $replyTo, $appPassword) {
        $timeout = 15;
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);

        $socket = @stream_socket_client(
            "ssl://" . self::$smtp_host . ":" . self::$smtp_port,
            $errno,
            $errstr,
            $timeout,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if (!$socket) {
            return false;
        }

        $read = function($sock) {
            $data = "";
            while ($line = fgets($sock, 512)) {
                $data .= $line;
                if (substr($line, 3, 1) === " ") break;
            }
            return $data;
        };

        $cmd = function($sock, $command) use ($read) {
            fputs($sock, $command . "\r\n");
            return $read($sock);
        };

        $resp = $read($socket);
        if (substr($resp, 0, 3) !== "220") { fclose($socket); return false; }

        $resp = $cmd($socket, "EHLO " . (gethostname() ?: 'localhost'));
        if (substr($resp, 0, 3) !== "250") { fclose($socket); return false; }

        $resp = $cmd($socket, "AUTH LOGIN");
        if (substr($resp, 0, 3) !== "334") { fclose($socket); return false; }

        $resp = $cmd($socket, base64_encode(self::$smtp_user));
        if (substr($resp, 0, 3) !== "334") { fclose($socket); return false; }

        $resp = $cmd($socket, base64_encode($appPassword));
        if (substr($resp, 0, 3) !== "235") { fclose($socket); return false; }

        $resp = $cmd($socket, "MAIL FROM: <" . self::$smtp_user . ">");
        if (substr($resp, 0, 3) !== "250") { fclose($socket); return false; }

        $resp = $cmd($socket, "RCPT TO: <" . $to . ">");
        if (substr($resp, 0, 3) !== "250") { fclose($socket); return false; }

        $resp = $cmd($socket, "DATA");
        if (substr($resp, 0, 3) !== "354") { fclose($socket); return false; }

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/html; charset=UTF-8";
        $headers[] = "From: " . self::$from_name . " <" . self::$smtp_user . ">";
        $headers[] = "To: <" . $to . ">";
        $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
        $headers[] = "Date: " . date('r');
        if ($replyTo) {
            $headers[] = "Reply-To: " . $replyTo;
        }

        $data = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
        $resp = $cmd($socket, $data);
        if (substr($resp, 0, 3) !== "250") { fclose($socket); return false; }

        $cmd($socket, "QUIT");
        fclose($socket);
        return true;
    }

    /**
     * Notify Admin of a new enquiry
     */
    public static function sendAdminNotification($enquiry) {
        $name = htmlspecialchars($enquiry['name'] ?? 'Guest');
        $phone = htmlspecialchars($enquiry['phone'] ?? 'N/A');
        $email = htmlspecialchars($enquiry['email'] ?? 'Not provided');
        $travelDate = htmlspecialchars($enquiry['travelDate'] ?? 'Flexible');
        $travellers = htmlspecialchars($enquiry['travellersCount'] ?? 'N/A');
        $destination = htmlspecialchars($enquiry['destination'] ?? 'Dooars General');
        $tripType = htmlspecialchars($enquiry['tripType'] ?? 'Tour');
        $vehicle = htmlspecialchars($enquiry['vehiclePreference'] ?? 'Standard');
        $hotel = htmlspecialchars($enquiry['hotelPreference'] ?? 'Standard');
        $message = nl2br(htmlspecialchars($enquiry['message'] ?? 'No additional notes.'));
        $time = date('d M Y, h:i A');

        $cleanPhone = preg_replace('/[^0-9]/', '', $phone);
        $waLink = "https://wa.me/" . (strlen($cleanPhone) === 10 ? '91' . $cleanPhone : $cleanPhone);

        $subject = "🔔 New Tour Enquiry from {$name} - Wild Dooars";

        $body = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #15803d, #0a1f14); color: white; padding: 24px; text-align: center; }
  .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
  .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
  .content { padding: 24px; }
  .badge { display: inline-block; background: #dcfce7; color: #15803d; font-weight: 800; font-size: 11px; padding: 4px 12px; rounded: 9999px; text-transform: uppercase; margin-bottom: 16px; }
  .info-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
  .info-table td.label { font-weight: 700; color: #64748b; width: 38%; }
  .info-table td.val { font-weight: 600; color: #0f172a; }
  .msg-box { background: #f8fafc; border-left: 4px solid #15803d; padding: 14px; margin-top: 18px; border-radius: 6px; font-size: 13px; line-height: 1.6; }
  .cta-bar { margin-top: 24px; text-align: center; }
  .btn { display: inline-block; padding: 12px 24px; background: #15803d; color: #ffffff !important; text-decoration: none; border-radius: 10px; font-weight: 800; font-size: 13px; margin: 4px; }
  .btn-wa { background: #25d366; }
  .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>WILD DOOARS TOURS & TRAVELS</h1>
    <p>New Customer Travel Enquiry Received</p>
  </div>
  <div class="content">
    <div style="text-align: center;">
      <span class="badge">Received on {$time}</span>
    </div>
    
    <table class="info-table">
      <tr><td class="label">Customer Name:</td><td class="val"><strong>{$name}</strong></td></tr>
      <tr><td class="label">Phone Number:</td><td class="val"><a href="tel:{$phone}" style="color: #15803d; text-decoration: none; font-weight: bold;">{$phone}</a></td></tr>
      <tr><td class="label">Email Address:</td><td class="val"><a href="mailto:{$email}" style="color: #15803d; text-decoration: none;">{$email}</a></td></tr>
      <tr><td class="label">Travel Date:</td><td class="val">{$travelDate}</td></tr>
      <tr><td class="label">Travellers:</td><td class="val">{$travellers}</td></tr>
      <tr><td class="label">Destination:</td><td class="val">{$destination}</td></tr>
      <tr><td class="label">Trip Type:</td><td class="val">{$tripType}</td></tr>
      <tr><td class="label">Vehicle Preference:</td><td class="val">{$vehicle}</td></tr>
      <tr><td class="label">Hotel Preference:</td><td class="val">{$hotel}</td></tr>
    </table>

    <div class="msg-box">
      <strong>Customer Message / Special Requirements:</strong><br>
      {$message}
    </div>

    <div class="cta-bar">
      <a href="tel:{$phone}" class="btn">📞 Call Customer</a>
      <a href="{$waLink}" class="btn btn-wa">💬 WhatsApp Customer</a>
    </div>
  </div>
  <div class="footer">
    Sent automatically by wilddooarstoursandtravels.in • Near Jaldapara National Park, West Bengal
  </div>
</div>
</body>
</html>
HTML;

        $replyTo = !empty($enquiry['email']) ? $enquiry['email'] : null;
        return self::sendMail(self::$admin_email, $subject, $body, $replyTo);
    }

    /**
     * Send instant auto-reply confirmation to Customer
     */
    public static function sendCustomerConfirmation($enquiry) {
        if (empty($enquiry['email'])) {
            return false;
        }

        $customerEmail = trim($enquiry['email']);
        if (!filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        $name = htmlspecialchars($enquiry['name'] ?? 'Traveler');
        $travelDate = htmlspecialchars($enquiry['travelDate'] ?? 'Flexible');
        $destination = htmlspecialchars($enquiry['destination'] ?? 'Dooars');
        $tripType = htmlspecialchars($enquiry['tripType'] ?? 'Holiday Tour');

        $subject = "Thank You for Contacting Wild Dooars Tours & Travels! 🌿";

        $body = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #15803d, #0a1f14); color: white; padding: 28px 24px; text-align: center; }
  .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
  .header p { margin: 8px 0 0 0; font-size: 13px; color: #bbf7d0; }
  .content { padding: 28px 24px; font-size: 14px; line-height: 1.6; }
  .highlight-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin: 20px 0; }
  .highlight-box h3 { margin: 0 0 10px 0; font-size: 14px; color: #15803d; font-weight: 800; }
  .contact-strip { background: #0a1f14; color: white; border-radius: 12px; padding: 20px; text-align: center; margin-top: 24px; }
  .contact-strip h4 { margin: 0 0 8px 0; font-size: 15px; }
  .contact-strip p { margin: 0; font-size: 12px; color: #86efac; }
  .contact-strip a { color: #ffffff; font-weight: bold; text-decoration: none; }
  .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>WILD DOOARS TOURS & TRAVELS</h1>
    <p>We have received your trip enquiry!</p>
  </div>
  <div class="content">
    <p>Dear <strong>{$name}</strong>,</p>
    <p>Thank you for getting in touch with <strong>Wild Dooars Tours & Travels</strong>. We have successfully received your enquiry regarding your upcoming travel to <strong>{$destination}</strong>.</p>
    
    <div class="highlight-box">
      <h3>Your Enquiry Summary</h3>
      <p style="margin: 4px 0;">• <strong>Destination:</strong> {$destination}</p>
      <p style="margin: 4px 0;">• <strong>Tour Type:</strong> {$tripType}</p>
      <p style="margin: 4px 0;">• <strong>Travel Date:</strong> {$travelDate}</p>
    </div>

    <p>Our tour planning specialists operating near Jaldapara National Park will review your details and contact you shortly with customized package itineraries, safari availability, and vehicle options.</p>

    <div class="contact-strip">
      <h4>Need Immediate Assistance?</h4>
      <p>Call or WhatsApp us directly anytime:</p>
      <p style="font-size: 16px; font-weight: 800; margin-top: 8px;">
        <a href="tel:08116442729">081164 42729</a> / <a href="tel:06296156601">062961 56601</a>
      </p>
      <p style="margin-top: 6px;">WhatsApp: <a href="https://wa.me/918116442729">+91 81164 42729</a></p>
    </div>
  </div>
  <div class="footer">
    Wild Dooars Tours & Travels • Near Jaldapara National Park, Badaitari, West Bengal 735220<br>
    Visit us online: <a href="https://wilddooarstoursandtravels.in" style="color: #15803d;">wilddooarstoursandtravels.in</a>
  </div>
</div>
</body>
</html>
HTML;

        return self::sendMail($customerEmail, $subject, $body, self::$admin_email);
    }
}
?>
