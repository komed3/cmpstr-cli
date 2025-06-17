'use strict';

export interface Config {
    metric: string;
    flags?: string;
    diff?: {
        mode?: 'line' | 'word';
        insensitive?: boolean;
        lines?: number;
        single?: boolean;
        all?: boolean;
    };
};