<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

$allowedPages = [
    'home',
    'about',
    'education',
    'experience',
    'projects',
    'contact',
    'coursework',
    'coursework-year',
    'bachelor-coursework',
];

$requestedPage = $_GET['page'] ?? 'home';

if (!is_string($requestedPage)) {
    $requestedPage = 'home';
}

$currentPage = in_array($requestedPage, $allowedPages, true)
    ? $requestedPage
    : 'home';

$pageFile = BASE_PATH . '/pages/' . $currentPage . '.php';

if (!is_file($pageFile)) {
    http_response_code(404);
    $currentPage = 'home';
    $pageFile = BASE_PATH . '/pages/home.php';
}
