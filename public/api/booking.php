<?php
// Prevent unauthorized access & set CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit();
}

// Get JSON input
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);

if (!$data) {
    $data = $_POST;
}

// Clean raw strings (no double-escaping)
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($data['phone']) ? strip_tags(trim($data['phone'])) : 'N/A';
$company = isset($data['company']) ? strip_tags(trim($data['company'])) : 'N/A';
$mode = isset($data['mode']) ? strtoupper(strip_tags(trim($data['mode']))) : 'FREIGHT';
$goodsType = isset($data['goodsType']) ? strip_tags(trim($data['goodsType'])) : 'General Cargo';
$weight = isset($data['weight']) ? strip_tags(trim($data['weight'])) : 'N/A';
$from = isset($data['from']) ? strip_tags(trim($data['from'])) : 'N/A';
$to = isset($data['to']) ? strip_tags(trim($data['to'])) : 'N/A';
$details = isset($data['details']) ? strip_tags(trim($data['details'])) : 'N/A';
$reference = isset($data['reference']) ? strip_tags(trim($data['reference'])) : 'NSS-BKG-' . rand(10000, 99999);
$notes = isset($data['notes']) ? strip_tags(trim($data['notes'])) : 'None';

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Please provide a valid name and email address.']);
    exit();
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$date = date('F j, Y, g:i a T');

