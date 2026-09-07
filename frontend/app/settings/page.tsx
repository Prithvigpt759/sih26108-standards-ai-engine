"use client";

import * as React from "react";
import {
  ShieldAlert,
  Globe,
  Server,
  BookCheck,
  CheckCircle2,
} from "lucide-react";
import { Divider } from "@/components/common/divider";

export default function SettingsPage() {
  const [language, setLanguage] = React.useState("en");

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Module 05 //
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            System Configuration
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Settings & System Architecture
        </h1>
        <p className="mt-2 font-body text-base text-muted-foreground max-w-2xl">
          System parameters, interface theme preferences, mock API architecture status,
          and architectural design system documentation.
        </p>
      </div>

      <div className="space-y-10">
        {/* ------------------------------------------------------------------ */}
        {/* 1. INTERFACE PREFERENCES (LANGUAGE)                                */}
        {/* ------------------------------------------------------------------ */}
        <section className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-foreground" /> Interface Preferences
          </h2>

          <div className="space-y-6">
            {/* Language Selection */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                  Interface Language
                </div>
                <div className="font-body text-xs text-muted-foreground mt-0.5">
                  Select display language for portal labels and navigation.
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-foreground bg-background px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="en">English (Default)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="te">Telugu (తెలుగు)</option>
              </select>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 2. MOCK-FIRST ARCHITECTURE & SERVICE STATUS                        */}
        {/* ------------------------------------------------------------------ */}
        <section className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-foreground" /> Mock-First Service Architecture
          </h2>

          <p className="font-body text-xs text-muted-foreground mb-6 leading-relaxed">
            Per Architecture §8, the frontend consumes all data through a centralized typed service client
            (<code className="font-mono">lib/api.ts</code>) using shared TypeScript contracts (<code className="font-mono">lib/types.ts</code>).
            Zero components contain raw <code className="font-mono">fetch()</code> calls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="border border-foreground p-4 bg-background">
              <div className="flex items-center gap-1.5 text-foreground font-bold mb-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Active Adapter
              </div>
              <div className="text-muted-foreground text-[11px]">
                Deterministic Mock Service
              </div>
            </div>

            <div className="border border-border-light p-4 bg-background">
              <div className="text-foreground font-bold mb-1">
                Target Backend
              </div>
              <div className="text-muted-foreground text-[11px]">
                FastAPI REST Engine (/api/v1)
              </div>
            </div>

            <div className="border border-border-light p-4 bg-background">
              <div className="text-foreground font-bold mb-1">
                Data Contracts
              </div>
              <div className="text-muted-foreground text-[11px]">
                Strictly Typed (Zero `any`)
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 3. DESIGN SYSTEM EVOLUTION NOTE (OBJECTIVE 1)                     */}
        {/* ------------------------------------------------------------------ */}
        <section className="border-2 border-foreground bg-muted p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <BookCheck className="h-5 w-5 text-foreground" />
            <h2 className="font-serif text-xl font-bold tracking-tight">
              Design System Evolution Note
            </h2>
          </div>

          <div className="space-y-3 font-body text-xs leading-relaxed text-foreground">
            <p>
              <strong>Evolution Rationale:</strong> The original PRD specification suggested a generic blue/navy/neutral palette with rounded cards. During foundational design exploration, the team adopted the <strong>Minimalist Monochrome</strong> visual identity as an intentional, higher-order design evolution for government procurement compliance.
            </p>
            <p>
              <strong>Compliance Alignment:</strong> This evolution directly fulfills and strengthens the core tenets of PRD §15 and Architecture §10:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-muted-foreground">
              <li>
                <strong className="text-foreground">Government/Enterprise Credibility:</strong> Stripping decorative pastel blues and rounded startup tropes in favor of stark black/white editorial typography creates an authoritative, legal-grade tool.
              </li>
              <li>
                <strong className="text-foreground">WCAG AAA Accessibility (21:1):</strong> Pure `#FFFFFF` and `#000000` polarity ensures mathematical maximum contrast in both light and dark modes.
              </li>
              <li>
                <strong className="text-foreground">Zero-Hue Severity Hierarchy:</strong> Rather than relying on ambiguous red/yellow/green color codes, severity is encoded through progressive border weights (1px → 2px → 4px → 8px), fill densities, explicit Lucide icons, and uppercase JetBrains Mono labels.
              </li>
              <li>
                <strong className="text-foreground">Architectural Precision:</strong> Hard right angles (`--radius: 0px`) and zero box-shadows emphasize geometric rigor and discipline appropriate for statutory engineering standards.
              </li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 4. STATUTORY & PROTOTYPE DISCLAIMER                                */}
        {/* ------------------------------------------------------------------ */}
        <section className="border-l-4 border-foreground bg-card p-6">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            <ShieldAlert className="h-4 w-4" /> Statutory Disclaimer & Project Information
          </div>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            <strong>Smart India Hackathon 2026 • Problem Statement SIH26108</strong>
            <br />
            Ministry of Consumer Affairs, Food & Public Distribution // Bureau of Indian Standards (BIS).
            <br />
            This software is an experimental decision-support prototype. Recommendations, normative gap warnings, and Tender Health Scores are generated algorithmically for evaluation purposes and do not substitute for official statutory certifications, legal review, or formal gazette publications by the Bureau of Indian Standards.
          </p>
        </section>
      </div>

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
