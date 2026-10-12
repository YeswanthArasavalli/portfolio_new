import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getProjectBySlug, getProjectsByPriority } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink, CheckCircle, ArrowRight } from "lucide-react";

const catChip = "bg-secondary text-secondary-foreground border-border";
const catLabel: Record<string,string> = {
  mlops:"MLOps", nlp:"NLP", analytics:"Analytics", cv:"Computer Vision", forecasting:"Time-Series"
};

/* ── Reusable arch row types ─────────────────── */
type ArchRow = { box: string; detail: string; color: string } | { arrow: string };

function ArchDiagram({ title, rows }: { title: string; rows: ArchRow[] }) {
  return (
    <div className="bg-code-bg rounded-lg p-5 font-mono text-xs overflow-x-auto">
      <div className="text-code-muted mb-3 text-xs uppercase tracking-widest">{title}</div>
      <div className="space-y-0">
        {rows.map((row, i) =>
          "arrow" in row ? (
            <div key={i} className="text-code-faint pl-6 py-0.5">{row.arrow}</div>
          ) : (
            <div key={i} className={`border rounded px-3 py-2 mb-0.5 ${row.color}`}>
              <span className="font-semibold">{row.box}</span>
              <span className="text-code-muted ml-2 text-xs">{row.detail}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ── Architecture diagrams — each grounded in the actual codebase ── */

function MLOpsDiagram() {
  const rows: ArchRow[] = [
    { box: "Training Pipeline",   detail: "Scikit-learn · ColumnTransformers · schema-enforced preprocessing",  color: "border-violet-500 text-violet-300" },
    { arrow: "↓ log runs + artifacts" },
    { box: "MLflow",              detail: "Experiment tracking · Model Registry · version tags — no hardcoded paths", color: "border-blue-500 text-blue-300" },
    { arrow: "↓ load by version tag" },
    { box: "FastAPI Service",     detail: "/predict · /health · /metrics endpoints · Docker container",           color: "border-green-500 text-green-300" },
    { arrow: "↓ log inputs + outputs + latency" },
    { box: "PostgreSQL",          detail: "Prediction log · latency audit trail · alert log",                     color: "border-yellow-500 text-yellow-300" },
    { arrow: "↓ batch comparison" },
    { box: "Evidently",           detail: "PSI + KS-test drift reports · threshold-based alert writes",           color: "border-orange-500 text-orange-300" },
    { arrow: "↓ read PostgreSQL logs" },
    { box: "Streamlit Dashboard", detail: "Prediction volume · p50/p95 latency · drift summaries — no direct DB access", color: "border-pink-500 text-pink-300" },
  ];
  return <ArchDiagram title="System Architecture — 5-Layer MLOps Stack" rows={rows} />;
}

function HiringDiagram() {
  /* Grounded in: jd_processor/, resume_engine/, ats_scoring/, pipeline/,
     database/db_manager.py, dashboard.py (8 pages), learning/, insights/ */
  const rows: ArchRow[] = [
    { box: "Input Layer",                detail: "LinkedIn Scraper (Playwright) · Manual Mode (PDF / DOCX / JSON + JD paste)",    color: "border-slate-400 text-slate-300" },
    { arrow: "↓" },
    { box: "JD Processing Engine",       detail: "jd_processor/ · skill extraction · section detection · quality scoring",       color: "border-blue-500 text-blue-300" },
    { arrow: "↓" },
    { box: "Resume Tailoring Engine",    detail: "resume_engine/ · Ollama local LLM (qwen2.5-coder:3b) · Naturalization layer",  color: "border-violet-500 text-violet-300" },
    { arrow: "↓" },
    { box: "ATS Scoring Engine",         detail: "6 dimensions: Keywords 30% · Skills 25% · Experience 20% · Alignment 10% · Education 5% · Structure 10%", color: "border-indigo-500 text-indigo-300" },
    { arrow: "↓ semantic dampening + nonlinear penalty" },
    { box: "Probability + Decision",     detail: "Shortlist probability bands · APPLY / MAYBE / IMPROVE decisions (never hard-reject)", color: "border-cyan-500 text-cyan-300" },
    { arrow: "↓" },
    { box: "Intelligence Layer",         detail: "Skill Gap Analyzer · Strategy Engine (ROI-ranked) · Flow Engine · Job Ranker · Learning Engine", color: "border-green-500 text-green-300" },
    { arrow: "↓" },
    { box: "Output Layer",               detail: "8-page Streamlit dashboard · PDF reports · CSV export · SQLite (WAL mode)",     color: "border-yellow-500 text-yellow-300" },
  ];
  return <ArchDiagram title="System Architecture — 225 Python files · ~51K LOC · 144 tests · Local LLM" rows={rows} />;
}

function SreejitaDiagram() {
  /* Grounded in: core/ (61 engines), domains/ (13), platform/ (Flask API + OrgMemory),
     reporting/consulting_engine.py (10-section PDF), ml_engine.py (KPIForecaster etc.) */
  const rows: ArchRow[] = [
    { box: "Raw Dataset",                detail: "CSV / JSON — any structured business data",                                      color: "border-slate-400 text-slate-300" },
    { arrow: "↓" },
    { box: "Data Quality Layer",         detail: "data_quality_engine · data_trust_layer · schema_profiler · completeness scoring", color: "border-red-500 text-red-300" },
    { arrow: "↓ domain fingerprinting" },
    { box: "Domain Detection Engine",    detail: "column_resolver · fingerprint · 13 domains: Healthcare, Finance, Retail, HR, Supply Chain, SaaS, Insurance, Real Estate, Ecommerce, Manufacturing, Marketing, Customer Value, Ops", color: "border-blue-500 text-blue-300" },
    { arrow: "↓ domain-specific KPI registry" },
    { box: "KPI Intelligence Engine",    detail: "kpi_intelligence_engine · kpi_registry · ml_engine (KPIForecaster · AnomalyDetector) · trend_analyzer · confidence_engine", color: "border-violet-500 text-violet-300" },
    { arrow: "↓ driver graph" },
    { box: "Driver & Entity Analysis",   detail: "driver_graph_engine · entity_driver_engine · intelligence_graph · root_cause_engine · impact_propagation_engine", color: "border-indigo-500 text-indigo-300" },
    { arrow: "↓ cross-KPI patterns" },
    { box: "Composite Insight Engine",   detail: "composite_insight_engine · insight_quality_engine · insight_guardrails · evidence_engine · confidence_engine", color: "border-cyan-500 text-cyan-300" },
    { arrow: "↓ priority ranking" },
    { box: "Recommendation & Scenario",  detail: "recommendation_derivation_engine · decision_optimization_engine · scenario_simulation_engine · action_impact_simulator", color: "border-green-500 text-green-300" },
    { arrow: "↓ executive narrative" },
    { box: "Consulting Report (v5.3)",   detail: "10 sections: Executive Snapshot · Board Readiness · Business Diagnostics · KPI Table · Visual Evidence · Risks/Opportunities · 90-Day Action Plan · Health Scorecard", color: "border-yellow-500 text-yellow-300" },
    { arrow: "↓ platform layer (v5.0+)" },
    { box: "Platform Layer",             detail: "Flask REST API (7 endpoints) · OrgMemory (institutional knowledge) · DomainCopilot · OutcomeTracker (continuous learning)", color: "border-orange-500 text-orange-300" },
  ];
  return <ArchDiagram title="Intelligence Pipeline — 213 Python files · 61 core engines · 13 domains · 454 tests" rows={rows} />;
}

function RetailCVDiagram() {
  const rows: ArchRow[] = [
    { box: "RPC Dataset",            detail: "~200 SKU categories · class-balanced sampling · normalised",                          color: "border-slate-400 text-slate-300" },
    { arrow: "↓ augmentation" },
    { box: "Data Augmentation",      detail: "Progressive augmentation · random crops · horizontal flip",                           color: "border-blue-500 text-blue-300" },
    { arrow: "↓ fine-tune" },
    { box: "EfficientNet-B0",        detail: "Transfer learning · mixed-precision GPU (torch.cuda.amp) · ImageNet weights",          color: "border-violet-500 text-violet-300" },
    { arrow: "↓ track experiments" },
    { box: "MLflow",                 detail: "Augmentation vs LR schedule comparison · 3 best checkpoints retained",                 color: "border-yellow-500 text-yellow-300" },
    { arrow: "↓ evaluate" },
    { box: "Evaluation",             detail: "Top-1: 84.9% · Precision: 0.83 · Recall: 0.82 (vs ResNet-18 baseline: 76%)",          color: "border-green-500 text-green-300" },
    { arrow: "↓ quantise + serve" },
    { box: "Streamlit App",          detail: "Upload image → top-3 predictions + confidence · <200ms CPU latency (INT8 quantised)",  color: "border-pink-500 text-pink-300" },
  ];
  return <ArchDiagram title="Training & Deployment Pipeline" rows={rows} />;
}

function PredMainDiagram() {
  const rows: ArchRow[] = [
    {
      box: "NASA C-MAPSS FD004",
      detail:
        "Multivariate turbofan telemetry · 249 training engines · 6 operating regimes · 21 sensors + 3 settings",
      color: "border-slate-400 text-slate-300",
    },
    { arrow: "↓ audit & define targets" },
    {
      box: "Leakage-Safe Preprocessing",
      detail:
        "Engine-grouped train/validation split · train-only scaling · causal features · official test set sealed",
      color: "border-blue-500 text-blue-300",
    },
    { arrow: "↓ build predictive features" },
    {
      box: "Temporal Feature Engineering",
      detail:
        "Lag/difference · rolling statistics · local slope · cycle-aware features · no future information",
      color: "border-violet-500 text-violet-300",
    },
    { arrow: "↓ benchmark models" },
    {
      box: "Classical ML Baselines",
      detail:
        "Ridge / Logistic Regression / Histogram Gradient Boosting · RUL regression + failure-risk classification",
      color: "border-yellow-500 text-yellow-300",
    },
    { arrow: "↓ evaluate operationally" },
    {
      box: "Validation & Decision Analysis",
      detail:
        "RUL MAE/RMSE/R² · failure recall/F1/PR-AUC · threshold analysis · engine-level bootstrap · cost-sensitive evaluation",
      color: "border-green-500 text-green-300",
    },
    { arrow: "↓ select model based on evidence" },
    {
      box: "Final Outcome",
      detail:
        "31.86-cycle primary RUL MAE · 0.898 H30 F1 · 0.974 PR-AUC · neural sequence model not justified by validation evidence",
      color: "border-orange-500 text-orange-300",
    },
  ];

  return (
    <ArchDiagram
      title="Predictive Maintenance Pipeline — leakage-safe modelling and evidence-driven model selection"
      rows={rows}
    />
  );
}

function OIPDiagram() {
  /* Documented architecture, verified in the repository's local Docker
     environment. The hosted Streamlit demo runs only the synthetic dashboard
     (Redis/PostgreSQL/Kafka/Spark are NOT exercised by the public demo). */
  const rows: ArchRow[] = [
    { box: "Order Lifecycle Events",  detail: "Synthetic generator · created → paid → shipped → delivered · cancel/refund branches",        color: "border-slate-400 text-slate-300" },
    { arrow: "↓ Avro + Schema Registry" },
    { box: "Kafka (KRaft)",           detail: "order-events · payment-events · DLQ — schema-governed transport",                            color: "border-blue-500 text-blue-300" },
    { arrow: "↓ micro-batch · watermark" },
    { box: "Spark Structured Streaming", detail: "Avro deserialisation · Bronze → DQ gate (21 checks) → Silver → Gold aggregates",          color: "border-violet-500 text-violet-300" },
    { arrow: "↓ medallion lake on MinIO" },
    { box: "Bronze / Silver / Gold",  detail: "raw append-only · validated + deduplicated (DLQ at-least-once) · committed business aggregates", color: "border-indigo-500 text-indigo-300" },
    { arrow: "↓ serve aggregates" },
    { box: "PostgreSQL + Redis",      detail: "gold_serving = analytical source of truth · Redis = rebuildable cache derived from PostgreSQL", color: "border-yellow-500 text-yellow-300" },
    { arrow: "↓ read + render" },
    { box: "Streamlit Dashboard",     detail: "currency-separated KPIs · revenue charts · filters · tables · exact Decimal, display-rounded", color: "border-green-500 text-green-300" },
    { arrow: "↓ supporting (documented)" },
    { box: "Alerting + Observability", detail: "one-shot currency-aware rules · controlled-HTTP notifications · Prometheus/Grafana (45 metric families, 3 dashboards)", color: "border-orange-500 text-orange-300" },
  ];
  return (
    <ArchDiagram
      title="Documented Architecture — verified locally in Docker Compose · the hosted demo runs the synthetic dashboard only"
      rows={rows}
    />
  );
}

const diagrams: Record<string, React.ReactNode> = {
  "ml-monitoring-platform":            <MLOpsDiagram />,
  "ai-hiring-intelligence-platform":   <HiringDiagram />,
  "sreejita-framework":                <SreejitaDiagram />,
  "retail-product-image-recognition":  <RetailCVDiagram />,
  "predictive-maintenance-forecasting":<PredMainDiagram />,
  "order-intelligence-platform":        <OIPDiagram />,
};

/* ── Stats highlights per project ─────────────── */
const projectHighlights: Record<string, { label: string; value: string }[]> = {
  "ai-hiring-intelligence-platform": [
    { label: "Python files",    value: "225" },
    { label: "Lines of code",   value: "~51K" },
    { label: "Test functions",  value: "144" },
    { label: "Dashboard pages", value: "8" },
    { label: "Cloud deps",      value: "Zero" },
    { label: "LLM",             value: "Local (Ollama)" },
  ],
  "sreejita-framework": [
    { label: "Test functions",    value: "454" },
    { label: "Python files",      value: "213" },
    { label: "Business domains",  value: "13" },
    { label: "Core engines",      value: "61" },
    { label: "Report sections",   value: "10" },
    { label: "Platform endpoints", value: "7 (Flask)" },
  ],
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? "");
  const all = getProjectsByPriority();
  const currentIdx = all.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? all[currentIdx - 1] : null;
  const next = currentIdx < all.length - 1 ? all[currentIdx + 1] : null;

  if (!project) return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-muted-foreground mb-4">Project not found.</p>
        <Link to="/projects" className="text-primary hover:underline">← Back to Projects</Link>
      </div>
    </Layout>
  );

  const extraMetrics = projectHighlights[project.slug];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/20">
        <div className="container max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/projects" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Projects
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{project.title}</span>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <div className="mb-8">
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border mb-3 ${catChip}`}>
            {catLabel[project.category]}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">{project.title}</h1>
          <p className="text-base text-muted-foreground mb-4 leading-relaxed max-w-3xl">{project.summary}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-accent text-accent-foreground border border-accent-foreground/10">{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors">
                <Github className="h-4 w-4" /> GitHub Repository
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                <ExternalLink className="h-4 w-4" /> {project.repoState === "private" ? "Live Demo" : "Demo"}
              </a>
            )}
            {project.repoState && project.repoState !== "public" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-dashed border-border rounded text-muted-foreground">
                {project.repoState === "private" ? "Private repository" : "In development"}
              </span>
            )}
          </div>

          {project.repoNote && (
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed border-l-2 border-border pl-3">
              {project.repoNote}
            </p>
          )}
          {project.demoNote && (
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{project.demoNote}</p>
          )}
        </div>

        {/* ── Primary metrics ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-6">
          {project.metrics.map(({ label, value }) => (
            <div key={label} className="bg-background px-4 py-4 text-center">
              <div className="text-2xl font-bold tabular-nums text-foreground mb-1">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Extra system metrics (Sreejita + AI Hiring only) ── */}
        {extraMetrics && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">System Scale</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-border rounded-lg overflow-hidden">
              {extraMetrics.map(({ label, value }) => (
                <div key={label} className="bg-secondary/30 px-3 py-3 text-center">
                  <div className="text-lg font-bold tabular-nums text-foreground mb-0.5">{value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Architecture Diagram ── */}
        {diagrams[project.slug] && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Architecture</h2>
            {diagrams[project.slug]}
          </div>
        )}

        {/* ── Real screenshots ── */}
        {project.images.length > 0 && (
          <div className="mb-10 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Screenshots</h2>
            {project.images.map((img, i) => (
              <figure key={i} className="border border-border rounded-lg overflow-hidden">
                <img src={img} alt={project.imageCaptions?.[i] ?? `${project.title} — screenshot ${i + 1}`}
                  loading="lazy" decoding="async"
                  className="w-full h-auto bg-secondary" />
                {project.imageCaptions?.[i] && (
                  <figcaption className="px-4 py-2 text-xs text-muted-foreground border-t border-border bg-secondary/30">
                    {project.imageCaptions[i]}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* ── Case study sections ── */}
        <div className="space-y-10">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">P</span>
              Problem Statement
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </section>

          {project.dataset && (
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">D</span>
                Dataset
              </h2>
              <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-1.5 text-sm">
                <div><span className="font-medium text-foreground">Source:</span> <span className="text-muted-foreground">{project.dataset.source}</span></div>
                <div><span className="font-medium text-foreground">Size:</span> <span className="text-muted-foreground">{project.dataset.size}</span></div>
                {project.dataset.notes && (
                  <div><span className="font-medium text-foreground">Notes:</span> <span className="text-muted-foreground">{project.dataset.notes}</span></div>
                )}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">M</span>
              Methodology
            </h2>
            <ol className="space-y-3">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-mono mt-0.5">{i+1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">R</span>
              Results & Impact
            </h2>
            <ul className="space-y-2 mb-4">
              {project.impact.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-foreground">{project.result}</p>
            </div>
          </section>

          {project.challenges && (
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">C</span>
                Challenges
              </h2>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                    <span className="text-sm text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.learnings && (
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">L</span>
                Key Learnings
              </h2>
              <ul className="space-y-2">
                {project.learnings.map((l, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/50 mt-2" />
                    <span className="text-sm text-muted-foreground">{l}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.crossLinks && project.crossLinks.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">→</span>
                Related Work
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.crossLinks.map(({ label, href }) => (
                  <Link key={label} to={href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded hover:bg-secondary hover:border-primary/40 transition-all">
                    {label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Prev / Next ── */}
        <div className="mt-14 pt-6 border-t border-border flex items-center justify-between gap-4">
          {prev ? (
            <Link to={`/projects/${prev.slug}`}
              className="flex-1 flex flex-col gap-1 p-4 border border-border rounded-lg hover:border-primary/40 hover:bg-secondary/30 transition-all">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Previous</span>
              <span className="text-sm font-medium text-foreground leading-snug">{prev.title}</span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link to={`/projects/${next.slug}`}
              className="flex-1 flex flex-col gap-1 p-4 border border-border rounded-lg hover:border-primary/40 hover:bg-secondary/30 transition-all text-right">
              <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">Next <ArrowRight className="h-3 w-3" /></span>
              <span className="text-sm font-medium text-foreground leading-snug">{next.title}</span>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </Layout>
  );
}
