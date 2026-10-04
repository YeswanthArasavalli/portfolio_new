import { Layout } from "@/components/layout/Layout";
import { Mail, Linkedin, Github, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <Layout>
      <section className="border-b border-border bg-background">
        <div className="container max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Open to Data Analyst, Data Scientist, and ML Engineer roles. Email is fastest for role discussions.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Left: contact methods */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Direct Contact</h2>

            <a href="mailto:maneswararasavalli@gmail.com"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/40 hover:bg-secondary/30 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Email</div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">maneswararasavalli@gmail.com</div>
              </div>
            </a>

            <a href="https://linkedin.com/in/yeswantharasavalli" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/40 hover:bg-secondary/30 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Linkedin className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">LinkedIn</div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">linkedin.com/in/yeswantharasavalli</div>
              </div>
            </a>

            <a href="https://github.com/YeswanthArasavalli" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/40 hover:bg-secondary/30 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Github className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">GitHub</div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">github.com/YeswanthArasavalli</div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-secondary/10">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Location</div>
                <div className="text-sm text-muted-foreground">Hyderabad, India · Open to relocation</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium bg-secondary text-foreground rounded border border-border mt-2">
              Resume available on request — email me and I'll send the current version.
            </div>
          </div>

          {/* Right: availability */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Availability</h2>

            <div className="p-5 border border-border rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-foreground">Available for full-time roles</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Actively looking for Data Analyst, Data Scientist, and ML Engineer positions.
                Available to start immediately.
              </p>
            </div>

            <div className="p-5 border border-border rounded-lg space-y-3 bg-secondary/20">
              <h3 className="text-sm font-medium text-foreground">What I'm looking for</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">·</span>Roles across data, analysis, and modelling</li>
                <li className="flex gap-2"><span className="text-primary">·</span>Teams that value data quality and reproducibility</li>
                <li className="flex gap-2"><span className="text-primary">·</span>Work that connects technical output to decisions</li>
                <li className="flex gap-2"><span className="text-primary">·</span>Analytics firms, AI startups, product companies</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-lg space-y-2">
              <h3 className="text-sm font-medium text-foreground">Response time</h3>
              <p className="text-sm text-muted-foreground">
                I respond to email and LinkedIn within 24–48 hours.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg bg-secondary/10">
              <p className="text-xs text-muted-foreground mb-3">Explore more before reaching out:</p>
              <div className="flex flex-col gap-2">
                <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  Project case studies <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/experience" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  Internship experience <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/sql" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  SQL proficiency <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
