"use client";

import * as React from "react";
import Link from "next/link";
import {
  History,
  FileText,
  FileSearch,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { Divider } from "@/components/common/divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAnalysisHistory } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { AnalysisSummary } from "@/lib/types";

export default function HistoryPage() {
  const [history, setHistory] = React.useState<AnalysisSummary[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filterType, setFilterType] = React.useState<
    "all" | "requirement" | "tender"
  >("all");

  React.useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      try {
        const data = await getAnalysisHistory();
        setHistory(data);
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filterType === "all") return true;
    return item.inputType === filterType;
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
      {/* Editorial Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Module 04 //
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Audit Trail
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Analysis History
          </h1>
          <p className="mt-2 font-body text-base text-muted-foreground max-w-2xl">
            Review past natural-language requirement analyses and tender compliance health checks
            conducted during this session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/analyze">
            <Button variant="outline" size="sm">
              + New Requirement
            </Button>
          </Link>
          <Link href="/tender">
            <Button variant="primary" size="sm">
              + New Tender Check
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex items-center gap-2 border-b border-border pb-4 font-mono text-xs">
        <span className="text-muted-foreground uppercase mr-2">Filter By:</span>
        {[
          { id: "all", label: `All Entries (${history.length})` },
          {
            id: "requirement",
            label: `Requirements (${
              history.filter((h) => h.inputType === "requirement").length
            })`,
          },
          {
            id: "tender",
            label: `Tenders (${
              history.filter((h) => h.inputType === "tender").length
            })`,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id as typeof filterType)}
            className={`px-3 py-1.5 uppercase tracking-wider transition-colors duration-100 ${
              filterType === tab.id
                ? "bg-primary text-primary-foreground font-bold border border-primary"
                : "border border-border-light text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* History Table */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block h-8 w-8 border-2 border-foreground border-t-transparent animate-spin mb-3" />
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Retrieving Historical Analysis Records...
          </div>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="border border-border p-16 text-center bg-card">
          <History className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-serif text-xl font-bold mb-2">No Past Analyses</h3>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-6">
            You haven&apos;t run any requirement analyses or tender audits yet.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/analyze">
              <Button variant="primary">Analyze Requirement</Button>
            </Link>
            <Link href="/tender">
              <Button variant="outline">Check a Tender</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Date
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Module Type
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Product / Tender Summary
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Findings / Standards
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Score
                </TableHead>
                <TableHead className="text-right font-mono text-xs uppercase tracking-widest text-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => {
                const isTender = item.inputType === "tender";
                const targetUrl = isTender
                  ? `/tender/${item.id}`
                  : `/analyze/${item.id}`;

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      {formatDate(item.date)}
                    </TableCell>
                    <TableCell className="font-mono text-xs uppercase whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 border border-border-light px-2 py-0.5">
                        {isTender ? (
                          <>
                            <FileSearch className="h-3 w-3" /> Tender Audit
                          </>
                        ) : (
                          <>
                            <FileText className="h-3 w-3" /> Requirement
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="font-body text-sm font-medium">
                      <Link href={targetUrl} className="hover:text-primary hover:underline transition-colors">
                        {item.productSummary}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      {item.resultCount} {isTender ? "Findings" : "Standards"}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold whitespace-nowrap">
                      {typeof item.tenderScore === "number" ? (
                        <span className="border border-foreground px-2 py-0.5">
                          {item.tenderScore}/100
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Link
                        href={targetUrl}
                        className="font-mono text-xs underline text-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                      >
                        Inspect <ArrowRight className="h-3 w-3" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
