import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";

const experience = [
  {
    company: "Telus International",
    role: "AI Data Annotation Specialist & Prompt Engineer",
    type: "Freelance",
    period: "Feb 2024 – Present",
    location: "Remote",
    summary: "QA review of NLP and computer vision annotation batches for model training datasets. Prompt engineering for generative AI evaluation tasks.",
    contributions: [
      "Performed QA review for NLP and CV annotation batches — resolved ambiguous edge cases and documented labelling rules to reduce inconsistency across review cycles",
      "Evaluated prompt variants for generative AI tasks, tracked output quality across iterations, and identified recurring failure patterns to improve response consistency",
      "Flagged systematic labelling errors across batches and proposed structural fixes to improve training data quality before model ingestion",
    ],
    tools: ["NLP Annotation", "Computer Vision QA", "Prompt Engineering", "Data Quality"],
    dataVolume: "Large-scale NLP + CV datasets across multiple annotation cycles",
    impact: null,
    crossLinks: [],
  },
  {
    company: "Postulate IRT",
    role: "Data Science Intern",
    type: "Internship",
    period: "Jan 2024 – Feb 2024",
    location: "India",
    summary: "Data cleaning of 150K+ NLP speech records, forecasting model benchmarking for marketing analytics, Tableau dashboard delivery.",
    contributions: [
      "Cleaned and standardised 150K+ NLP speech records in Python — resolved missing values, encoding issues, and schema mismatches causing 30% of downstream pipeline failures",
      "Built and benchmarked Ridge, XGBoost, and ARIMA forecasting models for marketing data; XGBoost outperformed the baseline by 22% on the primary validation metric",
      "Delivered Tableau dashboards with calculated KPI fields and drill-through filters for marketing and operations stakeholders, reducing weekly reporting turnaround from two days to same-day",
      "Established interpretable baselines before deploying complex models — assessed data readiness and business justification at each modelling stage",
    ],
    tools: ["Python", "Pandas", "XGBoost", "ARIMA", "Ridge Regression", "Tableau", "NLP"],
    dataVolume: "150,000+ NLP speech records",
    impact: "30% improvement in data integrity · 22% forecast accuracy improvement over baseline",
    crossLinks: [
      { label: "Related: NLP / AI Hiring Platform", href: "/projects/ai-hiring-intelligence-platform" },
    ],
  },
  {
    company: "Edunet Foundation",
    role: "Data Analyst Intern",
    type: "Internship",
    period: "Jul 2023 – Jan 2024",
    location: "India",
    summary: "SQL pipeline design with CTEs and window functions, customer segmentation modelling, Power BI KPI dashboard delivery, and stakeholder-aligned metric redefinition.",
    contributions: [
      "Wrote SQL pipelines using CTEs and window functions to consolidate data from cloud and on-prem sources — reduced query runtime by 25% through indexing and query restructuring",
      "Built customer segmentation models using tree-based classifiers (Random Forest, Decision Tree), evaluated on precision/recall/F1, and delivered segment definitions to the business team for downstream use",
      "Built Power BI dashboards tracking operational KPIs with drill-through views and trend indicators — adopted for weekly reporting cycles across business and cross-functional teams",
      "Worked with stakeholders to redefine two KPI metrics measured in ways that didn't reflect actual business behaviour — increased dashboard adoption and stakeholder trust",
    ],
    tools: ["Python", "SQL (CTEs, Window Functions)", "Power BI", "Scikit-learn", "Random Forest"],
    dataVolume: "Multi-source cloud and on-prem data pipelines",
    impact: "25% query latency reduction · KPI redefinition improved dashboard adoption",
    crossLinks: [
      { label: "SQL examples from this role", href: "/sql" },
      { label: "Related: Sreejita Framework", href: "/projects/sreejita-framework" },
    ],
  },
  {
    company: "PHN Technology Pvt. Ltd.",
    role: "Data Science Intern",
    type: "Internship",
    period: "Apr 2023 – Jul 2023",
    location: "India",
    summary: "ETL automation replacing 3-4 hours/week of manual exports, Tableau/Excel dashboard delivery cutting reporting effort by 40%, and R statistical model deployment via IBM Watson Studio.",
    contributions: [
      "Automated ETL scripts for log data ingestion using Python and SQL, replacing manual exports that took 3–4 hours per week and improving pipeline reliability",
      "Built Tableau and Excel reports that cut manual reporting effort by 40% by standardising data pulls and templating recurring report layouts",
      "Built and deployed R-based statistical models through IBM Watson Studio to support repeatable internal analytics workflows",
      "Evaluated deployment feasibility and maintenance requirements before model rollout — prioritised interpretable, stable solutions over complex models with high maintenance overhead",
    ],
    tools: ["Python", "SQL", "R", "Tableau", "Excel", "IBM Watson Studio", "ETL"],
    dataVolume: "Large-scale log datasets (batch processing)",
    impact: "40% reduction in manual reporting effort · ETL automation saved 3–4 hours/week",
    crossLinks: [],
  },
];

