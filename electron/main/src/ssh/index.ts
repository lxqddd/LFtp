import { NodeSSH } from 'node-ssh'
import type { SFTPWrapper } from 'ssh2'
import { ipcMain } from 'electron'
import type { ConnectConfig } from './types'

const sshOptions = {
  host: '82.156.78.63',
  username: 'root',
  password: 'Duoduo521',
}
export const ssh = new NodeSSH()

ssh.connect(sshOptions).then(async () => {
  const ret = await ssh.execCommand('ls -al')
  console.log(ret.stdout)
  // const sftp = await ssh.requestSFTP()
  // const items = await sftp.
})
export function getRemoteDir() {
  ipcMain.handle('get:remoteDir', () => {

  })
}

// export class SSH {
//   private ssh: NodeSSH
//   private sftp: SFTPWrapper

//   constructor() {
//     this.ssh = new NodeSSH()
//   }

//   async connect(sshConfig: ConnectConfig) {
//     await this.ssh.connect(sshConfig)
//   }

//   async execCommand(command: string) {
//     console.log('execCommand =====>', command)
//     const response = await this.ssh.execCommand(command)
//     return response
//   }

//   async createSftp() {
//     this.sftp = await this.ssh.requestSFTP()
//   }

//   async readdir(path: string) {
//     if (!this.sftp) {
//       await this.createSftp()
//     }
//     return new Promise((resolve, reject) => {
//       this.sftp.readdir(path, (err, list) => {
//         if (err) {
//           reject(err)
//         }
//         else {
//           resolve(list)
//         }
//       })
//     })
//   }

//   async endSftp() {
//     if (this.sftp) {
//       this.sftp.end()
//     }
//   }

//   dispose() {
//     return this.ssh.dispose()
//   }

//   isConnected() {
//     return this.ssh.isConnected()
//   }
// }

// export const ssh = new SSH()
// ssh.connect({
//   host: '82.156.78.63',
//   username: 'root',
//   password: 'Duoduo521',
// })
