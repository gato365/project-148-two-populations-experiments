# STAT 252 — In-Class Experiments

Three 10-minute, real-time experiments for teaching statistical inference, with a complete data pipeline from student phones to a class-ready Word document.

## What's in here

| File | What it is |
|---|---|
| `index.html` | Single-page student app. Hosted on GitHub Pages. Students pick an experiment, complete it, submit. |
| `Code.gs` | Google Apps Script backend. Receives POSTs, writes to your Google Sheet. |
| `experiments_report.qmd` | One parameterized Quarto file. Pulls all three experiments from the Sheet, runs inference, renders to `.docx`. |
| `SETUP.md` | One-time setup walkthrough. ~15 minutes. |

## The three experiments

| # | Inference type | Experiment | Why it works in 10 minutes |
|---|---|---|---|
| 1 | Two means (independent) | **Reaction time** with music vs. silence (random assignment via the app) | 5-trial tap test, ~90 seconds per student |
| 2 | Paired t | **Memory recall** before vs. after learning the chunking trick | Two 8-second memorize-and-recall rounds |
| 3 | Two proportions | **Framing effect** on a medical recommendation (positive vs. negative frame, random assignment) | One scenario, one yes/no tap |

Each experiment maps cleanly onto the conceptual checklist: population, sample, observational unit, variable types, hypotheses, parameter, point estimate, test statistic, p-value, confidence interval, and what 0 in/out of the CI means.

## Day-of-class flow

1. **Share the URL** (your GitHub Pages link) and the **session code** for the day.
2. Students submit on phones. Data lands in the Sheet in real time.
3. Render `experiments_report.qmd` → `experiments_report.docx`.
4. Project the docx, walk through the analysis with the class.

## Setup

See [`SETUP.md`](SETUP.md). One-time, ~15 min.
