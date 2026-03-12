# tree-size

A CLI tool that prints a directory tree with file sizes.

```
my-project (14.2 KB)
├── src (8.1 KB)
│   ├── index.ts (1.2 KB)
│   ├── traverse.ts (2.4 KB)
│   ├── format.ts (987 B)
│   └── print.ts (3.5 KB)
├── tests (4.8 KB)
│   ├── traverse.test.ts (1.6 KB)
│   ├── format.test.ts (1.4 KB)
│   └── print.test.ts (1.8 KB)
└── package.json (1.3 KB)
```

## Install

```bash
npm install -g tree-size-cli
```

Or run without installing:

```bash
npx tree-size-cli [path]
```

## Usage

```bash
# Current directory
tree-size

# Specific path
tree-size ./src

# Limit depth
tree-size --depth 2
tree-size ./my-project --depth 1
```

## Options

| Flag | Description |
|------|-------------|
| `--depth <n>` | Limit tree depth. `0` = root only, `1` = top-level contents, etc. |

## Build from source

```bash
git clone https://github.com/you/tree-size-cli
cd tree-size-cli
npm install
npm run build
```

## Dev

```bash
npm test        # run tests
npm run build   # compile to dist/
npm run lint    # lint src/
```
