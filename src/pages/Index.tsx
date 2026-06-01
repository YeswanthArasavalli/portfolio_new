import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight, Download, Github, Linkedin,
  Terminal, Database, BarChart3, Brain, Server, GitBranch,
  TrendingUp, CheckCircle2
} from "lucide-react";
import { getProjectsByPriority } from "@/data/projects";

/* ── Skills ─────────────────────────────────────────── */
const skills = [
  { group: "Languages",     items: ["Python", "SQL", "R"] },
  { group: "ML / DL",       items: ["Scikit-learn", "PyTorch", "XGBoost", "LSTM", "DistilBERT", "EfficientNet"] },
  { group: "MLOps",         items: ["MLflow", "Evidently", "Docker", "FastAPI"] },
  { group: "Analytics",     items: ["Power BI", "Tableau", "Excel", "KPI Design"] },
  { group: "Data Eng.",     items: ["PostgreSQL", "ETL Pipelines", "MongoDB", "Pandas"] },
  { group: "Cloud",         items: ["AWS", "GCP", "Azure"] },
];

/* ── Credibility stats (only verifiable numbers) ────── */
const stats = [
  { value: "87%",  label: "LSTM validation accuracy (Predictive Maintenance)" },
  { value: "84.9%",label: "EfficientNet Top-1 accuracy (Retail CV, +8.9pp vs baseline)" },
  { value: "150K+",label: "NLP records cleaned & validated (Postulate IRT)" },
  { value: "80+",  label: "Automated tests written (Hiring Platform)" },
  { value: "25%",  label: "Query latency reduction via SQL optimisation (Edunet)" },
  { value: "40%",  label: "Manual reporting effort cut (PHN Technology)" },
];

/* ── Category colours ────────────────────────────────── */
const catColor: Record<string, string> = {
  mlops:       "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800",
  nlp:         "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
  analytics:   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  cv:          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  forecasting: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
};
const catLabel: Record<string, string> = {
  mlops: "MLOps", nlp: "NLP", analytics: "Analytics",
  cv: "Computer Vision", forecasting: "Time-Series",
};

/* ── Capability cards ────────────────────────────────── */
const capabilities = [
  { icon: Database,   title: "SQL & Data Engineering",     desc: "CTEs, window functions, query optimisation, ETL pipelines, PostgreSQL schema design, 25% latency reduction at Edunet." },
  { icon: BarChart3,  title: "Analytics & BI",             desc: "Power BI and Tableau dashboards, KPI design with business stakeholders, 40% reporting effort reduction at PHN." },
  { icon: Brain,      title: "Machine Learning",           desc: "Classification, NLP, CV, time-series. Baseline-first. Metric selection aligned to business cost (recall for failures, not accuracy)." },
  { icon: Server,     title: "MLOps & Deployment",         desc: "MLflow experiment tracking, Evidently drift detection, FastAPI inference service, Docker containerisation, PostgreSQL audit logs." },
  { icon: Terminal,   title: "Backend & APIs",             desc: "FastAPI REST services, async worker queues with retry and dead-letter handling, 80+ automated tests." },
  { icon: GitBranch,  title: "System Design",              desc: "Modular pipeline architecture, validation and governance layers, observability, reproducible Docker environments." },
];

