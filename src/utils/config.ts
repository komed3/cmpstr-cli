/**
 * @fileoverview
 * Configuration utilities for CmpStr CLI
 * 
 * Handles loading, merging, and resolving configuration from
 * YAML/JSON files and CLI options.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import type { Config } from './types.js';
import { type Command } from 'commander';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'yaml';

// Get the directory name of the current module (ESM-compatible)
const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

/**
 * Loads a configuration file (YAML, YML, or JSON).
 * Falls back to the default config if no path is provided.
 * 
 * @async
 * @param {string} [cfgPath] - Path to the config file.
 * @returns {Promise<Partial<Config>>} The loaded configuration object.
 * @throws {Error} If loading or parsing fails.
 */
export async function loadCfg ( cfgPath?: string ) : Promise<Partial<Config>> {

    const defaultConfigPath = path.resolve( __dirname, '../../default.yml' );
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

/**
 * Deeply merges two configuration objects.
 * 
 * @param {Partial<Config>} t - The target config object.
 * @param {Partial<Config>} o - The source config object to merge in.
 * @returns {Partial<Config>} The merged config object.
 */
export function mergeCfg (
    t: Partial<Config> = Object.create( null ),
    o: Partial<Config> = Object.create( null )
) : Partial<Config> {

    return Object.keys( o ).forEach( k => {

        const val = ( o as any )[ k ];

        // Prevent prototype pollution
        if ( k === '__proto__' || k === 'constructor' ) return ;

        ( t as any )[ k ] = typeof val === 'object' && ! Array.isArray( val )
            ? mergeCfg(typeof ( t as any )[ k ] === 'object' && ! Array.isArray( ( t as any )[ k ] )
                ? ( t as any )[ k ] : Object.create( null ), val )
            : val;

    } ), t;

}

/**
 * Loads and merges configuration from file and CLI options.
 * 
 * @async
 * @param {Partial<Config>} [cfg] - The base config object (e.g., from CLI).
 * @param {string} [cfgPath] - Path to the config file.
 * @returns {Promise<Partial<Config>>} The resolved configuration object.
 */
export async function resolveCfg (
    cfg: Partial<Config> = Object.create( null ),
    cfgPath?: string
) : Promise<Partial<Config>> {

    return mergeCfg( ( await loadCfg( cfgPath ) ) ?? Object.create( null ), cfg );

}

/**
 * Resolves the effective configuration for a command.
 * Merges global options, command options, and config file.
 * 
 * @async
 * @param {Command} cmd - The Commander command instance.
 * @param {Record<string, any>} [opt] - Additional options to merge.
 * @returns {Promise<Partial<Config>>} The resolved configuration object.
 */
export async function cfg ( cmd: Command, opt?: Record<string, any> ) : Promise<Partial<Config>> {

    const { config, ...opts } = cmd.parent!.opts() ?? {};

    return await resolveCfg( mergeCfg( opts, opt ), config );

}