# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers, and technical interviewers evaluating Yeswanth Arasavalli for **full-time Data Analyst, Data Scientist, or ML Engineer roles**. Visitors typically spend minutes on the site and decide whether to remember the candidate, open the resume, or reach out. The candidate is based in Hyderabad, India, and openly states availability for full-time positions.

Freelance/consulting visitors are explicitly **not** a target audience — the README's "Services" framing is stale residue and was confirmed out of scope.

## Product Purpose

A personal portfolio that presents selected data projects as case studies — context, approach, decisions, outcomes — so a visitor can judge real working ability rather than reading a claims list. Success = the visitor trusts the work enough to contact the candidate or open the resume. The stated emphasis is "clarity, execution, and practical impact, not buzzwords."

## Positioning

The differentiator is **honest documentation of how the work was actually done**: each project shows the problem, the decisions taken, and measurable results, documented truthfully — including absences and limits. It is deliberately not a breadth-or-skills boast; the portfolio reads as a work record, not a marketing page. Fabricated social proof, inflated claims, and certificate imagery are rejected as a matter of product principle.

## Operating Context

- Live at https://yeswantharasavalli.me, served as a static client-rendered SPA from GitHub Pages.
- SPA deep-link refreshes depend on the `public/404.html` handshake (GitHub Pages has no server-side rewrites).
- All project content is driven by a single typed array in `src/data/projects.ts`; `ProjectDetail.tsx` routes by `slug`.
- The resume PDF (`public/Yeswanth_Arasavalli_Resume.pdf`) is the factual source of truth; every site claim and external link must stay consistent with it.
- Project evidence images live under `public/projects/<folder>/` and are referenced by absolute path.

## Capabilities and Constraints

- Routes: `/`, `/projects`, `/projects/:slug`, `/experience`, `/sql`, `/about`, `/contact`. There is **no Services page and no Blog/Notes page**, and they are not planned — future work must not treat the README's mentions as commitments.
- Certifications are listed as text with official exam codes (e.g., DP-600); **no certificate images or verification links** — this is a binding convention for this role-targeted portfolio.
- Honesty rule: no invented testimonials, customers, benchmarks, or metrics; claims must trace to the resume or project data.
- Canonical LinkedIn slug: `yeswantharasavalli` (single source of truth).
- Known template residue (tolerated, not authoritative): unused shadcn components (`button`, `badge`, `separator`, `skeleton`, `tabs`), a `QueryClientProvider` with no queries, and gtag calls that are inert while `index.html` carries the `G-XXXXXXXXXX` placeholder ID.
- `public/og-image.png` is referenced by OG/Twitter meta but absent.
- `tsconfig.app.json` has `strict: false`, so the compiler does not catch excess properties or unused imports; lint output is not proof of type safety.
- Undecided product facts: none newly raised; the README's Services/Blog sections were resolved as out of scope.

## Brand Commitments

- Name and identity: **Yeswanth Arasavalli** — personal brand, not a company.
- Voice: plain, evidence-first, no buzzwords (the README's own wording, confirmed as binding).
- Contact posture on the site: "Open to full-time roles · Hyderabad, India."

## Evidence on Hand

- Four documented project case studies with real screenshots and outcome metrics: `src/data/projects.ts` with image folders `public/projects/amazon_food/`, `prep_os/`, `retail_image/`, `sree_frame/` (plus the ML monitoring and AI hiring-intelligence entries).
- Three real data internships with verifiable metrics (Postulate IRT, Edunet Foundation, PHN Technology).
- Resume PDF in `public/`; Microsoft Fabric Analytics Engineer Associate (DP-600) and Google certifications listed as text entries in `src/pages/Experience.tsx`.
- A SQL showcase page (`/sql`) with real queries.
- **Absent — must not be fabricated:** testimonials, client logos, press coverage, employer endorsements, usage numbers, pricing.

## Product Principles

1. Document the work as it happened — decisions and limits are part of the story, not weaknesses to hide.
2. Every claim on the site must be traceable to the resume, the project data, or a real artifact.
3. Optimize for the minutes a recruiter actually spends: scannable proof first, depth one click away.
4. The site is a record of a working data professional; it should feel like a well-kept portfolio, not an ad.
5. Consistency with the resume beats any local improvement — links, titles, and metrics must agree everywhere.
