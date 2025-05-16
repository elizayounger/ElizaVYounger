<?php
header('Content-Type: application/json; charset=UTF-8');

$geonameId = filter_var($_GET['geonameId'] ?? null, FILTER_VALIDATE_FLOAT);


if (!$geonameId) {
    echo json_encode(['error' => 'No Country selected']);
    exit;
}

$username = 'elizayounger'; 
$url = "http://api.geonames.org/neighboursJSON?username=$username&geonameId=$geonameId";

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
if (!$data) {
    echo json_encode(['error' => 'Invalid data received from GeoNames']);
    exit;
}

// Return just the raw data that JS expects
echo json_encode($data);
