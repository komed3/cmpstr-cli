#!/usr/bin/env node

/**
 * CmpStr CLI
 * 
 * Command-line interface for the lightweight CmpStr package.
 * 
 * This CLI enables direct access to CmpStr’s core features such as string normalization,
 * similarity scoring, phonetic indexing, and matrix comparison via the terminal.
 * 
 * Many commands accept plain strings or file paths as input. The CLI is designed to be
 * modular, user-friendly, and scriptable, supporting both quick one-off operations and
 * integration into larger workflows.
 * 
 * Global options allow configuration file usage, output redirection, asynchronous
 * processing, and verbose logging. Each command provides fine-grained control over
 * its operation through dedicated options.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 * @version 1.1.2
 */

'use strict';

import { Command } from 'commander';
import { list } from './commands/list.js';
import { normalize } from './commands/normalize.js';
import { analyze } from './commands/analyze.js';
import { diff } from './commands/diff.js';
import { compare } from './commands/compare.js';
import { match } from './commands/match.js';
import { pairs } from './commands/pairs.js';
import { matrix } from './commands/matrix.js';
import { index } from './commands/index.js';
import { search } from './commands/search.js';

/**
 * Create the new `cmpstr` command
 */

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package.\nIt enables direct use of CmpStr’s ' +
                  'core features such as string normalization,\nsimilarity scoring, and matrix ' +
                  'comparison via the terminal.\n\nAll inputs can also refer to readable files.' )
    .version( '1.1.2', '-v, --version', 'Output the version number' );

// Global options available for all commands
program
    .option( '-c, --config <path>', 'Path to config file (YAML or JSON)' )
    .option( '-o, --output <path>', 'Write result to file instead of stdout' )
    .option( '-A, --async', 'Asynchronous processing if possible' )
    .option( '-V, --verbose', 'Output additional information if available' );

/**
 * Utilities group
 */

program.commandsGroup( 'Utilities:' );

// List command: Show available metrics or phonetic algorithms
program
    .command( 'list' )
    .description( 'List the available metrics and phonetics.' )
    .argument( 'key', 'What should be listed? Use `metric` or `phonetic`.' )
    .action( list );

// Normalize command: Normalize a string or file input
program
    .command( 'normalize' )
    .description( 'Normalizes the input string to allow case insensive, collapse whitespaces and more.' )
    .argument( 'input', 'Input text to normalize as plain string or path to file' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .action( normalize );

// Analyze command: Run text analysis on input
program
    .command( 'analyze' )
    .description( 'Runs some analyses on the given text and outputs them.' )
    .argument( 'input', 'Input text to analyze as plain string or path to file' )
    .action( analyze );

// Diff command: Find and mark differences between two texts
program
    .command( 'diff' )
    .description( 'Finds and marks the difference between two texts.' )
    .argument( 'original', 'Original text as plain string or path to file' )
    .argument( 'modified', 'Modified text as plain string or path to file' )
    .option( '-m, --mode <string>', 'Diff granularity `line` or `word` (default `word`)' )
    .option( '-i, --insensitive', 'Ignore case (default `false`)' )
    .option( '-l, --lines <number>', 'Number of context lines to include (default `1`)' )
    .option( '-s, --single', 'Output single lines instead of grouping adjacent changes (default `false`)' )
    .option( '-a, --all', 'Show all lines (default `false`)' )
    .action( diff );

/**
 * Similarity group
 */

program.commandsGroup( 'Similarity:' );

// Compare command: Compare two strings for similarity
program
    .command( 'compare' )
    .description( 'Compares two input strings based on their similarity.' )
    .argument( 'source', 'The base input of the comparison' )
    .argument( 'target', 'String to compare the input with' )
    .option( '-m, --metric <name>', 'Similarity metric to use' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .action( compare );

// Match command: Compare a string or list of strings against a target
program
    .command( 'match' )
    .description( 'Compares the second input against the first string or list of strings based on their similarity.' )
    .argument( 'source', 'The base input of the comparison' )
    .argument( 'target', 'String to compare the input with' )
    .option( '-m, --metric <name>', 'Similarity metric to use' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .option( '-l, --list', 'Treat the first input as a list' )
    .option( '-d, --delimiter <string>', 'List delimiter (default `,`)' )
    .option( '-t, --threshold <number>', 'Minimum required similarity (default `0`)' )
    .option( '-s, --sort <string>', 'Sorted by similarity (`asc` or default `desc`)' )
    .option( '-n <number>', 'Number of elements to return' )
    .action( match );

// Pairs command: Compare elements at the same index in two lists
program
    .command( 'pairs' )
    .description( 'Compares elements at the same index. Both inputs must be lists of the same length.' )
    .argument( 'source', 'The first list of strings' )
    .argument( 'target', 'The second list of strings' )
    .option( '-m, --metric <name>', 'Similarity metric to use' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .option( '-d, --delimiter <string>', 'List delimiter (default `,`)' )
    .action( pairs );

/**
 * Special group
 */

program.commandsGroup( 'Special:' );

// Matrix command: Compute a similarity matrix for all combinations in a list
program
    .command( 'matrix' )
    .description( 'Computes a similarity matrix for all combinations within the input list.' )
    .argument( 'input', 'List of strings to build the matrix for' )
    .option( '-m, --metric <name>', 'Similarity metric to use (default `levenshtein`)' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .option( '-d, --delimiter <string>', 'List delimiter (default `,`)' )
    .action( matrix );

// Index command: Compute the phonetic representation of a string
program
    .command( 'index' )
    .description( 'Computes the phonetic representation of the given input string.' )
    .argument( 'input', 'Input text to index as plain string or path to file' )
    .option( '-a, --algo <name>', 'The phonetic algorithm to use' )
    .option( '-m, --map <name>', 'The phonetic map to use (e.g., `en`, `de`)' )
    .action( index );

// Search command: Filtered and normalized substring search in a list
program
    .command( 'search' )
    .description( 'Performs a filtered and normalized substring search across the haystack.' )
    .argument( 'needle', 'The string to search for' )
    .argument( 'haystack', 'The list of strings to search in' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .option( '-d, --delimiter <string>', 'List delimiter (default `,`)' )
    .action( search );

/**
 * Parse and execute the CLI
 */

program.parseAsync( process.argv );
