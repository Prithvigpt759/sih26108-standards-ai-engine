"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Check,
  LayoutGrid,
  List,
  ExternalLink,
  BookOpen,
  Filter,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { DataCard } from "@/components/common/card";
import { Divider } from "@/components/common/divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { searchStandards } from "@/lib/api";
import { Standard } from "@/lib/types";

export default function StandardsPage() {
  const [standards, setStandards] = React.useState<Standard[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [selectedStatus, setSelectedStatus] = React.useState("ALL");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await searchStandards();
        setStandards(data);
      } catch (err) {
        console.error("Failed to fetch standards:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    standards.forEach((s) => {
      if (s.category) cats.add(s.category);
    });
    return ["ALL", ...Array.from(cats)];
  }, [standards]);

  const filteredStandards = standards.filter((std) => {
    const matchesQuery =
      searchQuery === "" ||
      std.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (std.scope && std.scope.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (std.category && std.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "ALL" || std.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "Active" && std.status === "Active") ||
      (selectedStatus === "Superseded" && std.status?.includes("Superseded"));

    return matchesQuery && matchesCategory && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      {/* Editorial Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Module 03 //
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Normative Knowledge Base
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Standards Explorer
          </h1>
          <p className="mt-2 font-body text-base text-muted-foreground max-w-2xl">
            Search and cross-reference Indian Standards (BIS/IS), mandatory Quality Control Orders (QCOs),
            testing protocols, and normative reference chains.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border border-foreground p-1 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`p-1.5 transition-colors duration-100 ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            aria-label="Table view"
            className={`p-1.5 transition-colors duration-100 ${
              viewMode === "table"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SEARCH & FILTER CONTROLS                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-8 space-y-4 border border-border bg-card p-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Standard ID (e.g. IS 1239), material, test method, or keyword..."
            className="w-full border border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm text-foreground placeholder:italic focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border-light font-mono text-xs">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground uppercase flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 uppercase tracking-wider transition-colors duration-100 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground font-bold border border-primary"
                    : "border border-border-light text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground uppercase">Status:</span>
            {["ALL", "Active", "Superseded"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 uppercase tracking-wider transition-colors duration-100 ${
                  selectedStatus === st
                    ? "bg-primary text-primary-foreground font-bold border border-primary"
                    : "border border-border-light text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          Showing {filteredStandards.length} of {standards.length} Indian Standards
        </span>
        {(searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedStatus("ALL");
            }}
            className="underline hover:text-foreground"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* GRID / TABLE DISPLAY                                              */}
      {/* ------------------------------------------------------------------ */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block h-8 w-8 border-2 border-foreground border-t-transparent animate-spin mb-3" />
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Indexing Indian Standards Database...
          </div>
        </div>
      ) : filteredStandards.length === 0 ? (
        <div className="border border-border p-16 text-center bg-card">
          <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-serif text-xl font-bold mb-2">No Matching Standards</h3>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-6">
            No Indian Standard records matched your query. Try searching for broader terms like &quot;pipes&quot;, &quot;steel&quot;, or &quot;concrete&quot;.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedStatus("ALL");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStandards.map((std) => (
            <DataCard
              key={std.id}
              rulePosition="top"
              ruleWeight="medium"
              className="flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-lg font-bold text-foreground">
                    {std.id}
                  </span>
                  <span
                    className={`font-mono text-xs uppercase px-2 py-0.5 border ${
                      std.status === "Active"
                        ? "border-foreground font-semibold"
                        : "border-border-light text-muted-foreground"
                    }`}
                  >
                    {std.status || "Active"}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-2">
                  {std.title}
                </h3>

                {std.scope && (
                  <p className="font-body text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {std.scope}
                  </p>
                )}
              </div>

              <div className="border-t border-border-light pt-3 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground uppercase text-[11px]">
                  {std.category || "General Engineering"}
                </span>
                <Link
                  href={`/standards/${std.id}`}
                  className="inline-flex items-center gap-1 text-foreground font-bold hover:text-primary hover:underline transition-colors"
                >
                  View Specification <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </DataCard>
          ))}
        </div>
      ) : (
        /* Dense shadcn Table View */
        <div className="border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Standard ID
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Title & Subject
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Category
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Status
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Edition
                </TableHead>
                <TableHead className="text-right font-mono text-xs uppercase tracking-widest text-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStandards.map((std) => (
                <TableRow key={std.id}>
                  <TableCell className="font-mono font-bold whitespace-nowrap">
                    <Link
                      href={`/standards/${std.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {std.id}
                    </Link>
                  </TableCell>
                  <TableCell className="font-body text-sm max-w-md">
                    <div className="font-medium text-foreground">{std.title}</div>
                    {std.scope && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {std.scope}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {std.category || "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-xs uppercase">
                      {std.status === "Active" ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Active
                        </>
                      ) : (
                        std.status || "Active"
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {std.year || 2024}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Link
                      href={`/standards/${std.id}`}
                      className="font-mono text-xs underline text-foreground hover:text-primary transition-colors"
                    >
                      Details →
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
