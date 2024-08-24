import { NodeSSH } from 'node-ssh'
import type { SFTPWrapper } from 'ssh2'
import type { ConnectConfig } from './types'

export class SSH {
  private ssh: NodeSSH
  private sftp: SFTPWrapper

  constructor() {
    this.ssh = new NodeSSH()
  }

  async connect(sshConfig: ConnectConfig) {
    await this.ssh.connect(sshConfig)
  }

  async execCommand(command: string) {
    const response = await this.ssh.execCommand(command)
    return response
  }

  async createSftp() {
    this.sftp = await this.ssh.requestSFTP()
  }

  async readdir(path: string) {
    if (!this.sftp) {
      await this.createSftp()
    }
    return new Promise((resolve, reject) => {
      this.sftp.readdir(path, (err, list) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(list)
        }
      })
    })
  }

  async endSftp() {
    if (this.sftp) {
      this.sftp.end()
    }
  }

  dispose() {
    return this.ssh.dispose()
  }

  isConnected() {
    return this.ssh.isConnected()
  }
}
