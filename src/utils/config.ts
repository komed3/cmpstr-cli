'use strict';

import type { Config } from './types.js';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'yaml';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export async function load ( cfgPath?: string ) : Promise<Partial<Config>> {

    const defaultConfigPath = path.resolve( __dirname, '../../default.yaml' );
    const filePath = path.resolve( cfgPath || defaultConfigPath );

    try {

        const content = await fs.readFile( filePath, 'utf-8' );
        const ext = path.extname( filePath ).toLowerCase();

        switch ( ext ) {

            case '.yaml': case '.yml': return yaml.parse( content );

            case '.json': return JSON.parse( content );

            default: throw new Error ( `Unsupported config format: ${ext}` );

        }

    } catch ( err ) {

        throw new Error ( `Failed to load config from ${filePath}` );

    }

}

export function merge ( t: Partial<Config> = {}, o: Partial<Config> = {} ) : Partial<Config> {

    return Object.keys( o ).forEach( k => {

        const val = ( o as any )[ k ];

        if ( k === '__proto__' || k === 'constructor' ) return ;

        ( t as any )[ k ] = typeof val === 'object' && ! Array.isArray( val )
            ? merge(typeof ( t as any )[ k ] === 'object' && ! Array.isArray( ( t as any )[ k ] )
                ? ( t as any )[ k ] : Object.create( null ), val )
            : val;

    } ), t;

}

export async function resolve ( cfg: Partial<Config> = {}, cfgPath?: string ) : Promise<Partial<Config>> {

    return merge( await load( cfgPath ), cfg );

}