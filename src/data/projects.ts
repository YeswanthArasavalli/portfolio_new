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
    tagline: "Python · PyTorch · LSTM · Time-Series Analysis",
    summary: "LSTM forecasting model predicting machine failures up to two weeks ahead on multivariate sensor data. Outperformed ARIMA and gradient-boosted classifiers on failure recall — the operationally critical metric for maintenance scheduling.",
    description: "Time-series forecasting with metric selection aligned to business cost — recall over accuracy for rare, high-cost failure events.",
    caseStudy: true,
    priority: 5,
    category: "forecasting",
    problem: "Industrial equipment failures detectable days in advance are instead discovered when they stop production. A forecasting model surfacing failure probability early enables proactive maintenance scheduling and avoids unplanned downtime costs.",
    approach: [
      "Applied sequence windowing and feature normalisation to convert raw multivariate sensor readings into LSTM-compatible time-series inputs.",
      "Benchmarked LSTM against ARIMA and a gradient-boosted classifier on identical train/validation splits — model selection driven by recall on failure events, not overall accuracy.",
      "LSTM selected because it had the highest recall on failure events — the operationally critical metric. Overall accuracy was secondary.",
      "Applied early stopping and gradient clipping to prevent overfitting on limited failure-class samples (class imbalance addressed during training).",
      "Translated the two-week forecast window into a directional cost estimate using published industrial downtime benchmarks (~$1.15M annually). Framed explicitly as directional, not a precise figure.",
    ],
    dataset: {
      source: "Multivariate industrial sensor dataset",
      size: "Time-series readings across multiple machines",
      notes: "Class imbalance between normal and failure states. Failure events are rare but high-cost.",
    },
    role: "ML Engineer — time-series modelling, evaluation, business framing",
    techStack: ["Python", "PyTorch", "LSTM", "NumPy", "Pandas", "Matplotlib"],
    metrics: [
      { label: "Validation accuracy",   value: "87%" },
      { label: "Forecast horizon",      value: "2 weeks" },
      { label: "vs ARIMA / GBM",        value: "Higher recall" },
      { label: "Cost estimate",         value: "~$1.15M/yr" },
    ],
    impact: [
      "LSTM outperformed ARIMA and gradient-boosted baselines on failure event recall",
      "Two-week forecast horizon gives meaningful lead time for maintenance scheduling",
      "Directional cost estimate provides business framing for model adoption decisions",
      "Metric selection discipline (recall over accuracy) demonstrates understanding of business cost asymmetry",
    ],
    result: "A time-series forecasting system that demonstrates metric selection aligned to business priorities — not accuracy optimisation for its own sake.",
    challenges: [
      "Class imbalance between normal and failure states required careful sampling strategy during training.",
      "LSTM training instability on short failure sequences addressed with gradient clipping.",
    ],
    learnings: [
      "Metric selection must reflect operational cost structure — recall for rare, expensive failure events.",
      "Benchmarking multiple model families (statistical, tree-based, deep learning) produces more credible model selection than single-model evaluation.",
      "Cost estimates should be clearly framed as directional — this is honest and still useful for stakeholder buy-in.",
    ],
    codeUrl: undefined,
    repoState: "private",
    repoNote: "Private repository — experiment notebook and model results are not published yet. The training/validation metrics shown here are from my own experiments. Methodology and results are available to discuss.",
    images: [],
    imageCaptions: [],
    crossLinks: [
      { label: "ML Monitoring Platform", href: "/projects/ml-monitoring-platform" },
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByPriority(): Project[] {
  return [...projects].sort((a, b) => a.priority - b.priority);
}
