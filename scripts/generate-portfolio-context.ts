/**
 * Build-time script: serializes portfolio data from lib/data.ts
 * into netlify/functions/portfolio-context.json for the chat serverless function.
 */
import * as fs from "fs";
import * as path from "path";
import {
  siteConfig,
  stats,
  aboutParagraphs,
  experiences,
  techStack,
  proficiency,
  marqueeItems,
  projects,
  articles,
  certifications,
  education,
} from "../lib/data";

const context = {
  siteConfig,
  stats,
  aboutParagraphs,
  experiences,
  techStack,
  proficiency,
  marqueeItems,
  projects,
  articles,
  certifications,
  education,
};

const outDir = path.join(process.cwd(), "netlify", "functions");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, "portfolio-context.json");
fs.writeFileSync(outPath, JSON.stringify(context, null, 2), "utf-8");
console.log("Wrote", outPath);
