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

import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DeepMerge } from 'cmpstr/root';
import { type Command } from 'commander';
import yaml from 'yaml';

import type { Config } from './types.js';

// Get the directory name of the current module (ESM-compatible)
const __dirname = dirname( fileURLToPath( import.meta.url ) );

/**
 * Loads a configuration file (YAML, YML, or JSON).
 * Falls back to the default config if no path is provided.
 * 
 * @async
 * @param {string} [cfgPath] - Path to the config file.
 * @returns {Promise< Partial< Config > >} The loaded configuration object.
 * @throws {Error} If loading or parsing fails.
 */
export async function loadCfg ( cfgPath?: string ) : Promise< Partial< Config > > {
    const defaultConfigPath = resolve( __dirname, '../../default.yml' );
    const filePath = resolve( cfgPath || defaultConfigPath );

    try {
        const content = await readFile( filePath, 'utf-8' );
        const ext = extname( filePath ).toLowerCase();

        switch ( ext ) {
            case '.yaml': case '.yml': return yaml.parse( content );
            case '.json': return JSON.parse( content );
            default: throw new Error ( `Unsupported config format: ${ext}` );
        }
    } catch ( err ) {
        throw new Error ( `Failed to load config from ${filePath}`, { cause: err } );
    }
}

/**
 * Loads and merges configuration from file and CLI options.
 * 
 * @async
 * @param {Partial< Config >} [cfg] - The base config object (e.g., from CLI).
 * @param {string} [cfgPath] - Path to the config file.
 * @returns {Promise< Partial< Config > >} The resolved configuration object.
 */
export async function resolveCfg (
    cfg: Partial< Config > = Object.create( null ),
    cfgPath?: string
) : Promise< Partial< Config > > {
    return DeepMerge.merge( ( await loadCfg( cfgPath ) ) ?? Object.create( null ), cfg );
}

/**
 * Resolves the effective configuration for a command.
 * Merges global options, command options, and config file.
 * 
 * @async
 * @param {Command} cmd - The Commander command instance.
 * @param {Record< string, any >} [opt] - Additional options to merge.
 * @returns {Promise< Partial< Config > >} The resolved configuration object.
 */
export async function cfg (
    cmd: Command,
    opt?: Record< string, any >
) : Promise< Partial< Config > > {
    const { config, ...opts } = cmd.parent!.opts() ?? {};
    return await resolveCfg( DeepMerge.merge( opts, opt ), config );
}
