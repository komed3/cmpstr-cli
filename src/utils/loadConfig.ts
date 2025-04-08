/**
 * Module `loadConfig` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * module dependencies
 * @private
 */

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'yaml';

/**
 * loads a config file (YAML / YML / JSON)
 * @public
 * 
 * @param {string} cfgPath path to config file
 * @returns {Promise<any>} config
 * @throws {Error} if file type is not supported
 */

export async function loadConfig ( cfgPath: string ) : Promise<any> {

    const content = await fs.readFile( cfgPath, 'utf-8' );
    const ext = path.extname( cfgPath ).toLowerCase();

    if ( ext === '.yaml' || ext === '.yml' ) {

        return yaml.parse( content );

    }

    else if ( ext === '.json' ) {

        return JSON.parse( content );

    }

    throw new Error(
        `Unsupported config format: ${ext}`
    );

}