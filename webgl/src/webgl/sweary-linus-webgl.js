import * as THREE from 'three'
import Stats from 'stats-js'

function loadAsset(loader, target) {
    return new Promise((resolve, reject) => {
        loader.load(
            target,
            (asset) => {
                return resolve(asset)
            },
            (progress) => {
                console.log(`${target} loaded ${progress.loaded}/${progress.total}`)
            },
            () => {
                return reject()
            }
        )
    })
}

function loadFont() {
    const loader = new THREE.FontLoader()
    return loadAsset(loader, 'fonts/helvetiker_regular.typeface.json')
}

function loadLinusBackground() {
    const loader = new THREE.TextureLoader()
    return loadAsset(loader, 'linus.jpg')
}

function generateText(font, text) {
    const textGeo = new THREE.TextGeometry(
        text.join('\n'),
        {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 8,
            bevelEnabled: false,
        }
    )
    textGeo.computeBoundingBox()
    textGeo.computeVertexNormals()
    const materials = [
        new THREE.MeshBasicMaterial( { color: 0xffffff } ), // front
        new THREE.MeshBasicMaterial( { color: 0x2194ce } ) // side
    ]
    return new THREE.Mesh(
        textGeo,
        materials,
    )
}

function renderTextGroup(font, swearyText) {
    // Break text into 2 groups for display
    const halfWay = Math.ceil((swearyText.length)/2)
    const end = swearyText.length
    const text1 = swearyText.slice(0, halfWay)
    const text2 = swearyText.slice(halfWay, end)

    // Group
    const group = new THREE.Group()
    group.position.y = 100

    // Text x2
    // I think these units are all messed up.
    const textMesh1 = generateText(font, text1)
    textMesh1.position.x = -50
    textMesh1.position.y = -45
    textMesh1.position.z = 30
    textMesh1.rotation.x = Math.PI / 2;
    textMesh1.rotation.y = -31
    group.add(textMesh1)

    const textMesh2 = generateText(font, text2)
    textMesh2.position.x = 10
    textMesh2.position.y = -45
    textMesh2.position.z = 14
    textMesh2.rotation.x = Math.PI / 2
    textMesh2.rotation.y = -0.5
    group.add(textMesh2)

    return group
}

function renderScene(swearyText) {
    // Configure a scene, camera and renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Load assets & render scene
    loadLinusBackground()
        .then((linus) => {
            scene.background = linus
        })
        .then(loadFont)
        .then((font) => {
            // Render text group & add to scene
            const textGroup = renderTextGroup(font, swearyText)
            scene.add(textGroup)

            // Point camera & render final scene
            const cameraTarget = new THREE.Vector3(0, 150, 0)
            camera.lookAt(cameraTarget)
            renderer.render(scene, camera)
            document.body.appendChild(renderer.domElement)
        })
}

export default function render(swearyText) {
    // FPS meter
    var stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    document.body.appendChild(stats.domElement)
    setInterval(function () {
        stats.begin()
        stats.end()
    }, 1000 / 60 )

    // Render SwearyLinus
    renderScene(swearyText)
}
