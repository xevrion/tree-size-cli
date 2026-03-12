import { describe, it, expect } from 'vitest'
import type { FileNode } from '../src/traverse'
import { renderTree } from '../src/print'

const leaf = (name: string, size: number): FileNode => ({
  name, path: `/tmp/${name}`, size, isDirectory: false, children: []
})

const dir = (name: string, children: FileNode[]): FileNode => ({
  name,
  path: `/tmp/${name}`,
  size: children.reduce((s, c) => s + c.size, 0),
  isDirectory: true,
  children,
})

describe('renderTree', () => {
  it('renders a single file as root', () => {
    const node = leaf('file.txt', 100)
    const lines = renderTree(node)
    expect(lines).toEqual(['file.txt (100 B)'])
  })

  it('renders a directory with children', () => {
    const node = dir('root', [leaf('a.txt', 512), leaf('b.txt', 1024)])
    const lines = renderTree(node)
    expect(lines[0]).toBe('root (1.5 KB)')
    expect(lines[1]).toBe('├── a.txt (512 B)')
    expect(lines[2]).toBe('└── b.txt (1.0 KB)')
  })

  it('renders nested directories', () => {
    const node = dir('root', [
      dir('sub', [leaf('c.txt', 2048)]),
      leaf('d.txt', 512),
    ])
    const lines = renderTree(node)
    expect(lines[0]).toBe('root (2.5 KB)')
    expect(lines[1]).toBe('├── sub (2.0 KB)')
    expect(lines[2]).toBe('│   └── c.txt (2.0 KB)')
    expect(lines[3]).toBe('└── d.txt (512 B)')
  })
})

describe('renderTree with maxDepth', () => {
  const tree = dir('root', [
    dir('sub', [leaf('c.txt', 2048)]),
    leaf('d.txt', 512),
  ])

  it('depth=0 shows only root', () => {
    const lines = renderTree(tree, '', true, true, 0)
    expect(lines).toHaveLength(1)
    expect(lines[0]).toBe('root (2.5 KB)')
  })

  it('depth=1 shows root and top-level children only', () => {
    const lines = renderTree(tree, '', true, true, 1)
    expect(lines).toHaveLength(3)
    expect(lines[0]).toBe('root (2.5 KB)')
    expect(lines[1]).toBe('├── sub (2.0 KB)')
    expect(lines[2]).toBe('└── d.txt (512 B)')
  })

  it('depth=2 shows root, children, and grandchildren', () => {
    const lines = renderTree(tree, '', true, true, 2)
    expect(lines).toHaveLength(4)
    expect(lines[0]).toBe('root (2.5 KB)')
    expect(lines[1]).toBe('├── sub (2.0 KB)')
    expect(lines[2]).toBe('│   └── c.txt (2.0 KB)')
    expect(lines[3]).toBe('└── d.txt (512 B)')
  })
})
