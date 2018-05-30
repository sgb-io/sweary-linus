import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import SwearyLinus from './get-output'
import SwearyLinusWebGL from './SwearyLinusWebGL'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            insults: null,
            stopwords: null,
        }
    }

    componentDidMount() {
        fetch('insults.txt').then(response => {
            response.text()
                .then((insults) => {
                    this.setState({
                        insults,
                    })
                })
        })

        fetch('stopwords.txt').then(response => {
            response.text()
                .then((stopwords) => {
                    this.setState({
                        stopwords,
                    })
                })
        })
    }

    render() {
        const {
            insults,
            stopwords,
        } = this.state

        if (!insults || !stopwords) {
            return (
                <div className="App">
                    Linus is fetching insults & stopwords for us, one sec.
                </div>
            )
        }

        const output = SwearyLinus(insults, stopwords)

        return (
            <SwearyLinusWebGL
                output={output}
            />
        )
    }
}

export default App