const education = [
  {
    degree: "M.S. Computer Science — Big Data Analytics",
    institution: "Central University of Rajasthan, Ajmer",
    period: "2021 – 2023",
    gpa: "7.3 / 10",
    coursework: ["Machine Learning", "Data Mining", "Statistical Analysis", "Big Data Analytics", "Operations Management"],
    capstone: "Churn prediction — XGBoost + Random Forest ensemble, 88% accuracy on 200K+ telecom records",
  },
  {
    degree: "B.S. Computer Science",
    institution: "Adikavi Nannaya University, Rajahmundry",
    period: "2018 – 2021",
    gpa: "8.37 / 10",
    coursework: ["Data Structures", "DBMS", "SQL", "Mathematics", "Excel"],
    capstone: null,
  },
];

const certifications = [
  { name: "Microsoft Fabric Analytics Engineer Associate", issuer: "Microsoft", year: "2026" },
  { name: "Google Advanced Data Analytics", issuer: "Coursera", year: "2023" },
  { name: "Data Science Specialisation", issuer: "Johns Hopkins University · Coursera", year: "2023" },
  { name: "Machine Learning / AI Engineer", issuer: "Skillsoft & Infosys Springboard", year: "2023" },
  { name: "MongoDB Python Developer Associate", issuer: "MongoDB University", year: "2023" },
  { name: "Microsoft Power BI", issuer: "Infosys Springboard", year: "2023" },
];

const typeBadge: Record<string, string> = {
  Freelance:  "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300",
  Internship: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300",
};

export default function Experience() {
  return (
    <Layout>
      <section className="border-b border-border bg-background">
        <div className="container max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Experience</h1>
              <p className="text-muted-foreground max-w-xl text-sm">
                Internship and freelance work across data engineering, analytics, NLP, and applied ML.
                Each role links to the projects and SQL work it informed.
              </p>
            </div>
            <a href="/Yeswanth_Arasavalli_Resume.pdf" download
              onClick={() => (window as any).gtag?.("event","resume_download",{event_category:"engagement"})}
              className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors">
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </div>
      </section>

      <div className="container max-w-4xl mx-auto px-6 py-10 space-y-16">

        {/* Work */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.company} className="bg-background border border-border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-base">{exp.role}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{exp.company}</span>
                      <span>·</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${typeBadge[exp.type]}`}>{exp.type}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0 sm:text-right">
                    <div className="font-medium">{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{exp.summary}</p>

                {exp.dataVolume && (
                  <div className="mb-3 inline-block text-xs font-mono bg-secondary px-3 py-1.5 rounded border border-border text-muted-foreground">
                    Data: {exp.dataVolume}
                  </div>
                )}

                <ul className="space-y-2 mb-4">
                  {exp.contributions.map((c, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/50 mt-2" />
                      <span className="text-sm text-muted-foreground">{c}</span>
                    </li>
                  ))}
                </ul>

                {exp.impact && (
                  <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded text-sm font-medium text-foreground">
                    ↗ {exp.impact}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {exp.tools.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-accent text-accent-foreground border border-accent-foreground/10">{t}</span>
                  ))}
                </div>

                {exp.crossLinks && exp.crossLinks.length > 0 && (
                  <div className="pt-3 border-t border-border flex flex-wrap gap-2">
                    {exp.crossLinks.map(({ label, href }) => (
                      <Link key={label} to={href}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        {label} <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.degree} className="bg-background border border-border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-right flex-shrink-0">
                    <div>{edu.period}</div>
                    <div className="font-semibold text-foreground mt-0.5">GPA {edu.gpa}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {edu.coursework.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 bg-secondary rounded border border-border text-muted-foreground">{c}</span>
                  ))}
                </div>
                {edu.capstone && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Capstone: </span>{edu.capstone}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Certifications</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-start gap-3 bg-background border border-border rounded-lg p-4">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <div>
                  <div className="text-sm font-medium text-foreground">{cert.name}</div>
                  <div className="text-xs text-muted-foreground">{cert.issuer} · {cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground mb-4 text-sm">Looking for a Data Analyst, Data Scientist, or ML Engineer? Get in touch or view the full project case studies.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              Get in touch
            </Link>
            <Link to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
              View Projects
            </Link>
            <a href="/Yeswanth_Arasavalli_Resume.pdf" download
              onClick={() => (window as any).gtag?.("event","resume_download",{event_category:"engagement"})}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm border border-border rounded hover:bg-secondary transition-colors">
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
