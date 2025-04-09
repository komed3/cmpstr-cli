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
 *   --list, --flags, --algo, --options, --config,
 *   --verbose, --async, --output
 *
 * @author Paul Köhler (komed3)
 * @version 1.0.0
 * @license MIT
 */

import { Command } from 'commander';
import { normalize } from './commands/normalize.js';
import { compare } from './commands/compare.js';

/**
 * define common command options
 * @private
 */

const commonCmdOptions = ( cmd: any ) : any => {

    return cmd
        .option( '-l, --list <path>', 'Path to file or comma-separated list' )
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
    .option( '-l, --list <path>', 'Path to file or comma-separated list' )
    .option( '-A, --async', 'Asynchronous processing' )
    .option( '-f, --flags <string>', 'Normalization flags' )
    .option( '-c, --config <path>', 'Path to config file (YAML or JSON)' )
    .option( '-w, --write <path>', 'write result to file instead of stdout' )
    .option( '-V, --verbose', 'Output additional information' )
    .action( normalize );

commonCmdOptions( program
    .command( 'compare <a> <b>' )
    .description( 'Compare two strings or a string against a list' )
    .action( compare )
);

/**
 * processing / parse CLI input
 */

program.parseAsync( process.argv );