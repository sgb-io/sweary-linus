import * as THREE from 'three'

export default function render(swearyText) {
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
        var textGeo = new THREE.TextGeometry(
            swearyText,
            {
                font: font,
                size: 8,
                height: 4,
                curveSegments: 12,
                bevelEnabled: false,
            }
        )
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();

        const group = new THREE.Group();
        group.position.y = 100;

        const cameraTarget = new THREE.Vector3( 0, 150, 0 );
        

        // Text
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0x2194ce } ), // front
            new THREE.MeshBasicMaterial( { color: 0x86696 } ) // side
        ];
        const textMesh1 = new THREE.Mesh(
            textGeo,
            materials,
        );
        textMesh1.position.x = -50;
        textMesh1.position.y = 0;
        textMesh1.position.z = 0;
        textMesh1.rotation.x = Math.PI / 2;
        textMesh1.rotation.y = 0
        group.add(textMesh1)
        
        scene.add( group );

        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 10000, 10000 ),
            new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
        );
        plane.position.y = 100;
        plane.rotation.x = - Math.PI / 2;
        scene.add( plane );

        camera.lookAt( cameraTarget );
        renderer.render(scene, camera);
    })
}