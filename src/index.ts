#!/usr/bin/env node

'use strict';

import { Command } from 'commander';
import { diff } from './commands/Diff.js';

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package' )
    .version( '2.0.0', '-v, --vers' );

program
    .command( 'diff <old> <new>' )
    .description( 'Finds the difference between two texts. Inputs can also refer to readable files by path.' )
    .option( '-m, --mode <string>', 'diff granularity `line` or `word` (default `word`)' )
    .option( '-i, --insensitive', 'ignore case (default `false`)' )
    .option( '-l, --lines <number>', 'number of context lines to include (default `1`)' )
    .option( '-s, --single', 'output single lines instead of grouping adjacent changes (default `false`)' )
    .option( '-a, --all', 'show all lines (default `false`)' )
    .action( diff )

program.parseAsync( process.argv );