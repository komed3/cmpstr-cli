# CmpStr CLI

The `cmpstr` CLI provides a modular and scriptable command line interface to the [CmpStr](https://www.npmjs.com/package/cmpstr) library, supporting string normalization, similarity scoring, phonetic indexing, matrix comparison, and more. Many commands accept plain strings or file paths as input.

For more details on normalization flags, similarity metrics or phonetic algorithms, refer to the [CmpStr Wiki](https://github.com/komed3/cmpstr/wiki).

## Installation

You can install the tool globally via NPM:

```sh
npm install -g cmpstr-cli
```

Or run it directly via npx (no installation required):

```sh
npx cmpstr-cli
```

## Global Options

These options are available for all commands:

| Option                  | Description                                  |
| ----------------------- | -------------------------------------------- |
| `-c, --config <path>`   | Path to a config file (YAML or JSON)         |
| `-o, --output <path>`   | Write result to file instead of stdout       |
| `-A, --async`           | Enable asynchronous processing if possible   |
| `-V, --verbose`         | Output additional information if available   |
| `-v, --version`         | Output the version number                    |

## Commands

### Utilities

#### `list <key>`

**Description:**  
Lists the available similarity metrics or phonetic algorithms supported by the library.

**Arguments:**
- `key` — What should be listed? Use `metric` or `phonetic`.

**Example:**
```sh
cmpstr list metric
cmpstr list phonetic
```

---

#### `normalize <input>`

**Description:**  
Normalizes the input string or file content using the specified normalization flags. This can include case folding, whitespace collapsing, and more. Available flags can be found [here](https://github.com/komed3/cmpstr/wiki/Normalization-&-Filtering#supported-flags).

**Arguments:**
- `input` — Input text to normalize as a plain string or path to file

**Options:**
- `-f, --flags <string>` — Normalization flags (e.g., `itw`)

**Example:**
```sh
cmpstr normalize "Some Text" -f itw
```

---

#### `analyze <input>`

**Description:**  
Performs a comprehensive text analysis, including statistics, histograms, word and sentence metrics, character frequencies, and readability scores. Results are formatted and colorized for terminal output.

**Arguments:**
- `input` — Input text to analyze as a plain string or path to file

**Example:**
```sh
cmpstr analyze myfile.txt
```

---

#### `diff <original> <modified>`

**Description:**  
Finds and marks the differences between two texts, supporting various diff modes and options. Outputs either a colored CLI diff, ASCII diff for files, or a structured diff in verbose mode.

**Arguments:**
- `original` — Original text as plain string or path to file
- `modified` — Modified text as plain string or path to file

**Options:**
- `-m, --mode <string>` — Diff granularity: `line` or `word` (default: `word`)
- `-i, --insensitive` — Ignore case (default: `false`)
- `-l, --lines <number>` — Number of context lines to include (default: `1`)
- `-s, --single` — Output single lines instead of grouping adjacent changes (default: `false`)
- `-a, --all` — Show all lines (default: `false`)

**Example:**
```sh
cmpstr diff old.txt new.txt -m word -l 3
```

### Similarity

#### `compare <source> <target>`

**Description:**  
Compares two input strings based on their similarity using a selected metric. Supports both synchronous and asynchronous processing and verbose output.

**Arguments:**
- `source` — The base input of the comparison
- `target` — String to compare the input with

**Options:**
- `-m, --metric <name>` — Similarity metric to use (e.g., `levenshtein`)
- `-f, --flags <string>` — Normalization flags (e.g., `itw`)

**Example:**
```sh
cmpstr compare "hello" "hallo" -m levenshtein
```

---

#### `match <source> <target>`

**Description:**  
Compares the second input against the first string or list of strings based on their similarity. Supports sorting, thresholding, and both synchronous and asynchronous processing.

**Arguments:**
- `source` — The base input of the comparison (string or list)
- `target` — String to compare the input with

**Options:**
- `-m, --metric <name>` — Similarity metric to use
- `-f, --flags <string>` — Normalization flags (e.g., `itw`)
- `-l, --list` — Treat the first input as a list
- `-d, --delimiter <string>` — List delimiter (default: `,`)
- `-t, --threshold <number>` — Minimum required similarity (default: `0`)
- `-s, --sort <string>` — Sort by similarity (`asc` or `desc`, default: `desc`)
- `-n <number>` — Number of elements to return

**Example:**
```sh
cmpstr match names.txt "Max" -l -t 0.7 -s desc -n 5
```

---

#### `pairs <source> <target>`

**Description:**  
Compares elements at the same index in two lists and returns similarity scores. Both inputs must be lists of the same length.

**Arguments:**
- `source` — The first list of strings
- `target` — The second list of strings

**Options:**
- `-m, --metric <name>` — Similarity metric to use
- `-f, --flags <string>` — Normalization flags (e.g., `itw`)
- `-d, --delimiter <string>` — List delimiter (default: `,`)

**Example:**
```sh
cmpstr pairs list1.txt list2.txt -d ";"
```

### Special

#### `matrix <input>`

**Description:**  
Computes a similarity matrix for all combinations within the input list. Useful for clustering or visualizing relationships.

**Arguments:**
- `input` — List of strings to build the matrix for

**Options:**
- `-m, --metric <name>` — Similarity metric to use (default: `levenshtein`)
- `-f, --flags <string>` — Normalization flags (e.g., `itw`)
- `-d, --delimiter <string>` — List delimiter (default: `,`)

**Example:**
```sh
cmpstr matrix items.txt -m jaro
```

---

#### `index <input>`

**Description:**  
Computes the phonetic representation of the given input string using the selected algorithm and options. Supports both synchronous and asynchronous processing.

**Arguments:**
- `input` — Input text to index as plain string or path to file

**Options:**
- `-a, --algo <name>` — The phonetic algorithm to use
- `-m, --map <name>` — The phonetic map to use (e.g., `en`, `de`)

**Example:**
```sh
cmpstr index "Schmidt" -a soundex -m de
```

---

#### `search <needle> <haystack>`

**Description:**  
Performs a filtered and normalized substring search across the haystack (a list of strings). Useful for fuzzy or normalized search tasks.

**Arguments:**
- `needle` — The string to search for
- `haystack` — The list of strings to search in

**Options:**
- `-f, --flags <string>` — Normalization flags (e.g., `itw`)
- `-d, --delimiter <string>` — List delimiter (default: `,`)

**Example:**
```sh
cmpstr search "Müller" names.txt -f itw
```

## Configuration File

You can provide a YAML or JSON configuration file to set default options for all commands. This is especially useful if you frequently use the same options or want to share settings across projects.

### Usage

Use the `-c <path>` or `--config <path>` global option to specify your config file:

```sh
cmpstr compare "hello" "hallo" -c ./myconfig.yml
```

If no config file is specified, `cmpstr-cli` will use the built-in [`default.yml`](./default.yml) shipped with the package.

### Example: `myconfig.yml`

```yaml
async: true
verbose: true
metric: jaro
flags: "itw"
output: results.txt

phonetic:
  algo: soundex
  map: de

diff:
  mode: line
  insensitive: true
  lines: 2
```

### How it works

- **All options** in the config file are merged with CLI options.  
  CLI options always take precedence over config file values.
- **Nested options** (like `phonetic` or `diff`) are supported.
- **Supported formats:** YAML (`.yml`, `.yaml`) and JSON (`.json`).

### Tips

- Use a config file to avoid repeating common options in every command.
- You can maintain multiple config files for different workflows or languages.

## Usage Notes

**Input Flexibility:**  
Many commands accept either plain strings or file paths as input. If a file path is provided, the file content will be used.  

**Output Redirection:**  
Use `-o <file>` to write results to a file. ANSI color codes are stripped from file output.  

**Verbose Mode:**  
Use `-V` to include detailed input, options, and result sections in the output.  

**Asynchronous Processing:**  
Use `-A` to enable asynchronous processing for supported commands, which can improve performance on large datasets.