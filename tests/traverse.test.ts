import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { traverse } from '../src/traverse'

const TMP = '/tmp/tree-size-test'

beforeAll(() => {
  mkdirSync(join(TMP, 'sub'), { recursive: true })
  writeFileSync(join(TMP, 'a.txt'), 'hello')        // 5 bytes
  writeFileSync(join(TMP, 'sub', 'b.txt'), 'world!') // 6 bytes
})

afterAll(() => {
  rmSync(TMP, { recursive: true, force: true })
})

describe('traverse', () => {
  it('returns a file node for a file', () => {
    const node = traverse(join(TMP, 'a.txt'))
    expect(node.isDirectory).toBe(false)
    expect(node.name).toBe('a.txt')
    expect(node.size).toBe(5)
    expect(node.children).toHaveLength(0)
  })

  it('returns a directory node with children', () => {
    const node = traverse(TMP)
    expect(node.isDirectory).toBe(true)
    expect(node.children.length).toBeGreaterThanOrEqual(2)
  })

  it('sums sizes of children', () => {
    const node = traverse(TMP)
    expect(node.size).toBeGreaterThanOrEqual(11) // 5 + 6
  })

  it('recurses into subdirectories', () => {
    const node = traverse(TMP)
    const sub = node.children.find((c) => c.name === 'sub')
    expect(sub).toBeDefined()
    expect(sub?.isDirectory).toBe(true)
    expect(sub?.children[0]?.name).toBe('b.txt')
  })
})
