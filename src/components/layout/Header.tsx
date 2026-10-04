import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Github, Linkedin, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",           label: "Home" },
  { href: "/projects",   label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/sql",        label: "SQL" },
  { href: "/about",      label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between max-w-6xl mx-auto px-6">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setOpen(false)}>
          <span className="text-sm font-semibold tracking-tight text-foreground">YA</span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-mono border border-border rounded px-1.5 py-0.5">
            DA · DS · MLE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}
              className={cn(
                "px-3 py-1.5 rounded text-sm transition-colors",
                location.pathname === link.href
                  ? "text-primary font-medium bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Persistent CTAs — always visible desktop */}
        <div className="hidden md:flex items-center gap-1.5">
          <a href="https://github.com/YeswanthArasavalli" target="_blank" rel="noopener noreferrer"
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com/in/yeswantharasavalli" target="_blank" rel="noopener noreferrer"
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="mailto:maneswararasavalli@gmail.com"
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-xs font-medium"
            title="Email">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </a>
          <div className="w-px h-4 bg-border mx-1" />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="/Yeswanth_Arasavalli_Resume.pdf" target="_blank" rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
        </div>

        {/* Mobile toggles */}
        <div className="md:hidden flex items-center gap-1.5">
          <a href="https://github.com/YeswanthArasavalli" target="_blank" rel="noopener noreferrer"
            className="p-1.5 text-muted-foreground">
            <Github className="h-4 w-4" />
          </a>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 text-muted-foreground" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="p-1.5" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container max-w-6xl mx-auto px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded text-sm transition-colors",
                  location.pathname === link.href
                    ? "text-primary font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            {/* Mobile CTAs */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <a href="https://linkedin.com/in/yeswantharasavalli" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs border border-border rounded hover:bg-secondary">
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a href="/Yeswanth_Arasavalli_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs bg-primary text-primary-foreground rounded">
                <Download className="h-3.5 w-3.5" /> Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
