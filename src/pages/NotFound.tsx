import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="text-xs font-mono text-muted-foreground mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-6">This page doesn't exist or has been moved.</p>
        <Link to="/" className="text-primary hover:underline text-sm">← Back to home</Link>
      </div>
    </Layout>
  );
}
