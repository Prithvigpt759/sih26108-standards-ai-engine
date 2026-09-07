"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Divider } from "@/components/common/divider";
import { analyzeRequirement } from "@/lib/api";
import { cn } from "@/lib/utils";

const SAMPLE_PROMPTS = [
  {
    title: "Galvanized Mild Steel Pipes",
    text: "Procurement of 5000 meters of Galvanized Mild Steel Tubes (50mm nominal bore, medium class) suitable for drinking water distribution in municipal infrastructure. Must include end protection and hydraulic pressure testing.",
    category: "Pipes & Infrastructure",
    application: "Potable Water Supply",
    quantity: "5000 meters",
    parameters: "Diameter 50mm, Medium Class, Test Pressure 50 kg/cm²",
  },
  {
    title: "Ready-Mix Concrete M30",
    text: "Supply of Ready-Mix Concrete Grade M30 for construction of prestressed concrete bridge deck slab. Maximum aggregate size 20mm, slump 100±25mm. Workability retention 2 hours under ambient summer temperatures.",
    category: "Concrete & Construction",
    application: "Bridge Deck Infrastructure",
    quantity: "450 m³",
    parameters: "Grade M30, Slump 100mm, Max Aggregate 20mm",
  },
];

const PROCESSING_STEPS = [
  "Reading Specification Document & Natural Language Input",
  "Extracting Product Specifications & Technical Parameters",
  "Querying Indian Standards (BIS/IS) Knowledge Base",
  "Mapping Normative Reference Chains & Allied Standards",
  "Validating Mandatory Quality Control Orders (QCOs)",
  "Generating Traceable Compliance Evidence & Explanations",
];

const LANGUAGES = [
  { code: "auto", label: "Auto Detect" },
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "ta", label: "Tamil (தமிழ்)" },
  { code: "te", label: "Telugu (తెలుగు)" },
  { code: "mr", label: "Marathi (मराठी)" },
  { code: "bn", label: "Bengali (বাংলা)" },
];

