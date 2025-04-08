import { Command } from 'commander';
import { normalize } from './commands/normalize';
import { compare } from './commands/compare';
import { match } from './commands/match';
import { closest } from './commands/closest';
import { matrix } from './commands/matrix';

const program = new Command ();

program
    .name( 'cmpstr' )
    .description( 'CLI for the lightweight CmpStr package' )
    .version( '1.0.0' );

program
    .command( 'normalize <input>' )
    .description( 'Normalize a string or list' )
    .option( '--list <path>', 'Path to file or comma-separated list' )
    .option( '--async', 'Asynchronous processing' )
    .option( '--flags <string>', 'Normalization flags' )
    .option( '--config <path>', 'Path to config file (YAML or JSON)' )
    .option( '--verbose', 'Output additional information' )
    .action( normalize );

program
    .command( 'compare <a> <b>' )
    .description( 'Compare two strings or a string against a list' )
    .option( '--list <path>', 'Path to file or comma-separated list' )
    .option( '--algo <name>', 'Algorithm to use' )
    .option( '--async', 'Asynchronous processing' )
    .option( '--flags <string>', 'Normalization flags' )
    .option( '--options <json>', 'Additional algorithm options as JSON' )
    .option( '--config <path>', 'Path to config file (YAML or JSON)' )
    .option( '--verbose', 'Output additional information' )
    .action( compare );

program
    .command( 'match <a> <b>' )
    .description( 'Match string a against list b' )
    .option( '--list <path>', 'Path to file or comma-separated list' )
    .option( '--algo <name>', 'Algorithm to use' )
    .option( '--async', 'Asynchronous processing' )
    .option( '--flags <string>', 'Normalization flags' )
    .option( '--options <json>', 'Additional algorithm options as JSON' )
    .option( '--config <path>', 'Path to config file (YAML or JSON)' )
    .option( '--verbose', 'Output additional information' )
    .action( match );

program
    .command( 'closest <a> <b>' )
    .description( 'Find closest string to a from list b' )
    .option( '--list <path>', 'Path to file or comma-separated list' )
    .option( '--algo <name>', 'Algorithm to use' )
    .option( '--async', 'Asynchronous processing' )
    .option( '--flags <string>', 'Normalization flags' )
    .option( '--options <json>', 'Additional algorithm options as JSON' )
    .option( '--config <path>', 'Path to config file (YAML or JSON)' )
    .option( '--verbose', 'Output additional information' )
    .action( closest );

program
    .command( 'matrix <a> <b>' )
    .description( 'Generate similarity matrix from input lists' )
    .option( '--list <path>', 'Path to file or comma-separated list' )
    .option( '--algo <name>', 'Algorithm to use' )
    .option( '--async', 'Asynchronous processing' )
    .option( '--flags <string>', 'Normalization flags' )
    .option( '--options <json>', 'Additional algorithm options as JSON' )
    .option( '--config <path>', 'Path to config file (YAML or JSON)' )
    .option( '--verbose', 'Output additional information' )
    .action( matrix );

program.parseAsync( process.argv );