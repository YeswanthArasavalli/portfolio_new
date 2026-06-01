import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getProjectBySlug, getProjectsByPriority } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink, CheckCircle, ArrowRight } from "lucide-react";

const catColor: Record<string,string> = {
  mlops:       "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800",
  nlp:         "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
  analytics:   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  cv:          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  forecasting: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
};
const catLabel: Record<string,string> = {
  mlops:"MLOps", nlp:"NLP", analytics:"Analytics", cv:"Computer Vision", forecasting:"Time-Series"
};

/* ── Inline SVG architecture diagrams per project ─── */
function MLOpsDiagram() {
  return (
    <div className="bg-slate-950 rounded-lg p-5 font-mono text-xs overflow-x-auto">
      <div className="text-slate-400 mb-3 text-[11px] uppercase tracking-widest">System Architecture</div>
      <div className="space-y-0">
        {[
          { box: "Training Pipeline",  detail: "Scikit-learn · ColumnTransformers · schema validation",  color: "border-violet-500 text-violet-300" },
          { arrow: "↓ artifacts" },
          { box: "MLflow",             detail: "Experiment tracking · Model Registry · version tags",    color: "border-blue-500 text-blue-300" },
          { arrow: "↓ load by version tag" },
          { box: "FastAPI Service",    detail: "REST endpoints · /health · /metrics · Docker",          color: "border-green-500 text-green-300" },
          { arrow: "↓ log predictions" },
          { box: "PostgreSQL",         detail: "Prediction logs · latency · input/output audit trail",  color: "border-yellow-500 text-yellow-300" },
          { arrow: "↓ read logs" },
          { box: "Evidently",          detail: "PSI · KS-test · drift reports · threshold alerts",      color: "border-orange-500 text-orange-300" },
          { arrow: "↓ visualise" },
          { box: "Streamlit Dashboard",detail: "Prediction volume · latency trends · drift summaries",  color: "border-pink-500 text-pink-300" },
        ].map((row, i) => (
          "arrow" in row ? (
            <div key={i} className="text-slate-600 pl-6 py-0.5">{row.arrow}</div>
          ) : (
            <div key={i} className={`border rounded px-3 py-2 ${row.color}`}>
              <span className="font-semibold">{row.box}</span>
              <span className="text-slate-400 ml-2 text-[11px]">{row.detail}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function HiringPlatformDiagram() {
  return (
    <div className="bg-slate-950 rounded-lg p-5 font-mono text-xs overflow-x-auto">
      <div className="text-slate-400 mb-3 text-[11px] uppercase tracking-widest">Backend Architecture</div>
      <div className="grid grid-cols-1 gap-0">
        {[
          { label: "FastAPI Layer",        detail: "POST /analyse · request validation · structured errors",   color: "border-blue-500 text-blue-300" },
          { arrow: "↓ enqueue" },
          { label: "Worker Queue",         detail: "Async workers · retry w/ backoff · dead-letter routing",  color: "border-violet-500 text-violet-300" },
          { arrow: "↓ pipeline stages" },
          { label: "Ingestion",            detail: "PDF/text parse · field extraction · normalisation",       color: "border-slate-400 text-slate-300" },
          { label: "Validation",           detail: "Contradiction checks · rollback on failure",              color: "border-slate-400 text-slate-300" },
          { label: "Scoring",              detail: "Keyword alignment · section completeness · grading",      color: "border-slate-400 text-slate-300" },
          { label: "Storage",              detail: "PostgreSQL · job lifecycle · scores · audit trail",       color: "border-green-500 text-green-300" },
          { arrow: "↓ 80+ tests" },
          { label: "Test Suite",           detail: "Unit + integration · scoring fns · retry paths",         color: "border-yellow-500 text-yellow-300" },
        ].map((row, i) => (
          "arrow" in row ? (
            <div key={i} className="text-slate-600 pl-6 py-0.5">{row.arrow}</div>
          ) : (
            <div key={i} className={`border rounded px-3 py-2 mb-0.5 ${row.color}`}>
              <span className="font-semibold">{row.label}</span>
              <span className="text-slate-400 ml-2 text-[11px]">{row.detail}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function SreejitaDiagram() {
  return (
    <div className="bg-slate-950 rounded-lg p-5 font-mono text-xs overflow-x-auto">
      <div className="text-slate-400 mb-3 text-[11px] uppercase tracking-widest">Framework Architecture</div>
      <div className="space-y-0">
        {[
          { box: "Input",              detail: "CSV / JSON structured dataset",                                     color: "border-slate-400 text-slate-300" },
          { arrow: "↓ domain detection" },
          { box: "Domain Router",      detail: "Column signature matching → Healthcare · Finance · Retail · HR · Supply Chain", color: "border-blue-500 text-blue-300" },
          { arrow: "↓ domain module" },
          { box: "KPI Engine",         detail: "Domain-specific KPI computation · trend analysis · anomaly checks", color: "border-violet-500 text-violet-300" },
          { arrow: "↓ quality gate" },
          { box: "Governance Layer",   detail: "Plausibility range validation · per-stage checks · alert log",      color: "border-orange-500 text-orange-300" },
          { arrow: "↓ render" },
          { box: "PDF Report",         detail: "KPI summaries · benchmarks · trend charts · action items",          color: "border-green-500 text-green-300" },
          { box: "Streamlit Dashboard",detail: "Interactive workflow · real-time preview · domain switching",        color: "border-pink-500 text-pink-300" },
        ].map((row, i) => (
          "arrow" in row ? (
            <div key={i} className="text-slate-600 pl-6 py-0.5">{row.arrow}</div>
          ) : (
            <div key={i} className={`border rounded px-3 py-2 mb-0.5 ${row.color}`}>
              <span className="font-semibold">{row.box}</span>
              <span className="text-slate-400 ml-2 text-[11px]">{row.detail}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function RetailCVDiagram() {
  return (
    <div className="bg-slate-950 rounded-lg p-5 font-mono text-xs overflow-x-auto">
      <div className="text-slate-400 mb-3 text-[11px] uppercase tracking-widest">Training & Deployment Pipeline</div>
      <div className="space-y-0">
        {[
          { box: "RPC Dataset",        detail: "~200 SKU categories · preprocessed · normalised",                   color: "border-slate-400 text-slate-300" },
          { arrow: "↓ augmentation" },
          { box: "Data Augmentation",  detail: "Progressive augmentation · random crops · horizontal flip",         color: "border-blue-500 text-blue-300" },
          { arrow: "↓ fine-tune" },
          { box: "EfficientNet-B0",    detail: "Transfer learning · mixed-precision GPU · ImageNet weights",         color: "border-violet-500 text-violet-300" },
          { arrow: "↓ track experiments" },
          { box: "MLflow",             detail: "LR schedules vs augmentation strategies · 3 best checkpoints kept",  color: "border-yellow-500 text-yellow-300" },
          { arrow: "↓ evaluate" },
          { box: "Evaluation",         detail: "Top-1: 84.9% · Precision: 0.83 · Recall: 0.82 (vs ResNet-18: 76%)", color: "border-green-500 text-green-300" },
          { arrow: "↓ serve" },
          { box: "Streamlit App",      detail: "Upload image → top-3 predictions + confidence · <200ms CPU latency", color: "border-pink-500 text-pink-300" },
        ].map((row, i) => (
          "arrow" in row ? (
            <div key={i} className="text-slate-600 pl-6 py-0.5">{row.arrow}</div>
          ) : (
            <div key={i} className={`border rounded px-3 py-2 mb-0.5 ${row.color}`}>
              <span className="font-semibold">{row.box}</span>
              <span className="text-slate-400 ml-2 text-[11px]">{row.detail}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function PredMainDiagram() {
  return (
    <div className="bg-slate-950 rounded-lg p-5 font-mono text-xs overflow-x-auto">
      <div className="text-slate-400 mb-3 text-[11px] uppercase tracking-widest">LSTM Forecasting Pipeline</div>
      <div className="space-y-0">
        {[
          { box: "Sensor Data",        detail: "Multivariate time-series · multiple machines · raw readings",       color: "border-slate-400 text-slate-300" },
          { arrow: "↓ feature engineering" },
          { box: "Preprocessing",      detail: "Sequence windowing · feature normalisation · class balancing",      color: "border-blue-500 text-blue-300" },
          { arrow: "↓ train" },
          { box: "LSTM Model",         detail: "PyTorch · early stopping · gradient clipping · multi-step ahead",   color: "border-violet-500 text-violet-300" },
          { arrow: "↓ benchmark" },
          { box: "Baseline Comparison",detail: "LSTM vs ARIMA vs GBM — LSTM wins on failure recall (critical)",     color: "border-yellow-500 text-yellow-300" },
          { arrow: "↓ evaluate" },
          { box: "Results",            detail: "87% validation accuracy · 2-week forecast horizon",                 color: "border-green-500 text-green-300" },
          { arrow: "↓ translate" },
          { box: "Business Framing",   detail: "Directional ~$1.15M/yr estimate via published downtime benchmarks", color: "border-orange-500 text-orange-300" },
        ].map((row, i) => (
          "arrow" in row ? (
            <div key={i} className="text-slate-600 pl-6 py-0.5">{row.arrow}</div>
          ) : (
            <div key={i} className={`border rounded px-3 py-2 mb-0.5 ${row.color}`}>
              <span className="font-semibold">{row.box}</span>
              <span className="text-slate-400 ml-2 text-[11px]">{row.detail}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const diagrams: Record<string, React.ReactNode> = {
  "ml-monitoring-platform":            <MLOpsDiagram />,
  "ai-hiring-intelligence-platform":   <HiringPlatformDiagram />,
  "sreejita-framework":                <SreejitaDiagram />,
  "retail-product-image-recognition":  <RetailCVDiagram />,
  "predictive-maintenance-forecasting":<PredMainDiagram />,
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
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border mb-3 ${catColor[project.category]}`}>
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
                onClick={() => (window as any).gtag?.("event","github_click",{event_category:"engagement",project:project.slug})}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors">
                <Github className="h-4 w-4" /> GitHub Repository
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* ── Metrics band ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-10">
          {project.metrics.map(({ label, value }) => (
            <div key={label} className="bg-background px-4 py-4 text-center">
              <div className="text-2xl font-bold tabular-nums text-foreground mb-1">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Architecture Diagram ── */}
        {diagrams[project.slug] && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Architecture Diagram</h2>
            {diagrams[project.slug]}
          </div>
        )}

        {/* ── Real images (if not placeholder) ── */}
        {project.images.some((img) => !img.includes("placeholder")) && (
          <div className="mb-10 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Screenshots</h2>
            {project.images.filter((img) => !img.includes("placeholder")).map((img, i) => (
              <figure key={i} className="border border-border rounded-lg overflow-hidden">
                <img src={img} alt={project.imageCaptions?.[i] ?? project.title}
                  className="w-full object-contain max-h-96 bg-secondary" />
                {project.imageCaptions?.[i] && (
                  <figcaption className="px-4 py-2 text-xs text-muted-foreground border-t border-border bg-secondary/30">
                    {project.imageCaptions[i]}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* ── Case study body ── */}
        <div className="space-y-10">

          {/* Problem */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-mono text-accent-foreground flex-shrink-0">P</span>
              Problem Statement
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </section>

          {/* Dataset */}
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

          {/* Methodology */}
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

          {/* Results */}
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

          {/* Challenges */}
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

          {/* Learnings */}
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

          {/* Cross-links */}
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

        {/* ── Prev / Next navigation ── */}
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
