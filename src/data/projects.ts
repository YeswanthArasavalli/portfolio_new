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
  codeUrl?: string;
  demoUrl?: string;
  images: string[];
  imageCaptions?: string[];
  crossLinks?: { label: string; href: string }[];
}

export const projects: Project[] = [

  /* 1 ── PRODUCTION ML MONITORING PLATFORM */
  {
    slug: "ml-monitoring-platform",
    title: "Production ML Monitoring & Drift Detection Platform",
    tagline: "MLflow · FastAPI · Evidently · Docker · PostgreSQL · Streamlit",
    summary: "End-to-end MLOps platform: experiment tracking, versioned model registry, containerised REST inference, automated PSI/KS drift detection, and a PostgreSQL-backed observability dashboard.",
    description: "Most ML projects stop at the notebook. This platform covers training → versioning → serving → monitoring in a single reproducible Docker stack.",
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
    result: "A containerised MLOps platform that demonstrates production awareness beyond notebook ML — the difference between 'model trained' and 'model maintained'.",
    challenges: [
      "Keeping PSI statistically valid on small batch sizes — added KS-test as a secondary signal to reduce false positives.",
      "Making MLflow registry updates transparent to the inference API without service restarts.",
    ],
    learnings: [
      "Model versioning is as operationally important as model accuracy.",
      "Evidently's report format works as both a human-readable HTML artifact and a machine-parseable alert trigger.",
      "Docker resolves most 'works on my machine' deployment issues before they become production problems.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/ml-monitoring-platform",
    images: ["/placeholder.svg"],
    imageCaptions: ["MLflow experiment tracking UI with run comparison and artifact storage"],
    crossLinks: [
      { label: "SQL Showcase", href: "/sql" },
      { label: "Experience — Postulate IRT", href: "/experience" },
    ],
  },

  /* 2 ── AI HIRING INTELLIGENCE PLATFORM */
  {
    slug: "ai-hiring-intelligence-platform",
    title: "AI Hiring Intelligence Platform",
    tagline: "Python · FastAPI · NLP · PostgreSQL · Async Workers · Scikit-learn",
    summary: "Production-grade resume analysis API with ATS alignment scoring, async worker orchestration, retry/dead-letter handling, contradiction validation, and 80+ automated tests across 400+ system files.",
    description: "Resume analysis at scale requires reliability engineering, not just NLP. This platform scores resumes against JDs via a multi-stage async pipeline, validates rewrites against contradiction rules, and stores all lifecycle state in PostgreSQL.",
    caseStudy: true,
    priority: 2,
    category: "nlp",
    problem: "ATS systems are opaque. This platform makes resume-to-JD alignment measurable — quantifying keyword gaps, section completeness, and structural issues — and delivers results through a reliable async API that handles concurrent requests without silent failures.",
    approach: [
      "Scoring pipeline: keyword alignment against JD + section completeness checks + rule-based grading. All results persisted to PostgreSQL for downstream analysis.",
      "Backend designed as a queue of async workers. Each job transitions through discrete stages: ingestion → validation → scoring → storage.",
      "Retry logic with exponential backoff on transient failures. Failed jobs after max retries are routed to a dead-letter queue for manual inspection.",
      "Validation layer checks resume rewrites for internal contradictions (years of experience vs claimed seniority, skill claims vs role history) and rolls back before returning results.",
      "80+ unit and integration tests. Coverage focused on scoring functions and worker retry paths — the highest failure-surface areas.",
    ],
    role: "Full stack — NLP pipeline, backend architecture, API design, testing",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Scikit-learn", "NLP", "Async Workers", "pytest"],
    metrics: [
      { label: "Automated tests",  value: "80+" },
      { label: "System files",     value: "400+" },
      { label: "Pipeline stages",  value: "5" },
      { label: "Worker pattern",   value: "Async + retry" },
    ],
    impact: [
      "Reliable async processing with automatic retry — no silent failures on concurrent requests",
      "Contradiction guardrails prevent nonsensical rewrite outputs before they reach users",
      "PostgreSQL job lifecycle table gives full audit trail for debugging and analytics",
      "Comprehensive test suite catches scoring and retry regressions before deployment",
    ],
    result: "A production-oriented NLP backend that demonstrates system design, backend reliability, and test discipline beyond typical ML notebook projects.",
    challenges: [
      "Defining contradiction rules strict enough to catch real errors without blocking valid rewrites.",
      "Balancing worker concurrency with PostgreSQL connection pool limits under load.",
    ],
    learnings: [
      "Async worker patterns with retry are non-negotiable for reliable production APIs.",
      "Testing failure paths (retry, rollback, dead-letter) delivers more value than expanding happy-path coverage.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/ai-hiring-intelligence-platform",
    images: ["/placeholder.svg"],
    imageCaptions: ["FastAPI Swagger UI showing POST /analyse endpoint with request/response schema"],
    crossLinks: [
      { label: "SQL Showcase", href: "/sql" },
    ],
  },

  /* 3 ── SREEJITA FRAMEWORK */
  {
    slug: "sreejita-framework",
    title: "Sreejita — Multi-Domain KPI Analytics Framework",
    tagline: "Python · Scikit-learn · Pandas · Streamlit · PDF Reporting",
    summary: "Domain-aware analytics framework that routes structured datasets to specialised KPI pipelines (Healthcare, Finance, Retail, HR, Supply Chain) and generates stakeholder-ready PDF reports with governance validation at each stage.",
    description: "A shared analytics capability architecture with domain routing, governed KPI computation, and PDF output — replacing one-off domain scripts with a single extensible framework.",
    caseStudy: true,
    priority: 3,
    category: "analytics",
    problem: "Building separate analytics pipelines per business domain creates code duplication and inconsistent output quality. A shared framework with domain-aware routing and governed KPI computation delivers reliable, trustworthy outputs at lower maintenance cost.",
    approach: [
      "Framework accepts CSV/JSON input and routes to domain-specific modules based on column signature matching and domain metadata tags.",
      "Each domain module computes a defined KPI set, runs trend and anomaly checks, and applies a minimum quality threshold before generating outputs — preventing analysis on data too sparse to be reliable.",
      "Governance layer validates computed KPIs at each pipeline stage against plausibility ranges — catches values outside expected bounds before they reach the final report.",
      "PDF reporting layer generates KPI summaries, benchmark comparisons, trend charts, and an action-item section formatted for non-technical stakeholders.",
      "Streamlit application enables end-to-end workflow execution, domain switching, and real-time report preview.",
    ],
    role: "Full stack — framework architecture, domain modules, governance layer, reporting",
    techStack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "ReportLab", "Matplotlib"],
    metrics: [
      { label: "Supported domains", value: "5+" },
      { label: "Output format",     value: "PDF + Dashboard" },
      { label: "Quality gates",     value: "Per stage" },
      { label: "Stakeholder target", value: "Non-technical" },
    ],
    impact: [
      "Single framework replaces per-domain one-off scripts, reducing duplication and maintenance overhead",
      "Quality gates prevent out-of-range KPIs from reaching stakeholder reports",
      "Domain routing is extensible — adding a new domain requires implementing one module interface",
      "PDF output with benchmark comparisons is usable directly in stakeholder presentations",
    ],
    result: "A governed analytics framework that demonstrates software engineering discipline applied to data analytics — not just model accuracy but output reliability.",
    challenges: [
      "Defining domain routing rules robust to noisy or incomplete column names.",
      "Setting plausibility ranges for KPIs without domain-specific ground truth data.",
    ],
    learnings: [
      "Governance and validation layers are what separate production analytics from quick scripts.",
      "Domain-aware routing is a cleaner pattern than conditional logic scattered through a monolithic pipeline.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/sreejita-framework",
    images: ["/placeholder.svg"],
    imageCaptions: ["Sreejita Streamlit interface with domain selector and real-time KPI preview"],
    crossLinks: [
      { label: "SQL Showcase", href: "/sql" },
      { label: "Experience — Edunet Foundation", href: "/experience" },
    ],
  },

  /* 4 ── RETAIL IMAGE RECOGNITION */
  {
    slug: "retail-product-image-recognition",
    title: "Retail Product Image Recognition System",
    tagline: "Python · EfficientNet-B0 · PyTorch · MLflow · Streamlit",
    summary: "Computer vision pipeline for retail SKU classification. Fine-tuned EfficientNet-B0 on ~200 categories with mixed-precision training — 84.9% Top-1 accuracy (precision 0.83, recall 0.82), up from 76% ResNet-18 baseline. Experiments tracked in MLflow. Deployed via Streamlit with <200ms CPU latency.",
    description: "Automated SKU classification using transfer learning, experiment tracking, and a deployed inference interface with latency benchmarking.",
    caseStudy: true,
    priority: 4,
    category: "cv",
    problem: "Manual SKU identification at retail scale is error-prone and time-consuming. An automated image classifier reduces labelling overhead and enables faster inventory management workflows.",
    approach: [
      "Fine-tuned EfficientNet-B0 on the RPC retail dataset using mixed-precision GPU training (torch.cuda.amp) and progressive data augmentation.",
      "Tracked all experiments in a local MLflow instance — comparing augmentation strategies and learning rate schedules. Retained the 3 best checkpoints for ensemble evaluation.",
      "Evaluated on Top-1 accuracy (84.9%), Top-5 accuracy, precision (0.83), recall (0.82), and F1 — against a ResNet-18 baseline (76% Top-1).",
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
      { label: "Top-1 accuracy",      value: "84.9%" },
      { label: "Precision / Recall",  value: "0.83 / 0.82" },
      { label: "vs ResNet-18 baseline", value: "+8.9pp" },
      { label: "CPU inference",        value: "<200ms" },
    ],
    impact: [
      "+8.9 percentage point accuracy improvement over ResNet-18 baseline using identical training data",
      "Mixed-precision training reduced GPU memory usage ~40% with no accuracy loss",
      "MLflow experiment tracking gives reproducible checkpoint comparison across runs",
      "Deployed inference app usable by non-ML users without infrastructure knowledge",
    ],
    result: "A production-aware CV pipeline with measurable accuracy improvements, experiment tracking, and a deployed inference interface — not just a trained model.",
    challenges: [
      "Visually similar SKUs caused class confusion — resolved with augmentation tuning rather than architecture changes.",
      "CPU inference latency optimisation required weight quantisation (post-training INT8).",
    ],
    learnings: [
      "MLflow experiment tracking is as important as model training for reproducible CV work.",
      "Top-5 accuracy is the operationally relevant metric for retail classification; single-mistake recall matters less than top-3 recall.",
      "Deployment latency should be benchmarked during training, not discovered post-deployment.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/retail-product-image-recognition",
    demoUrl: "https://retail-image-recognition.streamlit.app/",
    images: [
      "/projects/retail_image/r_thumb.png",
      "/projects/retail_image/data.png",
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

  /* 5 ── PREDICTIVE MAINTENANCE */
  {
    slug: "predictive-maintenance-forecasting",
    title: "Predictive Maintenance — Machine Failure Forecasting",
    tagline: "Python · PyTorch · LSTM · Time-Series Analysis",
    summary: "LSTM forecasting model predicting machine failures up to two weeks ahead on multivariate sensor data. Outperformed ARIMA and gradient-boosted classifiers on failure recall — the operationally critical metric for maintenance scheduling.",
    description: "Time-series forecasting with metric selection aligned to business cost — recall over accuracy for rare, high-cost failure events.",
    caseStudy: true,
    priority: 5,
    category: "forecasting",
    problem: "Industrial equipment failures detectable days in advance are instead discovered when they stop production. A forecasting model that surfaces failure probability early enables proactive maintenance scheduling and avoids unplanned downtime costs.",
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
      { label: "Validation accuracy",  value: "87%" },
      { label: "Forecast horizon",     value: "2 weeks" },
      { label: "vs ARIMA / GBM",       value: "Higher recall" },
      { label: "Cost estimate",        value: "~$1.15M/yr" },
    ],
    impact: [
      "LSTM outperformed ARIMA and gradient-boosted classifiers on failure event recall",
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
    codeUrl: "https://github.com/YeswanthArasavalli/predictive-maintenance-forecasting",
    images: ["/placeholder.svg"],
    imageCaptions: ["LSTM predicted failure probability vs actual failure events across the validation period"],
    crossLinks: [
      { label: "ML Monitoring Platform", href: "/projects/ml-monitoring-platform" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByPriority(): Project[] {
  return [...projects].sort((a, b) => a.priority - b.priority);
}
