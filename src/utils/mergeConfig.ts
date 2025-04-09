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

    return {
        algo: cli.algo || cfg.algo || 'dice',
        flags: cli.flags || cfg.flags || '',
        options: parseOptions( cli.options ) || cfg.options || {},
        async: cli.async || cfg.async || false,
        verbose: cli.verbose || cfg.verbose || false
    } as ConfigOptions;

}