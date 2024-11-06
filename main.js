// 引入threejs
import * as THREE from "three"

// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//创建场景
const three = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// // 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// // 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
// 设置旋转速度
controls.autoRotate = true
// 位置
camera.position.set(0, 20, 100)

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
//创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

// 创建网格
const cube = new THREE.Mesh(geometry, material)
//局部坐标缩放
cube.position.set(2, 0, 0)
// 旋转
cube.rotation.x = Math.PI / 4

// 创建几何体
const box = new THREE.BoxGeometry(1, 1, 1)
//创建材质
const boxMaterial = new THREE.MeshBasicMaterial({ color: "#e20416" })
// 设置元素为线框模式
boxMaterial.wireframe = true
// 创建网格
const boxCube = new THREE.Mesh(box, boxMaterial)
// cube.scale.set(2, 2, 2)
//将网格添加到场景中
// three.add(cube)

//局部坐标
boxCube.position.set(-3, 0, 0)
boxCube.rotation.x = Math.PI / 4
//将网格添加到场景中
three.add(boxCube)

three.add(cube)
const gui = new GUI()
// 组
const Folder = gui.addFolder("立方体位置")
Folder.add(cube.position, "x").min(-10).max(10).step(1).name("立方体x轴位置")
Folder.add(cube.position, "y").min(-10).max(10).step(1).name("立方体y轴位置")
Folder.add(cube.position, "z").min(-10).max(10).step(1).name("立方体z轴位置")

let colorParams = {
  cubeColor: "#ff0000"
}

// 设置盒子线性材质
gui.add(boxMaterial, "wireframe").name("线框模式")
// 设置盒子颜色
gui
  .addColor(colorParams, "cubeColor")
  .name("立方体颜色")
  .onChange(val => {
    cube.material.color.set(val)
  })
//设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)

//添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
three.add(axesHelper)

controls.update()

//渲染函数
function animate() {
  requestAnimationFrame(animate)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  controls.update()
  //渲染
  renderer.render(three, camera)
}

animate()
