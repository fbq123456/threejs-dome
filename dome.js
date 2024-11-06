// 引入threejs
import * as THREE from "three"

// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//创建场景
const three = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// 创建灯光
const ambientLight = new THREE.AmbientLight("#ffffff", 20) // 减少环境光的强度
three.add(ambientLight)

const directionalLight = new THREE.DirectionalLight("#ffffff", 10) // 更改方向光的颜色和强度
directionalLight.position.set(1, 1, 1).normalize()
three.add(directionalLight)

// 增加场景光照
const pointLight = new THREE.PointLight("#ffffff", 10, 10)
pointLight.position.set(100, 100, 100)
three.add(pointLight)

//添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
three.add(axesHelper)

// // 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// // 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
// 设置旋转速度
controls.autoRotate = true

camera.position.set(5, 3, 10)

controls.update()

// 加载模型fbx
// const loader = new FBXLoader()
// loader.load("./img/fff.FBX", function (object) {
//   // changeModelColor(object, "#fc5531")
//   object.scale.set(0.1, 0.1, 0.1) // 将模型缩小为原来的 1/10
//   object.position.set(0, 0, 0) // 确保模型在场景中心
//   three.add(object)
// })

var loader = new GLTFLoader()
loader.load(
  "./img/maikailun/scene.gltf",
  function (object) {
    var model = object.scene
    model.position.set(0, 0, 0) // 确保模型在中心
    model.scale.set(3, 3, 3) // 调整模型大小为原来的两倍
    changeModelColor(model, "red") // 这里可以修改成你想要的颜色
    three.add(model)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

function changeModelColor(model, color) {
  model.traverse(function (child) {
    if (child.isMesh) {
      // 修改材质的颜色
      // child.material = new THREE.MeshStandardMaterial({
      //   color: color, // 红色 (也可以使用CSS的颜色字符串)
      //   flatShading: true
      // }) // 或 MeshPhongMaterial
      child.material = child.material.clone() // 克隆材质，避免修改原材质

      // const texLoader = new THREE.TextureLoader()
      // const texture = texLoader.load("./img/s.webp")
      // // texture.offset.set(100, -1)
      // child.material = new THREE.MeshBasicMaterial({
      //   // color:0x0000FF,
      //   map: texture,
      //   side: THREE.DoubleSide //默认只渲染正面，这里设置双面渲染
      // })
      // child.material.color = new THREE.Color(color)
      // child.material = new THREE.MeshPhongMaterial({
      //   color: color, // 红色 (也可以使用CSS的颜色字符串)
      //   flatShading: true
      // }) // 或 MeshPhongMaterial

      // child.material.color.set(color)
    }
  })
}

//渲染函数
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(three, camera)
}
// function animate() {
//   requestAnimationFrame(animate)
//   // cube.rotation.x += 0.01
//   // cube.rotation.y += 0.01
//   controls.update()
//   //渲染
//   renderer.render(three, camera)
// }

animate()
