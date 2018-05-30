import * as THREE from 'three'
import Stats from 'stats-js'

// TODO there is a massive memory leak somewhere, lol!

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


function generateText(font, text) {
    var textGeo = new THREE.TextGeometry(
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
    ];
    return new THREE.Mesh(
        textGeo,
        materials,
    );
}

function renderScene(swearyText) {
    console.log('Rendering sweary linus')

    // Render the scene
    const linus = new THREE.TextureLoader().load('linus.jpg')
    scene.background = linus
    document.body.appendChild(renderer.domElement)

    // Break text into 2 groups for display
    var halfWay = Math.ceil((swearyText.length)/2)
    var end = swearyText.length
    const text1 = swearyText.slice(0, halfWay)
    const text2 = swearyText.slice(halfWay, end)

    // Load a font & create some text
    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
        // Group
        const group = new THREE.Group();
        group.position.y = 100;
        scene.add(group);

        // Text x2
        const textMesh1 = generateText(font, text1)
        textMesh1.position.x = -50;
        textMesh1.position.y = -45;
        textMesh1.position.z = 30;
        textMesh1.rotation.x = Math.PI / 2;
        textMesh1.rotation.y = -31
        const textMesh2 = generateText(font, text2)
        textMesh2.position.x = 10; // lower = leftwards
        textMesh2.position.y = -45; // lower = closer to camera
        textMesh2.position.z = -3; // lower = downwards
        textMesh2.rotation.x = Math.PI / 2;
        textMesh2.rotation.y = Math.PI
        group.add(textMesh1)
        group.add(textMesh2)

        // TODO rotation is in Radians (and possible all values in here)
        
        const cameraTarget = new THREE.Vector3( 0, 150, 0 );
        camera.lookAt(cameraTarget)

        renderer.render(scene, camera)

        document.addEventListener('click', () => {
            const newAngle = window.newAngle || 0
            console.warn('setting angle to', newAngle)
            textMesh2.rotation.y = newAngle
            renderer.render(scene, camera)
        })
    })
}

export default function render(swearyText) {
    var stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    document.body.appendChild(stats.domElement)
    renderScene(swearyText)

    // setInterval(function () {
    //     stats.begin()
    //     stats.end()
    // }, 1000 / 60 )
}
