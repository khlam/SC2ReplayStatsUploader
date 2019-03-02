import React, { Component } from 'react'
const {shell} = require('electron')
const base64 = require('base-64')
export class Table extends Component {
    constructor (props) {
        super(props)
    }

    onModConfig() {
        const { config } = this.props
        config.hash = base64.encode(document.getElementById("hashInput").value)
        config.replayPath = document.getElementById("replayPathInput").value
        this.props.onModConfig(config)
    }

    onOpenFP() {
        const { config } = this.props
        if (config.replayPath != ""){
            shell.openItem(config.replayPath)
        }
        return
    }

    render () {
        const { config } = this.props
        return (
            <div>
                <div className="row">
                    <table width="100%" className="settingsTable">
                        <tbody>
                            <tr width="100%">
                                <td>Hash key (<a href="#" onClick={() => shell.openExternal("https://sc2replaystats.com/account/download")}>?</a>)</td>
                                <td><span><input id="hashInput" type="text" defaultValue={base64.decode(config.hash)}></input></span></td>
                            </tr>
                            <tr>
                                <td><a href="#" onClick={this.onOpenFP.bind(this)}>Replay Directory</a></td>
                                <td><span><input id="replayPathInput" type="text" defaultValue={config.replayPath}></input></span></td>
                            </tr>
                        </tbody> 
                    </table>
                </div>
                <div className="row">
                    <button onClick={this.onModConfig.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
}
