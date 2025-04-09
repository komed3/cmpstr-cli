export interface ConfigOptions {
    algo?: string;
    flags?: string;
    threshold?: number,
    delimiter?: string,
    options?: Record<string, any>;
    async?: boolean;
    verbose?: boolean;
}

export interface PerfResult {
    time: number,
    memory: number
}