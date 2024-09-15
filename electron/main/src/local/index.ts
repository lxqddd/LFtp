import os from 'node:os'
import path from 'node:path'
import { ipcMain } from 'electron'
import fs from 'fs-extra'
import { execa } from 'execa'
import { getFileType, sortDirs } from '../utils'
import type { IDirs } from '../../../../types/index'

async function dealWithDirs(currentPath: string, names: string[]) {
  if (names.length === 1 && names[0] === '') {
    return []
  }
  const paths = await Promise.all(names.map(async (item) => {
    const resolvedPath = path.resolve(currentPath, item)
    const stat = await fs.stat(resolvedPath)
    let type = ''
    if (stat.isDirectory()) {
      type = 'directory'
    }
    else {
      type = getFileType(resolvedPath)
    }
    return {
      path: resolvedPath,
      name: item,
      type,
      leaf: type !== 'directory',
    }
  }))
  return sortDirs(paths as IDirs[])
}

export function handleGetLocalHomeDir() {
  ipcMain.handle('get:localHomeDir', async () => {
    const homeDir = os.homedir()
    const res = await execa('ls', {
      shell: true,
      cwd: homeDir,
    })
    return dealWithDirs(homeDir, res.stdout.split('\n'))
  })
}

export function handleGetLocalDirs() {
  ipcMain.handle('get:localDirs', async (_e, currentPath: string) => {
    const res = await execa('ls', {
      shell: true,
      cwd: currentPath,
    })
    return dealWithDirs(currentPath, res.stdout.split('\n'))
  })
}
