import * as THREE from '../three.js';

import { OrbitControls } from '../OrbitControls.js';
import { GLTFLoader } from '../GLTFLoader.js';


const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
//const renderer = new THREE.WebGLRenderer( { alpha: true })
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const geometry = new THREE.CylinderGeometry(5, 5, 20, 32)
//const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const cylinder = new THREE.Mesh(geometry, material)
//var cube = new THREE.Mesh(geometry, material);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

/*const loader = new GLTFLoader();

loader.load( '../forme.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );*/

scene.add(cylinder)
//scene.add(cube);
camera.position.z = 20

renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.4)
document.body.appendChild(renderer.domElement)
                          
function animate() {
    controls.update();
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

