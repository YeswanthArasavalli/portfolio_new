import { useState, type ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight } from "lucide-react";

import { examples } from "@/data/sqlExamples";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => {
      try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard API unavailable (e.g. insecure context) */ }
    }}
    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-code-edge rounded hover:bg-code-line transition-colors text-code-muted">
      {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ── SQL syntax highlighting — uses the documented .sql-* vocabulary in index.css ── */
const SQL_KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "GROUP", "BY",
  "HAVING", "WITH", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "AND", "OR", "NOT", "IN",
  "IS", "NULL", "DISTINCT", "OVER", "PARTITION", "ROWS", "RANGE", "BETWEEN", "UNBOUNDED",
  "PRECEDING", "FOLLOWING", "CURRENT", "ROW", "CREATE", "INDEX", "CONCURRENTLY", "ORDER",
  "DESC", "ASC", "USING", "LIMIT", "FILTER", "INTERVAL",
]);
const SQL_FUNCTIONS = new Set([
  "AVG", "SUM", "COUNT", "MIN", "MAX", "ROUND", "DATE_TRUNC", "DATE_PART", "NTILE", "LAG",
  "LEAD", "NOW", "NULLIF", "AGE", "EXTRACT", "COALESCE",
]);

function highlightSQL(code: string): ReactNode[] {
  return code.split("\n").flatMap((line, li) => {
    const nodes: ReactNode[] = [];
    const cut = line.indexOf("--");
    const codePart = cut >= 0 ? line.slice(0, cut) : line;
    const commentPart = cut >= 0 ? line.slice(cut) : null;
    const re = /'[^']*'|[A-Za-z_][A-Za-z0-9_]*/g;
    let m: RegExpExecArray | null;
    let last = 0;
    let ti = 0;
    while ((m = re.exec(codePart)) !== null) {
      if (m.index > last) nodes.push(codePart.slice(last, m.index));
      const tok = m[0];
      if (tok.startsWith("'")) {
        nodes.push(<span key={`s${li}-${ti++}`} className="sql-string">{tok}</span>);
      } else if (SQL_FUNCTIONS.has(tok)) {
        nodes.push(<span key={`f${li}-${ti++}`} className="sql-function">{tok}</span>);
      } else if (SQL_KEYWORDS.has(tok)) {
        nodes.push(<span key={`k${li}-${ti++}`} className="sql-keyword">{tok}</span>);
      } else {
        nodes.push(tok);
      }
      last = re.lastIndex;
    }
    if (last < codePart.length) nodes.push(codePart.slice(last));
    if (commentPart) nodes.push(<span key={`c${li}`} className="sql-comment">{commentPart}</span>);
    nodes.push("\n");
    return nodes;
  });
}

export default function SQLShowcase() {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? examples.filter((e) => e.id === active) : examples;

  return (
    <Layout>
      <section className="border-b border-border bg-background">
        <div className="container max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">SQL Proficiency</h1>
          <p className="text-muted-foreground max-w-2xl text-sm">
            Real queries from analytics and data engineering work — each with a business problem, schema context, and explanation of what's happening.
            Not interview prep: actual work from Edunet, Postulate IRT, and PHN Technology.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: "/experience", label: "← Edunet Foundation" },
              { href: "/experience", label: "← Postulate IRT" },
              { href: "/projects/sreejita-framework", label: "← Sreejita Framework" },
              { href: "/projects/ml-monitoring-platform", label: "← ML Monitoring Platform" },
            ].map(({ href, label }) => (
              <Link key={label} to={href}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                {label} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border bg-secondary/20 sticky top-14 z-10">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            <button onClick={() => setActive(null)}
              className={`px-3 py-1.5 text-sm rounded whitespace-nowrap transition-colors ${!active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              All ({examples.length})
            </button>
            {examples.map((ex) => (
              <button key={ex.id} onClick={() => setActive(active === ex.id ? null : ex.id)}
                className={`px-3 py-1.5 text-sm rounded whitespace-nowrap transition-colors ${active === ex.id ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {ex.concepts[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container max-w-5xl mx-auto px-6 py-10">
          <div className="space-y-10">
            {visible.map((ex) => (
              <div key={ex.id} className="border border-border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-border bg-secondary/30">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <h2 className="font-semibold text-foreground mb-1">{ex.title}</h2>
                      <p className="text-xs text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Origin:</span> {ex.origin}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">{ex.businessProblem}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ex.concepts.map((c) => (
                          <span key={c} className="text-xs font-mono px-2 py-0.5 bg-primary/10 text-primary rounded border border-primary/20">{c}</span>
                        ))}
                      </div>
                    </div>
                    <CopyButton code={ex.sql} />
                  </div>
                </div>

                {/* Schema (if present) */}
                {ex.schema && (
                  <div className="px-5 py-3 border-b border-border bg-code-surface/50">
                    <div className="text-xs text-code-muted font-mono mb-1 uppercase tracking-wider">Schema</div>
                    <pre className="text-xs text-code-text font-mono">{ex.schema}</pre>
                  </div>
                )}

                {/* SQL */}
                <div className="bg-code-bg">
                  <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                    <code className="text-code-fg font-mono">{highlightSQL(ex.sql)}</code>
                  </pre>
                </div>

                {/* Explanation */}
                <div className="px-5 py-4 border-t border-border bg-background">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">What's happening & why it matters</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ex.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
