/**
 * Module `mergeConfig` for `cmpstr-cli`
 * 
 * Merges CLI options with loaded configuration,
 * giving precedence to CLI.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { ConfigOptions } from '../types.js';
import { parseOptions } from './parseOptions.js';

export function mergeConfig ( cli: any, cfg: Record<string, any> ) : ConfigOptions {

    const algo = cli.algo || cfg.algo || 'dice';

    return {
        algo: algo,
        flags: cli.flags || cfg.flags || '',
        threshold: cli.threshold || cfg.threshold || 0,
        delimiter: cli.delimiter || cfg.delimiter || ',',
        options: parseOptions( cli.options ) || cfg.options[ algo ] || {},
        async: cli.async || cfg.async || false,
        verbose: cli.verbose || cfg.verbose || false
    } as ConfigOptions;

}