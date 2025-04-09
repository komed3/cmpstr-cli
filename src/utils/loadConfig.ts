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
 * @returns {Promise<Record<string, any>>} config
 * @throws {Error} if file type is not supported
 */

export async function loadConfig ( cfgPath?: string ) : Promise<Record<string, any>> {

    const filePath = cfgPath
        ? path.resolve( cfgPath )
        : path.resolve( __dirname, '../default.yaml' );

    try {

        const content = await fs.readFile( filePath, 'utf-8' );
        const ext = path.extname( filePath ).toLowerCase();

        switch ( ext ) {

            case '.yaml':
            case '.yml':
                return yaml.parse( content ) as Record<string, any>;

            case '.json':
                return JSON.parse( content ) as Record<string, any>;

            default:
                throw new Error (
                    `Unsupported config format: ${ext}`
                );

        }

    } catch {

        throw new Error (
            `Failed to load config from ${filePath}`
        )

    }

}