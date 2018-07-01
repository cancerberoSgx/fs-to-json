declare module 'fs-to-json' {
  export interface Config {
    input: string,
    output?: string | { write: (...arg: any[]) => any }
    transformFileName?: (string) => string
    filenamePropertyName?: string
    contentPropertyName?: string
    formatted: boolean
  }
  export function fs2json(config: Config): Promise<any>
}