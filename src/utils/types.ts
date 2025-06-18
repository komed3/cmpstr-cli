'use strict';

export interface Config {
    output?: string;
    async?: boolean;
    verbose?: boolean;
    list?: boolean;
    delimiter?: string;
    metric?: string;
    flags?: string;
    threshold?: number;
    sort?: 'asc' | 'desc';
    n?: number;
    phonetic?: {
        algo?: string;
        map?: string;
    };
    diff?: {
        mode?: 'line' | 'word';
        insensitive?: boolean;
        lines?: number;
        single?: boolean;
        all?: boolean;
    };
};