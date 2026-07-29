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

export function getFileStr(
  dir: string,
  files: string[] = []
): string[] {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getFileStr(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name);

    if (USEFUL_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}