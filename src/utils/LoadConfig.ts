/**
 * Load Config Utility
 * src/utils/LoadConfig.ts
 * 
 * Loads a config file (YAML / YML / JSON) from given path or ./default.yaml
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'yaml';
import chalk from 'chalk';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export async function loadConfig ( cfgPath?: string ) : Promise<Record<string, any>> {

    const defaultConfigPath = path.resolve( __dirname, '../../default.yaml' );
    const filePath = path.resolve( cfgPath || defaultConfigPath );

    try {

        const content = await fs.readFile( filePath, 'utf-8' );
        const ext = path.extname( filePath ).toLowerCase();

        switch ( ext ) {

            case '.yaml': case '.yml': return yaml.parse( content );

            case '.json': return JSON.parse( content );

            default: throw new Error ( `Unsupported config format <${ext}>` );

        }

    } catch ( err: any ) {

        console.error( chalk.red( `Failed to load config from <${filePath}>: ${err.message}` ) );
        process.exit( 1 );

    }

}