/* ══════════════════════════════════════════════════════ */
export default function Index() {
  const featured = getProjectsByPriority().slice(0, 3);

  return (
    <Layout>

      {/* ━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">

            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/60 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to full-time roles · Hyderabad, India
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
              Yeswanth Arasavalli
            </h1>

            {/* Role badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Data Analyst", "Data Scientist", "ML Engineer"].map((r) => (
                <span key={r} className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">{r}</span>
              ))}
            </div>

            {/* Concrete positioning — no vague statements */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-3 max-w-2xl">
              MS in Big Data Analytics. I build production-aware data systems —
              <span className="text-foreground font-medium"> ML monitoring pipelines</span>,{" "}
              <span className="text-foreground font-medium">NLP APIs with async workers</span>,{" "}
              <span className="text-foreground font-medium">SQL analytics with window functions</span>, and{" "}
              <span className="text-foreground font-medium">BI dashboards stakeholders trust</span>.
            </p>

            {/* Credibility proof strip */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-8 text-sm text-muted-foreground">
              {[
                "84.9% CV accuracy on 200 SKU categories",
                "87% LSTM forecast accuracy",
                "80+ tests in production-grade hiring API",
                "25% SQL latency reduction at Edunet"
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="/Yeswanth_Arasavalli_Resume.pdf" download
                onClick={() => (window as any).gtag?.("event","resume_download",{event_category:"engagement"})}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors">
                <Download className="h-4 w-4" /> Resume
              </a>
              <a href="https://github.com/YeswanthArasavalli" target="_blank" rel="noopener noreferrer"
                onClick={() => (window as any).gtag?.("event","github_click",{event_category:"engagement"})}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/yeswanth-arasavalli" target="_blank" rel="noopener noreferrer"
                onClick={() => (window as any).gtag?.("event","linkedin_click",{event_category:"engagement"})}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ STATS ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Measured outcomes — all numbers are verifiable
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-background px-5 py-5">
                <div className="text-2xl font-bold tabular-nums tracking-tight text-foreground mb-1">{value}</div>
                <div className="text-xs text-muted-foreground leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ SKILLS ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Technical Skills</h2>
          <div className="space-y-3">
            {skills.map(({ group, items }) => (
              <div key={group} className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="w-24 text-xs font-medium text-muted-foreground flex-shrink-0">{group}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-accent text-accent-foreground border border-accent-foreground/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ FEATURED PROJECTS ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Featured Projects</h2>
              <p className="text-sm text-muted-foreground">Full case studies with architecture, metrics, and GitHub links.</p>
            </div>
            <Link to="/projects" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              All 5 projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`}
                className="group flex flex-col bg-background border border-border rounded-lg p-5 hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border ${catColor[project.category]}`}>
                    {catLabel[project.category]}
                  </span>
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <h3 className="font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors text-sm">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 flex-grow leading-relaxed">{project.summary}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-accent text-accent-foreground border border-accent-foreground/10">{t}</span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-accent text-accent-foreground border border-accent-foreground/10">+{project.techStack.length - 4}</span>
                  )}
                </div>

                <div className="mt-auto pt-3 border-t border-border grid grid-cols-2 gap-2">
                  {project.metrics.slice(0, 2).map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-sm font-semibold tabular-nums text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ CAPABILITIES ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">What I Work On</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-accent flex items-center justify-center mt-0.5">
                  <Icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1 text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ INTERNSHIP PROOF STRIP ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Experience Highlights</h2>
            <Link to="/experience" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Full details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { company: "Telus International", role: "AI Annotation & Prompt Eng.", period: "Feb 2024–Present", highlight: "NLP + CV dataset QA, prompt optimisation" },
              { company: "Postulate IRT",        role: "Data Science Intern",         period: "Jan–Feb 2024",      highlight: "150K+ records cleaned · 22% forecast lift" },
              { company: "Edunet Foundation",    role: "Data Analyst Intern",          period: "Jul 2023–Jan 2024", highlight: "SQL pipelines · Power BI · KPI redesign" },
              { company: "PHN Technology",       role: "Data Science Intern",          period: "Apr–Jul 2023",      highlight: "ETL automation · 40% reporting reduction" },
            ].map(({ company, role, period, highlight }) => (
              <div key={company} className="bg-background border border-border rounded-lg p-4">
                <div className="font-medium text-foreground text-sm mb-0.5">{company}</div>
                <div className="text-xs text-muted-foreground mb-1">{role}</div>
                <div className="text-xs text-muted-foreground mb-2">{period}</div>
                <div className="text-xs text-primary font-medium">{highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ SQL PROOF STRIP ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">SQL Proficiency</h2>
              <p className="text-xs text-muted-foreground">Real queries from analytics work — window functions, CTEs, query optimisation.</p>
            </div>
            <Link to="/sql" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              See all examples <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {/* Mini SQL teaser */}
          <div className="bg-slate-950 dark:bg-slate-900 rounded-lg overflow-hidden border border-border">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">25% latency reduction — Edunet Foundation</span>
            </div>
            <pre className="p-4 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto">{`-- AFTER: Window function replaces correlated subquery
-- Result: 8.3s → 2.1s (75% improvement on 2M-row table)
WITH recent_orders AS (
    SELECT order_id, customer_id, order_date, revenue
    FROM orders
    WHERE order_date >= '2024-01-01'   -- predicate pushed early
)
SELECT
    order_id, customer_id, order_date, revenue,
    ROUND(AVG(revenue) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
        RANGE BETWEEN INTERVAL '90 days' PRECEDING AND CURRENT ROW
    ), 2) AS rolling_90d_avg
FROM recent_orders;`}</pre>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ CTA ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-14">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Open to Data Analyst, Data Scientist, and ML Engineer roles.
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Based in Hyderabad. Available for full-time positions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/experience"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
                View Experience
              </Link>
              <a href="/Yeswanth_Arasavalli_Resume.pdf" download
                onClick={() => (window as any).gtag?.("event","resume_download",{event_category:"engagement"})}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
