// flow-typed signature: 396603f18ab2c1ee6d523bd0b248108f
// flow-typed version: 5e1c1576ae/pretty-error_v2.x.x/flow_>=v0.23.x

declare module 'pretty-error' {
  declare class PrettyError {
    static constructor(): PrettyError;
    static start(): void;
    alias(toBeAliased: string, alias: string): void;
    appendStyle(style: Object): void;
    render(error: Error): void;
    skip(skipFn: (traceline: Object, lineNumber: number) => bool): void;
    skipNodeFiles(): void;
    skipPackage(...packages: string[]): void;
    skipPath(path: string): void;
    start(): void;
    withoutColors(): void;
  }
  declare var exports: Class<PrettyError>;
}
