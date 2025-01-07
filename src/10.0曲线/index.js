import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';

import model from './管道案列.js'; //模型对象
// import model from './加载外部模型，边线.js'
//场景
const scene = new THREE.Scene();
scene.add(model.mesh); //模型对象添加到场景中
// scene.add(model); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(90, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);



// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);



let i = 0
// 渲染循环
function render() {
    if(i < model.pointsArr.length - 1) {
        camera.position.copy(model.pointsArr[i])
        camera.lookAt(model.pointsArr[i + 1]);
        i++
    }else {
        i = 0
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();


const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false // 禁止右键拖拽
controls.minDistance = 100 //最小缩放距离
controls.maxDistance = 200 //最大缩放距离
controls.maxPolarAngle = Math.PI / 2; //上下旋转范围

controls.addEventListener('change', () => {
    console.log(controls.getDistance()) //相机位置与目标观察点的距离

});
// controls.enableZoom = false //禁止缩放
// controls.enableRotate = false //禁止旋转
// controls.target.copy(model.pointsArr[i + 1])
// controls.update()

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};