// Helper function for HTML escaping
function e($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// Sender & Recipient addresses
$fromEmail = 'contact@nssgroupint.com';
$fromName = 'NSS Group Booking Portal';
$adminRecipient = 'info@nssgroupint.com';

// -------------------------------------------------------------
// 1. BUILD ADMIN BOOKING NOTIFICATION HTML EMAIL
// -------------------------------------------------------------
$adminSubject = "[NSS Cargo Booking] {$mode} Request {$reference} - {$name} ({$from} -> {$to})";

$adminBody = '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New NSS Cargo Booking Request</title>
</head>
<body style="margin:0; padding:0; background-color:#0e0a1e; font-family:\'Manrope\', Arial, sans-serif; color:#f7f1e3;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0e0a1e; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#16102b; border: 1px solid rgba(232, 194, 104, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Banner with Brand Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1d1233 0%, #0e0a1e 100%); padding: 32px 30px; text-align: center; border-bottom: 2px solid #e8c268;">
              <a href="https://www.nssgroupint.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="https://www.nssgroupint.com/logo.png" alt="NSS Group Logo" width="70" height="70" style="display: block; margin: 0 auto 12px auto; width: 70px; height: 70px; object-fit: contain; border: 0;" />
              </a>
              <h1 style="margin: 0; color: #e8c268; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                NSS INTERNATIONAL GROUP
              </h1>
              <p style="margin: 5px 0 0 0; color: rgba(247, 241, 227, 0.6); font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">
                New Freight Booking Request &bull; Ref: ' . e($reference) . '
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 35px 30px;">
              <div style="background-color: rgba(232, 194, 104, 0.08); border-left: 4px solid #e8c268; padding: 15px 20px; margin-bottom: 25px; border-radius: 4px;">
                <p style="margin: 0; color: #e8c268; font-weight: 600; font-size: 14px;">
                  Cargo Booking Mode: <span style="color: #ffffff; text-transform: uppercase;">' . e($mode) . ' BOOKING</span>
                </p>
              </div>

              <!-- Booking Details Table -->
              <h3 style="color: #e8c268; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">Shipment Specifications</h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="margin-bottom: 25px; border-collapse: collapse; background-color: #0e0a1e; border-radius: 8px;">
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td width="38%" style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Reference Code:</td>
                  <td width="62%" style="color: #e8c268; font-size: 14px; font-weight: 700;">' . e($reference) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Type of Goods:</td>
                  <td style="color: #ffffff; font-size: 14px; font-weight: 600;">' . e($goodsType) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Weight / Volume:</td>
                  <td style="color: #ffffff; font-size: 14px;">' . e($weight) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Origin (From):</td>
                  <td style="color: #ffffff; font-size: 14px;">' . e($from) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Destination (To):</td>
                  <td style="color: #ffffff; font-size: 14px;">' . e($to) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Equipment & Details:</td>
                  <td style="color: #e8c268; font-size: 13px; font-weight: 600;">' . e($details) . '</td>
                </tr>
              </table>

              <!-- Customer Info Table -->
              <h3 style="color: #e8c268; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">Applier Contact Details</h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="margin-bottom: 25px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td width="38%" style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Full Name:</td>
                  <td width="62%" style="color: #f7f1e3; font-size: 14px; font-weight: 700;">' . e($name) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Email Address:</td>
                  <td style="color: #e8c268; font-size: 14px; font-weight: 700;"><a href="mailto:' . e($email) . '" style="color: #e8c268; text-decoration: none;">' . e($email) . '</a></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="color: #f7f1e3; font-size: 14px;">' . e($phone) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Company Name:</td>
                  <td style="color: #f7f1e3; font-size: 14px;">' . e($company) . '</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(247, 241, 227, 0.1);">
                  <td style="color: rgba(247, 241, 227, 0.6); font-size: 13px; font-weight: 600;">Submission Timestamp:</td>
                  <td style="color: rgba(247, 241, 227, 0.8); font-size: 12px;">' . e($date) . ' (IP: ' . e($ip) . ')</td>
                </tr>
              </table>

              <!-- Additional Notes -->
              ' . ($notes !== 'None' ? '
              <h3 style="color: #e8c268; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Additional Instructions / Notes:</h3>
              <div style="background-color: #0e0a1e; border: 1px solid rgba(232, 194, 104, 0.2); padding: 18px; border-radius: 8px; font-size: 13px; line-height: 1.6; color: #ffffff; white-space: pre-wrap;">' . nl2br(e($notes)) . '</div>
              ' : '') . '
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0e0a1e; padding: 20px; text-align: center; border-top: 1px solid rgba(232, 194, 104, 0.2);">
              <p style="margin: 0; color: rgba(247, 241, 227, 0.5); font-size: 11px; letter-spacing: 1px;">
                NSS Group Automated Booking Engine &bull; <a href="https://www.nssgroupint.com" style="color: #e8c268; text-decoration: none;">nssgroupint.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

// -------------------------------------------------------------
// 2. BUILD APPLIER CONFIRMATION HTML EMAIL
// -------------------------------------------------------------
$clientSubject = "Booking Request Confirmed #{$reference} - NSS International Group";

$clientBody = '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation - NSS Group</title>
</head>
<body style="margin:0; padding:0; background-color:#0e0a1e; font-family:\'Manrope\', Arial, sans-serif; color:#f7f1e3;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0e0a1e; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#16102b; border: 1px solid rgba(232, 194, 104, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Banner with Brand Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1d1233 0%, #0e0a1e 100%); padding: 35px 30px; text-align: center; border-bottom: 2px solid #e8c268;">
              <a href="https://www.nssgroupint.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="https://www.nssgroupint.com/logo.png" alt="NSS Group Logo" width="75" height="75" style="display: block; margin: 0 auto 14px auto; width: 75px; height: 75px; object-fit: contain; border: 0;" />
              </a>
              <h1 style="margin: 0; color: #e8c268; font-size: 26px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                NSS GROUP
              </h1>
              <p style="margin: 6px 0 0 0; color: rgba(247, 241, 227, 0.7); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">
                Nawi Samim Samir &bull; International Group of Companies
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 35px 30px;">
              <h2 style="margin-top: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                Dear ' . e($name) . ',
              </h2>
              
              <p style="font-size: 14px; line-height: 1.7; color: rgba(247, 241, 227, 0.85); margin-bottom: 20px;">
                Thank you for submitting your freight booking request with <strong style="color: #e8c268;">NSS International Group of Companies</strong>. We have registered your booking request under reference number <strong style="color: #ffffff;">' . e($reference) . '</strong>.
              </p>

              <p style="font-size: 14px; line-height: 1.7; color: rgba(247, 241, 227, 0.85); margin-bottom: 25px;">
                Our regional dispatch team and operations desk are reviewing your route specs and cargo details. We will confirm your freight rate and dispatch schedule within <strong style="color: #e8c268;">24 hours</strong>.
              </p>

              <!-- Booking Summary Box -->
              <div style="background-color: #0e0a1e; border: 1px solid rgba(232, 194, 104, 0.25); border-radius: 10px; padding: 22px; margin-bottom: 30px;">
                <h3 style="margin-top: 0; color: #e8c268; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                  Your Booking Request Details:
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 13px; border-collapse: collapse;">
                  <tr>
                    <td width="40%" style="color: rgba(247, 241, 227, 0.6);">Booking Reference:</td>
                    <td width="60%" style="color: #e8c268; font-weight: 700;">' . e($reference) . '</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(247, 241, 227, 0.6);">Transport Mode:</td>
                    <td style="color: #ffffff; text-transform: uppercase; font-weight: 600;">' . e($mode) . '</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(247, 241, 227, 0.6);">Type of Goods:</td>
                    <td style="color: #ffffff;">' . e($goodsType) . '</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(247, 241, 227, 0.6);">Weight / Quantity:</td>
                    <td style="color: #ffffff;">' . e($weight) . '</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(247, 241, 227, 0.6);">Route:</td>
                    <td style="color: #ffffff;">' . e($from) . ' &rarr; ' . e($to) . '</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(247, 241, 227, 0.6);">Equipment Details:</td>
                    <td style="color: #e8c268;">' . e($details) . '</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(247, 241, 227, 0.6);">Request Date:</td>
                    <td style="color: rgba(247, 241, 227, 0.8);">' . e($date) . '</td>
                  </tr>
                </table>
              </div>

              <!-- Direct Contact Box -->
              <div style="border-top: 1px solid rgba(232, 194, 104, 0.2); margin-top: 25px; padding-top: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #e8c268;">Need Immediate Dispatch Assistance?</p>
                <p style="margin: 3px 0; font-size: 13px; color: rgba(247, 241, 227, 0.8);"><strong>Hotline / WhatsApp:</strong> +93 78 452 6666 | +93 78 453 6666</p>
                <p style="margin: 3px 0; font-size: 13px; color: rgba(247, 241, 227, 0.8);"><strong>Email:</strong> info@nssgroupint.com</p>
                <p style="margin: 3px 0; font-size: 13px; color: rgba(247, 241, 227, 0.8);"><strong>Portal:</strong> <a href="https://www.nssgroupint.com" style="color: #e8c268; text-decoration: none;">www.nssgroupint.com</a></p>
              </div>

            </td>
          </tr>

          <!-- Footer Banner -->
          <tr>
            <td style="background-color: #0e0a1e; padding: 25px 30px; text-align: center; border-top: 1px solid rgba(232, 194, 104, 0.2);">
              <p style="margin: 0; color: #e8c268; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                YOUR CARGO, OUR RESPONSIBILITY
              </p>
              <p style="margin: 5px 0 0 0; color: rgba(247, 241, 227, 0.4); font-size: 10px;">
                &copy; ' . date('Y') . ' NSS International Group of Companies. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

// -------------------------------------------------------------
// 3. SEND EMAILS VIA PHP MAIL WITH UTF-8 MIME HEADERS
// -------------------------------------------------------------
$headersAdmin = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Cc: contact@nssgroupint.com',
    'X-Mailer: PHP/' . phpversion()
];

$headersClient = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: NSS International Group <' . $fromEmail . '>',
    'Reply-To: NSS Dispatch <info@nssgroupint.com>',
    'X-Mailer: PHP/' . phpversion()
];

$adminSent = @mail($adminRecipient, '=?UTF-8?B?' . base64_encode($adminSubject) . '?=', $adminBody, implode("\r\n", $headersAdmin));
$clientSent = @mail($email, '=?UTF-8?B?' . base64_encode($clientSubject) . '?=', $clientBody, implode("\r\n", $headersClient));

if ($adminSent || $clientSent) {
    echo json_encode([
        'success' => true,
        'reference' => $reference,
        'message' => 'Thank you! Your booking request has been submitted successfully. A confirmation email has been sent to your inbox.',
        'details' => [
            'admin_notified' => $adminSent,
            'client_confirmed' => $clientSent
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Failed to process booking email. Please contact our operations desk at info@nssgroupint.com.'
    ]);
}
