/**
 * @fileoverview
 * Type definitions for CmpStr CLI configuration.
 * Defines the Config interface for all supported options.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

/**
 * Configuration object for CmpStr CLI.
 */
export interface Config {
    output?: string;              // Output file path
    async?: boolean;              // Asynchronous processing flag
    verbose?: boolean;            // Verbose output flag
    list?: boolean;               // Treat input as list
    delimiter?: string;           // List delimiter
    metric?: string;              // Similarity metric
    flags?: string;               // Normalization flags
    threshold?: number;           // Similarity threshold
    sort?: 'asc' | 'desc';        // Sort order
    n?: number;                   // Number of results to return
    phonetic?: {
        algo?: string;            // Phonetic algorithm
        map?: string;             // Phonetic map (e.g., 'en', 'de')
    };
    diff?: {
        mode?: 'line' | 'word';   // Diff granularity
        insensitive?: boolean;    // Case-insensitive diff
        lines?: number;           // Context lines for diff
        single?: boolean;         // Single line output for diff
        all?: boolean;            // Show all lines in diff
    };
};
