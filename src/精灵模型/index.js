import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import mesh from "./model.js" //模型对象

//场景
const scene = new THREE.Scene()
scene.add(mesh) //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(100, 60, 50)
scene.add(directionalLight)
const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

//渲染器和相机
const width = window.innerWidth
const height = window.innerHeight
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(500, 550, 550)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)
// renderer.setClearColor('red')

console.log(scene)

// 渲染循环
function render() {
  mesh.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

const controls = new OrbitControls(camera, renderer.domElement)

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
