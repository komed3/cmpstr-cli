#!/usr/bin/env node

'use strict';

import { Command } from 'commander';
import { normalize } from './commands/Normalize.js';
import { compare } from './commands/Compare.js';
import { analyze } from './commands/Analyze.js';
import { diff } from './commands/Diff.js';

const cmpCommand = ( cmd: Command ) : Command => {

    return cmd
        .option( '-m, --metric <name>', 'Similarity metric to use' )
        .option( '-f, --flags <string>', 'Normalization flags (e.g., `itw`)' );

};

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package. It enables direct use of CmpStr’s ' +
                  'core features such as string normalization, similarity scoring, and matrix ' +
                  'comparison via the terminal.' )
    .version( '1.1.0', '-v, --version', 'Output the version number' );

program
    .option( '-c, --config <path>', 'Path to config file (YAML or JSON)' )
    .option( '-o, --output <path>', 'Write result to file instead of stdout' )
    .option( '-A, --async', 'Asynchronous processing if possible' )
    .option( '-V, --verbose', 'Output additional information if available' );

program
    .command( 'normalize <input>' )
    .description( 'Normalizes the input string to allow case insensive, collapse whitespaces and more.' )
    .option( '--flags <string>', 'Normalization flags as string (e.g., `itw`)' )
    .option( '-d, --nfd', 'Normalize to NFD (Normalization Form Decomposed)' )
    .option( '-u, --nfc', 'Normalize to NFC (Normalization Form Composed)' )
    .option( '-x, --nfkc', 'Normalize to NFKC (Normalization Form Compatibility Composed)' )
    .option( '-w, --collapse', 'Collapse whitespace' )
    .option( '-t, --trim', 'Remove leading and trailing whitespace' )
    .option( '-r, --dedupt', 'Remove double characters' )
    .option( '-s, --special', 'Remove punctuation / special characters' )
    .option( '-k, --nolet', 'Remove non-letter characters' )
    .option( '-n, --nonum', 'Remove non-number characters' )
    .option( '-i, --insensitive', 'Case insensitive (convert to lowercase)' )
    .action( normalize );

cmpCommand( program
    .command( 'compare <source> <target>' )
    .description( 'Compares two strings and returns their similarity score.' )
    .action( compare )
);


program
    .command( 'analyze <input>' )
    .description( 'Runs some analyses on the given text and outputs them.' )
    .action( analyze );

program
    .command( 'diff <old> <new>' )
    .description( 'Finds the difference between two texts. Inputs can also refer to readable files by path.' )
    .option( '-m, --mode <string>', 'diff granularity `line` or `word` (default `word`)' )
    .option( '-i, --insensitive', 'ignore case (default `false`)' )
    .option( '-l, --lines <number>', 'number of context lines to include (default `1`)' )
    .option( '-s, --single', 'output single lines instead of grouping adjacent changes (default `false`)' )
    .option( '-a, --all', 'show all lines (default `false`)' )
    .action( diff );

program.parseAsync( process.argv );