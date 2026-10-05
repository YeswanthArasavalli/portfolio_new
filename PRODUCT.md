# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers, and technical interviewers evaluating Yeswanth Arasavalli for **full-time Data Analyst, Data Scientist, and ML Engineer roles**. Visitors typically spend minutes on the site and decide whether to remember the candidate, open the resume, or reach out. The candidate is based in Hyderabad, India, and openly states availability for full-time positions.

Freelance/consulting is **not** the primary positioning. (Freelance work appears only as an honest employment entry — Telus International — on the Experience page, not as an offered service.)

A recruiter should quickly understand: who the candidate is, what roles he targets, what he has actually worked on, how he approaches technical problems, what evidence exists, what is public vs private, and how to contact him.

## Product Purpose

A personal portfolio that presents selected data projects as case studies — problem, approach, technical decisions, implementation, measurable outcome where evidence exists, and limitations — so a visitor can judge real working ability rather than read a claims list. It should read like a record of actual work, not an advertisement or an AI-generated marketing page.

**Success = a recruiter quickly understands the candidate, trusts the work, explores the evidence, can open the current resume, and has a clear path to contact.** Optimize for **clarity → evidence → trust → contact/interview interest**, not vanity metrics or visual novelty. Because the current revised resume is present, opening the resume is a valid conversion action.

## Positioning

The differentiator is the way the work is documented, not a breadth-of-skills boast:

> **Every project is a real problem with documented decisions and honest outcomes — the portfolio reads like work, not coursework.**

This covers problem, approach, technical decisions, implementation, measurable outcome where evidence exists, limitations, and honest disclosure when evidence or source code is private. Do not replace this with a "full data stack" / "broad skills" framing, and do not turn it into marketing language.

## Operating Context

- Live at https://yeswantharasavalli.me, served as a static client-rendered SPA from GitHub Pages.
- SPA deep-link refreshes depend on the `public/404.html` handshake (paired with the redirect script in `index.html`); GitHub Pages has no server-side rewrites.
- All project content is driven by a single typed array in `src/data/projects.ts`; `ProjectDetail.tsx` routes by `slug`. Each project carries an explicit `repoState` (`public` | `private` | `in-development`), `codeUrl` only for a verified public repo, `demoUrl` only for a publicly reachable (no-login-wall) demo, and honest `repoNote` / `demoNote` fields.
- Career timeline and profile facts are documented per the source-of-truth hierarchy below.

### Source-of-truth hierarchy

- **Resume = factual career/profile source of truth.** The current revised resume at `public/Yeswanth_Arasavalli_Resume.pdf` is authoritative for employment history, education, skills, project names, dates, certifications, and career timeline. It is the working resume, not a prior version.
- **Project artifacts = technical/project evidence.** A resume claim must not be treated as proof of a project metric. Project-specific technical claims must be backed by real project artifacts/evidence where available. Both layers must remain consistent.

## Capabilities and Constraints

- **Routes that actually exist:** `/`, `/projects`, `/projects/:slug`, `/experience`, `/sql`, `/about`, `/contact`, plus a `*` NotFound. There is **no Services page and no Blog/Notes page**, and none is planned — the old README references to Services and Blog/Notes are stale and must NOT become future feature requirements.
- **Certification display convention (binding):** certifications are displayed as concise text entries with official certification/exam names and codes where applicable. Genuine official verification links may be provided when available. Certificate images are not used. Do not add verification links merely for decoration or when no authoritative verification destination exists. The four legitimate `verifyUrl` entries currently rendered in `Experience.tsx` (DP-600, Google Advanced Data Analytics, Google Data Analytics, Johns Hopkins specialisation) are compliant with this convention and must be preserved; do not add new certification links, and do not redesign the certification section.
- **Career distinction (binding):** the site must keep internships, freelance, and independent/personal projects separate. `Experience.tsx` labels each role by `type` (Internship / Freelance) and explicitly states that the larger systems on the Projects page are independent work, listed separately rather than presented as employment. Never merge independent projects into employment or fabricate full-time roles to make the timeline look continuous.
- **Private-repository policy (binding):** private source code is acceptable. Do not force unfinished, proprietary, or actively developed projects public just to boost credibility. Legitimate evidence — real screenshots, architecture diagrams, technical explanations, benchmarks, experiment results, test output, dashboards, demos, sanitized evidence — may be used only when those artifacts genuinely exist. Never fabricate evidence to compensate for a private repo, and never display a dead GitHub URL because a project "should" have one.
- **Sreejita provenance (binding):** the Sreejita project is explicitly disclosed as a fork/extension of the open-source `sreejitadatalabs/sreejita-framework`. Preserve this honest provenance statement. Do not manipulate Git history, hide the fork, or imply the repository history independently proves ownership beyond the actual contribution.
- **Honesty rule:** no invented testimonials, customers, benchmarks, users, revenue, production usage, endorsements, client logos, press, usage numbers, pricing, or deployment scale. Claims must trace to the resume, project data, or a real artifact.
- **Canonical LinkedIn slug:** `yeswantharasavalli` (single source of truth, reflected in `index.html` JSON-LD `sameAs`). GitHub handle: `YeswanthArasavalli`. Contact email: `maneswararasavalli@gmail.com`.
- **Build/compile config (verified current):** `tsconfig.app.json` uses `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`. Earlier "strict:false" and inert-GA/placeholder-image findings are resolved and are no longer current constraints.

