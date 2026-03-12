import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

export interface FileNode {
  name: string
  path: string
  size: number
  isDirectory: boolean
  children: FileNode[]
}

export function traverse(dirPath: string): FileNode {
  const stat = statSync(dirPath)
  const name = dirPath.split('/').pop() ?? dirPath

  if (!stat.isDirectory()) {
    return { name, path: dirPath, size: stat.size, isDirectory: false, children: [] }
  }

  let entries: string[]
  try {
    entries = readdirSync(dirPath)
  } catch {
    entries = []
  }

  const children: FileNode[] = entries
    .map((entry) => {
      try {
        return traverse(join(dirPath, entry))
      } catch {
        return null
      }
    })
    .filter((n): n is FileNode => n !== null)

  const size = children.reduce((sum, child) => sum + child.size, 0)

  return { name, path: dirPath, size, isDirectory: true, children }
}
