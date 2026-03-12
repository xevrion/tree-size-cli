#!/usr/bin/env node

// src/index.ts
import { resolve } from "path";
import { existsSync } from "fs";

// src/traverse.ts
import { readdirSync, statSync } from "fs";
import { join } from "path";
function traverse(dirPath) {
  const stat = statSync(dirPath);
  const name = dirPath.split("/").pop() ?? dirPath;
  if (!stat.isDirectory()) {
    return { name, path: dirPath, size: stat.size, isDirectory: false, children: [] };
  }
  let entries;
  try {
    entries = readdirSync(dirPath);
  } catch {
    entries = [];
  }
  const children = entries.map((entry) => {
    try {
      return traverse(join(dirPath, entry));
    } catch {
      return null;
    }
  }).filter((n) => n !== null);
  const size = children.reduce((sum, child) => sum + child.size, 0);
  return { name, path: dirPath, size, isDirectory: true, children };
}

// src/format.ts
function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}
function formatTreeLine(name, size, prefix, isLast) {
  const connector = isLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
  const sizeStr = formatSize(size);
  return `${prefix}${connector}${name} (${sizeStr})`;
}

// src/print.ts
function renderTree(node, prefix = "", isLast = true, isRoot = true) {
  const lines = [];
  if (isRoot) {
    lines.push(`${node.name} (${formatSize(node.size)})`);
  } else {
    lines.push(formatTreeLine(node.name, node.size, prefix, isLast));
  }
  if (node.isDirectory) {
    const childPrefix = isRoot ? "" : prefix + (isLast ? "    " : "\u2502   ");
    node.children.forEach((child, index) => {
      const childIsLast = index === node.children.length - 1;
      lines.push(...renderTree(child, childPrefix, childIsLast, false));
    });
  }
  return lines;
}
function printTree(node) {
  const lines = renderTree(node);
  lines.forEach((line) => process.stdout.write(line + "\n"));
}

// src/index.ts
var args = process.argv.slice(2);
var targetPath = resolve(args[0] ?? ".");
if (!existsSync(targetPath)) {
  process.stderr.write(`Error: path not found: ${targetPath}
`);
  process.exit(1);
}
var tree = traverse(targetPath);
printTree(tree);
