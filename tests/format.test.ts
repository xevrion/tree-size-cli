import { describe, it, expect } from 'vitest'
import { formatSize, formatTreeLine } from '../src/format'

describe('formatSize', () => {
  it('formats bytes', () => {
    expect(formatSize(0)).toBe('0 B')
    expect(formatSize(500)).toBe('500 B')
    expect(formatSize(1023)).toBe('1023 B')
  })

  it('formats kilobytes', () => {
    expect(formatSize(1024)).toBe('1.0 KB')
    expect(formatSize(2048)).toBe('2.0 KB')
    expect(formatSize(1536)).toBe('1.5 KB')
  })

  it('formats megabytes', () => {
    expect(formatSize(1024 * 1024)).toBe('1.0 MB')
    expect(formatSize(1024 * 1024 * 2.5)).toBe('2.5 MB')
  })
})

describe('formatTreeLine', () => {
  it('formats a non-last entry', () => {
    expect(formatTreeLine('file.ts', 512, '', false)).toBe('├── file.ts (512 B)')
  })

  it('formats a last entry', () => {
    expect(formatTreeLine('file.ts', 512, '', true)).toBe('└── file.ts (512 B)')
  })

  it('respects prefix', () => {
    expect(formatTreeLine('file.ts', 1024, '│   ', false)).toBe('│   ├── file.ts (1.0 KB)')
  })
})
