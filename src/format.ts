export function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${bytes} B`
}

export function formatTreeLine(
  name: string,
  size: number,
  prefix: string,
  isLast: boolean
): string {
  const connector = isLast ? '└── ' : '├── '
  const sizeStr = formatSize(size)
  return `${prefix}${connector}${name} (${sizeStr})`
}
