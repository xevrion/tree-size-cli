#!/usr/bin/env node
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { traverse } from './traverse.js'
import { printTree } from './print.js'

const args = process.argv.slice(2)

let maxDepth: number | undefined
const depthIndex = args.indexOf('--depth')
if (depthIndex !== -1) {
  const depthValue = Number(args[depthIndex + 1])
  if (Number.isNaN(depthValue) || depthValue < 0) {
    process.stderr.write('Error: --depth must be a non-negative integer\n')
    process.exit(1)
  }
  maxDepth = depthValue
  args.splice(depthIndex, 2)
}

const targetPath = resolve(args[0] ?? '.')

if (!existsSync(targetPath)) {
  process.stderr.write(`Error: path not found: ${targetPath}\n`)
  process.exit(1)
}

const tree = traverse(targetPath)
printTree(tree, maxDepth)
