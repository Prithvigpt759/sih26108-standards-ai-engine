"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Loader2,
  FileSearch,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { Divider } from "@/components/common/divider";
import { analyzeTender } from "@/lib/api";
import { cn } from "@/lib/utils";

const SAMPLE_TENDER_FILE = {
  name: "Jaipur_Zone3_WaterSupply_Tender_2026.pdf",
  size: 2450 * 1024, // 2.45 MB
  type: "application/pdf",
  description:
    "Municipal Corporation tender document for drinking water distribution piping network, technical acceptance testing, and pipe fittings.",
};

const PROCESSING_STAGES = [
  "Parsing Document Clauses & Technical Specifications Schedule",
  "Extracting Procurement Scope, Materials & Nominal Dimensions",
  "Cross-Referencing Cited Standard Editions Against Active Standards Registry",
  "Detecting Missing Testing, Safety & Mandatory QCO Certification Clauses",
  "Calculating Analytical Tender Health Score & Draft Remediation Spec",
];

export default function TenderPage() {
  const router = useRouter();

  const [uploadedFile, setUploadedFile] = React.useState<{
    name: string;
    size: number;
  } | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentStageIndex, setCurrentStageIndex] = React.useState(0);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".txt")) {
      setValidationError("Please upload a supported document (.pdf or .txt).");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setValidationError("Tender file size exceeds the 25 MB limit.");
      return;
    }
    setUploadedFile({ name: file.name, size: file.size });
    setValidationError(null);
  };

  const loadSampleTender = () => {
    setUploadedFile({
      name: SAMPLE_TENDER_FILE.name,
      size: SAMPLE_TENDER_FILE.size,
    });
    setValidationError(null);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      setValidationError("Please select a tender document or load the demonstration file.");
      return;
    }

    setValidationError(null);
    setIsProcessing(true);
    setCurrentStageIndex(0);

    for (let i = 0; i < PROCESSING_STAGES.length; i++) {
      setCurrentStageIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 450));
    }

    try {
      const { analysisId } = await analyzeTender({
        fileName: uploadedFile.name,
      });
      router.push(`/tender/${analysisId}`);
    } catch {
      setValidationError("Failed to process tender. Please retry.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Module 02 //
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Tender Auditing
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Tender Health Check
        </h1>
        <p className="mt-2 font-body text-base text-muted-foreground max-w-2xl">
          Upload request for proposals (RFPs), tenders, or bid documents. The AI engine audits clauses for
          outdated standards references, missing BIS mandatory certification orders, omitted testing protocols,
          and ambiguous engineering specifications.
        </p>
      </div>

      {/* Sample Demo Loader */}
      <div className="mb-8 border border-border bg-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold mb-1">
              <FileSearch className="h-4 w-4" /> Ready-To-Test Tender Document
            </div>
            <p className="font-body text-xs text-muted-foreground">
              {SAMPLE_TENDER_FILE.description}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadSampleTender}
            className="shrink-0"
          >
            Load Sample Tender
          </Button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleAnalyze} className="space-y-8">
        {/* Upload Dropzone */}
        <div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) {
                handleFileSelect(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "cursor-pointer border-2 border-dashed p-10 text-center transition-colors duration-100",
              isDragging
                ? "border-foreground bg-muted"
                : "border-border bg-card hover:border-foreground"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
              }}
              className="hidden"
            />
            <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" strokeWidth={1.5} />
            <p className="font-body text-base text-foreground font-medium">
              <span className="underline decoration-1">Click to select tender file</span> or drag and drop
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Supports: PDF, TXT (Maximum 25 MB)
            </p>
          </div>

          {/* Selected File Card */}
          {uploadedFile && (
            <div className="mt-4 flex items-center justify-between border-2 border-foreground bg-background p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-sm font-bold text-foreground">
                    {uploadedFile.name}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Compliance Scan
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label="Remove selected tender file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="border border-foreground bg-foreground text-background p-4 flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <div className="font-mono text-xs uppercase tracking-wide">
              {validationError}
            </div>
          </div>
        )}

        {/* Security / Privacy Warning */}
        <div className="border-l-2 border-foreground bg-muted/30 p-4 font-mono text-xs text-muted-foreground space-y-1">
          <div className="font-bold uppercase text-foreground">
            Confidentiality & Statutory Notice:
          </div>
          <p>
            Tender files uploaded during this prototype session are handled in-memory and are never written to persistent browser storage (localStorage). Output represents automated advisory analysis.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Scanning Tender Specifications...
              </>
            ) : (
              <>
                Start Tender Health Check <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Processing Stepper Modal */}
      {isProcessing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tender Analysis Progress"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-lg border-2 border-foreground bg-background p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2.5 w-2.5 bg-foreground animate-pulse" />
              <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                Tender Audit Pipeline // In Progress
              </div>
            </div>

            <div className="space-y-4">
              {PROCESSING_STAGES.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div
                    key={stage}
                    className={cn(
                      "flex items-start gap-3 p-3 border transition-colors duration-100",
                      isCompleted
                        ? "border-foreground bg-muted text-foreground"
                        : isCurrent
                        ? "border-foreground bg-foreground text-background font-semibold"
                        : "border-border-light text-muted-foreground opacity-50"
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <div className="h-4 w-4 border border-current" />
                      )}
                    </div>
                    <div className="font-mono text-xs leading-relaxed uppercase tracking-wider">
                      Phase 0{idx + 1}: {stage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
