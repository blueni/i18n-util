#!/usr/bin/env node

const os = require('os')
const { spawn } = require('child_process')

function runCommand(command, args = [], options){
    let cmd = command
    if(os.platform() === 'win32'){
        args.unshift('/c', command)
        cmd = 'cmd.exe'
    }

    options = Object.assign({
        env: process.env,
        stdio: [0, 1, 2],
        cwd: __dirname,
    }, options)
    return new Promise((resolve, reject) => {
        spawn(cmd, args, options)
            .on('exit', resolve)
            .on('close', resolve)
            .on('error', reject)
    })
}

runCommand('parcel', ['./client/index.html', '-p', 3366])
