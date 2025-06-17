#!/usr/bin/env node

'use strict';

import { Command } from 'commander';
import { analyze } from './commands/analyze.js';
import { diff } from './commands/diff.js';

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
    .command( 'analyze <text>' )
    .description( 'Runs some analyses on the given text and outputs them.' )
    .action( analyze )

program
    .command( 'diff <old> <new>' )
    .description( 'Finds and marks the difference between two texts.' )
    .option( '-m, --mode <string>', 'Diff granularity `line` or `word` (default `word`)' )
    .option( '-i, --insensitive', 'Ignore case (default `false`)' )
    .option( '-l, --lines <number>', 'Number of context lines to include (default `1`)' )
    .option( '-s, --single', 'Output single lines instead of grouping adjacent changes (default `false`)' )
    .option( '-a, --all', 'Show all lines (default `false`)' )
    .action( diff );

program.parseAsync( process.argv );