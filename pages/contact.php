<?php

$pageTitle = 'Contact';
$currentPage = 'contact';

require BASE_PATH . '/includes/header.php';
?>

<section class="page-hero">
    <div class="container page-hero-content reveal">
        <p class="eyebrow">Contact</p>

        <h1 class="page-title">
            Let us build something useful.
        </h1>

        <p class="lead">
            Contact me for internships, collaborations and
            AI engineering opportunities.
        </p>
    </div>
</section>

<section class="section">
    <div class="container contact-layout">

        <aside class="contact-information stack-lg reveal">
            <div>
                <p class="eyebrow">Contact information</p>

                <h2 class="section-title">
                    Start a conversation.
                </h2>
            </div>

            <div class="stack">
                <a href="mailto:your.email@example.com">
                    your.email@example.com
                </a>

                <a href="https://github.com/YOUR_USERNAME">
                    github.com/YOUR_USERNAME
                </a>

                <a href="https://linkedin.com/in/YOUR_PROFILE">
                    LinkedIn profile
                </a>
            </div>

            <p>
                France · Open to AI engineering opportunities
            </p>
        </aside>

        <form
            class="contact-form stack-lg reveal"
            action="handlers/contact-handler.php"
            method="post"
        >
            <div class="form-group">
                <label class="form-label" for="name">
                    Full name
                </label>

                <input
                    class="form-control"
                    id="name"
                    name="name"
                    type="text"
                    required
                >
            </div>

            <div class="form-group">
                <label class="form-label" for="email">
                    Email address
                </label>

                <input
                    class="form-control"
                    id="email"
                    name="email"
                    type="email"
                    required
                >
            </div>

            <div class="form-group">
                <label class="form-label" for="message">
                    Message
                </label>

                <textarea
                    class="form-control"
                    id="message"
                    name="message"
                    required
                ></textarea>
            </div>

            <button class="button button-primary" type="submit">
                Send message
            </button>
        </form>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
