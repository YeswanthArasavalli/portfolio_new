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

  /* ══════════════════════════════════════════════
     1 — ML MONITORING PLATFORM
  ══════════════════════════════════════════════ */
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

  /* ══════════════════════════════════════════════
     2 — AI JOB APPLICATION INTELLIGENCE SYSTEM
     (actual: 225 Python files, 51K LOC, 23 test
      files, 144 test functions, local Ollama LLM)
  ══════════════════════════════════════════════ */
  {
    slug: "ai-hiring-intelligence-platform",
    title: "AI Job Application Intelligence System",
    tagline: "Python · Ollama LLM · Streamlit · SQLite · FastAPI · Playwright",
    summary: "End-to-end local AI system that tailors resumes to job descriptions using Ollama LLMs, scores ATS alignment across 6 dimensions, predicts shortlist probability, and delivers an 8-page analytics dashboard — 225 Python files, ~51K LOC, zero cloud dependencies.",
    description: "A complete job application intelligence platform combining local LLM resume tailoring, ATS simulation, semantic matching, decision intelligence, skill-gap analysis, and career strategy — all running locally with no API keys or cloud costs.",
    caseStudy: true,
    priority: 2,
    category: "nlp",
    problem: "Job applicants submit resumes without knowing where they fail ATS filters or what skills are missing. This system makes the entire ATS alignment process transparent and actionable — locally, privately, and at zero cost.",
    approach: [
      "JD Processing Engine: cleans noise, extracts required skills, detects sections, and measures JD quality — produces a structured ExtractedJD for downstream scoring.",
      "Resume Tailoring Engine: uses Ollama (local LLM — qwen2.5-coder:3b default) to rewrite resume sections matched to the JD. A Naturalization layer ensures LLM output sounds human-written while preserving ATS keywords.",
      "ATS Scoring Engine: 6-dimension scoring (Keyword Match 30%, Skills Match 25%, Experience Relevance 20%, Role Alignment 10%, Education Fit 5%, Structure 10%) with semantic dampening, nonlinear experience penalty, and transferable skill credits.",
      "Shortlist Probability Engine: heuristic estimator combining ATS score × semantic alignment × skill coverage × experience signals. Outputs probability bands (STRONG MATCH / COMPETITIVE / POSSIBLE / UNLIKELY) with explicit confidence caveats.",
      "Decision Engine: APPLY / MAYBE / IMPROVE decisions. System never hard-rejects — IMPROVE always comes with specific next steps rather than a rejection.",
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
    result: "A production-grade local AI system that combines LLM deployment, NLP, scoring systems, decision intelligence, and full-stack development — with honest, caveated outputs that don't overclaim accuracy.",
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
    codeUrl: "https://github.com/YeswanthArasavalli/job-ai-system",
    images: ["/placeholder.svg"],
    imageCaptions: ["8-page Streamlit dashboard showing ATS score breakdown, shortlist probability, and skill gap analysis"],
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
    title: "Sreejita — Domain-Agnostic Decision Intelligence Framework",
    tagline: "Python · Pandas · Scikit-learn · ReportLab · Streamlit · Flask · SQLite",
    summary: "A multi-stage analytics and decision intelligence framework that transforms raw datasets into KPI intelligence, root-cause driver analysis, composite insights, scenario simulations, and consulting-grade executive PDF reports — across 13 business domains, backed by 454 test functions.",
    description: "Sreejita is a domain-agnostic analytics engine that routes structured datasets through a layered intelligence pipeline: data quality → domain detection → KPI computation → driver graph analysis → composite insights → recommendation ranking → scenario simulation → executive narrative — producing consulting-quality 10-section PDF reports.",
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
      notes: "7 sample datasets included covering all major domain types. Validated end-to-end with PDF generation per domain.",
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
      "10-section consulting-grade PDF report generated automatically: Executive Snapshot, Board Readiness, 90-Day Action Plan, Health Scorecard",
      "Flask REST API + OrgMemory + DomainCopilot enable platform-level deployment beyond single-user Streamlit",
      "454 test functions across 30 test files enforce correctness at each pipeline stage",
    ],
    result: "A production-capable analytics and decision intelligence framework that demonstrates software architecture, domain modelling, statistical analysis, automated reporting, and platform engineering — all in one system.",
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
    codeUrl: "https://github.com/YeswanthArasavalli/sreejita-framework",
    images: [
      "/projects/sree_frame/Sreejita_Dashboard.png",
      "/projects/sree_frame/Healthcare_Domain.png",
      "/projects/sree_frame/Marketing_Domain.png",
      "/projects/sree_frame/Executive_Memo.png",
      "/projects/sree_frame/Root_Cause.png",
    ],
    imageCaptions: ["10-section consulting-grade executive PDF report — automatically generated from raw dataset input"],
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
    result: "A production-aware CV pipeline with measurable accuracy improvements, experiment tracking, and a deployed inference interface — not just a trained model.",
    challenges: [
      "Visually similar SKUs caused class confusion — resolved with augmentation tuning rather than architecture changes.",
      "CPU inference latency optimisation required weight quantisation (post-training INT8).",
    ],
    learnings: [
      "MLflow experiment tracking is as important as model training for reproducible CV work.",
      "Deployment latency should be benchmarked during training, not discovered post-deployment.",
    ],
    codeUrl: "https://github.com/YeswanthArasavalli/retail-product-image-recognition",
    demoUrl: "https://retail-image-recognition.streamlit.app/",
    images: [
      "/projects/retail_image/r_thumb.png",
      "/projects/retail_image/ui.png",
      "/projects/retail_image/data.png",
      "/projects/retail_image/confuion_matrix.png",
      "/projects/retail_image/Figure_1.png",
    ],
    imageCaptions: [
      "",
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
     5 — PREDICTIVE MAINTENANCE
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
    codeUrl: "https://github.com/YeswanthArasavalli/predictive-maintenance-forecasting",
    images: ["/placeholder.svg"],
    imageCaptions: ["LSTM predicted failure probability vs actual failure events across the validation period"],
    crossLinks: [
      { label: "ML Monitoring Platform", href: "/projects/ml-monitoring-platform" },
    ],
  },

  /* ══════════════════════════════════════════════
   AMAZON FOOD REVIEWS SENTIMENT ANALYSIS
  ══════════════════════════════════════════════ */
  {
    slug: "amazon-food-reviews-sentiment-analysis",
    title: "Amazon Food Reviews Sentiment Analysis",
  
    tagline:
      "Python · DistilBERT · PyTorch · Hugging Face · Gradio · NLP",
  
    summary:
      "End-to-end NLP pipeline for large-scale sentiment classification on 568K+ Amazon food reviews. Built a TF-IDF + Logistic Regression baseline (~89% accuracy) and fine-tuned DistilBERT to achieve ~94% accuracy with real-time inference. Deployed via Gradio on Hugging Face Spaces with sub-300ms prediction latency.",
  
    description:
      "Automated customer sentiment analysis using transformer-based NLP. The system processes large volumes of review text, compares classical machine learning against modern transformer architectures, and delivers real-time sentiment predictions through a deployed web interface.",
  
    caseStudy: true,
  
    priority: 5,
  
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
      "A production-oriented NLP solution that transforms raw customer reviews into actionable sentiment insights through a scalable transformer-based classification pipeline and deployed inference interface.",
  
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
  
    examplePrediction: {
      input: "The food tasted terrible and was completely stale.",
      output: "Negative (confidence ≈ 0.96)",
    },
  
    codeUrl:
      "https://github.com/YeswanthArasavalli/amazon-food-review-sentiment-analysis",
  
    demoUrl:
      "https://huggingface.co/spaces/YeswanthArasavalli/Amazon_Food_Review_Analysis",
  
    images: [
      "/projects/amazon_food/a_thumb.png",
      "/projects/amazon_food/a_dash.png",
      "/projects/amazon_food/word.png",
      "/projects/amazon_food/roc.png",
      "/projects/amazon_food/confusion.png",
      "/projects/amazon_food/accuracy.png",
    ],
  
    imageCaptions: [
      " ",
      
      "Gradio inference interface for real-time sentiment prediction from customer reviews.",
      
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
