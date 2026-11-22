# Denos Kume — Engineering Portfolio

**Repository:** https://github.com/denoskume/portfolio

**Public website:** https://denoskume.github.io/portfolio/

GitHub Actions validates and publishes the site whenever changes are pushed to `main`.

A modern portfolio presenting verified engineering work in **Computer Vision**, **Image Processing**, and **Applied Machine Learning**. This is a dedicated website repository, not a copy of the academic lab repository.

## Explore

- **Home** — cinematic full-width featured projects, automatic five-second right-to-left carousel, manual controls and pause.
- **Projects** — seven detailed case studies with image-led cards, **Explore Project** actions and the same **Report · Figures · Metrics** navigation. Every report explains the context, objectives, approach and results, and provides scholarly citations or source-code evidence where relevant.
- **Research** — research questions and work in progress, including industrial predictive maintenance.
- **Blog** — technical field notes with full article pages.
- **Contact** — interactive form with validation and fallback to email.
- **Source-backed reports** — Microcatheter Segmentation, Camera Calibration, CLAP Zero-Shot Audio, Flag Intelligence, Python CardGame, MonStage and VisionLab. Each has a direct route, figures, measured results or verified feature tables, references and a downloadable PDF.

Product details include fixed horizontal navigation, responsive layouts, dark theme, keyboard search, accessible image lightbox, review notes and CSV/JSON/PNG exports.

All original code, laboratory datasets and experimental figures stay in their source repositories. Case-study evidence is loaded from their official GitHub files. No per-project HTML pages are needed.

## Project case studies

| Project | Source | Main evidence |
| --- | --- | --- |
| Microcatheter Segmentation | [Background-Subtraction-Fluoroscopy](https://github.com/denoskume/Background-Subtraction-Fluoroscopy) | Annotated masks, overlap metrics and reconstructions |
| Camera Calibration | [camera-calibration](https://github.com/denoskume/camera-calibration) | Chessboard views and reprojection results |
| CLAP Zero-Shot Audio | [CLAP-Zero-Shot-Audio-Classification](https://github.com/denoskume/CLAP-Zero-Shot-Audio-Classification) | Prompt comparison, ESC-50 and Top-k accuracy |
| Flag Intelligence | [Flag-Intelligence](https://github.com/denoskume/Flag-Intelligence) | Recognition workflow and real-world challenge scores |
| Python CardGame | [Python-CardGame](https://github.com/denoskume/Python-CardGame) | V2 interface, state machine and verification results |
| MonStage | [monstage](https://github.com/denoskume/monstage) | Sanitized interface and documented application workflow |
| VisionLab | [VisionLab](https://github.com/denoskume/VisionLab) | 29 operations, V2 tests and reproducible benchmarks |

The public MonStage screenshot is sanitized and the application requires authorization. VisionLab V2 measurements refer to the repository validation, not a new live-production performance claim.

## Local development

```bash
python -m http.server 8000
```

Then open http://localhost:8000/. Browser computation downloads the Python/OpenCV runtime on first use; contact relay may require initial recipient activation.

## Structure

```text
index.html               Semantic shell, horizontal navigation
styles.css / atelier.css  Responsive design system
content.js               Home, research and article content
scientific-case-studies.js  Shared case-study report renderer
software-case-studies.js    Flag Intelligence, CardGame, MonStage, VisionLab reports
fluoroscopy-case-study.js   Microcatheter Segmentation report
scripts/build_scientific_reports.py  Build seven illustrated PDFs
app.js                   Frontend interactions and shared views
lab/workspace.js         Interactive experiment UI
lab/worker.js            Background browser worker
lab/compute.py           Reproducible computation kernels
.github/workflows/pages.yml  GitHub Pages CI/CD
```

Project cards and permanent links are registered in `index.html`. Research reports are defined in `scientific-case-studies.js` and `software-case-studies.js`, using source-linked figures, measurements and cited references. PDFs are generated from the same report markup in CI.

## License and attribution

The original code of this standalone portfolio website is released under the [MIT License](LICENSE) (© 2026 Denos Kume).

**Scope:** This software license does not cover third-party photographs, images, video, fonts, external dependencies, supplied academic datasets or annotations, or jointly authored source-project content. Such materials retain their respective rights. See [Licensing and content rights](LICENSING.md) for the scope and the fluoroscopy case study.

© 2026 Denos Kume.
