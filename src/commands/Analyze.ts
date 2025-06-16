'use strict';

import { TextAnalyzer } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';
import chalk from 'chalk';

export async function analyze ( input: string ) : Promise<void> {

    const res = new TextAnalyzer ( await resolveInput( input ) );

    const str = ( label: string, val: string ) : void => {
        console.log(
            chalk.yellow( `> ${label}: ` ).padEnd( 40, ' ' ) +
            ( res as any )[ val ]()
        );
    };

    const num = ( label: string, val: string, decimals: number = 4 ) : void => {
        console.log(
            chalk.yellow( `> ${label}: ` ).padEnd( 40, ' ' ) +
            ( ( res as any )[ val ]() ).toFixed( decimals )
        );
    };

    const obj = ( label: string, val: string ) : void => {
        console.log(
            chalk.yellow( `> ${label}: ` ).padEnd( 40, ' ' ) +
            JSON.stringify( ( res as any )[ val ]() )
        );
    };

    console.log();
    console.log( '[Overview]' );

    num( 'Text length', 'getLength', 0 );
    num( 'Word count', 'getWordCount', 0 );
    num( 'Sentence count', 'getSentenceCount', 0 );
    num( 'Avg. word length', 'getAvgWordLength' );
    num( 'Avg. sentence length', 'getAvgSentenceLength' );

    console.log();
    console.log( '[Words]' );

    obj( 'Histogram', 'getWordHistogram' );
    str( 'Most common words', 'getMostCommonWords' );
    str( 'Hapax legomena', 'getHapaxLegomena' );

    console.log();
    console.log( '[Special]' );

    str( 'Has numbers', 'hasNumbers' );
    num( 'Upper case ratio', 'getUpperCaseRatio' );
    num( 'Long word ratio', 'getLongWordRatio' );
    num( 'Short word ratio', 'getShortWordRatio' );
    obj( 'Char frequency', 'getCharFrequency' );
    obj( 'Unicode stats', 'getUnicodeStats' );

}