export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  caseStudy: boolean;
  priority: number;
  category: "mlops" | "nlp" | "cv" | "analytics" | "forecasting";
  problem: string;
  approach: string[];
  architecture?: string[];
  dataset?: { source: string; size: string; notes?: string };
  role: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  impact: string[];
  result: string;
  challenges?: string[];
  learnings?: string[];
  // Only set codeUrl for a verified, publicly accessible repository.
  codeUrl?: string;
  // Only set demoUrl for a demo that is publicly reachable (no login wall).
  demoUrl?: string;
  // Honest repository state so a recruiter understands why a GitHub button is or isn't present.
  repoState?: "public" | "private" | "in-development";
  // Short, honest note shown when there is no public repository link.
  repoNote?: string;
  // qualifier for a demo that is hosted but not always-on / not fully public.
  demoNote?: string;
  images: string[];
  imageCaptions?: string[];
  crossLinks?: { label: string; href: string }[];
}

export const projects: Project[] = [

  /* ══════════════════════════════════════════════
     1 — ML MONITORING PLATFORM
  ══════════════════════════════════════════════ */
  {
    slug: "ml-monitoring-platform",
    title: "ML Monitoring & Drift Detection Platform",
    tagline: "MLflow · FastAPI · Evidently · Docker · PostgreSQL · Streamlit",
    summary: "An MLOps stack that covers training, experiment tracking, versioned model registry, containerised REST inference, automated PSI/KS drift detection, and a PostgreSQL-backed Streamlit dashboard.",
    description: "Most ML projects stop at the notebook. This one covers training, versioning, serving and monitoring in a single reproducible Docker stack.",
    caseStudy: true,
    priority: 1,
    category: "mlops",
    problem: "Trained models become unreliable when input distributions shift. Without monitoring, drift is invisible until business metrics degrade. This project builds a complete local MLOps stack with automated drift alerting and full inference audit trail.",
    approach: [
      "Built a Scikit-learn training pipeline with ColumnTransformers for schema-enforced preprocessing. All runs logged to MLflow with parameters, metrics, and artifacts.",
      "The FastAPI inference endpoint loads the registered model by version tag — not a hardcoded path — enabling zero-downtime model swaps via the MLflow registry.",
      "Every prediction request is logged (inputs, outputs, latency) to PostgreSQL, exposing /health and /metrics endpoints for uptime monitoring.",
      "Containerised with Docker so the full five-layer stack (training → registry → API → DB → monitoring) is reproducible with a single docker-compose up.",
      "Evidently compares incoming request batches against the training baseline using PSI and KS-test. Threshold breaches are written to a PostgreSQL alert log.",
      "Streamlit dashboard reads from PostgreSQL to visualise prediction volume, p50/p95 latency, and latest drift report summaries — no direct DB access required during review.",
    ],
    dataset: {
      source: "Tabular structured dataset (classification task)",
      size: "~50K rows · mixed numeric and categorical features",
      notes: "Drift simulation applied via synthetic distribution shift on inference batches to validate alerting thresholds.",
    },
    role: "Full stack — training, serving, monitoring, deployment",
    techStack: ["Python", "MLflow", "FastAPI", "Evidently", "Scikit-learn", "Docker", "PostgreSQL", "Streamlit"],
    metrics: [
      { label: "Stack layers",     value: "5" },
      { label: "Drift methods",    value: "PSI + KS" },
      { label: "Inference",        value: "REST API" },
      { label: "Reproducibility",  value: "Docker" },
    ],
    impact: [
      "Full model lifecycle in one reproducible Docker stack — train, version, serve, monitor",
      "Version-tagged model loading enables clean A/B swap without inference downtime",
      "PostgreSQL prediction logs give a complete inference audit trail for debugging",
      "Automated PSI/KS alerting removes manual model health checks",
    ],
    result: "A containerised MLOps stack that shows the difference between 'model trained' and 'model maintained' — train, version, serve and monitor in one reproducible setup.",
    challenges: [
      "Keeping PSI statistically valid on small batch sizes — added KS-test as a secondary signal to reduce false positives.",
      "Making MLflow registry updates transparent to the inference API without service restarts.",
    ],
    learnings: [
      "Model versioning is as operationally important as model accuracy.",
      "Evidently's report format works as both a human-readable HTML artifact and a machine-parseable alert trigger.",
      "Docker resolves most 'works on my machine' deployment issues before they become production problems.",
    ],
    repoState: "private",
    repoNote: "Private repository — still under active development. Implementation walkthrough and screenshots available on request.",
    images: [],
    imageCaptions: [],
    crossLinks: [
      { label: "SQL Showcase", href: "/sql" },
      { label: "Experience — Postulate IRT", href: "/experience" },
    ],
  },

  /* ══════════════════════════════════════════════
     2 — AI JOB APPLICATION INTELLIGENCE SYSTEM
     (actual: 225 Python files, 51K LOC, 23 test
      files, 144 test functions, local Ollama LLM)
  ══════════════════════════════════════════════ */
  {
    slug: "ai-hiring-intelligence-platform",
    title: "AI Job Application Intelligence System",
    tagline: "Python · Ollama LLM · Streamlit · SQLite · FastAPI · Playwright",
    summary: "A local AI system that tailors resumes to job descriptions using Ollama LLMs, scores ATS alignment across 6 dimensions, estimates shortlist probability, and shows the results in an 8-page analytics dashboard. Runs entirely on my machine with no cloud APIs. Codebase: 225 Python files, ~51K lines.",
    description: "A job-application assistant that combines local-LLM resume tailoring, ATS simulation, semantic matching, skill-gap analysis and career strategy — all running locally, with no API keys or cloud costs.",
    caseStudy: true,
    priority: 2,
    category: "nlp",
    problem: "Job applicants submit resumes without knowing where they fail ATS filters or what skills are missing. This system makes the entire ATS alignment process transparent and actionable — locally, privately, and at zero cost.",
    approach: [
      "JD Processing Engine: cleans noise, extracts required skills, detects sections, and measures JD quality — produces a structured ExtractedJD for downstream scoring.",
      "Resume Tailoring Engine: uses Ollama (local LLM — qwen2.5-coder:3b default) to rewrite resume sections matched to the JD. A Naturalization layer ensures LLM output sounds human-written while preserving ATS keywords.",
      "ATS Scoring Engine: 6-dimension scoring (Keyword Match 30%, Skills Match 25%, Experience Relevance 20%, Role Alignment 10%, Education Fit 5%, Structure 10%) with semantic dampening, nonlinear experience penalty, and transferable skill credits.",
      "Shortlist Probability Engine: heuristic estimator combining ATS score × semantic alignment × skill coverage × experience signals. Outputs probability bands (STRONG MATCH / COMPETITIVE / POSSIBLE / UNLIKELY) with explicit confidence caveats.",
      "Decision Engine: APPLY / MAYBE / IMPROVE decisions. The system never hard-rejects — IMPROVE always comes with specific next steps rather than a rejection.",
      "Intelligence Layer: Skill Gap Analyzer, Strategy Engine (ROI-ranked learning plan), Flow Engine (daily action items), Job Ranker (composite score), and Learning Engine (tracks patterns across all analysed jobs).",
      "8-page Streamlit dashboard, LinkedIn scraper (Playwright with anti-bot mitigation), SQLite WAL-mode storage, CSV/PDF exports — all local, zero cloud dependencies.",
    ],
    role: "Full stack — LLM pipeline, scoring engine, backend, dashboard, testing",
    techStack: ["Python", "Ollama LLM", "Streamlit", "SQLite", "FastAPI", "Playwright", "TF-IDF", "Pydantic v2", "fpdf2"],
    metrics: [
      { label: "Python files",      value: "225" },
      { label: "Lines of code",     value: "~51K" },
      { label: "Test functions",    value: "144" },
      { label: "Dashboard pages",   value: "8" },
    ],
    impact: [
      "Fully local — resumes never leave the machine. No API keys, no cloud costs.",
      "6-dimension ATS scoring with semantic dampening produces explainable, traceable scores",
      "IMPROVE decision mode always provides specific next steps — never a silent rejection",
      "Strategy Engine produces ROI-ranked skill learning plan based on gap frequency across all analysed jobs",
      "SQLite WAL-mode storage with versioned job lifecycle tracking",
    ],
    result: "A working local AI system combining LLM deployment, NLP, rule-based scoring and full-stack development. Because there is no labelled hiring-outcome data, the scores are presented as ATS-alignment estimates, not guarantees.",
    challenges: [
      "LLM output variability between runs — mitigated with output caching and deterministic naturalisation post-processing.",
      "LinkedIn anti-bot mitigation required multiple selector fallbacks and request timing strategies in Playwright.",
      "Transferable skill credit scoring required careful calibration to avoid both over-crediting and under-crediting related skills.",
    ],
    learnings: [
      "Honest system design matters — labelling scores 'ATS alignment estimates' rather than 'ATS scores' is both more accurate and more trustworthy.",
      "Local LLM deployment (Ollama) is a practical, privacy-preserving alternative to cloud APIs for resume-length inputs.",
      "Rule-based scoring is more appropriate than ML-based scoring when you lack labelled hiring outcome data.",
    ],
    repoState: "private",
    repoNote: "Private repository — under active development. The code isn't public yet; architecture and a live walkthrough are available on request.",
    images: [],
    imageCaptions: [],
    crossLinks: [
      { label: "ML Monitoring Platform", href: "/projects/ml-monitoring-platform" },
      { label: "SQL Showcase", href: "/sql" },
    ],
  },

  /* ══════════════════════════════════════════════
     3 — SREEJITA FRAMEWORK
     (actual: 213 Python files, 454 test functions,
      30 test files, 13 domains, 61 core engines,
      Flask REST API, org memory, copilot layer)
  ══════════════════════════════════════════════ */
  {
    slug: "sreejita-framework",
    title: "Sreejita — Domain-Agnostic Analytics & Reporting Framework",
    tagline: "Python · Pandas · Scikit-learn · ReportLab · Streamlit · Flask · SQLite",
    summary: "An analytics framework that takes a raw structured dataset and runs it through data-quality checks, automatic domain detection, KPI computation, root-cause driver analysis and report generation — producing a 10-section executive PDF across 13 business domains. It builds on the open-source sreejitadatalabs/sreejita-framework, which I forked and extended.",
    description: "Sreejita routes a structured dataset through a layered pipeline: data quality → domain detection → KPI computation → driver analysis → composite insights → recommendations → scenario simulation → executive narrative. The output is a 10-section PDF report generated automatically instead of prepared by hand.",
    caseStudy: true,
    priority: 3,
    category: "analytics",
    problem: "One-off analytics scripts per business domain are unmaintainable, inconsistent, and produce outputs that don't reach executives in usable form. Sreejita solves this with a shared capability architecture that enforces data quality, domain-aware KPI computation, and automated executive report generation across any structured dataset.",
    approach: [
      "Data Quality Layer: completeness scoring, column resolver, schema profiler, data trust layer — datasets below minimum quality thresholds are flagged before any analysis runs.",
      "Domain Detection Engine: multi-signal column fingerprinting identifies the business domain (Healthcare, Finance, Retail, HR, Supply Chain, SaaS, Insurance, Real Estate, Ecommerce, Manufacturing, Marketing, Customer Value, Ops — 13 total) from raw column names and value distributions.",
      "KPI Intelligence Engine: domain-specific KPI registries compute 20+ KPIs per domain with trend analysis, anomaly detection (via ml_engine.py KPIForecaster + AnomalyDetector), and confidence scoring.",
      "Driver Graph Engine: intelligence_graph.py links KPIs to business drivers, entities, and root causes. driver_graph_engine.py and entity_driver_engine.py identify which sub-segments (e.g. Category A, Region B, Supplier C) are causing KPI movement.",
      "Composite Insight Engine: cross-KPI pattern detection producing ranked insights with confidence badges, severity levels (RISK / WARNING / STRENGTH / INFO), and supporting evidence.",
      "Recommendation & Scenario Engine: recommendation_derivation_engine.py produces priority-ordered actions with owner, timeline, and expected impact. scenario_simulation_engine.py models alternative scenarios with outcome projections.",
      "Consulting Report Engine (v5.3): 10-section executive PDF — Executive Snapshot, Board Readiness Score, Business Diagnostics (5 health dimensions), KPI table, Visual Evidence with chart annotations, Risk/Opportunity cards, 90-Day Action Plan, Health Scorecard.",
      "Platform Layer (v5.0+): Flask REST API (7 endpoints), OrgMemory (institutional knowledge store), DomainCopilot (evidence-grounded Q&A without LLM), OutcomeTracker (continuous learning from recommendation outcomes).",
    ],
    dataset: {
      source: "Any structured CSV/JSON dataset — domain auto-detected",
      size: "Tested on datasets from 500 to 50K+ rows across 13 business domains",
      notes: "7 sample datasets included covering all major domain types. Each was run through the full flow, including PDF report generation.",
    },
    role: "Full framework — architecture, domain engines, intelligence pipeline, reporting, platform layer, testing",
    techStack: ["Python", "Pandas", "Scikit-learn", "ReportLab", "Matplotlib", "Streamlit", "Flask", "SQLite"],
    metrics: [
      { label: "Test functions",   value: "454" },
      { label: "Python files",     value: "213" },
      { label: "Business domains", value: "13" },
      { label: "Core engines",     value: "61" },
    ],
    impact: [
      "13 business domains (Healthcare, Finance, Retail, HR, Supply Chain, SaaS, Insurance, Real Estate, Ecommerce, Manufacturing, Marketing, Customer Value, Ops) from a single shared architecture",
      "Domain detection eliminates manual domain specification — the framework identifies it from column signatures",
      "10-section executive-style PDF report generated automatically: Executive Snapshot, Board Readiness, 90-Day Action Plan, Health Scorecard",
      "Flask REST API + OrgMemory + DomainCopilot enable platform-level deployment beyond single-user Streamlit",
      "454 test functions across 30 test files enforce correctness at each pipeline stage",
    ],
    result: "An analytics framework that shows software architecture, domain modelling, statistical analysis, automated reporting and a small platform layer in one system — extended from an open-source base I forked.",
    challenges: [
      "Domain detection accuracy: Finance datasets misdetected as Healthcare until a 3-layer fix was applied to the column resolver, detector token sets, and column name case handling.",
      "ReportLab compatibility: hexval() format differences, empty cell handling, and Spacer-in-table bugs required systematic fixes across the PDF rendering layer.",
      "ML guardrails: forecasting on sparse datasets (< 25% non-zero values) required a confidence floor and 500% sanity cap to prevent nonsensical projections.",
    ],
    learnings: [
      "Domain routing via column fingerprinting is more robust than string matching — but requires careful calibration of name vs value signals.",
      "Governance layers (insight_guardrails, insight_quality_engine, executive_quality_filter) are what make automated reports trustworthy enough for executive use.",
      "Platform architecture (API + org memory + copilot) is what separates a framework from a script — even if users only need the Streamlit UI today.",
    ],
    repoState: "private",
    repoNote: "This project builds on the public open-source sreejitadatalabs/sreejita-framework (a fork). My current implementation extends well beyond that fork and is kept private, so I'm showing real output screenshots rather than linking the fork as if it were the whole source. A code walkthrough is available on request.",
    images: [
      "/projects/sree_frame/Sreejita_Dashboard.png",
      "/projects/sree_frame/Healthcare_Domain.png",
      "/projects/sree_frame/Marketing_Domain.png",
      "/projects/sree_frame/Executive_Memo.png",
      "/projects/sree_frame/Root_Cause.png",
    ],
    imageCaptions: [
      "Main dashboard — domain detected from the uploaded dataset, with KPI summary and navigation into each analysis section.",
      "Healthcare domain output — domain-specific KPIs and trend views computed by the KPI engine.",
      "Marketing domain output — KPI table and driver analysis for a marketing dataset.",
      "Executive memo — the generated report section with executive snapshot and recommendations.",
      "Root-cause view — driver graph linking KPI movement to underlying sub-segments.",
    ],
    crossLinks: [
      { label: "SQL Showcase", href: "/sql" },
      { label: "Experience — Edunet Foundation", href: "/experience" },
    ],
  },

  /* ══════════════════════════════════════════════
     4 — RETAIL IMAGE RECOGNITION
  ══════════════════════════════════════════════ */
  {
    slug: "retail-product-image-recognition",
    title: "Retail Product Image Recognition System",
    tagline: "Python · EfficientNet-B0 · PyTorch · MLflow · Streamlit",
    summary: "Computer vision pipeline for retail SKU classification. Fine-tuned EfficientNet-B0 on ~200 categories with mixed-precision training — 84.9% Top-1 accuracy (precision 0.83, recall 0.82), +8.9pp vs ResNet-18 baseline. Experiments tracked in MLflow. Deployed via Streamlit at <200ms CPU latency.",
    description: "Automated SKU classification using transfer learning, experiment tracking, and a deployed inference interface with latency benchmarking.",
    caseStudy: true,
    priority: 4,
    category: "cv",
    problem: "Manual SKU identification at retail scale is error-prone and time-consuming. An automated image classifier reduces labelling overhead and enables faster inventory management workflows.",
    approach: [
      "Fine-tuned EfficientNet-B0 on the RPC retail dataset using mixed-precision GPU training (torch.cuda.amp) and progressive data augmentation.",
      "Tracked all experiments in a local MLflow instance — comparing augmentation strategies and learning rate schedules. Retained the 3 best checkpoints for ensemble evaluation.",
      "Evaluated on Top-1 accuracy (84.9%), precision (0.83), recall (0.82), and F1 — against a ResNet-18 baseline (76% Top-1).",
      "Deployed a Streamlit inference app returning top-3 predictions with confidence scores. Benchmarked at under 200ms median CPU latency with quantised model weights.",
    ],
    dataset: {
      source: "RPC (Retail Product Checkout) dataset",
      size: "~200 SKU categories",
      notes: "Images preprocessed, normalised, and structured for EfficientNet input format. Class-balanced sampling applied.",
    },
    role: "ML Engineer — training, evaluation, experiment tracking, deployment",
    techStack: ["Python", "PyTorch", "EfficientNet-B0", "MLflow", "Streamlit", "NumPy"],
    metrics: [
      { label: "Top-1 accuracy",        value: "84.9%" },
      { label: "Precision / Recall",    value: "0.83 / 0.82" },
      { label: "vs ResNet-18 baseline", value: "+8.9pp" },
      { label: "CPU inference",          value: "<200ms" },
    ],
    impact: [
      "+8.9 percentage point accuracy improvement over ResNet-18 baseline using identical training data",
      "Mixed-precision training reduced GPU memory usage ~40% with no accuracy loss",
      "MLflow experiment tracking gives reproducible checkpoint comparison across runs",
      "Deployed inference app usable by non-ML users without infrastructure knowledge",
    ],
    result: "A CV pipeline with measurable accuracy gains over a baseline, experiment tracking, and a deployed inference app — not just a trained model.",
    challenges: [
      "Visually similar SKUs caused class confusion — resolved with augmentation tuning rather than architecture changes.",
      "CPU inference latency optimisation required weight quantisation (post-training INT8).",
    ],
    learnings: [
      "MLflow experiment tracking is as important as model training for reproducible CV work.",
      "Deployment latency should be benchmarked during training, not discovered post-deployment.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/retail-product-image-recognition",
    repoState: "public",
    // The Streamlit app currently sits behind a login redirect, so it is not a public demo — removed to avoid a broken/misleading "Live Demo".
    demoUrl: undefined,
    images: [
      "/projects/retail_image/ui.png",
      "/projects/retail_image/data.jpg",
      "/projects/retail_image/confuion_matrix.png",
      "/projects/retail_image/Figure_1.png",
    ],
    imageCaptions: [
      "Streamlit inference interface — upload product image, get top-3 SKU predictions with confidence scores",
      "Distribution of retail SKU categories across the RPC dataset",
      "Confusion matrix highlighting per-class prediction patterns for the top-20 most common SKUs",
      "Training and validation accuracy/loss curves across epochs — early stopping applied",
    ],
    crossLinks: [
      { label: "ML Monitoring Platform", href: "/projects/ml-monitoring-platform" },
    ],
  },

  /* ══════════════════════════════════════════════
     5 — PREPARATION OPERATING SYSTEM (PREPOS)
  ══════════════════════════════════════════════ */
  {
    slug: "preparation-operating-system",

    title: "Preparation Operating System (PrepOS)",

    tagline:
      "React · TypeScript · Supabase · PostgreSQL · Tailwind · Vite",

    summary:
      "A full-stack exam-preparation app that tracks readiness across 7 competitive examinations — readiness scoring, adaptive study routing, spaced-repetition revision, mock-test analytics, resource tracking and health/habit logging. It turns a study plan into measurable progress instead of a static to-do list.",

    description:
      "A multi-exam preparation app that combines planning, progress analytics, revision scheduling and mock-test tracking in one interface, backed by a Supabase/PostgreSQL database.",

    caseStudy: true,

    priority: 7,

    category: "analytics",

    problem:
      "Candidates preparing for multiple competitive examinations often struggle with fragmented study plans, inconsistent revision, weak prioritization, poor progress visibility, and lack of objective readiness measurement. Existing tools focus on task management rather than preparation intelligence and decision support.",

    approach: [
      "Designed a multi-exam architecture supporting SSC CGL, SSC CHSL, SSC MTS, RRB NTPC, Coal India MT (IT), UGC NET Computer Science, and UPSC Joint Assistant Director with shared and exam-specific preparation workflows.",

      "Built a Readiness Intelligence Engine combining syllabus completion, mock performance, revision status, PYQ completion, study consistency, and health indicators into unified readiness scores.",

      "Developed an Adaptive Study Routing Engine that dynamically reallocates study time toward weak subjects using performance analytics, readiness scores, and exam priorities.",

      "Implemented an Event Engine capable of automatically adjusting preparation plans when exams are postponed, cleared, failed, or reprioritized.",

      "Created a Revision Command Center using spaced-repetition cycles (1, 3, 7, 15, and 30 days) to reduce revision debt and improve long-term retention.",

      "Integrated health and habit intelligence including sleep consistency, hydration, exercise tracking, wake-up discipline, strength progression, and recovery monitoring.",

      "Built dedicated modules for planning, resource management, mock analytics, exam tracks, weekly reviews, daily execution workflows, and performance intelligence."
    ],

    dataset: {
      source:
        "User-generated preparation, revision, health, mock-test, and performance data",

      size:
        "Multi-exam preparation records, mock results, revision logs, study sessions, resource tracking, and habit analytics",

      notes:
        "Data modeled around readiness scoring, execution consistency, exam progression, revision intelligence, and long-term preparation outcomes."
    },

    role:
      "Full-Stack Engineer & Product Designer — architecture, database design, analytics modeling, workflow automation, dashboard development, and scoring-system design",

    techStack: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "TanStack Query",
      "Vite",
      "PWA"
    ],

    metrics: [
      { label: "Supported Exams", value: "7" },
      { label: "Application Modules", value: "12+" },
      { label: "Subject Tracks", value: "70+" },
      { label: "Readiness Factors", value: "6+" }
    ],

    impact: [
      "Unified preparation workflows across seven competitive examinations within a single execution platform.",

      "Converted static study plans into measurable readiness, execution, revision, and performance metrics.",

      "Implemented readiness scoring models combining syllabus progress, revision status, mock performance, study consistency, and health signals.",

      "Built adaptive study-routing workflows that prioritize high-impact subjects using weakness detection and exam weighting.",

      "Integrated preparation, revision, health tracking, resource management, and performance analytics into a single decision-support system.",

      "Demonstrated full-stack engineering, analytics design, workflow automation, and product-thinking capabilities."
    ],

    result:
      "A working multi-exam preparation app with progress analytics, revision scheduling and habit tracking. The live demo is public; the source is kept private while the project is still being built.",

    challenges: [
      "Balancing preparation priorities across multiple examinations with overlapping and conflicting syllabi.",

      "Designing readiness scores that fairly represent preparation progress across different exam structures.",

      "Preventing revision debt accumulation through automated scheduling and adaptive planning.",

      "Integrating academic performance metrics with behavioral and health indicators without overwhelming users."
    ],

    learnings: [
      "Decision-support systems require measurable execution metrics rather than static task tracking.",

      "Readiness scoring becomes significantly more valuable when combined with revision and consistency signals.",

      "Behavioral data can be as important as academic performance when predicting long-term preparation outcomes.",

      "Workflow automation reduces planning overhead and improves preparation consistency.",

      "Analytics-driven prioritization improves decision quality compared with manual study planning."
    ],

    repoState: "private",
    repoNote: "Public demo, private source — the repository is kept private while the app is still in active development. You can try the live demo; a code walkthrough is available on request.",

    demoUrl:
      "https://prepos.vercel.app",

    images: [
      "/projects/prep_os/dashboard.png",
      "/projects/prep_os/skill_level.png",
      "/projects/prep_os/study_engine.png",
      "/projects/prep_os/mocks_page.png",
      "/projects/prep_os/resources.png",
      "/projects/prep_os/daily_time_table.png",
      "/projects/prep_os/cgl_track.png",
      "/projects/prep_os/login_page.png"
    ],

    imageCaptions: [
      "PrepOS central dashboard showing readiness status, execution priorities, recovery mode detection, and intelligent task recommendations.",

      "Subject Assessment Engine used to evaluate strengths, weaknesses, and learning maturity levels across multiple exam domains.",

      "Study & Revision Intelligence module combining topic tracking, ROI prioritization, spaced repetition, and revision debt monitoring.",

      "Mock Test Analytics dashboard tracking score progression, readiness thresholds, exam targets, and performance benchmarking.",

      "Resource Management System for books, courses, playlists, PDFs, and preparation assets across multiple examinations.",

      "Time-blocked execution planner integrating study sessions, revision schedules, health activities, and productivity tracking.",

      "Exam-specific preparation track with cut-off analysis, readiness targets, scoring strategy, and milestone monitoring.",

      "Authentication and user management system supporting personalized preparation environments."
    ],

    crossLinks: [
      {
        label: "Sreejita Framework",
        href: "/projects/sreejita-framework"
      },
      {
        label: "AI Job Application Intelligence System",
        href: "/projects/ai-hiring-intelligence-platform"
      }
    ]
  },

  /* ══════════════════════════════════════════════
     6 — PREDICTIVE MAINTENANCE
  ══════════════════════════════════════════════ */
  {
    slug: "predictive-maintenance-forecasting",
    title: "Predictive Maintenance — Machine Failure Forecasting",
    tagline: "Python · Scikit-learn · Time-Series Feature Engineering · Cost-Sensitive ML",
    summary: "Reproducible predictive-maintenance system built on NASA C-MAPSS FD004, benchmarking causal RUL estimation and failure-risk classification under engine-grouped validation. The final study showed strong failure-risk performance while demonstrating that a deep sequence model was not scientifically justified by the available evidence.",
    description: "An end-to-end predictive-maintenance research system for forecasting remaining useful life (RUL) and identifying near-term machine failure risk from multivariate turbofan sensor data. The project emphasizes leakage-safe temporal feature engineering, engine-grouped validation, classical ML baselines, cost-sensitive threshold analysis, reproducibility, and honest model selection rather than forcing a deep-learning model when the evidence did not support one.",
    caseStudy: true,
    priority: 5,
    category: "forecasting",

    problem:
      "Industrial equipment degradation can develop gradually before a failure event becomes operationally obvious. The challenge is to estimate remaining useful life and identify machines approaching failure early enough to support maintenance decisions, while avoiding data leakage and excessive false alarms. The project uses NASA C-MAPSS FD004 to build and evaluate a reproducible failure-prediction workflow under realistic engine-level validation.",

    approach: [
      "Audited the NASA C-MAPSS dataset before modelling, including schema integrity, duplicate sensors, operating-regime structure, target construction, and train/test boundaries.",
      "Used FD004 as the primary dataset because it contains six operating regimes and two fault modes, making it a more demanding multivariate degradation setting.",
      "Created an engine-grouped train/validation split with 199 training engines and 50 validation engines, ensuring that observations from the same engine never crossed the split boundary.",
      "Kept the official C-MAPSS test set sealed throughout model development and validation to prevent evaluation leakage.",
      "Built causal time-series features from historical sensor trajectories, including lag/difference, rolling-window, and local-slope features using train-only feature-selection decisions.",
      "Benchmarked naive, linear, Ridge, and Histogram Gradient Boosting approaches for uncapped remaining-useful-life regression.",
      "Benchmarked majority-class, Logistic Regression, and Histogram Gradient Boosting approaches for failure-risk classification at multiple operational-cycle horizons.",
      "Used H30 — 30 operating cycles ahead — as the primary failure-risk horizon, with H14 and H50 used for sensitivity analysis rather than presenting an artificial calendar-time forecast.",
      "Evaluated failure-risk models using recall, precision, F1, PR-AUC, ROC-AUC, confusion matrices, and threshold analysis instead of relying on accuracy under class imbalance.",
      "Evaluated RUL models using MAE, RMSE, R², prognostic score, residual distributions, and end-of-life error analysis.",
      "Compared a classical anchor model against a causal temporal-feature model to determine whether trajectory information materially improved operational decision quality.",
      "Performed cost-sensitive threshold analysis across multiple illustrative false-negative/false-positive cost ratios to test whether model differences translated into robust decision value.",
      "Used bootstrap analysis at the engine level to quantify uncertainty in the difference between the anchor and temporal failure-risk approaches.",
      "Performed a final reproducibility and productionization audit covering dependency locking, Windows execution, scientific artifact integrity, Git provenance, tests, documentation, and public-repository safety.",
      "Built an interactive Streamlit Prediction Lab using frozen validation predictions so recruiters can explore engines, cycles, models, thresholds, RUL predictions, and failure-risk decisions without exposing the official test set or performing uncontrolled live inference."
    ],

    dataset: {
      source: "NASA C-MAPSS Turbofan Engine Degradation Simulation — FD004",
      size: "249 training engines and 248 official test engines; 26 raw columns consisting of engine ID, cycle, 3 operating settings, and 21 sensors",
      notes:
        "FD004 contains six operating regimes and two fault modes. The project uses 249 training engines for development, with a frozen 199/50 engine-grouped train/validation split. The official test set remains sealed and is not used for model selection. RUL is defined in operational cycles, not calendar days."
    },

    role:
      "ML Engineer — time-series feature engineering, predictive modelling, leakage-safe evaluation, cost-sensitive analysis, reproducibility, and ML application design",

    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "SciPy",
      "Scikit-learn",
      "Matplotlib",
      "PyArrow",
      "Joblib",
      "Pytest",
      "Streamlit",
      "Git"
    ],

    metrics: [
      {
        label: "Best RUL MAE",
        value: "31.52 cycles"
      },
      {
        label: "Primary paired RUL MAE",
        value: "31.86 cycles"
      },
      {
        label: "H30 failure-risk F1",
        value: "0.898"
      },
      {
        label: "H30 PR-AUC",
        value: "0.974"
      },
      {
        label: "H30 ROC-AUC",
        value: "0.995"
      },
      {
        label: "Validation engines",
        value: "50"
      },
      {
        label: "Scientific tests",
        value: "147 passed"
      },
      {
        label: "Official test set",
        value: "Sealed"
      }
    ],

    impact: [
      "Established a leakage-safe predictive-maintenance workflow with engine-grouped validation and train-only preprocessing.",
      "Achieved 31.86-cycle MAE for the primary paired causal temporal RUL model, with the best-MAE W3 temporal configuration reaching 31.52 cycles.",
      "Achieved 0.898 F1, 0.974 PR-AUC, and 0.995 ROC-AUC for the primary H30 temporal failure-risk evaluation at the default 0.50 threshold.",
      "Demonstrated that the historical 87% accuracy claim was not evidence of predictive performance because a majority-class baseline achieved approximately the same accuracy while detecting no failures.",
      "Showed that causal temporal features reduced false-alarm runs substantially in validation, while also increasing some false-negative rows — making the trade-off explicit rather than hiding it behind a single metric.",
      "Used cost-sensitive and engine-level analysis to determine whether temporal features created robust operational decision value across different false-negative cost assumptions.",
      "Established evidence-based model selection: the available validation evidence did not justify escalation to an LSTM or other sequence model.",
      "Converted the research workflow into a public, reproducible GitHub project with a deterministic Streamlit demonstration over frozen validation artifacts."
    ],

    result:
      "A research-grade predictive-maintenance system that estimates remaining useful life and failure risk from multivariate engine telemetry while prioritising leakage prevention, causal temporal features, operationally relevant metrics, uncertainty, and reproducibility. The final model-selection decision was evidence-driven: classical machine-learning methods were retained because the validation study did not demonstrate an unresolved problem that justified a neural sequence model.",

    challenges: [
      "C-MAPSS FD004 contains multiple operating regimes, creating a strong regime-related modelling confound that had to be explicitly analysed.",
      "Random row-level splitting would leak information between observations from the same engine, so validation was performed at the engine-group level.",
      "Failure-risk labels are imbalanced, making raw accuracy misleading; recall, precision, F1, PR-AUC, and cost-sensitive threshold analysis were therefore prioritised.",
      "RUL predictions exhibited regression-to-the-mean behaviour, including overprediction for shorter-lived engines and underprediction for longer-lived engines.",
      "Temporal features reduced false-alarm behaviour but did not uniformly dominate the anchor model across all cost assumptions.",
      "The initial portfolio claims of 87% accuracy, a two-week forecast horizon, and approximately $1.15M/year in savings could not be scientifically supported and were removed from the final project.",
      "Reproducibility required additional engineering beyond modelling, including exact dependency locking, Windows-compatible gate execution, Git provenance, documentation, and protected-artifact verification."
    ],

    learnings: [
      "A high accuracy number can be meaningless for imbalanced failure prediction when the majority-class baseline achieves similar accuracy with zero failure recall.",
      "Validation must respect the unit of independence: for equipment telemetry, engine-level grouping is more defensible than random row-level splitting.",
      "Operational horizons should match the dataset's actual time representation. C-MAPSS uses operating cycles, so claiming a calendar-time horizon such as 'two weeks' without a conversion basis is not defensible.",
      "Causal temporal features can add useful trajectory information without automatically requiring a recurrent or transformer-based architecture.",
      "Model complexity should be earned by evidence. A neural sequence model should not be introduced simply because the project is a time-series problem.",
      "Failure prediction should be evaluated as a decision problem, where false negatives and false positives can have different operational costs.",
      "Engine-level bootstrap analysis provides a more meaningful view of uncertainty than treating every time-series row as an independent observation.",
      "Reproducibility is part of the ML system: pinned dependencies, deterministic preprocessing, protected artifacts, tests, documentation, and Git provenance are as important as the model itself.",
      "A credible ML project should explicitly retire unsupported claims instead of preserving impressive-looking metrics that cannot be reproduced."
    ],

    codeUrl: undefined,

    repoState: "public",

    repoNote:
      "Public GitHub repository with the validated research pipeline, reproducibility documentation, tests, frozen validation artifacts, and interactive Streamlit demonstration. The official C-MAPSS test labels and NASA raw dataset files are not redistributed. The Streamlit demo operates only on frozen validation predictions and does not expose official test-set results.",

    images: [],

    imageCaptions: [],

    crossLinks: [
      {
        label: "ML Monitoring Platform",
        href: "/projects/ml-monitoring-platform"
      }
    ],
  },

  /* ══════════════════════════════════════════════
     7 - AMAZON FOOD REVIEWS SENTIMENT ANALYSIS
  ══════════════════════════════════════════════ */
  {
    slug: "amazon-food-reviews-sentiment-analysis",
    title: "Amazon Food Reviews Sentiment Analysis",

    tagline:
      "Python · DistilBERT · PyTorch · Hugging Face · Gradio · NLP",

    summary:
      "NLP pipeline for sentiment classification on 568K+ Amazon food reviews. Built a TF-IDF + Logistic Regression baseline (~89% accuracy) and fine-tuned DistilBERT to reach ~94% accuracy. Deployed via Gradio on Hugging Face Spaces.",

    description:
      "Automated customer sentiment analysis using transformer-based NLP. The system processes large volumes of review text, compares classical machine learning against modern transformer architectures, and delivers real-time sentiment predictions through a deployed web interface.",

    caseStudy: true,

    priority: 6,

    category: "nlp",

    problem:
      "Large e-commerce platforms receive massive volumes of customer reviews daily, making manual sentiment analysis slow, inconsistent, and difficult to scale. Automating sentiment detection enables faster customer insight generation, review monitoring, and data-driven product decisions.",

    approach: [
      "Preprocessed and cleaned 568K+ Amazon food reviews, mapping ratings 1–2 to negative sentiment and ratings 4–5 to positive sentiment while removing neutral reviews.",

      "Built a TF-IDF + Logistic Regression baseline model achieving approximately 89% accuracy to establish an interpretable benchmark before applying deep learning methods.",

      "Fine-tuned DistilBERT using transfer learning and GPU acceleration, improving contextual understanding of customer feedback and increasing accuracy to approximately 94%.",

      "Evaluated performance using accuracy, F1-score, ROC curves, and confusion matrices to compare baseline and transformer-based approaches.",

      "Deployed a Gradio-based inference application on Hugging Face Spaces, enabling real-time sentiment predictions through a web interface.",
    ],

    dataset: {
      source: "Amazon Fine Food Reviews Dataset (Kaggle)",
      size: "568K+ customer reviews",
      notes:
        "Binary sentiment dataset derived from review ratings. Neutral reviews removed to reduce label ambiguity and improve classification consistency.",
    },

    role:
      "Machine Learning Engineer (NLP) — owned the complete lifecycle including preprocessing, feature engineering, model training, evaluation, deployment, and documentation.",

    techStack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "Scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "Gradio",
      "Pandas",
    ],

    metrics: [
      { label: "DistilBERT Accuracy", value: "~94%" },
      { label: "Baseline Accuracy", value: "~89%" },
      { label: "Accuracy Improvement", value: "+5pp" },
      { label: "Inference Latency", value: "<300ms" },
    ],

    impact: [
      "Improved sentiment classification accuracy by approximately 5 percentage points over the classical TF-IDF baseline.",

      "Automated analysis of large-scale customer feedback, reducing manual review processing effort and enabling faster insight generation.",

      "Delivered a real-time sentiment prediction interface accessible to non-technical users through a web browser.",

      "Demonstrated the practical advantages of transformer-based NLP models over traditional machine learning approaches for contextual sentiment understanding.",
    ],

    result:
      "A sentiment-classification pipeline that compares a classical TF-IDF baseline against a fine-tuned DistilBERT, with a hosted demo for real-time predictions.",

    challenges: [
      "Class imbalance and review-length variability required careful preprocessing and evaluation beyond simple accuracy metrics.",

      "Balancing model accuracy with deployment efficiency required selecting DistilBERT over larger transformer architectures.",

      "Large dataset size increased training time and required GPU optimization for practical experimentation.",
    ],

    learnings: [
      "Transformer models significantly outperform classical NLP methods when contextual understanding is important.",

      "Strong baselines are essential for measuring real-world model improvements.",

      "Model deployment, latency, and usability are as important as predictive performance.",

      "Business framing helps translate technical NLP work into measurable organizational value.",
    ],

    codeUrl:
      "https://github.com/YeswanthArasavalli/amazon-food-review-sentiment-analysis",
    repoState: "public",

    demoUrl:
      "https://huggingface.co/spaces/YeswanthArasavalli/Amazon_Food_Review_Analysis",
    demoNote: "Hosted on Hugging Face Spaces — may be sleeping and takes ~1 minute to cold-start.",

    images: [
      "/projects/amazon_food/a_dash.png",
      "/projects/amazon_food/word.jpg",
      "/projects/amazon_food/roc.png",
      "/projects/amazon_food/confusion.png",
      "/projects/amazon_food/accuracy.png",
    ],

    imageCaptions: [
      "Gradio inference interface — enter a review text and get a sentiment prediction from the fine-tuned DistilBERT model.",

      "Word cloud highlighting frequently occurring terms across customer review text.",

      "ROC curve comparing model discrimination performance across sentiment classes.",

      "Confusion matrix illustrating classification performance on the evaluation dataset.",

      "Performance comparison between TF-IDF + Logistic Regression baseline and fine-tuned DistilBERT.",
    ],

    crossLinks: [
      {
        label: "Retail Product Image Recognition System",
        href: "/projects/retail-product-image-recognition",
      },
    ],
  },

  /* ══════════════════════════════════════════════
     8 — ORDER INTELLIGENCE PLATFORM (OIP)
     Public repo + hosted synthetic dashboard.
     Streaming architecture is implemented and
     verified locally, NOT deployed as a live stack.
  ══════════════════════════════════════════════ */
  {
    slug: "order-intelligence-platform",
    title: "Order Intelligence Platform",
    tagline:
      "Python · Kafka (KRaft) · Spark Structured Streaming · Avro · MinIO · PostgreSQL · Redis · Streamlit",
    summary:
      "An e-commerce order and revenue analytics platform that turns order-lifecycle events into currency-aware revenue and product metrics. The public dashboard runs on clearly-labelled synthetic data; the broader Kafka → Spark → Bronze/Silver/Gold pipeline is implemented and verified locally in the repository, not deployed as a live streaming stack.",
    description:
      "Order events are not directly useful for business reporting until lifecycle state, payments, refunds, cancellations, currency and aggregation rules are handled consistently. This platform organises those concerns into a medallion data pipeline and an analytics dashboard. The hosted demo shows the dashboard over a fixed synthetic sample; the streaming architecture behind it was built and tested phase-by-phase in a local Docker Compose environment.",
    caseStudy: true,
    priority: 8,
    category: "analytics",
    problem:
      "Raw e-commerce order events do not give a reliable view of business performance. Revenue has to be recognised at the right lifecycle step, refunds and cancellations have to be netted correctly, INR and USD must never be summed together, and bad or duplicate events must be quarantined rather than silently aggregated. The goal was an analytics pipeline that answers net revenue, order volume, average order value, product and regional performance, refund/cancellation impact and data-quality health — with the correctness rules enforced in code rather than assumed.",
    approach: [
      "Modelled the order lifecycle (created → paid → shipped → delivered, with cancellation/refund branches) and defined net revenue as paid amount minus refunds minus paid cancellations, recognising revenue at ORDER_PAID rather than ORDER_CREATED.",
      "Transported events through Apache Kafka in KRaft mode with Avro serialisation enforced by a Confluent Schema Registry, so producers and consumers share an explicit schema contract.",
      "Processed the stream with Spark Structured Streaming into a MinIO-backed medallion lake: Bronze for raw append-only events, Silver for validated/deduplicated records, Gold for committed business aggregates.",
      "Built a data-quality gate defined as an explicit contract of 21 checks, with source-coordinate replay handling and rejected records routed to a dead-letter path. The DQ/DLQ path is documented as at-least-once — no end-to-end exactly-once guarantee is claimed.",
      "Served Gold aggregates into an additive PostgreSQL schema as the analytical source of truth, fronted by a rebuildable Redis cache derived only from PostgreSQL (Redis is a delivery layer, never the source of truth).",
      "Rendered a Streamlit + Plotly dashboard with currency-separated views, KPI cards, revenue charts, filters, product/revenue tables and provenance labels — keeping monetary values as exact Decimals internally and rounding only for display.",
      "Added one-shot, currency-aware rule-based alert evaluation persisted in PostgreSQL, a controlled-HTTP notification path, and a Prometheus/Grafana observability tier with bounded-cardinality metrics.",
      "Provided a synthetic demo mode so the dashboard is reachable without Kafka, Spark, MinIO, PostgreSQL, Redis or Docker — this is what the hosted Streamlit deployment runs.",
    ],
    role:
      "Data / Analytics Engineer — pipeline design, streaming jobs, data-quality and serving contracts, dashboard, tests and observability",
    techStack: [
      "Python",
      "Apache Kafka",
      "Spark Structured Streaming",
      "Apache Avro",
      "Schema Registry",
      "MinIO",
      "PostgreSQL",
      "Redis",
      "Streamlit",
      "Prometheus",
      "Grafana",
      "Docker Compose",
      "Pytest",
    ],
    metrics: [
      { label: "Self-contained tests passed", value: "217" },
      { label: "Skipped (env-specific)", value: "4" },
      { label: "Data-quality checks", value: "21" },
      { label: "Grafana dashboards", value: "3" },
    ],
    impact: [
      "Currency-scoped aggregation keeps INR and USD separate end to end, so no metric ever sums across currencies.",
      "Net-revenue, refund and cancellation rules are enforced in the Gold contract with exact Decimal arithmetic, not approximated in the dashboard.",
      "A 21-check data-quality contract with a dead-letter path makes correctness explicit and rejected records inspectable instead of silently dropped.",
      "PostgreSQL is the authoritative serving store and Redis is a rebuildable cache, so a cache loss degrades availability without corrupting results.",
      "A documented observability scope of 45 bounded-cardinality metric families across three Grafana dashboards covers pipeline and serving health (design/locally verified — not monitoring of the public demo).",
    ],
    result:
      "A data-engineering portfolio piece that connects business analytics, streaming architecture and data correctness in one system. The public dashboard demonstrates the analytics presentation on synthetic data; the streaming pipeline, medallion layers, serving contracts, alerting and observability are implemented and verified in the repository's local Docker environment.",
    challenges: [
      "Keeping monetary precision exact through the whole path — values are stored and computed as eight-place Decimals and only rounded for display, so the table, hover text and insights never disagree.",
      "Making the demo honest: the synthetic mode reuses the real serving-contract helpers and consumer validator rather than a hand-built snapshot, so it exercises the actual read/render path without pretending to be live ingestion.",
      "Separating what is genuinely wired from what is legacy: statistical (Z-score/EWMA) anomaly detection exists as an unwired historical module and is explicitly not presented as an active feature.",
    ],
    learnings: [
      "A dashboard is only as trustworthy as its metric definitions — recognising revenue at the correct lifecycle step and netting refunds/cancellations is the substance of the work, not a detail.",
      "Labelling delivery semantics accurately (at-least-once, not exactly-once) and marking legacy modules as unwired is more credible than overstating the architecture.",
      "A rebuildable cache sourced from an authoritative store keeps the fast read path without turning the cache into a second source of truth.",
      "Separating the hosted demo (synthetic, no infrastructure) from the locally verified pipeline lets a reviewer see the analytics without provisioning Kafka or Spark.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/order-intelligence-platform",
    repoState: "public",
    demoUrl: "https://order-intelligence-platform.streamlit.app/",
    demoNote:
      "Hosted Streamlit demo runs the synthetic dashboard (fixed sample, banner: 'Synthetic demo data — not a live pipeline') — not a live Kafka/Spark deployment. Community Cloud apps can be sleeping; the URL could not be live-verified during this update, and a two-decimal currency-formatting fix present in the repository has not yet been confirmed on the hosted build.",
    images: [
      "/projects/order_intelligence/dashboard_synthetic_demo.png",
      "/projects/order_intelligence/dashboard_scripted_replay.gif",
    ],
    imageCaptions: [
      "Synthetic demo dashboard — currency-separated net revenue, order count and average order value with revenue chart, filters and provenance labels. Fixed synthetic sample, not a live pipeline.",
      "Scripted synthetic replay — the same page stepping through predefined synthetic snapshots to show the analytics change. Still 100% synthetic, no live ingestion.",
    ],
    crossLinks: [
      { label: "Sreejita Framework", href: "/projects/sreejita-framework" },
      { label: "SQL Showcase", href: "/sql" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByPriority(): Project[] {
  return [...projects].sort((a, b) => a.priority - b.priority);
}