## Brand Commitments

- Name and identity: **Yeswanth Arasavalli** — personal brand, not a company.
- Contact posture on the site: "Open to full-time roles · Hyderabad, India."
- **Human-writing principle (binding):** the portfolio should sound like a technically competent person describing their own work, not AI-generated marketing copy. Prefer concrete description of what was built, why, how it works, what changed, what was measured, and what remains limited. Avoid empty intensifiers: *passionate about, results-driven, cutting-edge, revolutionary, transformative, next-generation, seamless, robust, "production-grade" when unsupported, "decision intelligence" as marketing, "end-to-end" when it adds nothing.* Future design work must not introduce marketing-heavy copy.

## Evidence on Hand

**Projects (7 entries in `src/data/projects.ts`), by evidence class — not all projects have the same level of proof:**

- *Public repo + public demo, real screenshots:* **Amazon Food Reviews Sentiment Analysis** — repo `github.com/YeswanthArasavalli/amazon-food-review-sentiment-analysis`, Hugging Face Space demo (`demoNote`: may sleep / ~1-min cold-start, not to be presented as always-on), 5 screenshots in `public/projects/amazon_food/`.
- *Public repo, screenshots, no live demo:* **Retail Product Image Recognition** — repo `github.com/YeswanthArasavalli/retail-product-image-recognition`, 4 screenshots in `public/projects/retail_image/`; the login-walled Streamlit app is intentionally NOT exposed as a public demo (`demoUrl` undefined). Metrics tie to project evidence.
- *Private source, public verified demo, real screenshots:* **Preparation Operating System (PrepOS)** — public demo `https://prepos.vercel.app`, source private while in active development, 8 screenshots in `public/projects/prep_os/`; copy clearly distinguishes public demo from private source.
- *Private, fork provenance disclosed, real screenshots:* **Sreejita Framework** — 5 screenshots in `public/projects/sree_frame/`; no public repo link (removed for provenance honesty); `repoNote` discloses the fork of `sreejitadatalabs/sreejita-framework`. Preserve the provenance disclosure.
- *Private, currently no attached image evidence:* **ML Monitoring Platform** (`repoState` private / under active development), **AI Hiring Intelligence** (private, walkthrough on request), and **Predictive Maintenance** (private, results presented as personal experiments). For these three, `images` is empty in the repo: they rest on the written case study plus an honest "walkthrough / results available on request" note. Do NOT imply public source availability and do NOT describe them as having architecture-diagram images until such images actually exist in the repo.

**Career evidence (`src/pages/Experience.tsx`):**

- Employment entries: 3 internships (Postulate IRT — Data Science Intern; Edunet Foundation — Data Analyst Intern; PHN Technology — Data Science Intern) with concrete metrics, plus 1 freelance role (Telus International — AI Data Annotation Specialist & Prompt Engineer), each typed and kept separate from independent projects.
- Education: M.S. Computer Science — Big Data Analytics, Central University of Rajasthan (2021–2023); B.S. Computer Science, Adikavi Nannaya University (2018–2021).
- Certifications (7, text entries in `Experience.tsx`): Microsoft Fabric Analytics Engineer Associate (DP-600), Google Advanced Data Analytics, Google Data Analytics, Johns Hopkins Data Science Specialisation, Machine Learning/AI Engineer (Skillsoft & Infosys Springboard), MongoDB Python Developer Associate, Microsoft Power BI. Four carry genuine official verification links; three have none, which is honest per the convention.
- A SQL showcase page (`/sql`) with real queries.

**Assets present:** `public/Yeswanth_Arasavalli_Resume.pdf` (current revised resume), `public/og-image.png` (real 1200×630), `favicon.ico` / `favicon-32x32.png` / `apple-touch-icon.png`, `public/404.html`.

**Absent — must not be fabricated:** testimonials, client logos, press coverage, employer endorsements, users, revenue, deployment scale, pricing, and any evidence for the three image-less private projects beyond what genuinely exists.

## Product Principles

1. Document the work as it happened — decisions, limits, and honest private-source disclosure are part of the story, not weaknesses to hide.
2. Evidence must match its real class: screenshots vs architecture diagrams vs experiments vs public/private repo are never conflated, and a resume claim is never used as proof of a project metric.
3. Optimize for the minutes a recruiter spends: clarity → evidence → trust → contact, scannable proof first, depth one click away.
4. Sound like a person describing their own work, never like marketing copy.
5. Consistency across the site, the resume, and project data beats any local improvement — links, titles, dates, and metrics must agree everywhere.
