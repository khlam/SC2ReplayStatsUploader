// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron'
import { initConfig, saveToConfig } from './src/config'
import path from 'path'

const request = require('request')
const fs = require('fs-extra')
const randomstring = require('randomstring')
const base64 = require('base-64')
const chokidar = require('chokidar')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, /*icon: 'assets/500x500.png',*/ 'web-preferences': { 'direct-write': false, 'subpixel-font-scaling': false } })

  // and load the index.html of the app.
  mainWindow.loadFile('dist/src-react/index.html')

  // Open the DevTools.
  if (process.env.ENV === 'dev') {
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.setMenu(null) // disable menu
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


function uploadReplay(configObj, replay) {
  return new Promise((resolve, reject) => {
    request.post('https://sc2replaystats.com/upload_replay.php', {
      formData: {
        'token': randomstring.generate(32),
        'upload_method': 'test_upload',
          'hashkey': base64.decode(configObj.hash),
          'timestamp': Math.round(+new Date() / 1000),
          'Filedata': {
              value: fs.readFileSync(replay),
              options: {
                  filename: path.basename(replay)
              }
          }
      }
    }), (err) => {
      console.log("Upload err: ",err)
      return reject()
    }
    console.log("success upload")
    return resolve()
  })
}

function makeArchive (configObj) {
    const archivePath = path.join(configObj.replayPath, 'archive') // Move all uploaded replays to /archive
    if (!fs.existsSync(archivePath)) {
      fs.mkdirSync(archivePath)
    }
}

function moveReplayToArchive (configObj, replay) {
  const archivePath = path.join(configObj.replayPath, 'archive') // Move all uploaded replays to /archive

  fs.move(replay, path.join(archivePath, path.basename(replay)), { overwrite: true })
    .then(() => {
      console.log(`Successfully uploaded and moved ${path.basename(replay)}`)
    })
    .catch(err => {
      console.error(err)
    })
}

function initReplayWatcher (configObj) {
    const watcher = chokidar.watch(configObj.replayPath, { // Watches wow Addon folder for new addons or deletions
      ignored: /(^|[/\\])\../,
      persistent: true,
      depth: 0
    })
    watcher
      .on('add', function (path) {
        console.log('New Replay: ', path)
        uploadReplay(configObj, path).then(val => {
          moveReplayToArchive(configObj, path)
        })
      })
      .on('error', function (error) {
        console.log('ERROR: ', error)
      })
    return watcher
  }

// --- Initialization Start---
let configObj
let replayWatcher
initConfig().then(value => {
  configObj = value // Sets config settings
  console.log(configObj)
  return configObj
}).then(val => {
  makeArchive(configObj)
  replayWatcher = initReplayWatcher(configObj)
})
//  --- Initialization End---


ipcMain.on('onModConfig', (e, newConfig) => {
  configObj = newConfig
  saveToConfig(newConfig)
})

// need to wait for react to finishing building Dom
ipcMain.on('windowDoneLoading', () => {
  mainWindow.webContents.send('modConfig', configObj)
})