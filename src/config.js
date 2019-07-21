import fs from 'fs'
import path from 'path'
import os from 'os'
const base64 = require('base-64')

export function saveToConfig (configObj) {
  const homedir = os.homedir() // Fetchs user's homedir
  const localStorage = path.join(homedir, 'SC2ReplayStatsUploader') // SC2ReplayStatsUploader stores information in user's home dir
  const configPath = path.join(localStorage, 'config.json') // Saves all config information in config.json
  return new Promise(function (resolve, reject) {
    console.log('\tUpdating config.json')
    fs.writeFile(configPath, JSON.stringify(configObj, null, 2), 'utf8', (err) => reject(err))
    return resolve(configObj)
  })
}

export function initConfig () {
  return new Promise((resolve, reject) => {
    const homedir = os.homedir() // Fetchs user's homedir
    const localStorage = path.join(homedir, 'SC2ReplayStatsUploader') // SC2ReplayStatsUploader stores information in user's home dir
    const config = path.join(localStorage, 'config.json') // Saves all config information in config.json
    let configObj
    if (!fs.existsSync(localStorage)) {
      fs.mkdirSync(localStorage)
    }

    // If config.json does not exist, create it with blank values
    if (!fs.existsSync(config)) {
      configObj = {
        'hash': '',
        'replayPath': '',
      }
      return resolve(saveToConfig(configObj))
    }
    try {
      configObj = JSON.parse(fs.readFileSync(config, 'utf8'))
      return resolve(configObj)
    } catch (err) {
      return reject(err)
    }
  })
}
