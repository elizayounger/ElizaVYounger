<?php
header('Content-Type: application/json; charset=UTF-8');

$lat = filter_var($_GET['lat'] ?? null, FILTER_VALIDATE_FLOAT);
$lng = filter_var($_GET['lng'] ?? null, FILTER_VALIDATE_FLOAT);

if ($lat === false || $lng === false) {
    echo json_encode(['error' => 'Invalid or missing coordinates']);
    exit;
}

$username = 'elizayounger'; 
$url = "http://api.geonames.org/timezoneJSON?lat=$lat&lng=$lng&username=$username";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}
curl_close($ch);

$data = json_decode($response, true);

// Optional: check if GeoNames returned a valid result
if (!$data || isset($data['status'])) {
    echo json_encode(['error' => 'Invalid data received from GeoNames']);
    exit;
}

// Return just the raw data that JS expects
echo json_encode($data);
