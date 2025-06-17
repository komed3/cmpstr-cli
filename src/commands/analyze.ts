'use strict';

import { type Command } from 'commander';
import { TextAnalyzer } from 'cmpstr';
import chalk from 'chalk';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function analyze ( text: string, _: any, cmd: Command ) : Promise<void> {

    const config = await cfg( cmd ), out: string[] = [];

    const analyze = new TextAnalyzer ( await resolveInput( text ) );

    const heading = ( label: string ) : number => out.push(
        `\n${ chalk.blue( `[${ label.toUpperCase() }]` ) }`
    );

    const label = ( str: string ) : string => chalk.cyan( `> ${str}:` ).padEnd( 40, ' ' );

    const str = ( str: string, val: string ) : number => out.push(
        label( str ) + ( analyze as any )[ val ]()
    );

    const num = ( str: string, val: string, decimals: number = 4 ) : number => out.push(
        label( str ) + ( ( analyze as any )[ val ]() ).toFixed( decimals )
    );

    const obj = ( str: string, val: string ) : number => out.push(
        label( str ) + JSON.stringify( ( analyze as any )[ val ]() )
    );

    heading( 'Overview' );
    num( 'Text length', 'getLength', 0 );
    num( 'Word count', 'getWordCount', 0 );
    num( 'Sentence count', 'getSentenceCount', 0 );
    num( 'Avg. word length', 'getAvgWordLength' );
    num( 'Avg. sentence length', 'getAvgSentenceLength' );

    heading( 'Words' );
    obj( 'Histogram', 'getWordHistogram' );
    str( 'Most common words', 'getMostCommonWords' );
    str( 'Hapax legomena', 'getHapaxLegomena' );

    heading( 'Special' );
    str( 'Has numbers', 'hasNumbers' );
    num( 'Upper case ratio', 'getUpperCaseRatio' );
    num( 'Long word ratio', 'getLongWordRatio' );
    num( 'Short word ratio', 'getShortWordRatio' );
    obj( 'Char frequency', 'getCharFrequency' );
    obj( 'Unicode stats', 'getUnicodeStats' );

    heading( 'Syllables (estimated)' );
    num( 'Syllables count', 'getSyllablesCount', 0 );
    num( 'Monosyllabic words', 'getMonosyllabicWordCount', 0 );

    heading( 'Reading' );
    num( 'Honore’s R', 'getHonoresR' );
    num( 'Reading time (min.)', 'getReadingTime' );
    num( 'Readability score', 'getReadabilityScore' );
    num( 'LIX score', 'getLIXScore' );
    str( 'Wiener Sachtextformel', 'getWSTFScore' );

    output( config, cmd, out.join( '\n' ).substring( 1 ) );

}