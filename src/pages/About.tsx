import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, CheckCircle2, Download } from "lucide-react";

const skills = [
  { group: "Languages",        items: ["Python", "SQL", "R"] },
  { group: "ML / DL",          items: ["Scikit-learn", "PyTorch", "XGBoost", "LSTM", "DistilBERT", "EfficientNet", "TF-IDF", "Logistic Regression"] },
  { group: "MLOps",            items: ["MLflow", "Evidently", "Docker", "FastAPI", "REST APIs"] },
  { group: "Data Engineering", items: ["ETL Pipelines", "PostgreSQL", "MongoDB", "Pandas", "NumPy", "Feature Engineering"] },
  { group: "Analytics & BI",   items: ["Power BI", "Tableau", "Excel", "KPI Design", "Statistical Analysis"] },
  { group: "Cloud & Tools",    items: ["AWS", "GCP", "Azure", "Git", "Jupyter", "IBM Watson Studio", "Streamlit", "Gradio"] },
];

const principles = [
  { title: "Baseline first",       desc: "I build simple baselines before complex models, and justify complexity with measured improvements — not assumptions." },
  { title: "Metric discipline",    desc: "I select metrics that match the business cost structure. Recall over accuracy for failure detection. Precision-recall tradeoffs depend on campaign costs." },
  { title: "Beyond the notebook", desc: "Cleaning, pipelines, deployment, monitoring — each step affects whether the output is actually usable. I don't stop at the model." },
  { title: "Stakeholder clarity",  desc: "I've redefined KPI metrics with business teams and built dashboards people use. Technical work that doesn't influence decisions isn't done." },
  { title: "System reliability",   desc: "Retry logic, validation layers, quality gates, drift alerts. Models degrade silently without these. I build them in." },
  { title: "Reproducibility",      desc: "Docker, MLflow experiment tracking, versioned pipelines. If I can't hand off the work and have it run, it's not finished." },
];

export default function About() {
  return (
    <Layout>
      <section className="border-b border-border bg-background">
        <div className="container max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">About</h1>
          <p className="text-muted-foreground text-sm">Background, approach, and what I'm looking for.</p>
        </div>
      </section>

      <div className="container max-w-4xl mx-auto px-6 py-10 space-y-14">

        {/* Bio + sidebar */}
        <section>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>
                I'm Yeswanth Arasavalli — a Data Analyst and Data Scientist with an MS in Computer Science
                (Big Data Analytics) from Central University of Rajasthan. I'm based in Hyderabad and open to full-time roles.
              </p>
              <p>
                My work spans the full data workflow: SQL pipelines with window functions and CTEs, ETL automation,
                Power BI and Tableau dashboards, machine learning model development, and deployment with monitoring.
                I'm most comfortable in Python and SQL, and I've been building with MLflow, Evidently, and Docker
                to move toward production-aware ML systems.
              </p>
              <p>
                What I care about most is building things that are trustworthy — data that's clean,
                models that are monitored, and outputs that make sense to the people who use them.
              </p>

              {/* Verifiable proof points */}
              <div className="pt-2 space-y-1.5">
                {[
                  "84.9% Top-1 accuracy on 200 retail SKU categories (EfficientNet-B0)",
                  "87% LSTM validation accuracy — 2-week failure forecast horizon",
                  "25% SQL query latency reduction via window functions + indexing (Edunet)",
                  "40% manual reporting effort reduction via ETL automation (PHN Technology)",
                  "22% forecast-accuracy lift over baseline on marketing data (Postulate IRT)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="https://github.com/YeswanthArasavalli" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href="https://linkedin.com/in/yeswantharasavalli" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="mailto:maneswararasavalli@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" /> maneswararasavalli@gmail.com
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-secondary/50 border border-border rounded-lg p-4 text-sm space-y-2">
                <div className="font-medium text-foreground">Open to</div>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>· Data Analyst (primary)</li>
                  <li>· Data Scientist</li>
                  <li>· ML Engineer</li>
                </ul>
              </div>
              <div className="bg-secondary/50 border border-border rounded-lg p-4 text-sm space-y-1">
                <div className="font-medium text-foreground">Location</div>
                <div className="text-muted-foreground">Hyderabad, India</div>
                <div className="text-muted-foreground text-xs">Open to relocation</div>
              </div>
              <a href="/Yeswanth_Arasavalli_Resume.pdf" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Technical Skills</h2>
          <div className="space-y-3">
            {skills.map(({ group, items }) => (
              <div key={group} className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="w-28 text-xs font-medium text-muted-foreground flex-shrink-0">{group}</span>
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
        </section>

        {/* Working principles */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">How I Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map(({ title, desc }) => (
              <div key={title} className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border pt-8">
          <p className="text-muted-foreground mb-4 text-sm">
            Looking for a data analyst, data scientist, or ML engineer? Get in touch or explore the project case studies.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              Contact me <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
              View Projects
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
