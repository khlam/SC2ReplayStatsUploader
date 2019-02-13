import React, { Component } from 'react'

export class Table extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        const { config } = this.props
        console.log(config)
        this.props.action("here")
        return (
            <div>
                Hello World
            </div>
        )
    }
}
