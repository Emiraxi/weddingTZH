<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}


$botToken = '8842616047:AAH5mziG4ow__rRWLzEKoK4jIwE31pYPlho';
$chatId   = '753876126';


$name = trim($_POST['name'] ?? '');
$answer = trim($_POST['answer'] ?? '');
$comment = trim($_POST['comment'] ?? '');

if ($name === '' || $answer === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Атыңызды жана жообуңузду толтуруңуз']);
    exit;
}

if (mb_strlen($name) > 100 || mb_strlen($comment) > 500) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Маалымат өтө узун']);
    exit;
}

if ($botToken === 'PASTE_BOT_TOKEN_HERE' || $chatId === 'PASTE_BRIDE_CHAT_ID_HERE') {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Telegram жөндөөлөрү толтурулган эмес']);
    exit;
}

// Telegram MarkdownV2 үчүн коопсуз текст түзүү.
function tgEscape($text) {
    return str_replace(
        ['\\', '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'],
        ['\\\\', '\\_', '\\*', '\\[', '\\]', '\\(', '\\)', '\\~', '\\`', '\\>', '\\#', '\\+', '\\-', '\\=', '\\|', '\\{', '\\}', '\\.', '\\!'],
        $text
    );
}

$message = "💌 *Жаңы RSVP жообу!*\n\n" .
           "👤 *Аты:* " . tgEscape($name) . "\n" .
           "💍 *Жооп:* " . tgEscape($answer) . "\n" .
           "💬 *Комментарий:* " . ($comment !== '' ? tgEscape($comment) : '—');

$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$postData = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'MarkdownV2'
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($postData),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true
]);

$result = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($result === false || $curlError || $httpCode < 200 || $httpCode >= 300) {
    http_response_code(502);
    echo json_encode(['success' => false, 'message' => 'Telegram менен байланышта ката кетти']);
    exit;
}

$telegram = json_decode($result, true);
if (!is_array($telegram) || empty($telegram['ok'])) {
    http_response_code(502);
    echo json_encode(['success' => false, 'message' => 'Telegram жоопту кабыл алган жок']);
    exit;
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
?>
