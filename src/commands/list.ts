'use strict';

import { type Command } from 'commander';
import { CmpStr } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { output } from '../utils/output.js';

export async function list ( key: 'metric' | 'phonetic', _: any, cmd: Command ) : Promise<void> {

    output( await cfg( cmd ), cmd, CmpStr[ key ].list().join( ', ' ) );

}