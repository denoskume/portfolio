<?php

$currentPage = $currentPage ?? 'home';

$navigationItems = [
    'about' => 'About',
    'education' => 'Education',
    'experience' => 'Experience',
    'projects' => 'Projects',
    'contact' => 'Contact',
];
?>

<nav class="navbar container" aria-label="Main navigation">
    <a href="<?= page_url('home') ?>" class="brand" aria-label="Denos Kume homepage">
        <span class="brand-mark">DK</span>
        <span>Denos Kume</span>
    </a>

    <button
        class="menu-button"
        type="button"
        aria-label="Open navigation menu"
        aria-controls="primary-navigation"
        aria-expanded="false"
    >
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="nav-links" id="primary-navigation">
        <?php foreach ($navigationItems as $page => $label): ?>
            <a
                href="<?= page_url($page) ?>"
                class="<?= $currentPage === $page ? 'active' : '' ?>"
                <?= $currentPage === $page ? 'aria-current="page"' : '' ?>
            >
                <?= e($label) ?>
            </a>
        <?php endforeach; ?>
    </div>
</nav>
