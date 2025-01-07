import * as THREE from 'three';
import * as textureLoader from "three/addons/libs/opentype.module.js";

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 20, 92),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(90, -40, 60),
    new THREE.Vector3(120, 30, 30),
])
//管道缓冲几何体
const geometry = new THREE.TubeGeometry(path,100,10,35)
const texLoader = new THREE.TextureLoader()
const texture = texLoader.load('../public/img/earth.jpg') //纹理贴图
texture.wrapS = THREE.RepeatWrapping // UV坐标U方向阵列模式
texture.repeat.x = 10

const material = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.DoubleSide,

})


const mesh = new THREE.Mesh(geometry, material)
//从轨迹线上等间距获取一点过数量点的坐标
const pointsArr = path.getSpacedPoints(500)

export default {mesh,pointsArr}