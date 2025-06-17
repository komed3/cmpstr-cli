'use strict';

import { type Command } from 'commander';
import { TextAnalyzer } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function analyze (
    text: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd );

    const analyze = new TextAnalyzer ( await resolveInput( text ) );

    const out: string[] = [];

    const heading = ( label: string ) : number => out.push( `\n[${ label.toUpperCase() }]` );

    const str = ( label: string, val: string ) : number => out.push(
        `> ${label}: `.padEnd( 40, ' ' ) + ( analyze as any )[ val ]()
    );

    const num = ( label: string, val: string, decimals: number = 4 ) : number => out.push(
        `> ${label}: `.padEnd( 40, ' ' ) + ( ( analyze as any )[ val ]() ).toFixed( decimals )
    );

    const obj = ( label: string, val: string ) : number => out.push(
        `> ${label}: `.padEnd( 40, ' ' ) + JSON.stringify( ( analyze as any )[ val ]() )
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