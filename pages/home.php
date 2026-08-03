<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$banner = BASE_PATH . '/assets/images/branding/home-banner.png';
?>

<section class="hero-home">

<?php if (is_file($banner)): ?>

<img
    src="<?= asset('images/branding/home-banner.png') ?>"
    class="hero-image"
    alt="Denos Kume Presentation">

<?php endif; ?>

<div class="hero-overlay"></div>

<div class="container hero-content">

    <p class="hero-kicker">
        AI ENGINEERING PORTFOLIO
    </p>

    <h1>
        Engineering intelligent systems
        from data, signals and images.
    </h1>

    <p class="hero-subtitle">
        Denos Kume · École Centrale de Nantes
    </p>

</div>

</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
