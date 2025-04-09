/**
 * interface ConfigOptions
 * @public
 */

export interface ConfigOptions {
    algo?: string;
    flags?: string;
    options?: Record<string, any>;
    async?: boolean;
    verbose?: boolean;
}