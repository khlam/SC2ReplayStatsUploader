import React, { Component } from 'react'
const base64 = require('base-64');
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

    render () {
        const { config } = this.props
        return (
            <div>
                <div className="row">
                    <table>
                        <tr>
                            <td>Hash</td>
                            <td><input id="hashInput" type="text" defaultValue={base64.decode(config.hash)}></input></td>
                        </tr>
                        <tr>
                            <td>Replay Directory</td>
                            <td><input id="replayPathInput" type="text" defaultValue={config.replayPath}></input></td>
                        </tr>
                    </table>
                </div>
                <div className="row">
                    <button onClick={this.onModConfig.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
}
