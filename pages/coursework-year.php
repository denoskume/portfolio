<?php

$year = strtolower($_GET['year'] ?? 'm1');
$isM2 = $year === 'm2';

$pageTitle = $isM2 ? 'M2 Coursework' : 'M1 Coursework';
$currentPage = 'education';

require BASE_PATH . '/includes/header.php';
?>

<section class="coursework-year-page">
    <div class="container">

        <header class="coursework-year-header reveal">
            <a
                href="<?= page_url('coursework') ?>?program=master"
                class="coursework-back"
            >
                ← Back to Master's Coursework
            </a>

            <h1>
                <?= $isM2 ? 'M2 Year' : 'M1 Year' ?>
            </h1>

            <p>
                <?= $isM2
                    ? 'Final-year courses and professional specialization.'
                    : 'First-year courses and engineering foundations.'
                ?>
            </p>
        </header>

        <div class="coursework-year-placeholder reveal">
            <span>Course catalogue</span>

            <h2>
                <?= $isM2
                    ? 'M2 course structure will be added here.'
                    : 'M1 semesters and courses will be added here.'
                ?>
            </h2>
        </div>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
