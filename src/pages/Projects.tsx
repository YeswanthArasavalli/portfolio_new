import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getProjectsByPriority } from "@/data/projects";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

const catColor: Record<string, string> = {
  mlops:       "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800",
  nlp:         "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
  analytics:   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  cv:          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  forecasting: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
};
const catLabel: Record<string, string> = {
  mlops:"MLOps", nlp:"NLP", analytics:"Analytics", cv:"Computer Vision", forecasting:"Time-Series"
};
const filters = ["All", "MLOps", "NLP", "Analytics", "Computer Vision", "Time-Series"];

export default function Projects() {
  const all = getProjectsByPriority();
  const [active, setActive] = useState("All");
  const visible = active === "All" ? all : all.filter((p) => catLabel[p.category] === active);

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Project Case Studies</h1>
          <p className="text-muted-foreground max-w-2xl text-sm">
            {all.length} systems across MLOps, NLP, computer vision, analytics and forecasting. Each one
            shows what I built and the evidence behind it. Where a repository is public I link it; where it is
            private or still in development I say so plainly rather than leave a broken link.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border bg-secondary/20 sticky top-14 z-10">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-3 py-1.5 text-sm rounded whitespace-nowrap transition-colors ${
                  active === f ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container max-w-6xl mx-auto px-6 py-10">
          <div className="space-y-5">
            {visible.map((project, idx) => (
              <article key={project.slug}
                className="group bg-background border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Index number */}
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-mono text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded border ${catColor[project.category]}`}>
                          {catLabel[project.category]}
                        </span>
                        {project.codeUrl ? (
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded px-2 py-0.5 hover:bg-secondary">
                            <Github className="h-3 w-3" /> GitHub
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-dashed border-border rounded px-2 py-0.5">
                            {project.repoState === "in-development" ? "In development" : "Private repository"}
                          </span>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded px-2 py-0.5 hover:bg-secondary">
                            <ExternalLink className="h-3 w-3" /> Demo
                          </a>
                        )}
                      </div>

                      <h2 className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-3xl">{project.summary}</p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.map((t) => (
                          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-accent text-accent-foreground border border-accent-foreground/10">{t}</span>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-6 mb-4 py-3 border-t border-border">
                        {project.metrics.map(({ label, value }) => (
                          <div key={label}>
                            <div className="text-sm font-semibold tabular-nums text-foreground">{value}</div>
                            <div className="text-xs text-muted-foreground">{label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                          Full Case Study <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        {project.codeUrl && (
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
                            <Github className="h-3.5 w-3.5" /> Code
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
                            <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
