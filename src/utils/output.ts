'use strict';

import { type Command } from 'commander';
import type { Config } from './types.js';

export async function output ( cfg: Config, cmd: Command, out: any ) : Promise<void> {

    console.log( cfg, out );

}