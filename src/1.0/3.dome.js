import * as THREE from "three"
//引入相机控件
import { OrbitControls } from "three/addons/controls/OrbitControls"

import Stats from "three/addons/libs/stats.module"
// 创建性能监视器
const state = new Stats()
document.body.appendChild(state.domElement)

// 创造三维场景
const scene = new THREE.Scene()

//创建一个几何体 长宽高都是100
const geometry = new THREE.BoxGeometry(100, 100, 100)

//创建一个网格材质对象（不受光照影响）
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff913d,
//   transparent: true, //开启透明
//   opacity: 0.5
// })

// 受光照影响的材质
const material = new THREE.MeshLambertMaterial({
  color: 0xff913d
})
// 创建了一个网格模型,物体
const mesh = new THREE.Mesh(geometry, material)
//网格模型的位置
mesh.position.set(0, 60, 0)
scene.add(mesh)

const key = 200

// for (let index = 0; index < key; index++) {
//   const element = array[index];

// }

//创建相机
//相机位置，canvas画布宽度/高度，近端面距离，远端面距离
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
//设置相机的位置
// camera.position.set(200, 200, 200)
camera.position.set(200, 200, 200)
//相机视线
// camera.lookAt(0, 0, 0) //坐标原点
camera.lookAt(0, 0, 0) //y轴                                                                                                                                                          上、
// camera.lookAt(mesh.position) //指向网格模型

//添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper) //添加到三维场景中

//创建点光源
const light = new THREE.PointLight(0xff0000, 1.0)
light.decay = 0.0 //不随着距离而衰减光源
light.position.set(700, 700, 400)
scene.add(light)

//可视化点光源
const pointLightHelper = new THREE.PointLightHelper(light, 10)
scene.add(pointLightHelper)

//环境光
const ambient = new THREE.AmbientLight(0xff0000, 0.4)
scene.add(ambient)

// 添加一个平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
directionalLight.position.set(50, 100, 60)
scene.add(directionalLight)

//可视化平行光

const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xffff00)
scene.add(dirLightHelper)

//创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera) //执行渲染操作
document.body.appendChild(renderer.domElement)

//创建相机控件对象
const controls = new OrbitControls(camera, renderer.domElement)

const times = new THREE.Clock()
function create() {
  // const alp = times.getDelta() * 1000
  // console.log(`alp`, alp)
  //动态旋转
  geometry.rotateY(0.01)
  state.update()
  // controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(create)
}
create()
window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
