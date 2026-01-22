/**
 * @fileoverview
 * Analyze command for CmpStr CLI.
 * 
 * Provides a comprehensive text analysis including statistics, histograms,
 * word and sentence metrics, character frequencies, and readability scores.
 * Results are formatted and colorized for terminal output.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import chalk from 'chalk';
import { TextAnalyzer } from 'cmpstr';
import { type Command } from 'commander';

import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

/**
 * Runs a detailed text analysis and outputs the results.
 * 
 * @async
 * @param {string} input - The input text or file path to analyze.
 * @param {any} _ - Unused options parameter (Commander compatibility).
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise< void >}
 */
export async function analyze ( input: string, _: any, cmd: Command ) : Promise< void > {
    const config = await cfg( cmd ), out: string[] = [];
    const analyze = new TextAnalyzer ( await resolveInput( input ) );

    // Helper to add a colored heading to the output
    const heading = ( label: string ) : number => out.push(
        `\n${ chalk.blue( `[${ label.toUpperCase() }]` ) }`
    );

    // Helper to format a label for a metric
    const label = ( str: string ) : string => chalk.cyan( `> ${str}:` ).padEnd( 40, ' ' );

    // Helper to add a string metric to the output
    const str = ( str: string, val: string ) : number => out.push(
        label( str ) + ( analyze as any )[ val ]()
    );

    // Helper to add a numeric metric to the output
    const num = ( str: string, val: string, decimals: number = 4 ) : number => out.push(
        label( str ) + ( ( analyze as any )[ val ]() ).toFixed( decimals )
    );

    // Helper to add an object metric (as JSON) to the output
    const obj = ( str: string, val: string ) : number => out.push(
        label( str ) + JSON.stringify( ( analyze as any )[ val ]() )
    );

    // Overview section
    heading( 'Overview' );
    num( 'Text length', 'getLength', 0 );
    num( 'Word count', 'getWordCount', 0 );
    num( 'Sentence count', 'getSentenceCount', 0 );
    num( 'Avg. word length', 'getAvgWordLength' );
    num( 'Avg. sentence length', 'getAvgSentenceLength' );

    // Words section
    heading( 'Words' );
    obj( 'Histogram', 'getWordHistogram' );
    str( 'Most common words', 'getMostCommonWords' );
    str( 'Hapax legomena', 'getHapaxLegomena' );

    // Special section
    heading( 'Special' );
    str( 'Has numbers', 'hasNumbers' );
    num( 'Upper case ratio', 'getUpperCaseRatio' );
    num( 'Long word ratio', 'getLongWordRatio' );
    num( 'Short word ratio', 'getShortWordRatio' );
    obj( 'Char frequency', 'getCharFrequency' );
    obj( 'Unicode codepoints', 'getUnicodeCodepoints' );

    // Syllables section
    heading( 'Syllables (estimated)' );
    num( 'Syllables count', 'getSyllablesCount', 0 );
    num( 'Monosyllabic words', 'getMonosyllabicWordCount', 0 );
    num( 'Avg. syllables per word', 'getAvgSyllablesPerWord', 0 );
    num( 'Syllables / word median', 'getMedianSyllablesPerWord', 0 );

    // Reading section
    heading( 'Reading' );
    num( 'Honore’s R', 'getHonoresR' );
    num( 'Reading time (min.)', 'getReadingTime' );
    num( 'Readability score', 'getReadabilityScore' );
    num( 'LIX score', 'getLIXScore' );
    str( 'Wiener Sachtextformel', 'getWSTFScore' );

    await output( config, cmd, out.join( '\n' ).substring( 1 ) );
}
