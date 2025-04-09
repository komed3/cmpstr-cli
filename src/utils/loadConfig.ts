/**
 * Module `loadConfig` for `cmpstr-cli`
 * 
 * Loads a config file (YAML / YML / JSON) from given
 * path or ./default.yaml
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'yaml';

export async function loadConfig ( cfgPath?: string ) : Promise<Record<string, any>> {

    const filePath = path.resolve( cfgPath || './default.yaml' );

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