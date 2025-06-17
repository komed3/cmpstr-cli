'use strict';

export interface Config {
    output?: string;
    async?: boolean;
    verbose?: boolean;
    metric?: string;
    flags?: string;
    diff?: {
        mode?: 'line' | 'word';
        insensitive?: boolean;
        lines?: number;
        single?: boolean;
        all?: boolean;
    };
};