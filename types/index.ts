export type SourceType = 'directory' | 'file' | 'image' | 'pdf' | 'excel' | 'word' | 'ppt' | 'markdown'

export interface IDirs {
  path: string
  name: string
  type: SourceType
  leaf: boolean
  children?: IDirs[]
}
