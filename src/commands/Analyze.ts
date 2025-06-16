'use strict';

import { type Command } from 'commander';
import { TextAnalyzer } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';
import { parseOutput } from '../utils/ParseOutput.js';

export async function analyze ( input: string, opt: Record<string, any> = {}, cmd: Command ) : Promise<void> {

    void opt;

    const res = new TextAnalyzer ( await resolveInput( input ) );

    const out: string[] = [];

    const heading = ( label: string ) : number => out.push( `\n## ${ label.toUpperCase() }` );

    const str = ( label: string, val: string ) : number => out.push(
        `- ${label}: `.padEnd( 40, ' ' ) + ( res as any )[ val ]()
    );

    const num = ( label: string, val: string, decimals: number = 4 ) : number => out.push(
        `- ${label}: `.padEnd( 40, ' ' ) + ( ( res as any )[ val ]() ).toFixed( decimals )
    );

    const obj = ( label: string, val: string ) : number => out.push(
        `- ${label}: `.padEnd( 40, ' ' ) + JSON.stringify( ( res as any )[ val ]() )
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

    parseOutput( out.join( '\n' ).substring( 2 ), cmd );

}