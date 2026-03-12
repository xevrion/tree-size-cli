import type { FileNode } from './traverse'
import { formatSize, formatTreeLine } from './format'

export function renderTree(
  node: FileNode,
  prefix = '',
  isLast = true,
  isRoot = true,
  maxDepth?: number,
  currentDepth = 0,
): string[] {
  const lines: string[] = []

  if (isRoot) {
    lines.push(`${node.name} (${formatSize(node.size)})`)
  } else {
    lines.push(formatTreeLine(node.name, node.size, prefix, isLast))
  }

  if (node.isDirectory && (maxDepth === undefined || currentDepth < maxDepth)) {
    const childPrefix = isRoot ? '' : prefix + (isLast ? '    ' : '│   ')
    node.children.forEach((child, index) => {
      const childIsLast = index === node.children.length - 1
      lines.push(...renderTree(child, childPrefix, childIsLast, false, maxDepth, currentDepth + 1))
    })
  }

  return lines
}

export function printTree(node: FileNode, maxDepth?: number): void {
  const lines = renderTree(node, '', true, true, maxDepth, 0)
  lines.forEach((line) => process.stdout.write(line + '\n'))
}
