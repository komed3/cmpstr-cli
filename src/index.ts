/**
 * Entry point for `cmpstr-cli`
 *
 * This CLI tool provides access to the core functions of the `cmpstr` library,
 * allowing string normalization, comparison, and similarity analysis directly via the terminal.
 *
 * Commands:
 *   - normalize: normalize strings or lists
 *   - compare: compare strings or batches
 *   - match: find matching candidates from a list
 *   - closest: determine the closest string in a list
 *   - matrix: generate similarity matrix between two lists
 *
 * Common options include:
 *   --flags, --threshold, --algo, --options, --config,
 *   --verbose, --async, --write
 *
 * @author Paul Köhler (komed3)
 * @version 1.0.0
 * @license MIT
 */

import { Command } from 'commander';

import { normalize } from './commands/normalize.js';
import { compare } from './commands/compare.js';
import { match } from './commands/match.js';
import { closest } from './commands/closest.js';
import { matrix } from './commands/matrix.js';

/**
 * define common command options
 * @private
 */

const commonCmdOptions = ( cmd: any ) : any => {

    return cmd
        .option( '-a, --algo <name>', 'Algorithm to use' )
        .option( '-A, --async', 'Asynchronous processing' )
        .option( '-f, --flags <string>', 'Normalization flags' )
        .option( '-o, --options <json>', 'Additional algorithm options as JSON' )
        .option( '-c, --config <path>', 'Path to config file (YAML or JSON)' )
        .option( '-w, --write <path>', 'write result to file instead of stdout' )
        .option( '-V, --verbose', 'Output additional information' );

};

/**
 * create a new CLI program
 * @private
 */

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package' )
    .version( '1.0.0', '--vers' );

/**
 * define commands
 */

program
    .command( 'normalize <input>' )
    .description( 'Normalize a string or list' )
    .option( '-l, --list', 'Input will be treated as list' )
    .option( '-A, --async', 'Asynchronous processing' )
    .option( '-f, --flags <string>', 'Normalization flags' )
    .option( '-c, --config <path>', 'Path to config file (YAML or JSON)' )
    .option( '-w, --write <path>', 'write result to file instead of stdout' )
    .option( '-V, --verbose', 'Output additional information' )
    .action( normalize );

commonCmdOptions( program
    .command( 'compare <base> <test>' )
    .description( 'Compares two strings and returns their similarity score' )
    .action( compare )
);

commonCmdOptions( program
    .command( 'match <base> <list>' )
    .description( 'Compares an array of strings against a string, sorted by similarity' )
    .option( '-t, --threshold <number>', 'Threshold to recognize a match (match command only)' )
    .action( match )
);

commonCmdOptions( program
    .command( 'closest <base> <list>' )
    .description( 'Returns the best match of a list against a string' )
    .action( closest )
);

commonCmdOptions( program
    .command( 'matrix <list>' )
    .description( 'Returns the 2D array representing the similarity matrix' )
    .action( matrix )
);

/**
 * processing / parse CLI input
 */

program.parseAsync( process.argv );