import React from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));

// Configure a scene, camera and renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// Render the scene
document.body.appendChild(renderer.domElement)

// Load a font & create some text
var loader = new THREE.FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    var geometry = new THREE.TextGeometry('WRONG, ALAN.', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
    })

    // TODO this guess doesn't work!
    scene.add(geometry)
    camera.position.z = 5;
    renderer.render(scene, camera);
})
