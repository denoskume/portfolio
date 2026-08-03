<?php

$pageTitle = $pageTitle ?? SITE_TITLE;
$currentPage = $currentPage ?? 'home';

$fullTitle = $pageTitle === SITE_TITLE
    ? SITE_NAME . ' | ' . SITE_TITLE
    : $pageTitle . ' | ' . SITE_NAME;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="<?= e(SITE_DESCRIPTION) ?>"
    >

    <meta name="author" content="<?= e(SITE_NAME) ?>">

    <meta property="og:title" content="<?= e($fullTitle) ?>">
    <meta property="og:description" content="<?= e(SITE_DESCRIPTION) ?>">
    <meta property="og:type" content="website">

    <title><?= e($fullTitle) ?></title>

    <link rel="stylesheet" href="<?= asset('css/style.css') ?>">

    <script src="<?= asset('js/navigation.js') ?>" defer></script>
    <script src="<?= asset('js/animation.js') ?>" defer></script>
    <script src="<?= asset('js/app.js') ?>" defer></script>
</head>

<body>
    <a class="skip-link" href="#main-content">
        Skip to main content
    </a>

    <header class="site-header">
        <?php require BASE_PATH . '/includes/navbar.php'; ?>
    </header>

    <main class="page-main" id="main-content">
