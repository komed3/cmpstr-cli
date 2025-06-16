#!/usr/bin/env node

'use strict';

import { Command } from 'commander';

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package' )
    .version( '2.0.0', '-v, --vers' );

program.parseAsync( process.argv );