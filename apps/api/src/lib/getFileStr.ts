import fs from "fs";
import path from "path";

const USEFUL_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".prisma",
]);

const IGNORE_FILES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
]);

export function getFileStr(
  dir: string,
  files: string[] = []
): string[] {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {

    // Ignore folders
    if (entry.isDirectory() && IGNORE_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getFileStr(fullPath, files);
      continue;
    }

    // Ignore files
    if (IGNORE_FILES.has(entry.name)) {
      continue;
    }

    const ext = path.extname(entry.name);

    if (USEFUL_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}