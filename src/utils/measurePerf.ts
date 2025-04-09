/**
 * Module `measurePerf` for `cmpstr-cli`
 * 
 * Measures execution time and memory usage of a
 * given function.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { PerfResult } from '../types.js';

let startTime = 0;
let startMemory = 0;

export function start () : void {

    startTime = performance.now();
    startMemory = process.memoryUsage().heapUsed;

}

export function end () : PerfResult {

    return {
        time: performance.now() - startTime,
        memory: process.memoryUsage().heapUsed - startMemory
    } as PerfResult;

}