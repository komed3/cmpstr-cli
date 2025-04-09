# CmpStr CLI

> A lightweight command-line tool for string comparison and normalization – built on top of [cmpstr](https://www.npmjs.com/package/cmpstr)

**cmpstr-cli** is a Node.js CLI wrapper for the [`cmpstr`](https://www.npmjs.com/package/cmpstr) package.  
It enables direct use of cmpstr’s core functions such as string normalization, similarity scoring, and matrix comparison via the terminal.

## Installation

You can install the tool globally via NPM:

```bash
npm install -g cmpstr-cli
```

Or run it directly via npx (no installation required):

```bash
npx cmpstr-cli
```

## Usage

```bash
cmpstr [command] [options]
```

## Available commands

| Command     | Description                                           |
| ----------- | ----------------------------------------------------- |
| `normalize` | Normalize a single string or a list                   |
| `compare`   | Compare two strings and return their similarity score |
| `match`     | Compare a string against a list, sorted by similarity |
| `closest`   | Return the closest match from a list                  |
| `matrix`    | Generate a similarity matrix from a list              |

### `cmpstr normalize <input> [options]`

Normalize a single string or list of strings.

```bash
cmpstr normalize "Hello World!" --flags si
cmpstr normalize --list "f22oo bar1 2baz4" -f n -d " " --async
```

**Options:**

`-l, --list` – interpret input as a list  
`-d, --delimiter <string>` – list input delimiter  
`-f, --flags <string>` – normalization flags  
`-c, --config <path>` – load config from YAML/JSON  
`-w, --write <path>` – write result to file  
`-V, --verbose` – show extended output  
`-A, --async` – run asynchronously

### `cmpstr compare <base> <test> [options]`

Compare two strings and return a similarity score (0 to 1).

```bash
cmpstr compare "hello" "HALLO" -f i --verbose
cmpstr compare ./fileA.txt ./fileB.txt --algo cosine -A
```

**Options:**

`-a, --algo <name>` – similarity algorithm (e.g. levenshtein, jaccard, etc.)  
`-f, --flags <string>` – normalization flags  
`-o, --options <json>` – algorithm options as JSON (on Windows: use double quotes: "{""delimiter"":""|""}")  
`-c, --config <path>` – config file  
`-w, --write <path>` – write result to file  
`-V, --verbose` – extended output  
`-A, --async` – asynchronous mode

### `cmpstr match <base> <list> [options]`

Compare a string against a list and return ranked results.

```bash
cmpstr match "test" ./list.txt -f ik -t 0.8
```

**Options:**

`-t, --threshold <number>` – match threshold (0..1)  
`-d, --delimiter <string>` – list input delimiter

Other options identical to `compare`.

### `cmpstr closest <base> <list> [options]`

Find the single best match in a list.

```bash
cmpstr closest "query" ./data.txt
```

**Options:**

`-d, --delimiter <string>` – list input delimiter

Other options identical to `compare`.

### `cmpstr matrix <list> [options]`

Return a 2D similarity matrix for a list.

**Options:**

Same options as `closest`.

## Config Files

Instead of passing all parameters manually, you may provide a configuration file:

```bash
cmpstr compare "one" "two" --config ./my-config.yaml
```

Supports `.yaml`, `.yml`, or `.json`.

Example `default.yaml` is automatically loaded if no other is provided:

```yaml
algorithm: dice
flags: ''
threshold: 0
delimiter: ','
async: false
verbose: false
options: {}
```

## Output Options

Use `--write <file>` to export results to a file

Use `--verbose` to display input, output, options and performance load.

Output is JSON-formatted and can be piped into other tools.