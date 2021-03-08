/*import * as THREE from '../build/three.js';

import { OrbitControls } from '../OrbitControls.js';
import { GLTFLoader } from '../GLTFLoader.js';


const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
//const renderer = new THREE.WebGLRenderer( { alpha: true });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
//const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const cylinder = new THREE.Mesh(geometry, material);
//var cube = new THREE.Mesh(geometry, material);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

/*const loader = new GLTFLoader();

loader.load( '../forme.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

scene.add(cylinder)
//scene.add(cube);
camera.position.z = 20

renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.4);
document.body.appendChild(renderer.domElement);
                          
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate()

*/



import * as THREE from '/build/three.module.js';

import { OrbitControls } from '../OrbitControls.js';
import { GLTFLoader } from '../GLTFLoader.js';
import { RGBELoader } from '../RGBELoader.js';
import { RoughnessMipmapper } from '../RoughnessMipmapper.js';

let camera, scene, renderer;

init();
render();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( - 1.8, 0.6, 2.7 );

    scene = new THREE.Scene();

    new RGBELoader()
        .setDataType( THREE.UnsignedByteType )
        .setPath( '../textures/equirectangular/' )
        .load( 'royal_esplanade_1k.hdr', function ( texture ) {

            const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

            scene.background = envMap;
            scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            render();

            // model

            // use of RoughnessMipmapper is optional
            const roughnessMipmapper = new RoughnessMipmapper( renderer );

            const loader = new GLTFLoader().setPath( '../model/glTF/' );
            loader.load( 'DamagedHelmet.gltf', function ( gltf ) {

                gltf.scene.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                        // roughnessMipmapper.generateMipmaps( child.material );

                    }

                } );

                scene.add( gltf.scene );

                roughnessMipmapper.dispose();

                render();

            } );

        } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.4);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild( renderer.domElement );

    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, 0, - 0.2 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

//

function render() {

    renderer.render( scene, camera );

}

