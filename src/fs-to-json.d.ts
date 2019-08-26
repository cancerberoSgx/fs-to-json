export interface Config {
  input: string,
  output?: string | { write: (...arg: any[]) => any }
  transformFileName?: (s: string) => string
  filenamePropertyName?: string
  contentPropertyName?: string
  formatted?: boolean,
  outputStyle?: 'object' | 'array'
}
export function fs2json(config: Config): Promise<any>