export default function AnalyzePage() {
  const router = useRouter();

  // Form State
  const [requirementText, setRequirementText] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [application, setApplication] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [technicalParams, setTechnicalParams] = React.useState("");
  const [language, setLanguage] = React.useState("auto");
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Processing State
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const applySamplePrompt = (sample: typeof SAMPLE_PROMPTS[0]) => {
    setRequirementText(sample.text);
    setProductCategory(sample.category);
    setApplication(sample.application);
    setQuantity(sample.quantity);
    setTechnicalParams(sample.parameters);
    setValidationError(null);
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".txt")) {
      setValidationError("Please upload a supported file (.pdf or .txt).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setValidationError("File size exceeds the 10 MB limit.");
      return;
    }
    setUploadedFile(file);
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requirementText.trim() && !uploadedFile) {
      setValidationError(
        "Please provide a natural-language requirement or upload a specification document."
      );
      return;
    }

    setValidationError(null);
    setIsProcessing(true);
    setCurrentStepIndex(0);

    // Progressive stepper simulation for the 6 stages
    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    try {
      const { analysisId } = await analyzeRequirement({
        requirementText,
        product: productCategory,
        category: productCategory,
        application,
        language,
      });

      router.push(`/analyze/${analysisId}`);
    } catch {
      setValidationError("Analysis request failed. Please retry.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            Module 01 //
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Input Specification
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          AI Standards Analyzer
        </h1>
        <p className="mt-2 font-body text-base text-muted-foreground max-w-2xl">
          Enter natural-language procurement requirements or upload a specification sheet.
          The engine extracts technical parameters, identifies applicable Indian Standards (IS),
          and uncovers normative compliance gaps.
        </p>
      </div>

      {/* Quick Prompt Chips */}
      <div className="mb-8 border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            Quick Demonstration Examples
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((sample) => (
            <button
              key={sample.title}
              type="button"
              onClick={() => applySamplePrompt(sample)}
              className="border border-border-light bg-background px-3 py-1.5 font-mono text-xs text-foreground hover:border-primary hover:text-primary transition-colors duration-150 text-left"
            >
              + {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Requirement Text Input */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label
              htmlFor="requirement-text"
              className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold"
            >
              Natural-Language Requirement <span className="text-muted-foreground">*</span>
            </label>
            <span className="font-mono text-xs text-muted-foreground">
              {requirementText.length} characters
            </span>
          </div>
          <textarea
            id="requirement-text"
            rows={6}
            value={requirementText}
            onChange={(e) => {
              setRequirementText(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Describe the product, material grade, application environment, testing parameters, and compliance needs..."
            className="w-full border border-foreground bg-background p-4 font-body text-base text-foreground placeholder:italic placeholder:text-muted-foreground focus:border-2 focus:outline-none transition-none"
          />
        </div>

        {/* Structured Metadata Fields */}
        <div className="border-t border-border-light pt-6">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Optional Technical Parameters
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product-category"
                className="block font-mono text-xs uppercase tracking-wider text-foreground mb-1"
              >
                Product / Category
              </label>
              <Input
                id="product-category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="e.g. Mild Steel Pipes, Concrete, Solar Panels"
              />
            </div>
            <div>
              <label
                htmlFor="application"
                className="block font-mono text-xs uppercase tracking-wider text-foreground mb-1"
              >
                Application Environment
              </label>
              <Input
                id="application"
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                placeholder="e.g. Underground Water Supply, High Pressure"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block font-mono text-xs uppercase tracking-wider text-foreground mb-1"
              >
                Procurement Quantity
              </label>
              <Input
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 5,000 meters / 450 m³"
              />
            </div>
            <div>
              <label
                htmlFor="technical-params"
                className="block font-mono text-xs uppercase tracking-wider text-foreground mb-1"
              >
                Key Specifications
              </label>
              <Input
                id="technical-params"
                value={technicalParams}
                onChange={(e) => setTechnicalParams(e.target.value)}
                placeholder="e.g. Grade A, Class Medium, 50mm dia"
              />
            </div>
          </div>
        </div>

        {/* File Upload Dropzone */}
        <div className="border-t border-border-light pt-6">
          <div className="mb-2 font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            Attach Specification Document (PDF / TXT)
          </div>
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
              "cursor-pointer border-2 border-dashed p-8 text-center transition-colors duration-100",
              isDragging
                ? "border-foreground bg-muted"
                : "border-border-light bg-card hover:border-foreground"
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
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" strokeWidth={1.5} />
            <p className="font-body text-sm text-foreground">
              <span className="underline decoration-1 font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Supported: PDF, TXT (Maximum 10 MB)
            </p>
          </div>

          {/* Uploaded File Indicator */}
          {uploadedFile && (
            <div className="mt-3 flex items-center justify-between border border-foreground bg-background p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-xs font-bold text-foreground">
                    {uploadedFile.name}
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                }}
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label="Remove uploaded file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="border-t border-border-light pt-6">
          <label
            htmlFor="language-selector"
            className="block font-mono text-xs uppercase tracking-widest text-foreground font-semibold mb-2"
          >
            Language Processing Engine
          </label>
          <select
            id="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-foreground bg-background px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground focus:border-2 focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="border border-foreground bg-foreground text-background p-4 flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <div className="font-mono text-xs uppercase tracking-wide">
              {validationError}
            </div>
          </div>
        )}

        {/* Sensitive Information Security Disclaimer */}
        <div className="border-l-2 border-foreground bg-muted/30 p-4 font-mono text-xs text-muted-foreground">
          <span className="font-bold uppercase text-foreground">Security & Sensitivity Notice:</span>{" "}
          Procurement specifications processed in this demonstration are evaluated client-side with
          mock data contracts. In production, tender files are processed ephemerally without persistent
          retention, adhering to government procurement data protocols.
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing Analysis...
              </>
            ) : (
              <>
                Analyze Requirement <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Processing Stepper Modal Overlay */}
      {isProcessing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Requirement Analysis Progress"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-lg border-2 border-foreground bg-background p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2.5 w-2.5 bg-foreground animate-pulse" />
              <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                Standards AI Engine // Execution Pipeline
              </div>
            </div>

            <div className="space-y-4">
              {PROCESSING_STEPS.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step}
                    className={cn(
                      "flex items-start gap-3 p-3 border transition-colors duration-100",
                      isCompleted
                        ? "border-foreground bg-muted text-foreground"
                        : isCurrent
                        ? "border-primary bg-primary text-primary-foreground font-semibold"
                        : "border-border-light text-muted-foreground opacity-50"
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <div className="h-4 w-4 border border-current" />
                      )}
                    </div>
                    <div className="font-mono text-xs leading-relaxed uppercase tracking-wider">
                      Stage 0{idx + 1}: {step}
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
