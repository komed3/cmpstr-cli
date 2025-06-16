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
    .description( 'Find difference between two texts' )
    .action( diff )

program.parseAsync( process.argv );