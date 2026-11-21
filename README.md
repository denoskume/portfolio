# Denos Kume — Engineering Portfolio

**Repository:** https://github.com/denoskume/portfolio

**Public website (after initial Pages activation):** https://denoskume.github.io/portfolio/

To activate the website once, open **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**, then use **Actions → Deploy standalone portfolio → Run workflow**. The workflow validates the source on every push and deploys automatically as soon as GitHub Pages is configured.

A modern portfolio presenting verified engineering work in **Computer Vision**, **Image Processing**, and **Applied Machine Learning**. This is a dedicated website repository, not a copy of the academic lab repository.

## Explore

- **Home** — cinematic full-width featured projects, automatic five-second right-to-left carousel, manual controls and pause.
- **Projects** — 10 searchable and filterable case studies, each with the challenge, method, results, limitations, figures, code snapshot and original notebook.
- **Research** — research questions and work in progress, including industrial predictive maintenance.
- **Blog** — technical field notes with full article pages.
- **Contact** — interactive form with validation and fallback to email.
- **Interactive case studies** — camera calibration and fluoroscopy review interfaces, plus Python/OpenCV workspaces for experiments on user or reference images.

Product details include fixed horizontal navigation, responsive layouts, dark theme, keyboard search, accessible image lightbox, review notes and CSV/JSON/PNG exports.

All original code, laboratory datasets and experimental figures stay in their source repositories. Case-study evidence is loaded from their official GitHub files. No per-project HTML pages are needed.

## Local development

```bash
python -m http.server 8000
```

Then open http://localhost:8000/. Browser computation downloads the Python/OpenCV runtime on first use; contact relay may require initial recipient activation.

## Structure

```text
index.html               Semantic shell, horizontal navigation
styles.css / atelier.css  Responsive design system
content.js               Project, research and article content
app.js                   Routes, filters, search, carousel, contact
lab/workspace.js         Interactive experiment UI
lab/worker.js            Background browser worker
lab/compute.py           Reproducible computation kernels
.github/workflows/pages.yml  GitHub Pages CI/CD
```

Update `content.js` to add a new case study. Link the canonical repository and notebook, and use real figures and measured results.

## License and attribution

The original code of this standalone portfolio website is released under the [MIT License](LICENSE) (© 2026 Denos Kume).

**Scope:** This software license does not cover third-party photographs, images, video, fonts, external dependencies, supplied academic datasets or annotations, or jointly authored source-project content. Such materials retain their respective rights. See [Licensing and content rights](LICENSING.md) for the scope and the fluoroscopy case study.

© 2026 Denos Kume.
