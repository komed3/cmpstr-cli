/**
 * Module `validateConfig` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * module dependencies
 * @private
 */

import { ConfigOptions } from '../types';
import { CmpStr } from 'cmpstr';

/**
 * validates config options
 * @public
 * 
 * @param {ConfigOptions} cfg config options
 * @returns {boolean} true, if validation runs through
 * @throws {Error} if config has invalid options
 */

export function validateConfig ( cfg: ConfigOptions ) : boolean {

    const cmp = new CmpStr ();

    if ( cfg.algo && !cmp.isAlgo( cfg.algo ) ) {

        throw new Error (
            `Unknown algorithm: "${cfg.algo}"`
        );

    }

    if ( cfg.flags && /[^swrkntidu]/.test( cfg.flags ) ) {

        throw new Error (
            `Wrong normalization flags in "${cfg.flags}"`
        );

    }

    return true;

}