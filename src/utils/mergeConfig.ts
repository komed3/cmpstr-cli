/**
 * Module `mergeConfig` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * module dependencies
 * @private
 */

import { CmpStrOptions } from '../types';
import { parseOptions } from './parseOptions';

/**
 * merges CLI options with loaded configuration, giving precedence to CLI.
 * @public
 * 
 * @param {Record<string, any>} cli CLI options
 * @param {Record<string, any>} cfg config options
 * @returns {CmpStrOptions} merged options
 */

export function mergeConfig ( cli: any, cfg: Record<string, any> ) : CmpStrOptions {

    return {
        algo: cli.algo || cfg.algo || 'dice',
        flags: cli.flags || cfg.flags || '',
        options: parseOptions( cli.options ) || cfg.options || {},
        async: cli.async || cfg.async || false,
        verbose: cli.verbose || cfg.verbose || false
    } as CmpStrOptions;

}