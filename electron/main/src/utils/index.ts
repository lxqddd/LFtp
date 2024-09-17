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
    case 'application/zip':
      type = 'zip'
      break
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/webp':
      type = 'image'
      break
    default:
      const dotIndex = filePath.lastIndexOf('.')
      type = dotIndex === -1 ? '' : filePath.slice(dotIndex + 1)
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

/**
 *
 * @param fileInfo link this "drwxr-xr-x 2 root root 4096 1月  27 2021 Download"
 */
export function getRemoteFileTypeAndName(fileInfo: string) {
  const fileInfoArr = fileInfo.split(' ')
  const type = fileInfoArr[0][0] === 'd' ? 'directory' : 'file'
  const name = fileInfoArr[fileInfoArr.length - 1]
  return { type, name }
}
