import * as THREE from "three"

// 创造三维场景
const scene = new THREE.Scene()

//创建一个几何体 长宽高都是100
const geometry = new THREE.BoxGeometry(100, 100, 100)

//创建一个网格材质对象
const material = new THREE.MeshBasicMaterial({
  color: 0xff913d
})
// 创建了一个网格模型,物体
const mesh = new THREE.Mesh(geometry, material)
//网格模型的位置
mesh.position.set(0, 10, 0)
scene.add(mesh)

//创建相机
//相机位置，canvas画布宽度/高度，近端面距离，远端面距离
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
//设置相机的位置
camera.position.set(200, 200, 200)
//相机视线
// camera.lookAt(0, 0, 0) //坐标原点
camera.lookAt(0, 0, 0) //y轴                                                                                                                                                          上、
// camera.lookAt(mesh.position) //指向网格模型

//创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera) //执行渲染操作
document.body.appendChild(renderer.domElement)
