import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight } from "lucide-react";

interface SQLEx {
  id: string;
  title: string;
  origin: string;        // where this came from
  businessProblem: string;
  schema?: string;
  sql: string;
  insight: string;
  concepts: string[];
}

const examples: SQLEx[] = [
  {
    id: "query-optimisation",
    title: "Query Optimisation — 75% Latency Reduction",
    origin: "Edunet Foundation internship",
    businessProblem: "A reporting query on a 2M-row orders table was taking 8+ seconds, blocking the daily pipeline. The root cause was a correlated subquery recomputed for every output row.",
    schema: `orders (order_id, customer_id, order_date, revenue, loaded_at)
-- Index added: CREATE INDEX CONCURRENTLY idx_orders_cust_date ON orders(customer_id, order_date)`,
    sql: `-- ❌ BEFORE: Correlated subquery — O(n²), recomputes per row
SELECT
    order_id, customer_id, order_date, revenue,
    (SELECT AVG(revenue) FROM orders o2
     WHERE o2.customer_id = o.customer_id
       AND o2.order_date >= o.order_date - INTERVAL '90 days'
    ) AS rolling_90d_avg          -- executes once per row
FROM orders o
WHERE order_date >= '2024-01-01';

-- ✅ AFTER: Window function + composite index + CTE predicate pushdown
-- Result: 8.3s → 2.1s (75% improvement)
WITH recent_orders AS (
    -- Filter before window function sees any rows
    SELECT order_id, customer_id, order_date, revenue
    FROM   orders
    WHERE  order_date >= '2024-01-01'
)
SELECT
    order_id, customer_id, order_date, revenue,
    ROUND(
        AVG(revenue) OVER (
            PARTITION BY customer_id
            ORDER BY order_date
            RANGE BETWEEN INTERVAL '90 days' PRECEDING AND CURRENT ROW
        ), 2
    ) AS rolling_90d_avg
FROM recent_orders
ORDER BY customer_id, order_date;`,
    insight: "Three changes compound: (1) composite index on (customer_id, order_date) means the DB sorts once rather than scanning on every correlated lookup; (2) RANGE BETWEEN with an interval is date-aware, not row-count-aware; (3) the CTE pushes the date filter before the window function sees rows. Result: 8.3s → 2.1s on a 2M-row table at Edunet.",
    concepts: ["Window Functions", "RANGE BETWEEN", "CTE Predicate Pushdown", "Composite Index", "Query Plan"],
  },
  {
    id: "customer-rfm",
    title: "RFM Customer Segmentation",
    origin: "Edunet Foundation — customer analytics project",
    businessProblem: "Marketing team needed to identify high-value customers, at-risk churners, and new-customer cohorts without running separate queries per segment. A single RFM query gives actionable segments in one pass.",
    schema: `orders (order_id, customer_id, order_date, order_value)`,
    sql: `WITH rfm_raw AS (
    SELECT
        customer_id,
        -- Recency: days since last order (lower = better)
        DATE_PART('day', NOW() - MAX(order_date))::INT  AS recency_days,
        COUNT(order_id)                                  AS frequency,
        SUM(order_value)                                 AS monetary
    FROM orders
    WHERE order_date >= NOW() - INTERVAL '365 days'
    GROUP BY customer_id
),
rfm_scores AS (
    SELECT
        customer_id,
        recency_days, frequency, monetary,
        -- Invert recency: fewer days = higher score
        6 - NTILE(5) OVER (ORDER BY recency_days ASC)   AS r_score,
        NTILE(5) OVER (ORDER BY frequency ASC)           AS f_score,
        NTILE(5) OVER (ORDER BY monetary ASC)            AS m_score
    FROM rfm_raw
)
SELECT
    customer_id,
    r_score, f_score, m_score,
    (r_score + f_score + m_score)                        AS total_rfm,
    CASE
        WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions'
        WHEN r_score >= 4 AND f_score >= 3               THEN 'Loyal'
        WHEN r_score <= 2 AND f_score >= 3               THEN 'At Risk'
        WHEN r_score <= 2 AND f_score <= 2               THEN 'Lost'
        WHEN r_score >= 4 AND f_score <= 2               THEN 'New Customers'
        ELSE                                                  'Potential Loyalists'
    END                                                   AS segment
FROM rfm_scores
ORDER BY total_rfm DESC;`,
    insight: "NTILE(5) divides customers into 5 equal buckets per dimension. Recency is inverted (6 - NTILE) because fewer days since last purchase means higher engagement. The CASE then maps score combinations to business-meaningful segments. This pattern was used at Edunet; the same logic underlies the Sreejita Framework's customer domain KPI module.",
    concepts: ["NTILE", "CTEs", "CASE WHEN", "Window Functions", "Business Scoring"],
  },
  {
    id: "cohort-retention",
    title: "Monthly Cohort Retention Analysis",
    origin: "Analytics pattern — applicable to Edunet customer data",
    businessProblem: "Product and marketing teams needed to understand how well they retain customers month-over-month after signup. A standard retention table shows which cohorts are healthy vs degrading.",
    schema: `customers (customer_id, signup_date)
orders (customer_id, order_date)`,
    sql: `WITH cohorts AS (
    SELECT customer_id,
           DATE_TRUNC('month', signup_date)::DATE  AS cohort_month
    FROM customers
),
activity AS (
    SELECT DISTINCT
        customer_id,
        DATE_TRUNC('month', order_date)::DATE       AS active_month
    FROM orders
),
cohort_activity AS (
    SELECT
        c.cohort_month,
        a.active_month,
        COUNT(DISTINCT a.customer_id)               AS active_customers,
        -- Months elapsed since cohort signed up
        (EXTRACT(YEAR  FROM AGE(a.active_month, c.cohort_month)) * 12
       + EXTRACT(MONTH FROM AGE(a.active_month, c.cohort_month)))::INT
                                                     AS month_number
    FROM cohorts c
    JOIN activity a USING (customer_id)
    GROUP BY 1, 2
),
cohort_sizes AS (
    SELECT cohort_month, COUNT(*) AS cohort_size
    FROM cohorts GROUP BY 1
)
SELECT
    ca.cohort_month,
    ca.month_number,
    ca.active_customers,
    cs.cohort_size,
    ROUND(100.0 * ca.active_customers / NULLIF(cs.cohort_size, 0), 1)
                                                     AS retention_pct
FROM cohort_activity ca
JOIN cohort_sizes    cs USING (cohort_month)
ORDER BY ca.cohort_month, ca.month_number;`,
    insight: "Three CTEs chain: cohort assignment → monthly activity → cohort sizing. NULLIF prevents division-by-zero on small cohorts. AGE() returns an interval; extracting year×12 + month gives the elapsed month count. Swapping DATE_TRUNC('month') to DATE_TRUNC('week') instantly shifts to weekly cohort analysis. This retention pattern is used in the Sreejita Framework's customer domain module.",
    concepts: ["CTEs", "DATE_TRUNC", "Self-join", "AGE()", "NULLIF", "Cohort Analysis"],
  },
  {
    id: "pipeline-health",
    title: "Data Pipeline Health Monitoring",
    origin: "ETL pipeline monitoring — PHN Technology pattern",
    businessProblem: "After automating ETL ingestion at PHN Technology, we needed a single query to surface stale tables, low-volume loads, and high null rates — replacing manual morning checks with an automated health dashboard.",
    schema: `pipeline_metadata (table_name, loaded_at)
pipeline_config (table_name, expected_daily_records)
orders (customer_id, revenue, loaded_at)   -- example monitored table`,
    sql: `WITH table_freshness AS (
    SELECT
        table_name,
        MAX(loaded_at)                                    AS last_loaded,
        COUNT(*)                                          AS total_records,
        COUNT(*) FILTER (WHERE loaded_at >= NOW() - INTERVAL '24 hours')
                                                          AS records_last_24h,
        expected_daily_records
    FROM pipeline_metadata
    JOIN pipeline_config USING (table_name)
    GROUP BY table_name, expected_daily_records
),
null_audit AS (
    -- Null rate for critical columns in the orders table
    SELECT
        'orders'                                          AS table_name,
        COUNT(*) FILTER (WHERE customer_id IS NULL)       AS null_customer_ids,
        COUNT(*) FILTER (WHERE revenue IS NULL)           AS null_revenues,
        COUNT(*)                                          AS total_rows
    FROM orders
    WHERE loaded_at >= NOW() - INTERVAL '24 hours'
)
SELECT
    tf.table_name,
    tf.last_loaded,
    tf.records_last_24h,
    CASE
        WHEN tf.last_loaded < NOW() - INTERVAL '24 hours'
            THEN '⚠ STALE'
        WHEN tf.records_last_24h < tf.expected_daily_records * 0.8
            THEN '⚠ LOW VOLUME'
        ELSE '✓ OK'
    END                                                   AS freshness_status,
    ROUND(100.0 * na.null_customer_ids / NULLIF(na.total_rows, 0), 2)
                                                          AS null_rate_pct
FROM table_freshness tf
LEFT JOIN null_audit na USING (table_name)
ORDER BY
    CASE freshness_status
        WHEN '⚠ STALE'      THEN 0
        WHEN '⚠ LOW VOLUME' THEN 1
        ELSE 2
    END,
    tf.last_loaded;`,
    insight: "COUNT(*) FILTER (WHERE ...) is cleaner than CASE WHEN inside COUNT and PostgreSQL-idiomatic. ORDER BY on a CASE expression surfaces problems first without a separate WHERE clause. NULLIF prevents zero-division on empty recent batches. This monitoring pattern was applied at PHN Technology and underpins the alert logic in the ML Monitoring Platform project.",
    concepts: ["COUNT FILTER", "CTEs", "CASE in ORDER BY", "NULLIF", "Data Quality", "Monitoring"],
  },
  {
    id: "running-metrics",
    title: "Running Revenue & 30-Day Moving Average",
    origin: "Marketing analytics — Postulate IRT forecasting project",
    businessProblem: "Daily campaign revenue had high noise that masked real trends. Marketing needed cumulative totals for budgeting and 30-day moving averages to distinguish signal from noise.",
    schema: `campaign_daily_metrics (campaign_name, campaign_date, daily_revenue)`,
    sql: `SELECT
    campaign_date,
    campaign_name,
    daily_revenue,

    -- Cumulative revenue since campaign start
    SUM(daily_revenue) OVER (
        PARTITION BY campaign_name
        ORDER BY campaign_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    )                             AS cumulative_revenue,

    -- 30-day rolling average to smooth daily noise
    ROUND(
        AVG(daily_revenue) OVER (
            PARTITION BY campaign_name
            ORDER BY campaign_date
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
        ), 2
    )                             AS rolling_30d_avg,

    -- Day-over-day change
    daily_revenue
    - LAG(daily_revenue, 1) OVER (
        PARTITION BY campaign_name
        ORDER BY campaign_date
      )                           AS dod_change

FROM campaign_daily_metrics
WHERE campaign_date >= '2024-01-01'
ORDER BY campaign_name, campaign_date;`,
    insight: "ROWS BETWEEN UNBOUNDED PRECEDING gives a running total including all prior rows. ROWS BETWEEN 29 PRECEDING gives a fixed 30-row window regardless of date gaps — use RANGE BETWEEN INTERVAL '30 days' if you want date-aware windows. LAG(1) gives day-over-day delta in one pass. PARTITION BY restarts all three calculations per campaign. This was used at Postulate IRT to smooth marketing campaign metrics before feeding them into the XGBoost forecasting model.",
    concepts: ["Running Totals", "ROWS BETWEEN", "UNBOUNDED PRECEDING", "LAG", "Rolling Average"],
  },
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => {
      try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard API unavailable (e.g. insecure context) */ }
    }}
    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-slate-700 rounded hover:bg-slate-800 transition-colors text-slate-400">
      {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
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
                  <div className="px-5 py-3 border-b border-border bg-slate-900/50">
                    <div className="text-xs text-slate-400 font-mono mb-1 uppercase tracking-wider">Schema</div>
                    <pre className="text-xs text-slate-300 font-mono">{ex.schema}</pre>
                  </div>
                )}

                {/* SQL */}
                <div className="bg-slate-950">
                  <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                    <code className="text-slate-200 font-mono">{ex.sql}</code>
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
