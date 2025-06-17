'use strict';

import type { Config } from './types.js';
import { type Command } from 'commander';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'yaml';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export async function loadCfg ( cfgPath?: string ) : Promise<Partial<Config>> {

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

export function mergeCfg ( t: Partial<Config> = {}, o: Partial<Config> = {} ) : Partial<Config> {

    return Object.keys( o ).forEach( k => {

        const val = ( o as any )[ k ];

        if ( k === '__proto__' || k === 'constructor' ) return ;

        ( t as any )[ k ] = typeof val === 'object' && ! Array.isArray( val )
            ? mergeCfg(typeof ( t as any )[ k ] === 'object' && ! Array.isArray( ( t as any )[ k ] )
                ? ( t as any )[ k ] : Object.create( null ), val )
            : val;

    } ), t;

}

export async function resolveCfg ( cfg: Partial<Config> = {}, cfgPath?: string ) : Promise<Partial<Config>> {

    return mergeCfg( await loadCfg( cfgPath ), cfg );

}

export async function cfg ( cmd: Command, opt?: Record<string, any> ) : Promise<Partial<Config>> {

    const { config, ...opts } = cmd.parent!.opts() ?? {};

    return await resolveCfg( mergeCfg( opts, opt ), config );

}