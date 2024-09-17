import { ipcMain } from 'electron'
import { NodeSSH } from 'node-ssh'
import { getRemoteFileTypeAndName, sortDirs } from '../utils'
import type { IDirs } from '../../../../types'

const SSHConnectionMap = new Map<string, NodeSSH>()

export function handleCreteSSHConnection() {
  ipcMain.handle('create:sshConnection', async (_event, sshOptions) => {
    const ssh = new NodeSSH()
    await ssh.connect(sshOptions)
    SSHConnectionMap.set(sshOptions.host, ssh)
    return true
  })
}

export function handleDisposeSSHConnection() {
  ipcMain.handle('dispose:sshConnection', async (_event, host) => {
    const ssh = SSHConnectionMap.get(host)
    if (ssh) {
      ssh.dispose()
      SSHConnectionMap.delete(host)
    }
    return true
  })
}

export function getRemoteRootDir() {
  ipcMain.handle('get:remoteRootDir', async (_event, host) => {
    const ssh = SSHConnectionMap.get(host)
    if (ssh) {
      const ret = await ssh.execCommand('ls')
      const paths = await Promise.all(ret.stdout.split('\n').map(async (item) => {
        const { name, type } = getRemoteFileTypeAndName(item)
        return {
          path: `/${name}`,
          name,
          type,
          leaf: type !== 'directory',
        }
      }))
      return sortDirs(paths as IDirs[])
    }
    return []
  })
}
