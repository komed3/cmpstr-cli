#!/usr/bin/env node

'use strict';

import { Command } from 'commander';
import { list } from './commands/list.js';
import { normalize } from './commands/normalize.js';
import { analyze } from './commands/analyze.js';
import { diff } from './commands/diff.js';
import { compare } from './commands/compare.js';
import { match } from './commands/match.js';
import { matrix } from './commands/matrix.js';
import { index } from './commands/index.js';
import { search } from './commands/search.js';

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package.\nIt enables direct use of CmpStr’s ' +
                  'core features such as string normalization,\nsimilarity scoring, and matrix ' +
                  'comparison via the terminal.\n\nAll inputs can also refer to readable files.' )
    .version( '1.1.0', '-v, --version', 'Output the version number' );

program
    .option( '-c, --config <path>', 'Path to config file (YAML or JSON)' )
    .option( '-o, --output <path>', 'Write result to file instead of stdout' )
    .option( '-A, --async', 'Asynchronous processing if possible' )
    .option( '-V, --verbose', 'Output additional information if available' );

program
    .commandsGroup( 'Utilities:' );

program
    .command( 'list' )
    .description( 'List the available metrics and phonetics.' )
    .argument( 'key', 'What should be listed? Use `metric` or `phonetic`.' )
    .action( list );

program
    .command( 'normalize' )
    .description( 'Normalizes the input string to allow case insensive, collapse whitespaces and more.' )
    .argument( 'input', 'Input text to normalize as plain string or path to file' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .action( normalize );

program
    .command( 'analyze' )
    .description( 'Runs some analyses on the given text and outputs them.' )
    .argument( 'input', 'Input text to analyze as plain string or path to file' )
    .action( analyze );

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

program
    .commandsGroup( 'Similarity:' );

program
    .command( 'compare' )
    .description( 'Compares two input strings based on their similarity.' )
    .argument( 'source', 'The base input of the comparison' )
    .argument( 'target', 'String to compare the input with' )
    .option( '-m, --metric <name>', 'Similarity metric to use' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .action( compare );

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

program
    .commandsGroup( 'Special:' );

program
    .command( 'matrix' )
    .description( 'Computes a similarity matrix for all combinations within the input list.' )
    .argument( 'input', 'List of strings to build the matrix for' )
    .option( '-m, --metric <name>', 'Similarity metric to use (default `levenshtein`)' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .option( '-d, --delimiter <string>', 'List delimiter (default `,`)' )
    .action( matrix );

program
    .command( 'index' )
    .description( 'Computes the phonetic representation of the given input string.' )
    .argument( 'input', 'Input text to index as plain string or path to file' )
    .option( '-a, --algo <name>', 'The phonetic algorithm to use' )
    .option( '-m, --map <name>', 'The phonetic map to use (e.g., `en`, `de`)' )
    .action( index );

program
    .command( 'search' )
    .description( 'Performs a filtered and normalized substring search across the haystack.' )
    .argument( 'needle', 'The string to search for' )
    .argument( 'haystack', 'The list of strings to search in' )
    .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' )
    .option( '-d, --delimiter <string>', 'List delimiter (default `,`)' )
    .action( search );

program.parseAsync( process.argv );