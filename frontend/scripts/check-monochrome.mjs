#!/usr/bin/env node

/**
 * SIH26108 — Monochrome Linter Check
 *
 * Verifies that zero stray `rounded-*` (except `rounded-none`) and zero
 * stray `shadow-*` (except `shadow-none`) classes exist in JSX/TSX files.
 *
 * This guarantees the Minimalist Monochrome zero-radius and zero-shadow
 * design system discipline is strictly maintained across all components.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const SCAN_DIRS = ["app", "components", "lib"];
const EXTENSIONS = [".tsx", ".jsx", ".ts", ".js"];

// Forbidden patterns: any rounded-* except rounded-none, any shadow-* except shadow-none
const FORBIDDEN_ROUNDED_REGEX = /\brounded-(?!none\b)[a-zA-Z0-9_/[\]-]+\b/g;
const FORBIDDEN_SHADOW_REGEX = /\bshadow-(?!none\b)[a-zA-Z0-9_/[\]-]+\b/g;

let totalViolations = 0;
const violationsByFile = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const fileViolations = [];

  lines.forEach((line, index) => {
    // Skip comments
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
      return;
    }

    const roundedMatches = [...line.matchAll(FORBIDDEN_ROUNDED_REGEX)];
    const shadowMatches = [...line.matchAll(FORBIDDEN_SHADOW_REGEX)];

    for (const match of roundedMatches) {
      fileViolations.push({
        line: index + 1,
        rule: "STRAY_BORDER_RADIUS",
        token: match[0],
        snippet: line.trim(),
      });
      totalViolations++;
    }

    for (const match of shadowMatches) {
      fileViolations.push({
        line: index + 1,
        rule: "STRAY_BOX_SHADOW",
        token: match[0],
        snippet: line.trim(),
      });
      totalViolations++;
    }
  });

  if (fileViolations.length > 0) {
    violationsByFile.push({ file: path.relative(rootDir, filePath), violations: fileViolations });
  }
}

function traverseDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      traverseDir(fullPath);
    } else if (entry.isFile()) {
      if (EXTENSIONS.includes(path.extname(entry.name))) {
        scanFile(fullPath);
      }
    }
  }
}

console.log("🔍 Scanning for stray rounded-* and shadow-* classes...");

for (const dir of SCAN_DIRS) {
  traverseDir(path.join(rootDir, dir));
}

if (totalViolations > 0) {
  console.error(`\n❌ Failed: Found ${totalViolations} monochrome design system violation(s):\n`);
  for (const item of violationsByFile) {
    console.error(`📄 ${item.file}:`);
    for (const v of item.violations) {
      console.error(`   Line ${v.line}: [${v.rule}] "${v.token}"`);
      console.error(`     ↳ ${v.snippet}`);
    }
  }
  console.error("\nIn Minimalist Monochrome, zero border radius and zero shadows are required.");
  console.error("Replace with rectangular borders or remove the stray class.\n");
  process.exit(1);
} else {
  console.log("✅ Clean: 0 stray rounded-* or shadow-* classes found. Minimalist Monochrome rules respected.\n");
  process.exit(0);
}
