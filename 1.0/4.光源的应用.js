import * as THREE from "three"

//引入相机控件
import { OrbitControls } from "three/addons/controls/OrbitControls"

//创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创造三维场景
const scene = new THREE.Scene()

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

//创建点光源
const light = new THREE.PointLight(0xff0000, 1.0)
// light.decay = 0.0 //不随着距离而衰减光源
light.position.set(400, 200, 300)
// scene.add(light)

//可视化点光源
// const pointLightHelper = new THREE.PointLightHelper(light, 10)
// scene.add(pointLightHelper)

//可视化平行光

// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xffff00)
// scene.add(dirLightHelper)

//创建一个几何体 长宽高都是100
// const geometry = new THREE.BoxGeometry(100, 100, 100)
// 球体
const geometry = new THREE.SphereGeometry(50)
// 圆柱
// const geometry = new THREE.CylinderGeometry(10, 50, 100)

// 受光照影响的材质
// const material = new THREE.MeshLambertMaterial({
//   color: 0xff0000,
// })

// 高光材质
// const material = new THREE.MeshPhongMaterial({
//   color: 0xff0000,
//   shininess: 100
// })

const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  shininess: 100,
  specular: 0x444444
})
// 创建了一个网格模型,物体
const mesh = new THREE.Mesh(geometry, material)
//网格模型的位置
// mesh.position.set(0, 0, 0)
scene.add(mesh)

//添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper) //添加到三维场景中

//环境光
const ambient = new THREE.AmbientLight(0xff0000, 0.5)
scene.add(ambient)

// 添加一个平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
directionalLight.position.set(50, 100, 60)
scene.add(directionalLight)

// // 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

controls.addEventListener("change", e => {
  renderer.render(scene, camera)
})

// function animate() {
//   requestAnimationFrame(animate)
//   controls.update()
//   renderer.render(scene, camera)
// }

// animate()
