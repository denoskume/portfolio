<?php

declare(strict_types=1);

define('SITE_NAME', 'Denos Kume');
define('SITE_TITLE', 'AI Engineering Portfolio');
define('SITE_DESCRIPTION', 'Portfolio in Machine Learning, Computer Vision, Signal and Image Processing.');

define('BASE_PATH', dirname(__DIR__));
define('BASE_URL', '/');

function asset(string $path): string
{
    return BASE_URL . 'assets/' . ltrim($path, '/');
}

function page_url(string $page): string
{
    return BASE_URL . '?page=' . urlencode($page);
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
