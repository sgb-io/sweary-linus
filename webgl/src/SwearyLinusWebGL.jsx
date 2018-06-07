import React, { Component } from 'react'
import RenderWebGL from './webgl/sweary-linus-webgl'

class SwearyLinusWebGL extends Component {
    componentDidMount() {
        RenderWebGL(this.props.output)
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default SwearyLinusWebGL