export type SourceType = 'directory' | 'file' | 'image' | 'pdf' | 'excel' | 'word' | 'ppt' | 'markdown' | 'zip' | 'xml' | 'json' | 'js' | 'ts' | 'vue' | 'tsx' | 'css' | 'sass' | 'scss' | 'less' | 'html'

export interface IDirs {
  path: string
  name: string
  type: SourceType
  leaf: boolean
  children?: IDirs[]
}

export interface ISshForm {
  linkName?: string
  host: string
  username: string
  password: string
}
