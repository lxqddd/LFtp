import mime from 'mime'
import type { IDirs } from '../../../../types/index'

export function getFileType(filePath: string) {
  let type = ''
  const mimeType = mime.getType(filePath)
  switch (mimeType) {
    case 'application/pdf':
      type = 'pdf'
      break
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      type = 'excel'
      break
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      type = 'word'
      break
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      type = 'ppt'
      break
    case 'text/markdown':
      type = 'markdown'
      break
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/webp':
      type = 'image'
      break
    default:
      type = 'file'
  }
  return type
}

export function sortDirs(dirs: IDirs[]) {
  return dirs.sort((a, b) => {
    if (a.type === 'directory' && b.type !== 'directory') {
      return -1
    }
    else if (a.type !== 'directory' && b.type === 'directory') {
      return 1
    }
    else {
      return 0
    }
  })
}
